import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Scriptable widgets by ng</title>
        <meta name="description" content="Widgets for iOS" />
      </Head>

      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <div>Browse great widgets created by ng</div>
      </main>

      <footer className="flex mt-20"></footer>
    </div>
  )
}

export default Home
