import React, { useContext } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { illustration, contactInfo } from "../../portfolio";
import { Fade } from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const { isDark } = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{contactInfo.title}</h1>
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "subTitle contact-subtitle"
              }
            >
              {contactInfo.subtitle}
            </p>
            
            <div className={isDark ? "dark-mode contact-text-div" : "contact-text-div"}>
              
              {/* TERMINALE DI CONTATTO */}
              <div className="contact-terminal">
                <div className="terminal-header">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                  <span className="terminal-title">bash -- michibit@server</span>
                </div>
                <div className="terminal-body">
                  <p className="terminal-command">
                    <span className="prompt">root@michibit:~$</span> send-mail
                  </p>
                  <a
                    className="contact-detail-email"
                    href={"mailto:" + contactInfo.email_address}
                  >
                    {contactInfo.email_address}
                  </a>
                  <span className="cursor-blink">_</span>
                </div>
              </div>

              <div className="social-media-container">
                 <SocialMedia />
              </div>
            </div>
          </div>
          
          <div className="contact-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={email} />
            ) : (
              <img
                alt="Man working"
                src={require("../../assets/images/contactMailDark.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}