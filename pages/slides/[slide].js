import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import SlidePage from "../../layouts/SlidePage"

const SlideshowPage = ({ currentSlide, filename }) => {
  console.log('the filename', filename)
  console.log('the current slide', currentSlide)
  const MDXContent = dynamic(() => import(`../../${filename}`))
  return (
    <MDXContent />
  )
}

export async function getStaticProps({ params }) {
  const filename = path.join('slides', `${params.slide}.mdx`)

  return {
    props: {
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
