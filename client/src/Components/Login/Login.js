import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import './Login.css';

class  Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit(event) {
        // send data to server and authenticate
        
        event.preventDefault();
      }

    render(){

        // copied from react-bootstrap page examples
        // slightly changed some css and centered it
        return (
            <div className='loginContainer'>
            <h3>Please login</h3>
            <Container className='loginContainer' fluid>
            <div>
            <Form className="loginForm" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleInputChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        </div>
        </Container>
        </div>
        );
        }
        };
export default Login;