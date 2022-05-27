import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function MainNavbar() {

    // mostly copied and then inspired from https://react-bootstrap.github.io/components/navbar/
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/library">Library</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        {/* MyProfile deserves its own component */}
        <NavDropdown title="MyProfile" id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile/home">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/profile/likes">Likes</NavDropdown.Item>
          <NavDropdown.Item href="/profile/playlists">Playlists</NavDropdown.Item>
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}

export default MainNavbar;
