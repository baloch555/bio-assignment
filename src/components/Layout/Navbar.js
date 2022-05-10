import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
const Header = () => {
  return (
    <div>
      <>
        <Navbar bg="primary" style={{ color: "white", overflow: "hidden" }}>
          {/* <Container className="border-bottom p-1"> */}
          <Navbar.Brand
            href="#home"
            className="fas fa-ankh text-danger"
            style={{ marginLeft: "10px" }}
          >
            <Link
              to="/"
              className="fas fa-science text-white"
              style={{
                listStyle: "none",
                textDecoration: "none",
                marginLeft: "10px",
                fontFamily: "Roboto",
                marginLeft: "10px",
              }}
            >
              {" "}
              {"Bio Science".toUpperCase()}
            </Link>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home" className="">
              <Link
                className="nav-item nav-link"
                exact
                to="/transcribe"
                style={{
                  textDecoration: "none",
                }}
              >
                Transcribe
              </Link>
            </Nav.Link>
            <Nav.Link href="#home" className="">
              <Link
                className="nav-item nav-link"
                exact
                to="/translate"
                style={{
                  textDecoration: "none",
                }}
              >
                Translate
              </Link>
            </Nav.Link>
            <Nav.Link href="#home" className="">
              <Link
                className="nav-item nav-link"
                exact
                to="/complement"
                style={{
                  textDecoration: "none",
                }}
              >
                Complement
              </Link>
            </Nav.Link>
            <Nav.Link href="#home" className="">
              <Link
                className="nav-item nav-link"
                exact
                to="/fasta"
                style={{
                  textDecoration: "none",
                }}
              >
                Fasta
              </Link>
            </Nav.Link>
            <Nav.Link href="#home" className="">
              <Link
                className="nav-item nav-link"
                exact
                to="/blast"
                style={{
                  textDecoration: "none",
                }}
              >
                Blast
              </Link>
            </Nav.Link>
          </Nav>
          {/* </Container> */}
        </Navbar>
      </>
    </div>
  );
};

export default Header;
