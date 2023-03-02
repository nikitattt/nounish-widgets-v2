import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useDownloader from 'react-use-downloader'
import { Button } from '../../components/Button'
import NavBar from '../../components/NavBar'

import widgets from '../../content/widgets.json'

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

const installerHeader = (
  name: string,
  urlPath: string,
  icon: string,
  color: string
) => {
  return `// ${name} Script\n// Paste it into Scriptable app\n// And hit Run ▶ (bottom-right)\n\nconst scriptName = '${name}'\nconst urlPath = '${urlPath}'\nconst icon = '${icon}'\nconst color = '${color}'\n\n`
}

const NounsWidgetPage: NextPage<{ data: any }> = (props) => {
  const { data } = props

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader()

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@iamng_eth" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.shareImage} />

        {/* Open Graph */}
        <meta property="og:url" content={data.url} />
        <meta property="og:image" content={data.shareImage} />
        <meta property="og:site_name" content="nounswidgets" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.title} />
      </Head>

      <NavBar />
      <main className="max-w-screen-md mx-auto my-20 text-center text-lg px-8">
        {/* <div className="w-28 h-28 mx-auto mb-20 shadow-xl rounded-2xl shadow-sky/10">
          <Image alt="" src={data.images.icon} height={485} width={485} />
        </div> */}
        <h1
          className="mt-0 sm:mt-12 font-black text-5xl sm:text-6xl"
          style={{ color: data.theme.accent }}
        >
          {data.title}
        </h1>
        <div className="mt-4 text-xl sm:text-2xl">{data.description}</div>
        <div className="mt-20 max-w-sm mx-auto">
          <Image
            alt=""
            className="rounded-xl"
            src={data.images.promoFull}
            // height={681}
            height={1220}
            width={604}
          />
        </div>
        <div className="mt-10">Install👇</div>
        <div
          className="text-6xl font-black p-10"
          style={{ color: data.theme.secondary }}
        >
          1
        </div>
        <div className="mt-2">
          Download the Scriptable app. It's required to create a widget.
        </div>
        <div className="mt-8">
          <Button
            color={data.theme.accent}
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
          <Image
            alt=""
            className="rounded-xl"
            src="/img/shared/scriptable.png"
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: data.theme.secondary }}
        >
          2
        </div>
        <div className="mt-2">Copy the widget code to clipboard!</div>
        <div className="mt-6">
          <Button
            color={data.theme.accent}
            onClick={() => {
              fetch('/scripts/shared/installer.js')
                .then((r) => r.text())
                .then((text) => {
                  const scriptHeader = installerHeader(
                    data.script.name,
                    data.script.urlPath,
                    data.script.icon,
                    data.script.color
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
            <Image
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
                        href={data.widgetCode}
                    >
                        <p className="text-blue underline">View Raw</p>
                    </a>
                </div> */}
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: data.theme.secondary }}
        >
          3
        </div>
        <div className="mt-2">
          Now create script, paste the copied code and click Run ▶
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            color={data.theme.accent}
            onClick={() => window.open(`scriptable:///add`)?.focus()}
          >
            Create Script
          </Button>
        </div>
        <div className="-mx-6 mt-10">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/shared/add-code.png"
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: data.theme.secondary }}
        >
          4
        </div>
        <div className="mt-2">
          {data.type === 'lock-screen'
            ? 'Next, add Scriptable widget to your Lock Screen.'
            : 'Next, add Scriptable widget to one of your screens.'}
          <br />
          <br />
          After you have added it to the screen, long press on it to open its
          "settings" and click "Edit Widget".
        </div>
        <div className="-mx-6 mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src={`/img/shared/${data.size}-edit-widget.png`}
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: data.theme.secondary }}
        >
          5
        </div>
        <div className="mt-2">
          Select the{' '}
          <ScriptName name={data.script.name} color={data.theme.accent} />{' '}
          script
        </div>
        <div className="-mx-6 mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/shared/choose-script.png"
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-4xl font-black p-10"
          style={{ color: data.theme.accent }}
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
        <div className="mt-12" />
      </main>

      <footer className="flex mb-20"></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const widget = widgets.nouns.find((e) => e.slug === context.params!.slug)

  return {
    props: { data: widget }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = widgets.nouns.map((e) => {
    return { params: { slug: e.slug } }
  })

  return {
    paths: paths,
    fallback: false // can also be true or 'blocking'
  }
}

export default NounsWidgetPage
