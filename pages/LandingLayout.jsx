import React from "react";
import "../assets/global.css";
import services1 from "../assets/services1.png";
import services2 from "../assets/services2.png";
import services3 from "../assets/services2.png";
import logo from "../assets/MediBridge_logo.png";
import { Link } from "react-router-dom";
const LandingLayout = () => {
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
            <Link to="index.html">Home</Link>
          </li>
          <li>
            <Link to="about.html">About</Link>
          </li>
          <li>
            <Link to="contact.html">Contact</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
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

export default LandingLayout;
