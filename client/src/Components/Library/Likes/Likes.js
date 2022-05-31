import { Container, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Likes.css'
import RowOfMusicBoxes from '../../Music/RowOfMusicBoxes';


function Likes() {

    return (
      <div className="Library">
      <Container fluid>
      <div className="libraryButtonGroup">
      <ButtonGroup>
          <div className="libraryButton">
        <Button class="bg-transparent " href="/library/overview" variant="link">Overview</Button>
          </div>

              <div className="libraryButtonSelected">
          <Button class="bg-transparent " href="/library/likes" variant="link">Likes</Button>
              </div>
          <div className="libraryButton">
        <Button class="bg-transparent " href="/library/playlists" variant="link">Playlists</Button>
        <Button class="bg-transparent " href="/library/following" variant="link">Following</Button>
          </div>
      </ButtonGroup>
      </div>
    </Container>
    <hr style={{ width: "100%"}} />
    <RowOfMusicBoxes />
      </div>
    );
  }
  
  export default Likes;