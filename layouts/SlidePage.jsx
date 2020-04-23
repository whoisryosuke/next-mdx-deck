import React from 'react'

export default function SlidePage({children}) {

  const NEXT = [13, 32, 39]
  const PREV = 37

  const navigate = ({ keyCode }) => {
    const now = props.data.slide.index
    const {slidesLength} = props

    if (now) {
      if (keyCode === PREV && now === 1) {
        return false
      } if (NEXT.indexOf(keyCode) !== -1 && now === slidesLength) {
        return false
      } if (NEXT.indexOf(keyCode) !== -1) {
        next_navigate(`/${now + 1}`)
      } else if (keyCode === PREV) {
        next_navigate(`/${now - 1}`)
      }
    }
  }

  const swipeLeft = () => {
    navigate({ keyCode: NEXT[0] })
  }

  const swipeRight = () => {
    navigate({ keyCode: PREV })
  }


    return (
      <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
        <div id="slide" style={{ width: '100%' }}>
          {children}
        </div>
      </Swipeable>
    )
}
