// ** Types Import
import { Template } from 'src/@core/context/types'
import { NavLink, NavSectionTitle, NavMenu } from 'src/@core/layouts/types'

// ** Custom Menu Components
import NavMenuLink from './NavMenuLink'
import NavMenuSectionTitle from './NavMenuSectionTitle'

interface Props {
  template: Template
  navMenu?: NavMenu
  navHidden?: boolean
  navHover?: boolean
  setNavHover?: (value: boolean) => void
  navVisible?: boolean
  setNavVisible?: (value: boolean) => void
  saveTemplate: (values: Template) => void
}

const resolveNavItemComponent = (item: NavLink | NavSectionTitle) => {
  if ((item as NavLink).path) return NavMenuLink
  return NavMenuSectionTitle
}

const NavMenuItems = (props: Props) => {
  // ** Props
  const { navMenu } = props

  const RenderMenuItems = navMenu?.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default NavMenuItems
