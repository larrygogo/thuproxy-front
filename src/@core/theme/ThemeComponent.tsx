// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { deepmerge } from '@mui/utils'
import { Theme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// ** Type Imports
import {Template} from 'src/@core/context/types'

// ** Theme Override Imports
import overrides from './overrides'
import typography from './typography'

// ** Theme
import themeOptions from './ThemeOptions'
import UserThemeOptions from 'src/theme/ThemeOptions'

// ** Global Styles
import GlobalStyling from './globalStyles'

interface Props {
  template: Template
  children: ReactNode
}

const ThemeComponent = (props: Props) => {
  // ** Props
  const { template, children } = props

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(template)

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig)

  // ** Deep Merge Component overrides of core and user
  const mergeComponentOverrides = (theme: Theme, settings: Template) =>
    deepmerge({ ...overrides(theme, settings) }, UserThemeOptions()?.components)

  // ** Deep Merge Typography of core and user
  const mergeTypography = (theme: Theme) => deepmerge(typography(theme), UserThemeOptions()?.typography)

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...mergeComponentOverrides(theme, template) },
    typography: { ...mergeTypography(theme) }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme, template) as any} />
      {children}
    </ThemeProvider>
  )
}

export default ThemeComponent
