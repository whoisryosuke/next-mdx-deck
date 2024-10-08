import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Slide from "../components/Slide";
import PresentationMode from "../components/PresentationMode";
import Swipeable from "../components/Swipeable";
import useEventListener from "../hooks/useEventListener";
import { useTotalPages } from "../context/TotalPagesContext";
import { useMode } from "../context/ModeContext";
import { useCurrentSlide } from "../context/CurrentSlideContext";
import { Storage } from "../hooks/useStorage";
import { MODES } from "../constants/modes";

export default function SlidePage({ children, next }) {
  const {
    currentSlide,
    setSlide,
    steps,
    currentStep,
    setCurrentStep,
    clearSteps,
  } = useCurrentSlide();
  const router = useRouter();
  const totalPages = useTotalPages();
  const { mode, setMode } = useMode();

  const NEXT = [13, 32, 39];
  const PREV = 37;
  const PRESENTER = 80;
  let slideCount = 0;

  const navigate = ({ keyCode, altKey }) => {
    // Handle Presentation Mode shortcut
    if (altKey) {
      if (keyCode === PRESENTER) {
        if (mode === MODES.SPEAKER) {
          setMode(MODES.SLIDESHOW);
          router.push(
            router.pathname,
            `${router.pathname}?mode=${MODES.SLIDESHOW}#${currentSlide}`,
            { shallow: true }
          );
        } else {
          setMode(MODES.SPEAKER);
          router.push(
            router.pathname,
            `${router.pathname}?mode=${MODES.SPEAKER}#${currentSlide}`,
            { shallow: true }
          );
        }
        return false;
      }
    }

    // Handle Previous page
    if (keyCode === PREV && currentSlide === 0) {
      if (router.query && router.pathname) {
        let currentPath = router.pathname.replace("/", "");
        if (currentPath == "") {
          currentPath = "1";
        }
        const currentPathIndex = parseInt(currentPath, 10);
        if (currentPathIndex > 2) {
          setSlide(999);
          router.push(`${currentPathIndex - 1}?mode=${mode}`);
        }
        console.log("PREV PAGE", router.pathname, currentPathIndex);
        if (currentPathIndex <= 2 && currentPathIndex > 1) {
          setSlide(999);
          router.push(`/?mode=${mode}`);
        }
      }
      return false;
    }

    // Handle next page
    if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slideCount) {
      // Use `next` prop on SlidePage component if exists
      if (router.query && router.pathname && next) {
        setSlide(0);
        router.push(`${next}?mode=${mode}`);
      }
      // Otherwise assume we increment
      if (router.query && router.pathname && !next) {
        let path = router.pathname.replace("/", "");
        if (path == "") {
          path = "1";
        }
        setSlide(0);
        router.push(`/${parseInt(path, 10) + 1}?mode=${mode}`);
      }
      return false;
    }

    // Handle slide changes
    if (NEXT.indexOf(keyCode) !== -1) {
      // Do we have Steps inside the slide? Navigate those first
      if (steps.length > 0 && currentStep < steps.length - 1)
        return setCurrentStep((prevStep) => prevStep + 1);

      // Otherwise go to next slide
      setSlide((prevState) => {
        return prevState + 1;
      });
      clearSteps();
    } else if (keyCode === PREV) {
      // Do we have Steps inside the slide? Navigate those first
      if (steps.length > 0 && currentStep !== 0)
        return setCurrentStep((prevStep) => prevStep - 1);

      // Otherwise go to prev slide
      setSlide((prevState) => {
        // router.push(
        //   `${router.pathname}`,
        //   `${router.pathname}?mode=${mode}#${prevState - 1}`
        // );
        return prevState - 1;
      });
      clearSteps();
    }
  };

  // useEffect(() => {
  //   router.push(
  //     `${router.pathname}`,
  //     `${router.pathname}?mode=${mode}#${currentSlide}`
  //   );
  // }, [currentSlide, mode, router.pathname]);

  useEventListener("keydown", navigate);

  const swipeLeft = () => {
    navigate({ keyCode: NEXT[0] });
  };

  const swipeRight = () => {
    navigate({ keyCode: PREV });
  };

  const slideNotes = () => {
    let generatorCount = 0;
    let generatedNotes = [];
    // Filter down children by only Slides
    React.Children.map(children, (child) => {
      // Check for <hr> element to separate slides
      const childType = child && child.props && (child.props.mdxType || []);
      if (childType && childType.includes("hr")) {
        generatorCount += 1;
        return;
      }
      // Check if it's a SpeakerNotes component
      if (childType && childType.includes("SpeakerNotes")) {
        if (!Array.isArray(generatedNotes[generatorCount])) {
          generatedNotes[generatorCount] = [];
        }
        generatedNotes[generatorCount].push(child);
      }
    });
    return generatedNotes;
  };

  const renderSlide = () => {
    let generatedSlides = [];
    let generatorCount = 0;

    // Filter down children by only Slides
    React.Children.map(children, (child) => {
      // We grab the "name" of the component using the `type` property
      let childType = child && child.type;
      // React components show as functions, so we grab their name from the `name` property React components usually have
      if (typeof child.type !== "string" && "name" in child.type) {
        childType = child.type.name;
      }

      // Check for <hr> element to separate slides
      if (childType && childType == "hr") {
        generatorCount += 1;
        return;
      }

      // Check if it's a SpeakerNotes component and skip them
      if (childType && childType != "SpeakerNotes") {
        // Add slide content to current generated slide
        if (!Array.isArray(generatedSlides[generatorCount])) {
          generatedSlides[generatorCount] = [];
        }
        generatedSlides[generatorCount].push(child);
      }
    });

    // Get total slide count
    slideCount = generatorCount;

    // Return current slide
    if (currentSlide === 999) {
      setSlide(slideCount + 1);
    }
    return <Slide>{generatedSlides[currentSlide]}</Slide>;
  };

  return (
    <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
      <Storage />
      <PresentationMode
        mode={mode}
        notes={slideNotes()}
        currentSlide={currentSlide}
      >
        <div id="slide" style={{ width: "100%" }}>
          {renderSlide()}
        </div>
      </PresentationMode>
    </Swipeable>
  );
}
