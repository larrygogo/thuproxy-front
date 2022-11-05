import {Template} from "src/@core/context/types";
import {ReactNode} from "react";
import MuiSwipeableDrawer, {SwipeableDrawerProps} from "@mui/material/SwipeableDrawer";
import {styled, useTheme} from "@mui/material/styles";

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    transition: 'padding .25s ease-in-out',
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

type Props = {
  hidden?: boolean
  template: Template
  saveTemplate: (template: Template) => void
  children: ReactNode
  navHover?: boolean
  setNavHover?: (values: boolean) => void
  navVisible?: boolean
  setNavVisible?: (value: boolean) => void
}

const Drawer = (props: Props) => {
  const {hidden = false, template, children, navHover = false, setNavHover, navVisible = true, setNavVisible} = props;
  const theme = useTheme()

  const {navCollapsed, navWidth, navAllowHover, navCollapsedWidth} = template


  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible?.(true),
    onClose: () => setNavVisible?.(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      if(navAllowHover) {
        setNavHover?.(true)
      }
    },
    onMouseLeave: () => {
      if(navAllowHover) {
        setNavHover?.(false)
      }
    }
  }

  return <SwipeableDrawer
    variant={hidden ? 'temporary' : 'permanent'}
    {...(!hidden ? DesktopDrawerProps : MobileDrawerProps)}
    PaperProps={{sx: { width: navCollapsed && !navHover ? navCollapsedWidth : navWidth }}}
    sx={{
      width: navCollapsed && !navHover ? navCollapsedWidth : navWidth,
      '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.background.paper,
        borderRight: 0
      },
      '& .MuiListItem-gutters': {
        paddingLeft: navCollapsed && !navHover ? 2 : 4,
        paddingRight: navCollapsed && !navHover ? 2 : 4,
      },
    }}
  >
    {children}
  </SwipeableDrawer>
}

export default Drawer
