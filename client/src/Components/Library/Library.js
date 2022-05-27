import { Container, Row, Col, Nav, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Library.css'


function Library() {

    return (
      <div className="Library">
      <Container fluid>
      <div className="libraryButtonGroup">
      <ButtonGroup>
        <Button class="bg-transparent" variant="link">Overview</Button>
        <Button class="bg-transparent" variant="link">Likes</Button>
        <Button class="bg-transparent" variant="link">Playlists</Button>
        <Button class="bg-transparent" variant="link">Following</Button>
      </ButtonGroup>
      </div>
    </Container>
      </div>
    );
  }
  
  export default Library;