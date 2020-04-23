import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import { TotalPagesContext } from '../../context/TotalPagesContext'

const SlideshowPage = ({ totalSlidePages, currentSlide, filename }) => {
  console.log('the filename', filename)
  console.log('the current slide', currentSlide)
  const MDXContent = dynamic(() => import(`../../${filename}`))
  return (
    <TotalPagesContext.Provider value={totalSlidePages}>
      <MDXContent />
    </TotalPagesContext.Provider>
  )
}

export async function getStaticProps({ params }) {
  const filename = path.join('slides', `${params.slide}.mdx`)
  const slidesDirectory = path.join(process.cwd(), 'slides')
  const mdxFiles = fs.readdirSync(slidesDirectory)
  const totalSlidePages = mdxFiles.length
  console.log('total slide pages', totalSlidePages)

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
  console.log('the queried pages', mdxFiles)
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
