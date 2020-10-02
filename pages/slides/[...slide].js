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
          {siteConfig.title} - {siteConfig.author.name}
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
  const filename = path.join('slides', `${params.slide.join('/')}.mdx`)
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
  let paths = []
  const postsDirectory = path.join(process.cwd(), 'slides')

  // Add file to paths array
  const addFile = (filename) => {
    const slidePaths = filename.replace('.mdx', '').split('/')
    paths = [
      ...paths,
      {
        params: {
          slide: slidePaths,
        },
      },
    ]
  }

  // Loop through files and detect folder, if detected, run function again (recursive)
  const scanFolder = (folderPath) => {
    const files = fs.readdirSync(folderPath)
    files.forEach((filename) => {
      const directory = path.join(folderPath, filename)
      // If it's a folder, recursively scan
      if (fs.lstatSync(directory).isDirectory()) {
        return scanFolder(directory)
      }
      // Append folder name is not slide root
      const prependFolder = folderPath.replace(postsDirectory, '')
      if (prependFolder !== '') {
        addFile(`${prependFolder.substring(1)}/${filename}`)
      } else {
        addFile(filename)
      }
    })
  }

  scanFolder(postsDirectory)

  return {
    paths,
    fallback: false,
  }
}

export default SlideshowPage
