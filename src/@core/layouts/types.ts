import {ReactNode} from "react";
import {Template} from "src/@core/context/types";

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar'

export type Content = 'full' | 'boxed'

export type AppBar = 'fixed' | 'static' | 'hidden'

export type Footer = 'fixed' | 'static' | 'hidden'

export type ThemeColor = {
  light: string;
  main: string;
  dark: string;
}

export type NavLink = {
  icon?: any
  path: string
  title: string
  disabled?: boolean
}


export type NavSectionTitle = {
  title: string
}

export type NavMenu = (NavLink | NavSectionTitle)[]

export type LayoutProps = {
  template: Template
  saveTemplate: (values: Template) => void
  children: ReactNode
  menuBrand?: ((props?: any) => ReactNode) | ReactNode
  navMenu?: NavMenu
  appBarContent?: ((props?: any) => ReactNode) | ReactNode
  footerContent?: ((props?: any) => ReactNode) | ReactNode
  navMenuContent?: ((props?: any) => ReactNode) | ReactNode
  navMenuBranding?: ((props?: any) => ReactNode) | ReactNode
  afterNavMenuContent?: ((props?: any) => ReactNode) | ReactNode
  beforeNavMenuContent?: ((props?: any) => ReactNode) | ReactNode
}

export type BlankLayoutProps = {
  children: ReactNode
}
