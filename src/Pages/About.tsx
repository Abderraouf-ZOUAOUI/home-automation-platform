import React, { useState, useEffect } from 'react';
import './about.css';
import bouMeIk from "./image/bou_m_ik.png";
import mehdi from "./image/image_mehdi.png";
import rezakNesrine from "./image/bou_m_ik.png";
import saidi from "./image/raouf_saidi.png";
import medkourFatema from "./image/ikram.jpg";
import zeouaoui from "./image/raouf_v3.jpg";
import yassmine from "./image/yasmine_fin.jpg";
import assim from "./image/assim_fin.jpg";
import rym from "./image/ryma_fin.jpeg";
import moonIcon from './image/moon-night-astronomy-nature-moon-phase-sleep_81483.png';
import sunIcon from './image/sun_icon-icons.com_61830.png';
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'
import smarthomelogo from './image/iconhome.ico';

const About = () => {
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

  const teamMembers = [
    { image: bouMeIk, name: 'Ikrame BOUMECHTA', role: 'Expert in Communication Protocols' },
    { image: mehdi, name: 'Mehdi Khaled ARIGUE', role: 'Développeur Full Stack' },
    { image: medkourFatema, name: 'FatmaEl zohra MEDKOUR', role: 'Développeuse Frontend' },
    { image: saidi, name: 'Abd el Raouf SAIDI', role: 'Expert IoT' },
    { image: rezakNesrine, name: 'Nesrine REZAK', role: 'Développeuse Frontend' },
    { image: assim, name: 'Assim HAMAIDIn', role: 'Développeur Full Stack' },
    { image: yassmine, name: 'Yasmine RID', role: 'Développeuse Frontend' },
    { image: zeouaoui, name: 'Abderraouf ZOUAOUI', role: 'Développeur Frontend' },
    { image: rym, name: 'Ryma BELKHOJA', role: 'Ingénieuse en RT' },
  ];

  return (
    <>
       <nav>
       <div className="logo">
            <img src={smarthomelogo} alt="Smart Home Logo" className="logo-icon" />
            ABOUT
          </div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/Services">Services</a></li>
                    <li><a href="/About">About</a></li>
                </ul>
                {/* Affiche l'icône en fonction du mode sombre ou clair */}
                <img
                    src={darkMode ? sunIcon : moonIcon}
                    id="icon"
                    alt="Theme Toggle Icon"
                    onClick={toggleDarkMode}
                />
                <a href="/login" className="btn">Log in</a>
            </nav>

      <header className="team-header">
        <h1 className="title">Our Team</h1>
        <p className="description">
          Our passionate team combines technical expertise and innovation to transform your home into a smart connected space. Each member brings their unique skills to create tailor-made solutions.
        </p>
        <p className="description">
          Together, we work to make your home more comfortable, secure and energy efficient with the latest smart home technologies.
        </p>
      </header>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="profile-img" />
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
          </div>
        ))}
      </div>
      <div className="Separator"></div>

    <footer className="footer">
  <div className="footer-content">
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
    {/* Autres sections du footer */}
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

export default About;
