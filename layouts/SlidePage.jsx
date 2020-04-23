import React, {useState} from 'react'
import {Swipeable} from "react-swipeable"
import { useRouter } from 'next/router'
import Slide from "../components/Slide"
import useEventListener from '../hooks/useEventListener'

export default function SlidePage({children}) {
    const [currentSlide, setSlide] = useState(0)
  const router = useRouter()

  const NEXT = [13, 32, 39]
  const PREV = 37
  let slideCount = 0

  const navigate = ({ keyCode }) => {

      if (keyCode === PREV && currentSlide === 0) {
        console.log('cancelling', currentSlide)
        // router.push(`/slides/${currentSlide - 1}`)
          if (router.query && router.query.slide) {
              if (router.query.slide > 1) {
                router.push(`/slides/${parseInt(router.query.slide) - 1}`)
              }
          }
        return false
      } if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slideCount) {
          console.log('cancelling', currentSlide, router.query)
          if(router.query && router.query.slide) {
              // @TODO: Check for max page count
            router.push(`/slides/${parseInt(router.query.slide) + 1}`)
          }
          return false
        } if (NEXT.indexOf(keyCode) !== -1) {
          console.log('moving right')
          setSlide((prevState) => prevState + 1)
      } else if (keyCode === PREV) {
          console.log('moving left')
          setSlide((prevState) => prevState - 1)
      }
  }

  useEventListener('keydown', navigate)

  const swipeLeft = () => {
    navigate({ keyCode: NEXT[0] })
  }

  const swipeRight = () => {
    navigate({ keyCode: PREV })
  }

  const renderSlide = () => {

    let generatedSlides = []
    let generatorCount = 0

    // Filter down children by only Slides
    React.Children.map(children, (child) => {
        console.log(children)
        // Check for <hr> element to separate slides
        const childType = child && child.props && (child.props.mdxType || [])
        if (childType && childType.includes('hr')) {
            generatorCount += 1
            return
        }

        // Add slide content to current generated slide
        if (!Array.isArray(generatedSlides[generatorCount])) {
            generatedSlides[generatorCount] = []
        }
        generatedSlides[generatorCount].push(child)
    });
    // Then find slide number that matches state
    const findCurrentSlide = generatedSlides.filter((child, index) => {
      return index === currentSlide
    })
    if (!findCurrentSlide) {
      return null
    }
    // Get total slide count
    slideCount = generatorCount

    // Return current slide
    return <Slide>{generatedSlides[currentSlide]}</Slide>
  }


    return (
      <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
        <div id="slide" style={{ width: '100%' }}>
          {renderSlide()}
        </div>
      </Swipeable>
    )
}
