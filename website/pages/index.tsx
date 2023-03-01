import clsx from 'clsx'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import widgets from '../content/widgets.json'

const WidgetLink = ({
  widget,
  family,
  slug,
  index
}: {
  widget: any
  family: string
  slug: string
  index: number
}) => {
  return (
    <div key={index} className="w-full">
      <div
        className={clsx(
          'hidden sm:flex',
          index % 2 ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        <div className="max-w-sm text-center">
          <img
            alt=""
            className="rounded-xl h-40 w-auto"
            src={widget.images.icon}
          />
        </div>
        <div className="flex-1">
          <div className="h-full flex flex-col items-center justify-evenly">
            <p className="max-w-[200px] text-center text-xl font-bold">
              {widget.title}
            </p>
            <Link
              href={`/${family}/${slug}`}
              className="w-max border-2 py-1 px-4 rounded-lg"
              style={{
                borderColor: widget.theme.accent,
                color: widget.theme.accent
              }}
            >
              <div className="flex flex-row gap-1 w-max items-center">
                <p>Install</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden flex-col items-center">
        <Link href={`/${family}/${slug}`} className="w-max">
          <div className="max-w-sm text-center">
            <img
              alt=""
              // TODO: square or rectangular images
              className="rounded-xl h-40 w-auto"
              src={widget.images.icon}
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

const Home: NextPage<{ data: any }> = (props) => {
  const { data } = props

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Nouns Widgets</title>
        <meta
          name="description"
          content="Explore iOS Widgets build for nouns ecosystem"
        />
      </Head>

      <div className="hidden lg:block absolute mr-[26%] right-1/2 mt-20 -rotate-12 max-w-xs">
        <Image
          src="/img/nouns/medium-general/icon.png"
          width="1000"
          height="500"
          alt=""
        />
      </div>
      <div className="hidden lg:block absolute mt-12 ml-[26%] left-1/2 rotate-12 max-w-[160px]">
        <Image
          src="/img/nouns/small-auction/icon.png"
          width="500"
          height="500"
          alt=""
        />
      </div>
      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <h1 className="mt-16 text-center text-6xl font-black tracking-tight">
          Nounish Widgets
        </h1>
        <p className="mt-12 text-center text-purple font-semibold text-xl">
          Never miss important events in Nouns ecosystem
        </p>
        <h2 className="mt-20 text-center text-3xl font-bold">Nouns DAO</h2>
        <div className="mt-40 flex flex-col gap-40 max-w-2xl mx-auto">
          {data.nouns.map((e: any, i: number) => {
            return (
              <WidgetLink family="nouns" slug={e.slug} widget={e} index={i} />
            )
          })}
        </div>
        <h2 className="mt-40 text-center text-3xl font-bold">Lil Nouns DAO</h2>
        <h2 className="mt-20 text-center text-3xl font-bold">Prop House</h2>
      </main>

      <footer className="flex mt-20"></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { data: widgets }
  }
}

export default Home
