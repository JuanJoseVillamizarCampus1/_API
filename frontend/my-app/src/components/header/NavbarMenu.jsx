// NavbarMenu.js
import React from 'react';
import NavbarItem from './NavbarItem';
import  {Link}  from 'react-router-dom';

const NavbarMenu = ({ isOpen }) => {
  return (
    <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
      <Link to='/'><NavbarItem text="Inicio" /></Link>
      <Link to='/login'><NavbarItem text="Iniciar sesion" /></Link>
      <Link to='/registro'><NavbarItem text="Registrate" /></Link>
      <Link to='/denuncia-anonima'><NavbarItem text="Realizar denuncia nonima" /></Link>
    </ul>
  );
};

export default NavbarMenu;
