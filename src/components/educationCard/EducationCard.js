import React, { createRef, useState } from "react";
import { Fade } from "react-reveal";
import "./EducationCard.scss";
import ColorThief from "colorthief";

export default function EducationCard({ school }) {
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
    <Fade bottom duration={1000} distance="20px">
      <div className="education-card-compact">
        {/* LATO SINISTRO: LOGO & LINEA */}
        <div className="education-card-left">
          <div 
            className="logo-wrapper"
            style={{ boxShadow: `0 0 20px ${rgb(colorArrays) ? rgb(colorArrays) : 'rgba(189, 0, 255, 0.2)'}` }}
          >
            <img
              crossOrigin={"anonymous"}
              ref={imgRef}
              className="education-logo"
              src={school.logo}
              alt={school.schoolName}
              onLoad={() => getColorArrays()}
            />
          </div>
          <div className="vertical-line"></div>
        </div>

        {/* LATO DESTRO: CONTENUTO */}
        <div className="education-card-right">
          <div className="education-header">
            <div className="header-info">
              <h5 className="school-name">{school.schoolName}</h5>
              <h5 className="degree-name">{school.subHeader}</h5>
            </div>
            <div className="education-date-tag">
              {school.duration}
            </div>
          </div>

          <div className="education-details">
            {school.descBullets && (
              <ul className="education-bullets">
                {school.descBullets.map((item, i) => (
                  <li key={i} className="bullet-item">{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}