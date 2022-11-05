import {LayoutProps} from "./types";
import {styled, Theme} from "@mui/material/styles";
import Navigation from "src/@core/layouts/components/navigation";
import {useState} from "react";
import Box, {BoxProps} from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import AppBar from "./components/appBar";

const LayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  overflow: 'auto'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Layout = (props: LayoutProps) => {
  const {children} = props;

  const [navHover, setNavHover] = useState<boolean>(false);
  const [navVisible, setNavVisible] = useState<boolean>(false);

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <LayoutWrapper className="layout-wrapper">
      <Navigation {...props} hidden={hidden} navHover={navHover} navVisible={navVisible} setNavVisible={setNavVisible} setNavHover={setNavHover} />
      <MainContentWrapper className="layout-content-wrapper">
        <AppBar {...props} hidden={hidden}  navHover={navHover} navVisible={navVisible} setNavVisible={setNavVisible} setNavHover={setNavHover} />
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContentWrapper>
    </LayoutWrapper>
  )
}

export default Layout;
