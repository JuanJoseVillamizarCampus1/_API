/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import logo from '../../assets/images/logo-1.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    /*--------------------------------------------------------------------------------*/
    /*To open NAVBAR in MOBILE VIEW                                                   */
    /*--------------------------------------------------------------------------------*/

    return (
        <div className="topbar" id="top">
            <div className="encabezado">
                <Container className="po-relative">
                    <Navbar className="navbar-expand-lg h6-nav-bar bg-dark" >
                        <NavbarBrand href="/"><img src={logo} width="60" height="60" alt="Logo"/> </NavbarBrand>
                        <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                        <Collapse isOpen={isOpen} navbar className="hover-dropdown font-14 justify-content-end" id="h6-info">
                            <Nav navbar className="ms-auto">
                                <NavItem>
                                    <Link className="nav-link text-light" to={"/login"}>
                                    Iniciar Sesión
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link text-light" to={"/registro"}>
                                    Registrarse
                                    </Link>
                                </NavItem>
                            </Nav>
                            <div className="act-buttons">
                                <Link to="/denuncia-anonima" className="btn btn-success-gradiant font-14 text-light">Hacer denuncia anonima</Link>
                            </div>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    );

}
export default Header;
