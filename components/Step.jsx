import React, { useEffect, useRef } from "react";
import { useCurrentSlide } from "../context/CurrentSlideContext";
import { motion } from "framer-motion";

const TRANSLATE_Y_DISTANCE = "-1em";

export const Step = ({ children, order, duration = 0.5 }) => {
  const { currentStep, steps, addStep, removeStep } = useCurrentSlide();
  console.log("step render");
  useEffect(() => {
    console.log("step useEffect");
    if (!steps.includes(order)) {
      addStep(order);
    }
    // return () => {
    //   console.log("removing step");
    //   removeStep(id.current);
    // };
  }, [order, addStep, removeStep]);

  const stepIndex = steps.findIndex((step) => step === order);
  const isVisible = stepIndex >= 0 && stepIndex <= currentStep;
  console.log("is step visible", isVisible);
  const opacity = isVisible ? 1 : 0;
  const translateY = isVisible ? 0 : TRANSLATE_Y_DISTANCE;
  return (
    <motion.div
      animate={{ opacity, translateY }}
      transition={{ duration }}
      initial={{ opacity: 0, translateY: TRANSLATE_Y_DISTANCE }}
    >
      {children}
    </motion.div>
  );
};

export default Step;
