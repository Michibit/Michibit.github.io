import React, { useContext } from "react";
import { Fade } from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { illustration, greeting } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
// Importiamo il NOSTRO componente Typewriter manuale
import Typewriter from "../../components/typewriter/Typewriter";

export default function Greeting() {
  const { isDark } = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
                style={{ fontWeight: 700, letterSpacing: "-1px" }}
              >
                {greeting.title}{" "}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              
              {/* Sezione Typewriter Elegante */}
              <div className={isDark ? "dark-mode greeting-text-p" : "greeting-text-p subTitle"} 
                   style={{ 
                     fontSize: "1.8rem", 
                     margin: "15px 0", 
                     fontFamily: "'Fira Code', monospace",
                     color: "#00f3ff",
                     fontWeight: 500
                   }}>
                <span style={{ color: "#bd00ff", marginRight: "12px", fontWeight: "bold" }}>&gt;</span>
                <Typewriter 
                  strings={[
                    "DevOps Engineer 🚀",
                    "Sistemista Linux 🐧", 
                    "Automazione & Cloud ☁️",
                    "Cyberpunk Enthusiast 👾"
                  ]}
                  typingSpeed={80}
                  deletingSpeed={50}
                  pauseTime={1500}
                />
              </div>

              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
                style={{ marginTop: "20px" }}
              >
                {greeting.subTitle}
              </p>
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contattami" href="#contact" />
                {greeting.resumeLink && (
                  <a
                    href={greeting.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-link-button"
                  >
                    <Button text="Scarica il mio CV" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}