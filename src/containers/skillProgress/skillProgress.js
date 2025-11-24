import React from "react";
import "./Progress.scss";
import { illustration, techStack } from "../../portfolio";
import { Fade } from "react-reveal";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          
          {/* Sezione Barre - System Monitor */}
          <div className="skills-bar">
            <h1 className="skills-heading">Livelli di Competenza</h1>
            <div className="skills-bar-container">
              {techStack.experience.map((exp, i) => {
                const progressStyle = {
                  width: exp.progressPercentage
                };
                return (
                  <div key={i} className="skill-item">
                    <div className="skill-meta">
                      <p className="skill-name">{exp.Stack}</p>
                      <p className="skill-percentage">{exp.progressPercentage}</p>
                    </div>
                    <div className="meter">
                      <span style={progressStyle}>
                        <span className="progress-glow"></span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Immagine laterale */}
          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}