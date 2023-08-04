import React from 'react';
import { Link } from 'react-router-dom';


const Contact = () => {
    return (
        <div>
            <nav className="fade-in">
                <ul className="navigation-bar">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <main className="fade-in">
                <section className="contact-us">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or inquiries, please feel free to reach out to us using the contact information below:</p>
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p><a href="mailto:info@medbridge.com">info@medbridge.com</a></p>
                        </div>
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p>+1 (123) 456-7890</p>
                        </div>
                    </div>
                    <h3>Send us a message</h3>
                    <form id="contact-form" action="#" method="post">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </section>
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

export default Contact;
