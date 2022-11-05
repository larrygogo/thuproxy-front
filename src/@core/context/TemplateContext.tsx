import {Template, TemplateContextValue, TemplateProviderProps} from "./types";
import {createContext, useEffect, useState} from "react";

const initialTemplate: Template = {
  logo: '/images/logo_l.svg',
  minLogo: '/images/logo_m.svg',
  mode: 'dark',
  appBar: 'fixed',
  footer: 'static',
  layout: 'vertical',
  content: 'full',
  navWidth: 233,
  navCollapsedWidth: 70,
  navCollapsed: true,
  navAllowCollapse: false,
  navAllowHover: true,
  themeColor: {
    main: '#5A8DEE',
    light: '#5A8DEE',
    dark: '#5A8DEE',
  }
}

// 缓存设置
const storeTemplate = (theme: Template) => {
  const initTheme = Object.assign({}, theme)
  window.localStorage.setItem('templateConfig', JSON.stringify(initTheme))
}

// 恢复设置
const restoreTemplate = (): Template | null => {
  let template = null
  try {
    const storedData: string | null = window.localStorage.getItem('templateConfig')
    if (storedData) {
      template = { ...JSON.parse(storedData) }
    } else {
      template = initialTemplate
    }
  } catch (err) {
    console.error(err)
  }
  return template
}

export const TemplateContext = createContext<TemplateContextValue>({
  saveTemplate: () => null,
  template: initialTemplate
})

export const TemplateProvider = ({children, initTemplate}: TemplateProviderProps) => {
  const [template, setTemplate] = useState<Template>({...initialTemplate,...initTemplate})

  useEffect(() => {
    setTemplate({...initialTemplate,...initTemplate})
  }, [initTemplate])

  useEffect(() => {
    const restoredTemplate = restoreTemplate()

    if (restoredTemplate) {
      setTemplate({ ...restoredTemplate })
    }

  }, [])


  // ** Save Settings
  const saveTemplate = (data: Template) => {
    setTemplate(data)
    storeTemplate(data)
  }

  // ** Render Provider
  return (
    <TemplateContext.Provider value={{template, saveTemplate}}>
      {children}
    </TemplateContext.Provider>
  )
}

export const TemplateConsumer = TemplateContext.Consumer
