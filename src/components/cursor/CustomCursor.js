import React, { useEffect, useRef } from "react";
// Puoi aggiungere un file CSS dedicato se preferisci, ma qui usiamo stili inline/globali
// definiti in index.css per semplicità e performance.

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }
    };

    const handleMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(2.5)";
        ringRef.current.style.backgroundColor = "rgba(0, 243, 255, 0.2)";
        ringRef.current.style.borderColor = "transparent";
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        ringRef.current.style.backgroundColor = "transparent";
        ringRef.current.style.borderColor = "#00f3ff";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </>
  );
};

export default CustomCursor;