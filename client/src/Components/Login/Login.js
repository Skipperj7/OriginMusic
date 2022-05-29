import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import './Login.css';
import { AuthContext } from '../../App.js';

class  Login extends React.Component {
    constructor(props) {
        super(props);
        // initialize username and password so form is controlled
        this.state = 
        {
            username: '', 
            password: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
      }
    
      // neat trick to handle all changes to both forms
      // from React tutorial on forms
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleFormSubmit(event) {
        event.preventDefault();
        // send data to server and authenticate here
        // TODO

        // dispatch() from AuthContext with auth token from response
        // TODO
      }

    render(){
        // mostly copied from react-bootstrap page examples
        // https://react-bootstrap.github.io/forms/overview/
        // slightly changed some css and centered it
        return (
            <div className='loginContainer'>
            <h3>Please login</h3>
            <Container className='loginContainer' fluid>
            <div>
            <Form className="loginForm" onSubmit={this.handleFormSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleInputChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
        </Form.Group>
        <Button variant="secondary" type="submit">
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