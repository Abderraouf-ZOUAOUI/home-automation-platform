import React, { useState, useEffect } from 'react';
import './Services.css';

// Importation des images
import moonIcon from './image/moon-night-astronomy-nature-moon-phase-sleep_81483.png';
import securityCameraIcon from './imagesec/SecurityCamera_icon-icons.com_55219.png';
import alertIcon from './imagesec/alert_icon-icons.com_66469.png';
import pastIcon from './imagesec/Past_icon-icons.com_55841.png';
import thermometerIcon from './imagesec/thermometer-1_icon-icons.com_62244.png';
import lampIcon from './imagesec/lamp_icon-icons.com_60657.png';
import doorIcon from './imagesec/627door_100573.png';
import sunIcon from './image/sun_icon-icons.com_61830.png';
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'
import smarthomelogo from './image/iconhome.ico';

function Services() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Vérifie le thème précédent dans le localStorage au chargement du composant
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-theme') {
          setDarkMode(true);
        }
    }, []);

    // Bascule entre les thèmes clair et sombre
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

    // Fonction pour basculer l'affichage d'une section
    const toggleDemo = (section: string) => {
        if (activeSection === section) {
            setActiveSection(null); // Cache la section si elle est déjà ouverte
        } else {
            setActiveSection(section); // Affiche la section
        }
    };
    
    return (
        <div className="Services">
            <nav>
            <div className="logo">
            <img src={smarthomelogo} alt="Smart Home Logo" className="logo-icon" />
            Services
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

            <div className="contentt">
                <div className="section button-link">
                    <a href="/Surveillance" className="link-section" onClick={() => toggleDemo('video-demo')}>
                        <img src={securityCameraIcon} alt="Live video access" />
                        <h2>Live video access</h2>
                    </a>
                    {activeSection === 'video-demo' && (
                        <div id="video-demo" className="demo-content">
                            Direct video access allows you to monitor your home's security cameras in real time through a secure and user-friendly interface.
                        </div>
                    )}
                </div>
                <div className="Separator"></div>

                <div className="section button-link">
                    <a href="/Alert" className="link-section" onClick={() => toggleDemo('alert-demo')}>
                        <img src={alertIcon} alt="Alert notifications" />
                        <h2>Alert notifications</h2>
                    </a>
                    {activeSection === 'alert-demo' && (
                        <div id="alert-demo" className="demo-content">
                            Alert notifications instantly notify you of any intrusion or suspicious activity detected within your home.
                        </div>
                    )}
                </div>
                <div className="Separator"></div>

                <div className="section button-link">
                    <a href="/Hstory" className="link-section" onClick={() => toggleDemo('history-demo')}>
                        <img src={pastIcon} alt="Intrusion history" />
                        <h2>Intrusion history</h2>
                    </a>
                    {activeSection === 'history-demo' && (
                        <div id="history-demo" className="demo-content">
                            Intrusion history gives you the ability to review and analyze past events, enhancing the overall security of your home.
                        </div>
                    )}
                </div>
                <div className="Separator"></div>

                <div className="section button-link">
                    <a href="/Temperature" className="link-section" onClick={() => toggleDemo('temp-demo')}>
                        <img src={thermometerIcon} alt="Temperature" />
                        <h2>Temperature</h2>
                    </a>
                    {activeSection === 'temp-demo' && (
                        <div id="temp-demo" className="demo-content">
                            The temperature monitoring system lets you track temperature changes in real time and receive alerts in case of any irregularities.
                        </div>
                    )}
                </div>
                <div className="Separator"></div>

                <div className="section button-link">
                    <a href="/Lighting" className="link-section" onClick={() => toggleDemo('light-demo')}>
                        <img src={lampIcon} alt="Lighting" />
                        <h2>Lighting</h2>
                    </a>
                    {activeSection === 'light-demo' && (
                        <div id="light-demo" className="demo-content">
                            Lighting control enables you to adjust your home's lighting remotely, setting the perfect ambiance while optimizing energy efficiency.
                        </div>
                    )}
                </div>
                <div className="Separator"></div>

                <div className="section button-link">
                    <a href="/Door" className="link-section" onClick={() => toggleDemo('port-demo')}>
                        <img src={doorIcon} alt="The door" />
                        <h2>The door</h2>
                    </a>
                    {activeSection === 'port-demo' && (
                        <div id="port-demo" className="demo-content">
                            Door control allows you to lock or unlock your door remotely, providing both security and convenience for your home.
                        </div>
                    )}
                </div>
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

      
        </div>
    );
}

export default Services;