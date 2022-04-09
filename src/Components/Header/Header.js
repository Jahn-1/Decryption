import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const navigate = useNavigate()
    return (
        <>
            <div className="navbar">
                <div className="navbar-title" onClick={() => {navigate('/')}}>
                    Cryptology
                </div>
                {/* <div className="navbar-links">
                    <a href="#about-section" className="navbar-link">
                        About
                    </a>
                    <a href="#projects-section" className="navbar-link">
                        Projects
                    </a>
                    <a href="#contact-me-section" className="navbar-link">
                        Contact Me
                    </a>
                </div> */}
            </div>

        </>
    )
}
