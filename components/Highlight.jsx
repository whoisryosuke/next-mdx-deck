import React from 'react'
import { Box } from 'rebass/styled-components'

export default function Highlight({ children }) {
  return (
    <Box as="span" color="primary">
      {children}
    </Box>
  )
}
