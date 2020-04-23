import React from 'react'
import { AnimatePresence } from 'framer-motion'
import MDXProvider from '../components/MDXProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import TransitionPage from "../layouts/TransitionPage"

export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <MDXProvider>
      <AnimatePresence exitBeforeEnter>
        <TransitionPage>
          <Component {...pageProps} />
        </TransitionPage>
      </AnimatePresence>
    </MDXProvider>
  </ThemeProvider>
)
