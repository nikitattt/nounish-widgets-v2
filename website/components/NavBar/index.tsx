import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="px-4 py-2 flex flex-row gap-2 items-center">
      <Link href="/" className="font-black tracking-tight text-red text-lg">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-red bg-red/10 rounded-xl p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </div>
          <p>Nounish Widgets</p>
        </div>
      </Link>
    </div>
  )
}

export default NavBar
