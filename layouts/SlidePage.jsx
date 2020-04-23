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

  const navigate = ({ keyCode }) => {
      console.log('moving', keyCode)
    const slidesLength = 10

      if (keyCode === PREV && currentSlide === 1) {
        console.log('cancelling', currentSlide)
        return false
      } if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slidesLength) {
        console.log('cancelling', currentSlide)
        return false
      } if (NEXT.indexOf(keyCode) !== -1) {
          console.log('moving right')
          setSlide((prevState) => prevState + 1)
        // router.push(`/slides/${currentSlide + 1}`)
      } else if (keyCode === PREV) {
          console.log('moving left')
          setSlide((prevState) => prevState - 1)
        // router.push(`/slides/${currentSlide - 1}`)
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

    const slideType = [Slide.displayName] || [Slide.name];
    // Filter down children by only Slides
    const childSlides = React.Children.map(children, (child) => {
      const childType =
        child && child.props && (child.props.mdxType || child.type.name)
        console.log('checking slide name', childType)
      if(childType.includes(slideType)) {
          return child
      }
    });
    // Then find slide number that matches state
    const findCurrentSlide = childSlides.filter((child, index) => {
      return index === currentSlide
    })
    if (!findCurrentSlide) {
      return null
    }
    console.log('rendering slide', findCurrentSlide)
    return findCurrentSlide
  }


    return (
      <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
        <div id="slide" style={{ width: '100%' }}>
          {renderSlide()}
        </div>
      </Swipeable>
    )
}
