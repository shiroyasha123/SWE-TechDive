import React from 'react'
import {Navbar, Nav,} from 'react-bootstrap'

export  const Header = () => {
  return (
    <Navbar
        collapseOnSelect
        // bg="info"
        variant="dark"
        expand="md"
        id="nav"
    >
    <Navbar.Brand className="logo">
        IDRC
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            <Nav.Link href="/exams">Exams</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
    </Navbar.Collapse>
        
    </Navbar>
  )
}

export default Header