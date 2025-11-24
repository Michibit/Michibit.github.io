import React from "react";
import "./SoftwareSkill.scss";
import { skillsSection } from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div className="software-skills-main-div">
      <div className="dev-icons-grid">
        {skillsSection.softwareSkills.map((skill, i) => {
          return (
            <div key={i} className="software-skill-card" title={skill.skillName}>
              <i className={skill.fontAwesomeClassname}></i>
              <p>{skill.skillName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}