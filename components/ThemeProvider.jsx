import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
    text: '#1A1A1A',
    bg: '#FEFEFE',
  },
}

export const ThemeProvider = ({ children }) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}

export default ThemeProvider
