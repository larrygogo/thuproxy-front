import {ReactNode} from "react";
import {AppBar, Content, Footer, Layout, ThemeColor} from "src/@core/layouts/types";
import {PaletteMode} from "@mui/material";

export type Template = {
  logo?: string
  layout?: Layout
  appBar?: AppBar
  footer?: Footer
  minLogo?: string
  content?: Content
  navWidth?: number
  mode: PaletteMode
  navCollapsed?: boolean
  themeColor: ThemeColor
  navAllowHover?: boolean
  allowModeSwitch?: boolean
  navAllowCollapse?: boolean
  navCollapsedWidth?: number
}

export type TemplateContextValue = {
  template: Template
  saveTemplate: (theme: Template) => void
}

export type TemplateProviderProps = {
  initTemplate?: Template
  children: ReactNode
}

export type AuthContextOptions = {
  storageKey: string
  currentUserUrl: string
  loginUrl: string
  registerUrl: string
  logoutUrl: string
}

export type AuthContextValue<T = any> = {
  loading: boolean
  userInfo: T
  setUserInfo: (value: T) => void
  options: AuthContextOptions
  saveOptions: (options: AuthContextOptions) => void
  login: (data: any) => Promise<void>
  logout: () => Promise<void>
}

export type AuthProviderProps = {
  children: ReactNode
  options?: Partial<AuthContextOptions>
}

export type ErrCallbackType = (err: { [key: string]: string }) => void
