import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import InstallInstructions from '../../components/InstallInstructions'
import NavBar from '../../components/NavBar'

import widgets from '../../content/widgets.json'

const LilNounsWidgetPage: NextPage<{ data: any }> = (props) => {
  const { data } = props

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
      <main>
        <InstallInstructions
          widget={data}
          familyIcon="/img/icons/lil-nouns.png"
        />
      </main>

      <footer className="flex mb-20"></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const widget = widgets.lilNouns.find((e) => e.slug === context.params!.slug)

  return {
    props: { data: widget }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = widgets.lilNouns.map((e) => {
    return { params: { slug: e.slug } }
  })

  return {
    paths: paths,
    fallback: false // can also be true or 'blocking'
  }
}

export default LilNounsWidgetPage
