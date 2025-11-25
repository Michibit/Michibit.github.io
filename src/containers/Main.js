import React, { Component } from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Contact from "./contact/Contact";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import Top from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import { splashScreen } from "../portfolio";
import { StyleProvider } from "../contexts/StyleContext";
import Loading from "./loading/Loading"; 
import "./Main.scss";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: false,
      isShowingSplashAnimation: true
    };
  }

  componentDidMount() {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => this.setState({ isShowingSplashAnimation: false }),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    } else {
      this.setState({ isShowingSplashAnimation: false });
    }
    
    const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
    this.setState({ isDark: darkPref.matches });
  }

  changeTheme = () => {
    this.setState({ isDark: !this.state.isDark });
  };

  render() {
    const { isDark } = this.state;
    
    if (this.state.isShowingSplashAnimation && splashScreen.enabled) {
      return (
        <div className={isDark ? "dark-mode" : ""}>
           <Loading />
        </div>
      );
    }

    return (
      <div className={isDark ? "dark-mode" : null}>
        <StyleProvider value={{ isDark: this.state.isDark, changeTheme: this.changeTheme }}>
          <Header />
          <Greeting />
          <Skills />
          <StackProgress />
          <Education />
          <WorkExperience />
          <Projects />
          <StartupProject />
          <Achievement />
          <Blogs />
          <Talks />
          <Twitter />
          <Podcast />
          <Profile />
          <Footer />
          <Top />
        </StyleProvider>
      </div>
    );
  }
}