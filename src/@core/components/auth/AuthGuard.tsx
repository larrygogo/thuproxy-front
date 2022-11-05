import {ReactElement, ReactNode, useEffect} from "react";
import {useAuth} from "src/@core/hooks/useAuth";
import {useRouter} from "next/router";

type AuthGuardProps = {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const {children, fallback} = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(auth)
    if (!router.isReady) {
      return
    }

    if (!auth.userInfo && !window.localStorage.getItem(auth.options.storageKey)) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: {fallback: router.asPath}
        });
      } else {
        router.replace('/login')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  console.log(auth.loading, auth.userInfo)
  if (auth.loading || auth.userInfo === null) {
    return fallback
  }

  return <>{children}</>;
}

export default AuthGuard;
