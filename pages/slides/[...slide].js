import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../../components/Header'
import { TotalPagesContext } from '../../context/TotalPagesContext'
import { siteConfig } from '../../site.config.js'

const SlideshowPage = ({ totalSlidePages, currentSlide, filename }) => {
  const MDXContent = dynamic(() => import(`../../${filename}`))
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
      console.log('prepended folder', folderPath, postsDirectory, prependFolder)
      if (prependFolder !== '') {
        addFile(`${prependFolder.substring(1)}/${filename}`)
      } else {
        addFile(filename)
      }
    })
  }

  scanFolder(postsDirectory)

  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

export default SlideshowPage
