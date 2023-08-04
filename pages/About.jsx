import React from 'react'
import { Link } from 'react-router-dom'
import img1 from "../assets/nasser.jpg";
import img2 from "../assets/yulduz1.jpg";
import img3 from "../assets/prakhar.jpg";
const About = () => {
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
        <main class="fade-in">
    {/* <!-- About Us section --> */}
    <section class="about-us">
        <h2>About Us</h2>
        <p>
            Welcome to MediBridge, a platform revolutionizing the patient-doctor connection in the healthcare industry.
        </p>
        <p>
            We are a passionate team of three individuals who came together for the Web3 BUILD Hackathon Hosted in Partnership With NEAR Horizon. Our diverse backgrounds and expertise complement each other as we work towards revolutionizing the patient-doctor connection in the healthcare industry. Allow us to introduce ourselves:
        </p>
        <div class="team">
            <div class="member">
                <img src={img1} alt="Tarek Elsayed" />
                <h3>Tarek Elsayed</h3>
                <p>Tarek is the one behind our smart contract and tests, ensuring the security and efficiency of our platform.</p>
                <p>From: Egypt</p>
            </div>
            <div class="member">
                <img src={img2} alt="Yulduz Muradova" />
                <h3>Yulduz Muradova</h3>
                <p>Yulduz is the creative force behind our user-friendly frontend, enhancing the user experience and accessibility of our platform.</p>
                <p>From: United States of America</p>
            </div>
            <div class="member">
                <img src={img3} alt="Prakhar Ojha" />
                <h3>Prakhar Ojha</h3>
                <p>Prakhar is a multi-talented developer who played a crucial role in both the smart contract development and frontend implementation, ensuring a cohesive and robust platform experience.</p>
                <p>From: India</p>
            </div>
        </div>
        <section class="vision">
            <div class="vision-content">
                <h3>Our Vision</h3>
                <p>
                    At our core, we believe in leveraging technology to create positive change in the healthcare industry. Our vision is to bridge the gap between patients and doctors, empowering individuals to take control of their health information and streamline the healthcare journey. We envision a future where patients have seamless access to their medical records, can easily schedule appointments with trusted doctors, and have the ability to securely share their data with other healthcare professionals.
                </p>
            </div>
        </section>

    </section>
</main>
<footer className="fade-in">
        <ul className="footer-links">
          <li>
            <Link to="terms.html">Terms of Service</Link>
          </li>
          <li>
            <Link to="privacy.html">Privacy Policy</Link>
          </li>
          <li>
            <Link to="about.html">About Us</Link>
          </li>
          <li>
            <Link to="contact.html">Contact Us</Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default About