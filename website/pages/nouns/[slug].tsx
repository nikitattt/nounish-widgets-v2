import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useDownloader from 'react-use-downloader'

import widgets from '../../content/widgets.json'

const installerHeader = (
  name: string,
  urlPath: string,
  icon: string,
  color: string
) => {
  return `// ${name} Widget\n// Paste it into Scriptable app\n// And hit Run ▶ (bottom-right)\n\nconst scriptName = '${name}'\nconst urlPath = '${urlPath}'\nconst icon = '${icon}'\nconst color = '${color}'\n\n`
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
        <div className="mt-10">The how-to👇</div>
        <div
          className="text-6xl font-black p-10"
          style={{ color: data.theme.accent }}
        >
          1
        </div>
        <div className="mt-2">
          Download the Scriptable app. It's required to create a widget.
        </div>
        <div className="mt-8">
          <a
            className="mb-6 cursor-pointer px-8 py-2 rounded-xl border-2 font-medium"
            style={{
              background: 'white',
              color: data.theme.accent,
              borderColor: data.theme.accent
            }}
            target="_blank"
            href={'https://apps.apple.com/us/app/scriptable/id1405459188?uo=4'}
          >
            App Store
          </a>
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
          style={{ color: data.theme.accent }}
        >
          2
        </div>
        <div className="mt-2">Save the widget code!</div>
        <div className="mt-6">
          <button
            className="mb-6 cursor-pointer px-8 py-2 rounded-xl border-2 font-medium"
            style={{
              background: 'white',
              color: data.theme.accent,
              borderColor: data.theme.accent
            }}
            onClick={() => {
              fetch(data.script.path)
                .then((r) => r.text())
                .then((text) => {
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
          </button>
          <div className="-mx-6 mt-4">
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
          style={{ color: data.theme.accent }}
        >
          3
        </div>
        <div className="mt-2">
          Now create a script, give it a title and page the script code.
        </div>
        <div className="mt-8 flex justify-center">
          <a
            className="mb-6 cursor-pointer px-8 py-2 rounded-xl border-2 font-medium"
            style={{
              background: 'white',
              color: data.theme.accent,
              borderColor: data.theme.accent
            }}
            href={`scriptable:///add`}
          >
            Create Script
          </a>
        </div>
        <div className="-mx-6 mt-4">
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
          style={{ color: data.theme.accent }}
        >
          4
        </div>
        <div className="mt-2">
          Next, add a Small or Big sized Scriptable widget to one of your
          screens.
          <br />
          <br />
          After you have added it to the screen, long press on it to open its
          "settings" and click "Edit Widget".
        </div>
        <div className="-mx-6 mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/shared/edit-widget.png"
            height={793}
            width={1291}
          />
        </div>
        <div
          className="mt-12 text-6xl font-black p-10"
          style={{ color: data.theme.accent }}
        >
          5
        </div>
        <div className="mt-2">Select the script you have created above.</div>
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
          className="mt-12 text-6xl font-black p-10"
          style={{ color: data.theme.accent }}
        >
          6
        </div>
        <div className="mt-2">All good now!</div>
        <div className="mt-2">
          Every day you will enjoy new amazing artpiece!
        </div>
        <div className="mt-4 max-w-sm mx-auto">
          <Image
            alt=""
            className="rounded-xl"
            src={data.images.promoShort}
            height={681}
            width={604}
          />
        </div>
        <p className="mt-20 font-medium">Enjoy the Art✨</p>
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
