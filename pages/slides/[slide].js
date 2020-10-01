import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../../components/Header'
import { TotalPagesContext } from '../../context/TotalPagesContext'
import { siteConfig } from '../../deck.config.js'

const SlideshowPage = ({ totalSlidePages, currentSlide, filename }) => {
  console.log('the slide file', filename)
  const MDXContent = dynamic(() => import(`${filename.substring(1)}`))
  return (
    <TotalPagesContext.Provider value={totalSlidePages}>
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
      <MDXContent />
    </TotalPagesContext.Provider>
  )
}

export async function getStaticProps({ params }) {
  const filename = path.join(process.env.MDXPath, process.env.MDXSlideFile)
  const mdxFiles = fs.readdirSync(process.env.MDXPath)
  const totalSlidePages = mdxFiles.length

  return {
    props: {
      totalSlidePages,
      currentSlide: params.slide,
      filename,
    },
  }
}

export async function getStaticPaths() {
  const mdxFiles = fs.readdirSync(process.env.MDXPath)
  // Loop through all post files and create array of slugs (to create links)
  const paths = mdxFiles.map((filename) => ({
    params: {
      slide: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default SlideshowPage
