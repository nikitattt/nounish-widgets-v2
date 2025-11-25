import clsx from 'clsx'
import { useRouter } from 'next/router'
import { devMode } from '../../utils/devMode'
import { Button } from '../Button'
import { QRCode } from '../QRCode'

const ScriptName = ({ name, color }: { name: string; color: string }) => {
  const opacityHex = Math.floor(0.15 * 255)
    .toString(16)
    .padStart(2, '0')
  const backgroundColor = `${color}${opacityHex}`

  return (
    <span
      className="py-1 px-2 rounded-lg font-semibold"
      style={{ backgroundColor, color: color }}
    >
      {name}
    </span>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const WidgetSizes = ({ widget }: { widget: any }) => {
  const color = widget.theme.accent

  const opacityHex = Math.floor(0.15 * 255)
    .toString(16)
    .padStart(2, '0')
  const backgroundColor = `${color}${opacityHex}`

  const nameElement = (name: string) => {
    return (
      <span
        className="py-1 px-2 rounded-lg font-semibold"
        style={{ backgroundColor, color: color }}
      >
        {capitalizeFirstLetter(name)}
      </span>
    )
  }

  return (
    <span>
      {nameElement(widget.size)}
      {widget.additionalSizes.length > 0 &&
        widget.additionalSizes.map((e: any, i: number) => {
          return <span key={`name-${i + 1}`}> or {nameElement(e.size)}</span>
        })}
    </span>
  )
}

const installerHeader = (
  name: string,
  urlPath: string,
  icon: string,
  color: string
) => {
  return `// ${name} Script\n// Paste it into Scriptable app\n// And hit Run ▶ (bottom-right)\n\nconst scriptName = '${name}'\nconst urlPath = '${urlPath}'\nconst icon = '${icon}'\nconst color = '${color}'\n\n`
}

const InstallInstructions = ({
  widget,
  familyIcon,
  propHouse = false
}: {
  widget: any
  familyIcon: string
  propHouse?: boolean
}) => {
  const router = useRouter()

  return (
    <div className="max-w-screen-md mx-auto my-20 text-center text-lg px-8">
      {/* <div className="w-28 h-28 mx-auto mb-20 shadow-xl rounded-2xl shadow-sky/10">
    <img alt="" src={widget.images.icon} height={485} width={485} />
  </div> */}
      <h1
        className="mt-0 sm:mt-12 font-black text-5xl sm:text-6xl"
        style={{ color: widget.theme.accent }}
      >
        {widget.title}
      </h1>
      <div className="mt-4 text-xl sm:text-2xl">{widget.description}</div>
      <div className="mt-20 max-w-sm mx-auto">
        <img
          alt=""
          className="rounded-xl"
          src={widget.images.promoFull}
          // height={681}
          height={1220}
          width={604}
        />
      </div>
      <div
        className={clsx(
          devMode ? 'flex' : 'hidden lg:flex',
          'flex-col mt-28 mb-40 items-center'
        )}
      >
        <div
          className="border-[5px] w-max rounded-3xl border-black/90"
          //   style={{ borderColor: widget.theme.accent }}
        >
          <QRCode
            uri={`https://nounswidgets.wtf${router.asPath}`}
            imagePath={familyIcon}
          />
        </div>
        <p
          className="mt-3 text-xl font-bold leading-6"
          style={{ color: widget.theme.accent }}
        >
          Scan to install
          <br />
          on the phone
        </p>
      </div>
      <div
        className={clsx(
          devMode ? 'flex' : 'flex lg:hidden',
          'flex-col mt-20 items-center'
        )}
      >
        <div className="mt-10">Install👇</div>
        <div
          className="text-6xl font-black p-10"
          style={{ color: widget.theme.secondary }}
        >
          1
        </div>
        <div className="mt-2">
          Download the Scriptable app. It's required to create a widget.
        </div>
        <div className="mt-8">
          <Button
            color={widget.theme.accent}
            onClick={() =>
              window
                .open(
                  'https://apps.apple.com/us/app/scriptable/id1405459188?uo=4',
                  '_blank'
                )
                ?.focus()
            }
          >
            App Store
          </Button>
        </div>
        <div className="-mx-6 mt-4">
          <img
            alt=""
            className="rounded-xl"
            src="/img/shared/scriptable.png"
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: widget.theme.secondary }}
        >
          2
        </div>
        <div className="mt-2">Copy the widget code to clipboard!</div>
        <div className="mt-6">
          <Button
            color={widget.theme.accent}
            onClick={() => {
              fetch('/scripts/shared/installer.js')
                .then((r) => r.text())
                .then((text) => {
                  const scriptHeader = installerHeader(
                    widget.script.name,
                    widget.script.urlPath,
                    widget.script.icon,
                    widget.script.color
                  )
                  text = scriptHeader + text
                  if (
                    navigator.canShare &&
                    navigator.canShare({
                      text: text
                    })
                  ) {
                    navigator.share({
                      text: text
                    })
                  } else {
                    window.alert(
                      'Cannot share the script code. Open it on iPhone or iPad.'
                    )
                  }
                })
            }}
          >
            Copy
          </Button>
          <div className="-mx-6 mt-10">
            <img
              alt=""
              className="rounded-xl"
              src="/img/shared/save-copy.png"
              height={793}
              width={1291}
            />
          </div>
        </div>
        {/* <div className="mt-2 flex flex-row gap-1 items-baseline justify-center text-sm">
              <a
                  className="cursor-pointer"
                  target="_blank"
                  href={widget.widgetCode}
              >
                  <p className="text-blue underline">View Raw</p>
              </a>
          </div> */}
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: widget.theme.secondary }}
        >
          3
        </div>
        <div className="mt-2">
          Now create script, paste the copied code and click Run ▶
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            color={widget.theme.accent}
            onClick={() => window.open(`scriptable:///add`)?.focus()}
          >
            Create Script
          </Button>
        </div>
        <div className="-mx-6 mt-10">
          <img
            alt=""
            className="rounded-xl"
            src="/img/shared/add-code.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="mt-4 bg-yellow/5 border border-yellow/20 p-3 rounded-2xl">
          <p className="text-xs font-medium leading-4 text-yellow">
            ⚠️ Widget's code is currently saved to iCloud folder. If you have
            restricted access, you will see "Failed writing to disk" error. In
            several days there will be updated code that works without iCloud.
          </p>
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: widget.theme.secondary }}
        >
          4
        </div>
        <div className="mt-2">
          Next, add <WidgetSizes widget={widget} /> Scriptable widget to
          {widget.type === 'lock-screen'
            ? ' your Lock Screen.'
            : ' one of your screens.'}
          <br />
          <br />
          After you have added it to the screen, long press on it to open its
          "settings" and click "Edit Widget".
        </div>
        <div className="-mx-6 mt-4">
          <img
            alt=""
            className="rounded-xl"
            src={`/img/shared/${widget.size}-edit-widget.png`}
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: widget.theme.secondary }}
        >
          5
        </div>
        <div className="mt-2 leading-relaxed">
          Select the{' '}
          <ScriptName name={widget.script.name} color={widget.theme.accent} />{' '}
          script.
        </div>
        <div className="-mx-6 mt-4">
          <img
            alt=""
            className="rounded-xl"
            src="/img/shared/choose-script.png"
            height={793}
            width={1291}
          />
        </div>
        {propHouse && (
          <div>
            <div
              className="mt-12 text-6xl font-black p-10"
              style={{ color: widget.theme.secondary }}
            >
              6
            </div>
            <div className="mt-2">
              Open Prop House website and open community you would like to
              track.
            </div>
            <div className="mt-2">Click and Copy community address.</div>
            <div className="mt-8">
              <Button
                color={widget.theme.accent}
                onClick={() =>
                  window.open('https://prop.house/', '_blank')?.focus()
                }
              >
                Prop House
              </Button>
            </div>
            <div className="-mx-6 mt-10">
              <img
                alt=""
                className="rounded-xl"
                src="/img/prop-house/shared/copy-address.png"
                height={793}
                width={1291}
              />
            </div>
            <div
              className="mt-12 text-6xl font-black p-10"
              style={{ color: widget.theme.secondary }}
            >
              7
            </div>
            <div className="mt-2">
              Paste copied community address as widget parameter.
            </div>
            <div className="-mx-6 mt-4">
              <img
                alt=""
                className="rounded-xl"
                src="/img/prop-house/shared/set-parameter.png"
                height={793}
                width={1291}
              />
            </div>
          </div>
        )}
        <div
          className="mt-12 text-4xl font-black p-10"
          style={{ color: widget.theme.accent }}
        >
          All good now!
        </div>
        <div className="mt-20 flex flex-row gap-1 items-baseline justify-center">
          <p>Created by:</p>
          <a
            className="cursor-pointer"
            target="_blank"
            href={'https://twitter.com/iamng_eth'}
          >
            <p className="text-brand-twitter underline">@ng</p>
          </a>
        </div>
      </div>
      <div className="mt-12" />
    </div>
  )
}

export default InstallInstructions
