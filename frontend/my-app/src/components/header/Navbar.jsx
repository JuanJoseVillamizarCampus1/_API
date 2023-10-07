import React, { useState, useEffect } from "react";
import NavbarMenu from "./NavbarMenu";
import logo from "../../assets/images/logo.png";
import "./Nav.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 890);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 890);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-containers">
        <img className="logo-img"
          src={logo}
          alt="Logo"
         
        />
        <h1 className="logo-text">Delitos BGA</h1>
      </div>
      {isMobile ? (
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
      ) : (
        <NavbarMenu />
      )}
      {isMobile && <NavbarMenu isOpen={isOpen} />}
    </nav>
  );
};

export default Navbar;
