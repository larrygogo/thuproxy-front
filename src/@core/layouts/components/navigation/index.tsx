import {Template} from "src/@core/context/types";
import {useRef} from "react";
import Drawer from "./Drawer";
import NavHeader from "./NavHeader";
import NavMenuItems from "./NavMenuItems";
import {NavMenu} from "../../types";
import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import {List} from "@mui/material";
import {hexToRGBA} from "../../../utils/hex-to-rgba";


const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  display: 'none',
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  '&.d-block': {
    display: 'block'
  }
}))

type NavigationProps = {
  hidden?: boolean
  navMenu?: NavMenu
  navHover?: boolean
  setNavHover?: (values: boolean) => void
  navVisible?: boolean
  setNavVisible?: (value: boolean) => void
  template: Template
  saveTemplate: (template: Template) => void
}

const Navigation = (props: NavigationProps) => {
  const shadowRef = useRef(null)

  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  const scrollMenu = (container: any) => {
    // @ts-ignore
    if(shadowRef.current && container) {
      if(container.scrollTop > 0) {
        // @ts-ignore
        if(!shadowRef.current.classList.contains('d-block')) {
          // @ts-ignore
          shadowRef.current.classList.add('d-block')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('d-block')
      }
    }

  }

  return <Drawer {...props}>
    <NavHeader {...props} />
    <StyledBoxForShadow
      ref={shadowRef}
      sx={(theme) => ({
        background: `linear-gradient(${theme.palette.background.paper} 5%,${hexToRGBA(
          theme.palette.background.paper,
          0.85
        )} 30%,${hexToRGBA(theme.palette.background.paper, 0.5)} 65%,${hexToRGBA(
          theme.palette.background.paper,
          0.3
        )} 75%,transparent)`
      })}
    />
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <PerfectScrollbar
        containerRef={handleInfiniteScroll}
        options={{ wheelPropagation: false }}
        onScrollY={scrollMenu}
        onScroll={scrollMenu}
      >
        <List className='nav-items'>
          <NavMenuItems {...props} />
        </List>
      </PerfectScrollbar>
    </Box>
  </Drawer>
}

export default Navigation
