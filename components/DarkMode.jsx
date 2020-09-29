import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from './ThemeProvider'
import { theme } from '../themes/dark'

const GlobalStyle = createGlobalStyle`
  :root {
    --text: #FEFEFE;
    --meta: #888;
    --accent: rgb(0, 92, 221);
    --bg: #1a1a1a;
    --base: 1.5rem;
    --code: 1rem;
    --heading-font-family: "Archivo";
    --heading-font-weight: 800;

    --copyright-font-size: 14px;
  }
`

export default function DarkMode({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
