// ** MUI Imports
import Divider from '@mui/material/Divider'
import {styled} from '@mui/material/styles'
import Typography, {TypographyProps} from '@mui/material/Typography'
import MuiListSubheader, {ListSubheaderProps} from '@mui/material/ListSubheader'

// ** Types
import {NavSectionTitle} from 'src/@core/layouts/types'
import {Template} from 'src/@core/context/types'

// ** Custom Components Imports

interface Props {
  navHover?: boolean
  setNavHover?: (value: boolean) => void
  template: Template
  item: NavSectionTitle
}

// ** Styled Components
const ListSubheader = styled((props: ListSubheaderProps) => <MuiListSubheader component='li' {...props} />)(
  ({theme}) => ({
    lineHeight: 1,
    display: 'flex',
    position: 'static',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent'
  })
)

const TypographyHeaderText = styled(Typography)<TypographyProps>(({theme}) => ({
  fontSize: '0.75rem',
  lineHeight: 'normal',
  letterSpacing: '0.21px',
  textTransform: 'uppercase',
  color: theme.palette.text.disabled,
  fontWeight: theme.typography.fontWeightMedium
}))

const NavMenuSectionTitle = (props: Props) => {
  // ** Props
  const {item, navHover, template} = props

  const {navCollapsed} = template

  return (
    <ListSubheader className='nav-section-title'>
      <Divider
        textAlign='left'
        sx={{
          m: 0,
          lineHeight: 'normal',
          width: '100%',
          ...(navCollapsed && !navHover && {
            width: '100%',
            textTransform: 'uppercase',
            '&:before, &:after': {top: 7, transform: 'none'},
            '& .MuiDivider-wrapper': {px: 2.5, fontSize: '0.75rem', letterSpacing: '0.21px'}
          })
        }}
      >
        {navCollapsed && !navHover ? null : (
          <TypographyHeaderText noWrap>
            {item.title}
          </TypographyHeaderText>
        )}
      </Divider>
    </ListSubheader>
  )
}

export default NavMenuSectionTitle
