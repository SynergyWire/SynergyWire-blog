import React from "react"
import Link from 'next/link'
import Icon from '../icons/Icon'
import { ICON_KEYS } from '@/utils/contants'
import "./header.css"

export default function Header() {
  return (
    <header className="max-w-screen border-b border-solid border-black p-8 flex justify-between content-center">
      <nav>
        <Link className='font-bold p1' href="./">About</Link>
      </nav>


      <Link href="/" >
        <h1 className="text-2xl font-bold hover:text-yellow-600">
          Synergy Wire Blog</h1>
      </Link>
      <div>      <Link
        className="text-slate-400"
        href="https://github.com/SynergyWire"
        target="_blank"
      >
        <Icon name={ICON_KEYS.GITHUB} />
      </Link></div>

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" /></svg><input type="checkbox" id="open"/>
        <ul>
      <li>
        <a href="#">
          <i className="fa fa-home"></i>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i className="fa fa-paint-brush"></i>
          <span>Portfolio</span>
        </a>
      </li>
    </ul>
      </div>
    </header>
  )
}