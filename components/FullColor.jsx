import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
${({ dark }) =>
  dark === true &&
  `
  :root {
    --text: #FEFEFE;
    --bg: #1a1a1a;
  }
  `}

${({ headerText }) =>
  headerText &&
  `
  :root {
    --meta: ${headerText};
  }
  `}

    #slide {

        background: ${({ bg }) => bg};
        ${({ text }) => text && `color: ${text};`}
        background-size:'cover';
        z-index:1;
    }
`

export default function FullColor({ dark, bg, text, headerText, children }) {
  return (
    <div>
      <GlobalStyle dark={dark} bg={bg} text={text} headerText={headerText} />
      {children}
    </div>
  )
}
