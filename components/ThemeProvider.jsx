import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from '../themes/light'

export const ThemeProvider = ({ children }) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}

export default ThemeProvider
