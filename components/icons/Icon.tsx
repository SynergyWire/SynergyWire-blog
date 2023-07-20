import IconGithub from './Icon-github'
import IconLinkedin from './Icon-linkedin'
import IconTwitter from './Icon-twitter'
import IconMenu from './Icon-menu'
import { IconKey } from '@/utils/types'
import IconX from './Icon-x'

export default function Icon({ name }: { name: IconKey }) {
  const ICONS = {
    GITHUB: IconGithub,
    LINKEDIN: IconLinkedin,
    TWITTER: IconTwitter,
    MENU: IconMenu,
    CLOSE: IconX
  }

  const Icon = ICONS[name]

  return (
    <Icon />
  )
}
