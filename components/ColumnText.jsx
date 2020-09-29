import React from 'react'
import { Box, Text } from 'rebass/styled-components'

export default function ColumnText({ children, textAlign = 'left' }) {
  return (
    <Box display="flex" flexWrap="wrap" textAlign={textAlign}>
      {React.Children.map(children, (textElem, index) => {
        let extraProps
        let linkProps
        if ((index - 1) % 2) {
          extraProps = {
            color: 'gray',
            fontSize: '80%',
          }
          linkProps = {
            color: 'gray',
          }
        }
        return (
          <Text
            width={[1, 1, 1 / children.length]}
            p={2}
            sx={{ wordWrap: 'break-word', '& a': { ...linkProps } }}
            {...extraProps}
          >
            {textElem}
          </Text>
        )
      })}
    </Box>
  )
}
