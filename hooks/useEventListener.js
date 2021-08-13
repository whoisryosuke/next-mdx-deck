import { useRef, useEffect } from "react";

export default function useEventListener(eventName, handler, element) {
  const windowEl = process.browser ? window : null;
  const eventEl = element ?? windowEl;
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = eventEl && eventEl.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      eventEl.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        eventEl.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, eventEl] // Re-run if eventName or element changes
  );
}
