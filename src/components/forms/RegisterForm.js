import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';


class RegisterForm extends React.Component {
    render() {
        return (
        <div>
        <Form onSubmit={event => this.register(event)}>
            <FormGroup controlId="formInlineName">
                <ControlLabel>Parent's Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Parent's Name" />
            </FormGroup>{' '}
            <FormGroup controlId="formInlineEmail">
                <ControlLabel>Email</ControlLabel>{' '}
                <FormControl type="email" placeholder="Email" />
            </FormGroup>{' '}
            <FormGroup controlId="formInlinePassword" >
                <ControlLabel>Password</ControlLabel>{' '}
                <FormControl type="password" placeholder="Password" />{' '}
                <Button type="submit">Sign Up</Button>
            </FormGroup>
        </Form>
    </div>);
    }

    register(event) {
        event.preventDefault(); // cancel auto refresh.
        console.log("register");
    }
}

export default RegisterForm