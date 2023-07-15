import Link from 'next/link'
import Icon from './icons/Icon'
import { ICON_KEYS } from '@/utils/contants'

export default function Footer() {
  return (
    <footer className="border-t border-slate-500 mt-auto py-6 text-center text-slate-400 flex justify-between">
      <h3>Synergy Wire © 2023</h3>
      <div className="flex gap-2">
      <Link 
          className="text-slate-400"
          href="https://github.com/SynergyWire" 
          target="_blank"
        >
          <Icon name={ICON_KEYS.GITHUB} />
        </Link>
        {/* <Link 
          className="text-slate-400"
          href="https://www.linkedin.com/in/luis-alexander-b83478184/" 
          target="_blank"
        >
          <Icon name={ICON_KEYS.LINKEDIN} />
        </Link>

        <Link 
          className="text-slate-400"
          href="https://twitter.com/LuisSantiago976" 
          target="_blank"
        >
          <Icon name={ICON_KEYS.TWITTER} />
        </Link> */}
        
      </div>
    </footer>
  )
}