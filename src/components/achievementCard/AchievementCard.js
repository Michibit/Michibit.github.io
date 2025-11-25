import React from "react";
import "./AchievementCard.scss";

export default function AchievementCard({ cardInfo, isDark }) {
  function openUrlInNewTab(url) {
    if(url) {
      const win = window.open(url, "_blank");
      win.focus();
    }
  }

  return (
    <div className="certificate-card">
      <div className="certificate-image-div">
        <img
          src={cardInfo.image}
          alt={cardInfo.imageAlt}
          className="card-image"
        />
      </div>
      
      <div className="certificate-detail-div">
        <h5 className="card-title">{cardInfo.title}</h5>
        <p className="card-subtitle">{cardInfo.description}</p>
      </div>
      
      <div className="certificate-card-footer">
        {cardInfo.footer && cardInfo.footer.map((v, i) => {
          return (
            <button
              key={i}
              className="cert-button"
              onClick={() => openUrlInNewTab(v.url)}
            >
              {v.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}