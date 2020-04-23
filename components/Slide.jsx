import React from 'react'
import styled from 'styled-components'

const StyledSlide = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
`

export default function Slide({ children }) {
  return <StyledSlide>{children}</StyledSlide>
}
