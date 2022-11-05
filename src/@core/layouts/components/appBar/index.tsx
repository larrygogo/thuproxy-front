import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar'
import {Template} from "src/@core/context/types";

type Props = {
  template: Template
  hidden?: boolean
  navHover?: boolean
  navVisible?: boolean
  setNavVisible?: (value: boolean) => void
  setNavHover?: (value: boolean) => void
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[0],
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out'
}))

const LayoutAppBar = (props: Props) => {
  const {template} = props

  const {appBar} = template

  return (
    <AppBar position={appBar === 'fixed' ? 'sticky' : 'static'}>
      <Toolbar>
        <div>AppBar</div>
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar;
