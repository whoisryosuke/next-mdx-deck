import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { siteConfig } from "../site.config.js";
import Header from "../components/Header";
import MDXProvider from "../components/MDXProvider";
import { AnimatePresence } from "framer-motion";
import { CurrentSlideProvider } from "../context/CurrentSlideContext";
import { ModeProvider } from "../context/ModeContext";
import TransitionPage from "../layouts/TransitionPage";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <MDXProvider>
        <ThemeProvider theme={theme}>
          <CurrentSlideProvider>
            <ModeProvider>
              <AnimatePresence exitBeforeEnter>
                <TransitionPage>
                  <Head>
                    <title>
                      {siteConfig.name} - {siteConfig.title}
                    </title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                      href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap"
                      rel="stylesheet"
                    />
                  </Head>
                  <Header
                    name={siteConfig.name}
                    title={siteConfig.title}
                    date={siteConfig.date}
                    url={siteConfig.author.url}
                  />
                  <Component {...pageProps} />
                </TransitionPage>
              </AnimatePresence>
            </ModeProvider>
          </CurrentSlideProvider>
        </ThemeProvider>
      </MDXProvider>
    </>
  );
}
