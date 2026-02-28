import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll'

export default function Sidebar() {

    return <>
        <NavBar />
        <Hamburger />
    </>
}




function NavBar() {
    // const sidebar = document.querySelector('.sidebar');
    // const toggle = document.querySelector('.sidebar .toggle');
    const navItems = ["Home", "Portfolio", "My Story", "Skills", "Contact Me"]; // replace with your own navItems
    const navIcons = ["home", "briefcase-alt-2", "user-pin", "terminal", "megaphone"]
    const navTo = ["hero", "portfolio", "story", "skills", "contact"]



    const [navOpen, setNavOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(0);

    const navToggle = () => {
        setNavOpen(!navOpen)
    };

    const handleNavItemClick = (index) => {
        setActiveNavItem(index);
        setNavOpen(false)
    };

    const handleChange = (e) => {
        e.preventDefault();
        window.open("https://drive.google.com/file/d/18Gi4ziyn0FeqggcuEW7wtNNRIenltbJT/view?usp=drive_link", '_blank');
    };


    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;

            if (currentPosition > 0 && currentPosition < 600) {
                setActiveNavItem(0)
            } else if (currentPosition > 600 && currentPosition < 1200) {
                setActiveNavItem(1)
            } else if (currentPosition > 1200 && currentPosition < 2000) {
                setActiveNavItem(2)
            } else if (currentPosition > 2000 && currentPosition < 3000) {
                setActiveNavItem(3)
            } else if (currentPosition > 3000 && currentPosition < 3800) {
                setActiveNavItem(4)
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) { // Change 768 to your desired breakpoint
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return isVisible ? <>
        <div className={navOpen ? 'sidebar open' : 'sidebar'}>
            <div className="logo">
                <img src="./img/logo.png" alt="logo" />
                <h3>Dong Han</h3>
            </div>
            <nav>
                <div onClick={navToggle} className="toggle">
                    <i className='bx bx-chevrons-right'></i>
                    <span>Show less</span>
                </div>
                <div className="nav-title">Content</div>
                <ul>
                    {navItems.map((item, index) => (

                        <Link key={index} to={`${navTo[index]}`} spy={true} smooth={true} offset={-10} duration={500} >
                            <li
                                key={index}
                                className={`nav-item ${activeNavItem === index ? "active" : ""}`}
                                onClick={() => handleNavItemClick(index)}
                            >

                                <i className={`bx bxs-${navIcons[index]}`}></i>
                                <span >{item}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="nav-title">Resume</div>
                <ul>
                    <li onClick={handleChange} className="nav-item resume-back">
                        <i className='bx bxs-download' ></i>
                        <span className="second-set-nav" >Download Resume</span>
                        {/* <i className='bx bxs-download' ></i> */}
                    </li>
                </ul>
            </nav>
        </div>
    </> : null;
}

function Hamburger() {
    const [isHamburger, setHamburger] = useState(false);
    const navItems = ["Home", "Portfolio", "My Story", "Skills", "Contact Me"];
    const navTo = ["hero", "portfolio", "story", "skills", "contact"];
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        document.body.classList.toggle("no-scroll", event.target.checked);
    };

    const navlistClicked = (event) => {
        setIsChecked(false);
        document.body.classList.toggle("no-scroll", event.target.checked);
    };

    const handleChange = (e) => {
        e.preventDefault();
        window.open("http://donghan.co/Resume.pdf", '_blank');
    };


    useEffect(() => {
        function hamburgerAppear() {
            if (window.innerWidth < 768) {
                setHamburger(true);
            } else {
                setHamburger(false);
            }
        }

        hamburgerAppear();
        window.addEventListener('resize', hamburgerAppear);
        return () => window.removeEventListener('resize', hamburgerAppear);
    }, []);

    return isHamburger ? (
        <div className="hamburger">
            <input
                className="menu-icon"
                type="checkbox"
                id="menu-icon"
                name="menu-icon"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label className="x-hamburger" htmlFor="menu-icon"></label>
            <nav className="nav">
                <ul className="pt-5">
                    {navItems.map((item, index) => (
                        <li key={index} onClick={navlistClicked}>
                            <a href={`#${navTo[index]}`}>{item}</a>
                        </li>
                    ))}

                    <li>
                        <a onClick={handleChange}>Resume</a>
                    </li>
                </ul>
            </nav>
        </div>
    ) : null;
}
