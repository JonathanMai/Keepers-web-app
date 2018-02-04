import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

class SignInForm extends React.Component {
    render() {
        return(
            <Form inline onSubmit={this.signIn.bind(this)}>
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="Email" ref="email" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlinePassword">
                    <ControlLabel>Password</ControlLabel>{' '}
                    <FormControl type="password" placeholder="Password" ref="password"/>{' '}
                    <Button type="submit">Sign In</Button>
                </FormGroup>
            </Form>
        );
    }

    
    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        console.log(this.refs);
    }
}

export default SignInForm;