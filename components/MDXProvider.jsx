import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import a11yLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light'
import * as Rebass from 'rebass/styled-components'
import SlidePage from '../layouts/SlidePage'
import Cover from './Cover'
import Divider from './Divider'
import Highlight from './Highlight'
import FullColor from './FullColor'
import FullImage from './FullImage'
import Quote from './Quote'
import SpeakerNotes from './SpeakerNotes'
import ColumnText from './ColumnText'
import DarkMode from './DarkMode'

const mdComponents = {
  pre: (props) => props.children,
  code: (props) => {
    const { className } = props
    const language = className.replace('language-', '')
    return (
      <SyntaxHighlighter
        className={className}
        language={language}
        style={a11yLight}
        {...props}
      />
    )
  },
  ...Rebass,
  Cover,
  DarkMode,
  Divider,
  Highlight,
  FullColor,
  FullImage,
  SlidePage,
  SpeakerNotes,
  Quote,
  ColumnText,
}

export default ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
)
