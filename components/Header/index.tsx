import React from "react";
import Link from "next/link";
import Icon from "../icons/Icon";
import { ICON_KEYS } from "@/utils/contants";
import "./header.css";

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
          target="_blank"
        >
          <Icon name={ICON_KEYS.GITHUB} />
        </Link>
      </div>
      <label className="responsive-menu" htmlFor="toggle-button">
        <svg
          className="menu-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
        >
          <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
        </svg>
        <input type="checkbox" id="toggle-button" />

        <ul className="responsive-menu__content">
          <li>
            <Link href={"#"}>About</Link>
          </li>
          <li>
            <Link href={"#"}>Authors</Link>
          </li>

          <div>
            <Link
              className="text-slate-400"
              href="https://github.com/SynergyWire"
              target="_blank"
            >
              <Icon name={ICON_KEYS.GITHUB} />
            </Link>
          </div>
        </ul>
      </label>
    </header>
  );
}
