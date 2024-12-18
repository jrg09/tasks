import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const TaskNavbar = ({ types }) => {
  console.log({ types });

  return (
    <>
      <div className="container py-2 mt-1">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-8">
            <Navbar expand="md" className="navbar-dark bg-info rounded">
              <Container>
                <Navbar.Brand>jrg tasks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-nav-bar" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    {types.map((type) => (
                      <Nav.Link key={type} href={`#${type}`}>
                        {type}
                      </Nav.Link>
                    ))}
                  </Nav>
                  <Nav.Link href="#link" className="justify-content-end text-light">
                    @jorge
                  </Nav.Link>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
};
