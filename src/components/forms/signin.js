import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';

class SignInForm extends React.Component {
    render() {
        return(
            <Form inline onSubmit={this.signIn.bind(this)}>
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} />
                </FormGroup>{' '}
                <FormGroup controlId="formInlinePassword">
                    <ControlLabel>Password</ControlLabel>{' '}
                    <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref}/>{' '}
                    <Button type="submit">Sign In</Button>
                </FormGroup>
            </Form>
        );
    }

    
    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        var email = this.email.value;
        var password = this.password.value;
        axios.get('http://api.icndb.com/jokes/random').then(res => console.log(res.data.value.joke)).catch(err => console.log(err));
    }
}

export default SignInForm;