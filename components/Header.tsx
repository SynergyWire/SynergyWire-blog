import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="text-center bg-slate-800 p-8 rounded-md">
      <Link href="/">
        <div className="flex justify-center">
          <Image
            src="/images/logo-image-without-bg.png"
            alt="logo"
            width={60}
            height={60}
          />
        </div>
        <h1 className="text-2xl text-white font-bold">Synergy Wire Blog</h1>
      </Link>
    </header>
  )
}