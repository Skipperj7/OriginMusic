import { Container, Row, Col, Nav, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SmallMusicBox from './SmallMusicBox';

let maxBoxesInRow = 5;

function RowOfMusicBoxes(props) {

    return (
      <div className="RowOfMusicBoxes">
      <p>IMHERE</p>
      <Container>
        <Row md ={maxBoxesInRow}>
        {/* placeholder boxes - need a variable amount of components */}
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          <Col><SmallMusicBox /></Col>
          
        </Row>
      </Container>
      
      </div>
    );
  }
  
  export default RowOfMusicBoxes;