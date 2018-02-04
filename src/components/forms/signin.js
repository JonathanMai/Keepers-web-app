import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';

const url = 'https://keepers-server-develop-features.eu-gb.mybluemix.net/keeper-server/users/login';

class SignInForm extends React.Component {
    constructor() {
        super();
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
            <Modal
            show={true}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Contained Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
              ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
            </div>
        );
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
        .then(res => console.log(res))  // todo:redirect
        .catch(error => {
            if(error.response.data.message === 'Email does not exists') {

            } else if(error.response.data.message === 'Password does not match') {
                this.setState({
                    validPassword: "error"
                });
            }
        });

    }
}

export default SignInForm;