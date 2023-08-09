import React from "react";
import "../assets/global.css";
import services1 from "../assets/services1.png";
import services2 from "../assets/services2.png";
import services3 from "../assets/services3.png";
import logo from "../assets/MediBridge_logo.png";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const showFeatureServices = (event) => {
    const service = event.target.closest(".service");
    if (service) {
      const serviceContent = service.querySelector(".service-content");
      if (serviceContent) {
        serviceContent.classNameList.toggle("show");
      }
    }
  };
  return (
    <div>
      <nav className="fade-in">
        <ul className="navigation-bar">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="logo">
        <Link to="index.html">
          <img src={logo} alt="MedBridge Logo" />
        </Link>
      </div>
      <div className="user-authentication fade-in">
        {/* <!-- Show login or account-related links here --> */}
        <div className="login-signup">
          <Link to={'patient/dashboard'}>Login as a Patient</Link>
        </div>
        {/* <!-- Display user name or profile picture here after authentication --> */}
        {/* <!-- User dropdown menu for account settings and logout --> */}
      </div>
      <main className="fade-in">
        {/* <!-- Hero section --> */}
        <section className="hero">
          <h1>Welcome to MedBridge - The Future of Decentralized Care</h1>
          {/* <!-- Add more content and features as needed --> */}
        </section>
        {/* <!-- Featured services or benefits section --> */}
        {/* Featured services or benefits section */}
        <div className="features-container">
          <div className="feature">
            <div className="feature-content">
              <h2>Secure Payment</h2>
              <p>At MediBridge, we leverage the transformative power of Near blockchain technology to take your health data protection to the next level. Our platform ensures that your valuable health information stays tamper-proof, fortified with robust encryption, and protected like never before.</p>
            </div>
            <div className="feature-image">
              <img src={services1} alt="Service 1" />
            </div>
          </div>
          <div className="feature">
            <div className="feature-content">
              <h2>Electronic Health Records</h2>
              <p>Access and manage your health records securely online, anytime, anywhere.Our intuitive and easy-to-navigate platform puts you in control of your health data, making it effortless to manage and share with healthcare providers and researchers.</p>
            </div>
            <div className="feature-image">
              <img src={services2} alt="Service 2" />
            </div>
          </div>
          <div className="feature">
            <div className="feature-content">
              <h2>Empowering Medical Research</h2>
              <p>Join a global community committed to advancing medical knowledge. By sharing your health data, you become an integral part of groundbreaking research that benefits all of humanity.</p>
            </div>
            <div className="feature-image">
              <img src={services3} alt="Service 3" />
            </div>
          </div>
        </div>
      </main>
      <footer className="fade-in">
        <ul className="footer-links">
        <li>
            <Link to={"/"}>Terms of Service</Link>
          </li>
          <li>
            <Link to={"/"}>Privacy Policy</Link>
          </li>
          <li>
            <Link to={"/about"}>About Us</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact Us</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default LandingPage;
