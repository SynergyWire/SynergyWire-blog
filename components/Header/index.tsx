import React from 'react'
import Link from 'next/link'
import Icon from '../icons/Icon'
import { ICON_KEYS } from '@/utils/contants'
import './header.css'

export default function Header() {
  return (
    <header className="max-w-screen border-b border-solid border-black p-8 flex justify-between content-center">
      <nav className="header-links">
        <Link className="font-bold p1" href="./">
          About
        </Link>
      </nav>
      <h1 className="text-2xl font-bold hover:text-yellow-600">
        <Link href="/">Synergy Wire Blog </Link>
      </h1>
      <div>
        <Link
          className="text-slate-400 organization-link"
          href="https://github.com/SynergyWire"
          target="_blank">
          <Icon name={ICON_KEYS.GITHUB} />
        </Link>
      </div>
      <label className="responsive-menu" htmlFor="toggle-button">
        <input type="checkbox" id="toggle-button" />
        <div className="responsive-menu__icon-switch">
        <Icon  name={ICON_KEYS.MENU} ></Icon>
          <Icon name={ICON_KEYS.CLOSE} ></Icon>
        </div>
        <ul className="responsive-menu__content bg-white">
          <li>
            <Link className="font-bold p1 hover:text-yellow-600" href="./">
              About
            </Link>
          </li>
          <li>
            <Link className="font-bold p1 hover:text-yellow-600" href="./">
              Authors
            </Link>
          </li>
        </ul>
      </label>
    </header>
  )
}
