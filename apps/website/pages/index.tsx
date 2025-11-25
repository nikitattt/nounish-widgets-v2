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
  index,
  shadow = false
}: {
  widget: any
  family: string
  slug: string
  index: number
  shadow?: boolean
}) => {
  const opacityHex = Math.floor(0.15 * 255)
    .toString(16)
    .padStart(2, '0')
  const backgroundColor = `${widget.theme.accent}${opacityHex}`

  return (
    <div key={index} className="w-full">
      <div
        className={clsx(
          'hidden sm:flex',
          index % 2 ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        <div
          className={clsx(
            'max-w-sm text-center rounded-xl',
            shadow && 'shadow-lg'
          )}
        >
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
              className="w-max py-2 px-5 rounded-lg"
              style={{ backgroundColor, color: widget.theme.accent }}
            >
              <div className="flex flex-row gap-1 w-max items-center">
                <p className="font-bold text-sm">Install</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden flex-col items-center">
        <Link href={`/${family}/${slug}`} className="w-max">
          <div className={clsx('max-w-sm rounded-xl', shadow && 'shadow-lg')}>
            <img
              alt=""
              // TODO: square or rectangular images
              className="rounded-xl h-40 w-auto"
              src={widget.images.icon}
            />
          </div>
          <p
            className="mt-1 text-center text-sm text-grey"
            // style={{ color: widget.theme.accent }}
          >
            {widget.title}
          </p>
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

      {/* Widgets */}
      <div className="hidden lg:block absolute mr-[26%] right-1/2 mt-20 -rotate-12 max-w-xs">
        <Image
          src="/img/nouns/medium-general/icon.png"
          width="1000"
          height="500"
          alt=""
        />
      </div>
      {/* <div className="hidden lg:block absolute mt-64 ml-[26%] left-1/2 rotate-12 max-w-[160px]"> */}
      <div className="hidden lg:block absolute mt-40 ml-[26%] left-1/2 rotate-12 max-w-[160px]">
        <Image
          src="/img/nouns/small-auction/icon.png"
          width="500"
          height="500"
          alt=""
        />
      </div>

      {/* Glasses */}
      <div className="hidden lg:block absolute mr-[30%] right-1/2 mt-72 rotate-[12deg] max-w-[100px]">
        <Image
          src="/img/icons/nouns-blue.png"
          width="160"
          height="160"
          alt=""
        />
      </div>
      <div className="hidden lg:block absolute mt-20 ml-[36%] left-1/2 rotate-[8deg] max-w-[60px]">
        <Image src="/img/icons/nouns-red.png" width="160" height="160" alt="" />
      </div>

      {/* Body */}
      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <h1 className="mt-0 sm:mt-16 text-center text-4xl sm:text-6xl font-black tracking-tight">
          Nounish Widgets
        </h1>
        <p className="mt-12 text-center font-bold text-2xl sm:text-3xl max-w-lg mx-auto leading-[2.375rem] sm:leading-[2.9rem]">
          <span className="bg-fuchsia/10 text-fuchsia py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-lg">
            Never miss
          </span>{' '}
          important{' '}
          <span className="bg-blue/10 text-blue py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-lg">
            events
          </span>{' '}
          in Nouns ecosystem
          <br />
          <span className="bg-red/10 text-red py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-lg">
            With iOS widgets
          </span>
        </p>
        <div className="mt-28 sm:mt-40 w-24 mx-auto">
          <Image
            src="/img/icons/nouns-black.png"
            alt="Nouns Icon"
            height={160}
            width={160}
          />
        </div>
        <div className="mt-14 sm:mt-20 flex flex-col gap-12 sm:gap-36 max-w-2xl mx-auto">
          {data.nouns.map((e: any, i: number) => {
            return (
              <WidgetLink family="nouns" slug={e.slug} widget={e} index={i} />
            )
          })}
        </div>
        <div className="mt-28 sm:mt-40 w-24 mx-auto">
          <Image
            src="/img/icons/lil-nouns-black.png"
            alt="Nouns Icon"
            height={160}
            width={160}
          />
        </div>
        <div className="mt-14 sm:mt-20 flex flex-col gap-12 sm:gap-36 max-w-2xl mx-auto">
          {data.lilNouns.map((e: any, i: number) => {
            return (
              <WidgetLink
                family="lil-nouns"
                slug={e.slug}
                widget={e}
                index={i}
              />
            )
          })}
        </div>
        {/* <div className="mt-28 sm:mt-40 w-20 mx-auto">
          <Image
            src="/img/icons/prop-house.png"
            alt="Nouns Icon"
            height={400}
            width={400}
          />
        </div>
        <div className="mt-28 sm:mt-40 flex flex-col gap-16 sm:gap-40 max-w-2xl mx-auto">
          {data.propHouse.map((e: any, i: number) => {
            return (
              <WidgetLink
                family="prop-house"
                slug={e.slug}
                widget={e}
                index={i}
                shadow={true}
              />
            )
          })}
        </div> */}
      </main>

      <footer className="flex mt-40 pb-6 w-full">
        <div className="mt-20 flex flex-row gap-1 items-baseline justify-center w-full">
          <p>Created by:</p>
          <a
            className="cursor-pointer"
            target="_blank"
            href={'https://twitter.com/iamng_eth'}
          >
            <p className="text-brand-twitter underline">@ng</p>
          </a>
        </div>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { data: widgets }
  }
}

export default Home
