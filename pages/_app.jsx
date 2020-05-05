import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { CurrentSlideProvider } from '../context/CurrentSlideContext'
import MDXProvider from '../components/MDXProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import TransitionPage from '../layouts/TransitionPage'

export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <MDXProvider>
      <CurrentSlideProvider>
        <AnimatePresence exitBeforeEnter>
          <TransitionPage>
            <Component {...pageProps} />
          </TransitionPage>
        </AnimatePresence>
      </CurrentSlideProvider>
    </MDXProvider>
  </ThemeProvider>
)
