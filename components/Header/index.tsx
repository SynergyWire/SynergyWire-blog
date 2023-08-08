import React from 'react'
import Link from 'next/link'
import Icon from '../icons/Icon'
import { ICON_KEYS } from '@/utils/contants'
import { HeaderLink } from '@/interfaces/UI'
import './header.css'

export default function Header() {
  const HeaderLinks: HeaderLink[] = [
    {
      text: 'About',
      href: '/about'
    }
  ]

  const mapLinks = HeaderLinks.map(({ text, href }: HeaderLink) => (
    <Link className="font-bold p1 hover:text-yellow-600" href={href}>
      {text}
    </Link>))

  return (
    <header className="max-w-screen border-b border-solid border-black p-8 flex justify-between content-center">
      <nav className="header-links">
        {mapLinks}
      </nav>
      <h1 className="home text-2xl font-bold hover:text-yellow-600 text-center">
        <Link href="/">Synergy Wire Blog </Link>
      </h1>
      <div className="header-socials">
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
          <Icon name={ICON_KEYS.MENU} />
          <Icon name={ICON_KEYS.CLOSE}/>
        </div>
        <ul className="responsive-menu__content bg-white">
          <li>
            {mapLinks}
          </li>
        </ul>
      </label>
    </header>
  )
}
