import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import copy from 'copy-to-clipboard'
import ReactTooltip from 'react-tooltip'
import { useRef } from 'react'

const PropHouseCommunity: NextPage<{ data: string }> = (props) => {
  const { data } = props

  const copyCodeButtonRef = useRef<HTMLAnchorElement>(null)

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Prop House Community Widget</title>
        <meta
          name="description"
          content="Keep an eye on prop house communities"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@iamng_eth" />
        <meta name="twitter:title" content="Prop House Community Widget" />
        <meta
          name="twitter:description"
          content="Keep an eye on prop house communities"
        />
        <meta
          name="twitter:image"
          content="https://iamng.wtf/img/widgets/prop-house-community/main.png"
        />

        {/* Open Graph */}
        <meta
          property="og:url"
          content="https://iamng.wtf/widgets/prop-house-community"
        />
        <meta
          property="og:image"
          content="https://iamng.wtf/img/widgets/prop-house-community/main.png"
        />
        <meta property="og:site_name" content="iamng" />
        <meta property="og:title" content="Prop House Community Widget" />
        <meta
          property="og:description"
          content="Keep an eye on prop house communities"
        />
      </Head>

      <main className="max-w-screen-md mx-auto my-20 text-center text-lg px-8">
        <div className="w-56 h-28 mx-auto mb-20 shadow-lg rounded-2xl">
          <Image
            alt=""
            src="/img/widgets/prop-house-community/icon.png"
            height={485}
            width={970}
          />
        </div>
        <div className="font-black text-5xl text-red">
          Prop House Community Widget
        </div>
        <div className="mt-4 text-2xl">
          Keep an eye on prop house communities
        </div>
        <div className="mt-16">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/prop-house-community/main.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="mt-10">The how-to👇</div>
        <div className="text-6xl font-black p-10 text-yellow">1</div>
        <div className="mt-2">
          Download the Scriptable app. It's required to create a widget.
        </div>
        <div className="flex flex-row gap-1 items-baseline justify-center">
          <div className="mt-2">Link:</div>
          <a
            className="cursor-pointer"
            target="_blank"
            href={'https://apps.apple.com/us/app/scriptable/id1405459188?uo=4'}
          >
            <p className="text-blue underline">App Store</p>
          </a>
        </div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/shared/scriptable.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">2</div>
        <div className="mt-2">Copy code for the widget!</div>
        <div className="mt-6 flex flex-col gap-1 items-center justify-center">
          <a
            className="cursor-pointer px-12 py-5 bg-blue rounded-2xl hover:bg-white hover:border-blue border-4 text-white  hover:text-blue"
            ref={copyCodeButtonRef}
            data-tip="Copied!"
            onClick={() => {
              fetch('/widgets/code/prop-house-community.txt')
                .then((r) => r.text())
                .then((text) => {
                  navigator.clipboard.writeText(String(text)).then(() => {
                    if (copyCodeButtonRef.current) {
                      ReactTooltip.show(copyCodeButtonRef.current)
                    }
                  })
                })
            }}
          >
            <p className="font-bold">Copy Code</p>
          </a>
        </div>
        <div className="mt-2 flex flex-row gap-1 items-baseline justify-center text-sm">
          <a
            className="cursor-pointer"
            target="_blank"
            href={'/widgets/code/prop-house-community.txt'}
          >
            <p className="text-blue underline">View Raw</p>
          </a>
        </div>
        <div className="text-6xl font-black p-10 text-yellow">3</div>
        <div className="mt-2">
          Next, open the installed Scriptable app, and click on the "Add"
          button.
        </div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/shared/add-script.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">4</div>
        <div className="mt-2">
          Paste the code you copied before in the newly created script.
          <br />
          <br />
          Also, give it a title.
          <br />
          <br />
          It should be good to go.
        </div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/shared/add-code.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">5</div>
        <div className="mt-2">
          Next, add a Medium sized Scriptable widget to one of your screens.
          <br />
          <br />
          After you have added it to the screen, long press on it to open its
          "settings" and click "Edit Widget".
        </div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/shared/medium-edit-widget.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">6</div>
        <div className="mt-2">Select the script you have created above.</div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/shared/choose-script.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">7</div>
        <div className="mt-2">
          Now open{' '}
          <a
            className="cursor-pointer text-blue underline"
            target="_blank"
            href={'https://prop.house/'}
          >
            prop house
          </a>{' '}
          website and open community you would like to track.
        </div>
        <div className="mt-2">Click and Copy community address.</div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/prop-house-community/copy-address.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">8</div>
        <div className="mt-2">
          Paste copied community address as widget parameter.
        </div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/prop-house-community/set-parameter.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">9</div>
        <div className="mt-2">All good now!</div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/prop-house-community/main.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-4xl font-black p-10 text-green">Share it!</div>
        <div className="flex flex-row gap-1 items-baseline justify-center">
          <a
            className="cursor-pointer px-12 py-5 bg-green rounded-2xl hover:bg-white hover:border-green border-4 text-white  hover:text-green"
            onClick={() => {
              navigator.clipboard.writeText(
                'https://iamng.wtf/widgets/prop-house-community'
              )
            }}
          >
            <p className="font-bold">Copy Page Link</p>
          </a>
        </div>

        <div className="mt-8">Twitter:</div>
        <div className="mt-4 flex flex-row gap-1 items-baseline justify-center">
          <a
            className="cursor-pointer px-8 py-2 bg-brand-twitter rounded-2xl hover:bg-white hover:border-brand-twitter border-4 text-white  hover:text-brand-twitter"
            target="_blank"
            href={
              'http://twitter.com/share?text=Want to keep an eye on prop house communities from your iOS screen?%0a%0aGet yourself the widget!&url=https://iamng.wtf/widgets/prop-house-community'
            }
          >
            <p className="font-bold">lfg 👉</p>
          </a>
        </div>
        <div className="mt-16">That's it ❤️</div>
        <div className="mt-20">Follow the author:</div>
        <div className="mt-1 flex flex-row gap-1 items-baseline justify-center">
          <a
            className="cursor-pointer"
            target="_blank"
            href={'https://twitter.com/iamng_eth'}
          >
            <p className="text-brand-twitter underline">@iamng_eth</p>
          </a>
        </div>
        <div className="mt-12" />
      </main>

      <footer className="flex mt-12"></footer>
    </div>
  )
}

export default PropHouseCommunity
