import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import RegisterModal from './RegisterModal'

const url = 'https://keepers-server-develop-features.eu-gb.mybluemix.net/keeper-server/users/login';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validPassword: null
        };
    }
    render() {
        return(
            <div>
                <Form onSubmit={this.signIn.bind(this)}>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>Email</ControlLabel>{' '}
                        <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlinePassword" validationState={this.state.validPassword}>
                        <ControlLabel>Password</ControlLabel>{' '}
                        <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref} />{' '}
                        <Button type="submit">Sign In</Button>
                    </FormGroup>
                </Form>
                <RegisterModal ref={ instance => {
                     this.child = instance;
                }} register={this.register.bind(this)}/>
            </div>
        );
    }

    register() {
        this.props.history.push("/register");
    }

    
    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        var email = this.email.value;
        var password = this.password.value;
        axios.post(url,{
            'email': 'vin100@vin100.co',
            'password': '123456', 
            'deviceId': '183ec23d93215f65'
        })
        .then(res => {
            console.log(res);
        })  // todo:redirect
        .catch(error => {
            if(error.response.data.message === 'Email does not exists') {
                this.child.showModal();
            } else if(error.response.data.message === 'Password does not match') {
                this.setState({
                    validPassword: "error"
                });
            }
        });
    }
}

export default SignInForm;