import { createContext, useContext, useState } from "react";

export const CurrentSlideContext = createContext({
  currentSlide: 0,
  setSlide: () => {},
});

export function CurrentSlideProvider({ children }) {
  // Grab initial slide from hash (#) in URL
  const initialSlide =
    process.browser && window.location.hash
      ? parseInt(window.location.hash.replace("#", ""))
      : 0;
  const [currentSlide, setSlide] = useState(initialSlide);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  const addStep = (id) => {
    setSteps((prevSteps) => [...new Set([...prevSteps, id])]);
  };
  const removeStep = (id) => {
    setSteps((prevSteps) => [
      ...prevSteps.filter((prevStep) => prevStep !== id),
    ]);
  };
  const clearSteps = () => {
    setSteps([]);
    setCurrentStep(0);
  };

  console.log("rendering context", currentStep, steps);
  return (
    <CurrentSlideContext.Provider
      value={{
        currentSlide,
        setSlide,
        currentStep,
        setCurrentStep,
        steps,
        setSteps,
        addStep,
        removeStep,
        clearSteps,
      }}
    >
      {children}
    </CurrentSlideContext.Provider>
  );
}

export const useCurrentSlide = () => useContext(CurrentSlideContext);
