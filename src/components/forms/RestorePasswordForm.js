import React, { Component } from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl , Grid} from 'react-bootstrap';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import '../../styles/reset_password.css';



export class EnterEmailForm extends Component {

    constructor(props) {
        super(props);

        this.isValidEmail = this.isValidEmail.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.state = {
            email: ""
        }
    }

    isValidEmail(){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.email === "" || !re.test(this.state.email))
            return false;
        return true;
    }

    getValidationMessages(key){
        return "Invalid email address";
    }

    handleEmail(email){
        console.log(email);
        this.setState({
        ...this.state,
          email: email
        });
    }

    restartPassword(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        // if
        this.props.submit(this.email.value);
    }

    render() {
        return(
            <Grid className="reset_password_container">
                <p className="forgot_pass_text">Forgot your password? don't worry, just enter your email address below and we'll send you some instructions.</p>
                <Form onSubmit={this.restartPassword.bind(this)}>

                    {/* <FormGroup controlId="formInlineEmail"> */}
                    <FloatingLabelInput type={"email"} labelName={"Enter your email address"} 
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        isValid={this.isValidEmail('EMAIL')} 
                        errorMessage={this.getValidationMessages()} />
                        <Button type="submit" style={{marginTop: 10}}>Send Restart Code</Button>
                </Form>
            </Grid> 
        );
    }
}

export class RestoreForm extends Component {

    constructor(props) {
        super(props);

        this.isValidEmail = this.isValidEmail.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.state = {
            email: ""
        }
    }

    render() {
        return(
            <Grid className="reset_password_container" >
                Password reset
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.submit(this.email.value, this.password.value, this.code.value)}}>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>Email</ControlLabel>{' '}
                        <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} /> 
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlinePassword">
                        <ControlLabel>New Password</ControlLabel>{' '}
                        <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref} />
                    </FormGroup>
                    <FormGroup controlId="formInlineCode">
                        <ControlLabel>Code</ControlLabel>{' '}
                        <FormControl type="text" placeholder="Code" inputRef={ref => this.code = ref} />{' '}
                        <Button type="submit" style={{marginTop: 10}}>Restart Password</Button>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
}