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

    #slide {

    ${({ overlay, image }) =>
      overlay === true
        ? `
        background: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%), url('/${image}') center/cover;
        `
        : `
        background: url('/${image}') center/cover;
        `}
        background-size:'cover';
        z-index:1;
    }
`

export default function FullImage({ dark, image, children, overlay }) {
  return (
    <div>
      <GlobalStyle dark={dark} image={image} overlay={overlay} />
      {children}
    </div>
  )
}
