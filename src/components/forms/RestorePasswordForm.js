import React, { Component } from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl , Grid} from 'react-bootstrap';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import '../../styles/reset_password.css';



export class EnterEmailForm extends Component {

    constructor(props) {
        super(props);

        this.isValidEmail = this.isValidEmail.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.enableButton = this.enableButton.bind(this);

        this.state = {
            email: "",
            disableButton: true
        }
    }

    isValidEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "" || !re.test(email))
            return false;
        return true;
    }

    getValidationMessages(){
        return "Invalid email address";
    }

    enableButton(input) {
        let emailIsValid = this.isValidEmail(input);

        if(this.state.disableButton && emailIsValid){
            return false;
        }
        else if(!this.state.disableButton && !emailIsValid){
            return true;
        }
        return this.state.disableButton;
    }

    handleEmail(email){
        this.setState({
        ...this.state,
          email: email,
          disableButton: this.enableButton(email)
        });
    }

    sendCode(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        // if
        this.props.submit(this.state.email);
    }

    render() {
        return(
            <Grid className="reset_password_container">
                <p className="forgot_pass_text">Forgot your password? don't worry, just enter your email address below and we'll send you some instructions.</p>
                <Form onSubmit={this.sendCode.bind(this)}>
                    <FloatingLabelInput type={"email"} labelName={"ENTER YOUR EMAIL ADDRESS"} 
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        isValid={this.isValidEmail(this.state.email)} 
                        errorMessage={this.getValidationMessages()} />
                        <Button type="submit" disabled={this.state.disableButton} style={{marginTop: 10}}>Send Restart Code</Button>
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
            email: "",
            code: "",
            password: "",
            disableButton: true
        }
    }

    isValidEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "" || !re.test(email))
            return false;
        return true;
    }

    isValidPassword(password){
        if(password.length < 6 || password.length > 15)
            return false;

        return true;
    }

    getValidationMessages(key){
        switch(key) {
            case "EMAIL":
               return "Invalid email address";
            case "CODE":
               return "Enter code";
            case "PASSWORD":
                return "Your password must be between 6 and 15 characters length";
        }
    }

    enableButton(type, input) {
        let emailIsValid, codeIsValid, passwordIsValid;
        console.log(this.state)
        console.log(this.state.code === "")

        switch(type){
            case 'email':
                emailIsValid = this.isValidEmail(input);
                codeIsValid = this.state.code;
                passwordIsValid = this.isValidPassword(this.state.password);
                break;
            case 'code':
                emailIsValid = this.isValidEmail(this.state.email);
                codeIsValid = input;
                passwordIsValid = this.isValidPassword(this.state.password);
                break;
            case 'password':
                emailIsValid = this.isValidEmail(this.state.email);
                codeIsValid = this.state.code;
                passwordIsValid = this.isValidPassword(input);
                break;
            default:
                emailIsValid = this.isValidEmail(this.state.email);
                codeIsValid = this.state.code;
                passwordIsValid = this.isValidPassword(this.state.password);
        } 
        if(this.state.disableButton && emailIsValid && codeIsValid !== "" && passwordIsValid){
            return false;
        }
        else if(!this.state.disableButton  && (!emailIsValid || !passwordIsValid || codeIsValid === "")){
            return true;
        }
        return this.state.disableButton;
    }
    
    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            disableButton: this.enableButton('email', email)
        });
    }

    handleCode(code){
        this.setState({
            ...this.state,
            code: code,
            disableButton: this.enableButton('code', code)
        });
    }


    handlePassword(password){ 
        this.setState({
            ...this.state,
            password: password,
            disableButton: this.enableButton('password', password)
        });
    }

    restartPassword(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.props.submit(this.state.email, this.state.code, this.state.password);
    }

    render() {
        return(
            <Grid className="reset_password_container" >
                Password reset
                <Form onSubmit={this.restartPassword.bind(this)}>
                
                <FloatingLabelInput type={"code"} labelName={"PLEASE ENTER YOUR CODE"} 
                        onChange={(e) => {e.preventDefault();
                            this.handleCode(e.currentTarget.value)}}
                        name={"CODE"}
                        value={this.state.code} 
                        isValid={this.state.code !== ""} 
                        errorMessage={this.getValidationMessages('CODE')}/>

                    {' '}

                    <FloatingLabelInput type={"email"} labelName={"EMAIL ADDRESS"} 
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        isValid={this.isValidEmail(this.state.email)} 
                        errorMessage={this.getValidationMessages('EMAIL')} />
                   
                    {' '}

                    <FloatingLabelInput type={"password"} labelName={"NEW PASSWORD"} 
                        onChange={(e) => {e.preventDefault();this.handlePassword(e.currentTarget.value)}}
                        name={"PASSWORD"}
                        value={this.state.password} 
                        isValid={this.isValidPassword(this.state.password)} 
                        errorMessage={this.getValidationMessages('PASSWORD')}/>
                    <Button type="submit" disabled={this.state.disableButton} style={{marginTop: 10}}>Restart Password</Button>
                </Form>
            </Grid>
        );
    }
}