import React, { useState, useEffect } from "react";

const Typewriter = ({ strings, loop = true, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer = "";
    const handleType = () => {
      const i = loopNum % strings.length;
      const fullText = strings[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleType, typingSpeedState);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeedState, strings, typingSpeed, deletingSpeed, pauseTime]);

  // Cursore personalizzato integrato
  return (
    <span>
      {text}
      <span style={{ 
          borderRight: "2px solid #bd00ff", 
          marginLeft: "5px", 
          animation: "blink 1s step-end infinite" 
      }}></span>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </span>
  );
};

export default Typewriter;