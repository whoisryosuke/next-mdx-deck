import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { TotalPagesContext } from '../../context/TotalPagesContext'
import { siteConfig } from '../../site.config.js'

const SlideshowPage = ({ totalSlidePages, currentSlide, filename }) => {
  const MDXContent = dynamic(() => import(`../../${filename}`))
  return (
    <TotalPagesContext.Provider value={totalSlidePages}>
      <Head>
        <title>
          {siteConfig.author.name} - {siteConfig.title}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        name={siteConfig.author.name}
        date={siteConfig.date}
        event={siteConfig.event}
        url={siteConfig.author.url}
      />
      <MDXContent />
      <Footer
        social={siteConfig.author.social}
        title={siteConfig.title}
        url={siteConfig.author.url}
      />
    </TotalPagesContext.Provider>
  )
}

export async function getStaticProps({ params }) {
  const filename = path.join('slides', `${params.slide}.mdx`)
  const slidesDirectory = path.join(process.cwd(), 'slides')
  const mdxFiles = fs.readdirSync(slidesDirectory)
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
  const postsDirectory = path.join(process.cwd(), 'slides')
  const mdxFiles = fs.readdirSync(postsDirectory)
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
