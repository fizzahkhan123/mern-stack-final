//import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
//import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function NativeBar() {
  return (
    <Navbar bg="light" expand="lg">
            <Container>
                <Link className='navbar-brand' to="/">FK FOOD DIARY</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to="/">Home</Link>
                        <Link className='nav-link' to="/products">Products</Link>
                        <Link className='nav-link' to="/login">Login</Link>
                        <Link className='ms-4 btn btn-dark' to="/signup">SignUp</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

export default NativeBar;
