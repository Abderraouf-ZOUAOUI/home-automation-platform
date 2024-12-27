import React, { useState, useEffect } from "react";
import './HomeAutomation.css';
import moonIcon from "./image/moon-night-astronomy-nature-moon-phase-sleep_81483.png";
import sunIcon from "./image/sun_icon-icons.com_61830.png";
import homeAutomationImage from "./image/home-automation-1.png";
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico';
import FaPhoneAlt from './image/phone1.ico';
import FaMapMarkerAlt from './image/place_location_.ico';
import smarthomelogo from './image/iconhome.ico';

const HomeAutomation = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-theme') {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem('theme', 'dark-theme');
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem('theme', '');
    }
  };
 
  return (
    <>
      <section className="home" id="home">
        <nav>
          <div className="logo">
            <img src={smarthomelogo} alt="Smart Home Logo" className="logo-icon" />
            Smart Home
          </div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Services">Services</a></li>
            <li><a href="/About">About</a></li>
          </ul>
          <img
            src={darkMode ? sunIcon : moonIcon}
            id="icon"
            alt="Theme Toggle Icon"
            onClick={toggleDarkMode}
          />
          <a href="/login" className="btn">Log in</a>
        </nav>

        <div className="main-container">
          <div className="container-text">
            <h2>Your home, your control</h2>
            <h1>Imagine a home that meets all your needs</h1>
            <h4>
              With our smart home solution, your comfort, security, and well-being are 
              within reach. Manage your devices, save energy, and secure your space, no 
              matter where you are. Discover a new way of living, connected and simplified.
            </h4>
          </div>
          <div className="container-images">
            <img 
              src={homeAutomationImage} 
              alt="Home Automation" 
              className="shape" 
            />
          </div>
        </div>
      </section>
      <div className="Separator"></div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ABOUT</h3>
            <ul>
              <li>
                <a href="mailto:info@smarthome.dz">
                  <img src={FaEnvelope} alt="Email Icon" className="footer-icon" /> info@smarthome.dz
                </a>
              </li>
              <li>
                <a href="tel:+21323XXXXXX">
                  <img src={FaPhoneAlt} alt="Phone Icon" className="footer-icon" /> 023 XX XX XX
                </a>
              </li>
              <li>
                <span>
                  <img src={FaMapMarkerAlt} alt="Location Icon" className="footer-icon" /> Alger, Algérie
                </span>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>OUR SERVICES</h3>
            <ul>
              <li><a href="/Surveillance">Live video access</a></li>
              <li><a href="/Alert">Alert notifications</a></li>
              <li><a href="/Hstory">Intrusion history</a></li>
              <li><a href="/Temperature">Temperature</a></li>
              <li><a href="/Lighting">Lighting</a></li>
              <li><a href="/Door">The door</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>FOLLOW US</h3>
            <div className="social-links">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src={x} alt="Twitter" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="Instagram" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={fb} alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Smart Home. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default HomeAutomation;