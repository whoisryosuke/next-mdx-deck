import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import SlidePage from '../layouts/SlidePage'
import Cover from './Cover'

const mdComponents = {
  h1: (props) => <h1 style={{ color: 'green' }} {...props} />,
  Cover,
  SlidePage,
}

export default ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
)
