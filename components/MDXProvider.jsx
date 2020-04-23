import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Slide from "./Slide"
import SlidePage from '../layouts/SlidePage'

const mdComponents = {
  h1: (props) => <h1 style={{ color: 'green' }} {...props} />,
  Slide,
  SlidePage,
}

export default ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
)
