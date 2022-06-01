import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import React,{Component} from 'react';

function MainNavbar() {
  const [val, setVal] = React.useState("")
    // mostly copied and then inspired from 
    // https://react-bootstrap.github.io/components/navbar/
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
          <Nav.Link href="/library/likes">Library</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Button variant="outline-success" href={"/searchByAudio/"}>Audio</Button>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={val}
            onChange={e => setVal( e.target.value )}
          />
          <Button variant="outline-success" href={"/search/"+val}>Search</Button>
        </Form>
        {/* MyProfile deserves its own component */}
        <NavDropdown title="MyProfile" id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile/home">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/library/likes">Likes</NavDropdown.Item>
          <NavDropdown.Item href="/library/playlists">Playlists</NavDropdown.Item>
          <NavDropdown.Item href="/library/following">Following</NavDropdown.Item>
          <NavDropdown.Item href="/upload">Upload</NavDropdown.Item>
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}

export default MainNavbar;
