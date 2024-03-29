import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';

export default function Header() {
    const activeStyle = {
        color: '#8B8C89',
        textDecoration: 'none',
    };
    const brandStyle = {
        color: '#C52233',
        fontFamily: "'Playball', cursive",
        fontSize: '50px',
        textAlign: 'center',
    };
    return (
        <Navbar expand="lg" sticky="top">
            <Container fluid className="flex-column">
                <Row>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Nav.Link
                                as={NavLink}
                                className="nav-link"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                to="/"
                            >
                                Trang chủ
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                className="nav-link"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                to="about"
                            >
                                Thông tin nhà hàng
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                className="nav-link"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                to="menu"
                            >
                                Thực đơn
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                className="nav-link"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                to="contact"
                            >
                                Liên hệ
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Row>
                <Row>
                    <Navbar.Text href="/" style={brandStyle} className="noselect">
                        Nhà hàng Thuận Phát
                    </Navbar.Text>
                </Row>
            </Container>
        </Navbar>
    );
}