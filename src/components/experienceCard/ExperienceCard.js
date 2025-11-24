import React, { useState, createRef } from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";

export default function ExperienceCard({ cardInfo, isDark }) {
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = createRef();

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return typeof values === "undefined" ? null : "rgb(" + values.join(", ") + ")";
  }

  return (
    <div className="experience-card-compact">
      {/* Lato Sinistro: Logo e Linea */}
      <div className="experience-card-left">
        <div className="logo-wrapper" style={{boxShadow: `0 0 15px ${rgb(colorArrays)}`}}>
          <img
            crossOrigin={"anonymous"}
            ref={imgRef}
            className="company-logo"
            src={cardInfo.companylogo}
            alt={cardInfo.company}
            onLoad={() => getColorArrays()}
          />
        </div>
        <div className="connection-line"></div>
      </div>

      {/* Lato Destro: Contenuto */}
      <div className="experience-card-right">
        <div className="card-header">
          <div>
            <h5 className="role-title">{cardInfo.role}</h5>
            <h5 className="company-name">{cardInfo.company}</h5>
          </div>
          <div className="date-badge">{cardInfo.date}</div>
        </div>
        
        <p className="job-description">{cardInfo.desc}</p>
        
        {cardInfo.descBullets && (
          <ul className="job-bullets">
            {cardInfo.descBullets.map((item, i) => (
              <li key={i} className="bullet-item">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}