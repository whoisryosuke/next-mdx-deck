import React from 'react'
import { Box, Text } from 'rebass/styled-components'

export default function ColumnText({ children, textAlign = 'left' }) {
  return (
    <Box display="flex" flexWrap="wrap" textAlign={textAlign}>
      {React.Children.map(children, (textElem, index) => {
        let extraProps
        if (index === 0) {
          extraProps = {
            color: 'gray',
            fontSize: '80%',
          }
        }
        return (
          <Text width={[1, 1, 1 / children.length]} p={2} {...extraProps}>
            {textElem}
          </Text>
        )
      })}
    </Box>
  )
}
