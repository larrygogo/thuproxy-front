import {Fragment, ReactElement, ReactNode} from 'react'
import Head from 'next/head'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {TemplateConsumer, TemplateProvider} from 'src/@core/context/TemplateContext'
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'
import 'styles/globals.css'
import {CacheProvider, EmotionCache} from "@emotion/react";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import UserLayout from "src/layouts/UserLayout";
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import Spinner from 'src/@core/components/spinner'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import {AuthProvider} from "../@core/context/AuthContext";
import WindowWrapper from "../@core/components/window-wrapper";
import {Router} from "next/router";
import NProgress from 'nprogress'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  authGuard?: boolean
  guestGuard?: boolean
}

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

const Guard = ({children, authGuard, guestGuard}: GuardProps) => {
  console.log(authGuard, guestGuard)
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner/>}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner/>}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false

  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <TemplateProvider>
          <TemplateConsumer>
            {({template}) => {
              return (
                <Fragment>
                  <Head>
                    <title>Hello Dashboard</title>
                    <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template'/>
                    <meta name='viewport' content='initial-scale=1, width=device-width'/>
                  </Head>
                  <ThemeComponent template={template}>
                    <WindowWrapper>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </Guard>
                    </WindowWrapper>
                  </ThemeComponent>
                </Fragment>
              )
            }}
          </TemplateConsumer>
        </TemplateProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
