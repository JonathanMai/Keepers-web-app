import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';

const url = 'https://keepers-server-develop-features.eu-gb.mybluemix.net/keeper-server/users/login';

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
        axios.post(url,{
            'email': 'vin100@vin100.com',
            'password': '123456', 
            'deviceId': '183ec23d93215f65'
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    }
}

export default SignInForm;