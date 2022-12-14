declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      componentBg: string
      dark: string
      main: string
      light: string
    }
  }
  interface PaletteOptions {
    customColors?: {
      componentBg?: string
      dark?: string
      main?: string
      light?: string
    }
  }
}

export {}
