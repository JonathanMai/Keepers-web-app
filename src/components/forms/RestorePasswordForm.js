/*
    Form that holds all the logic of restart password, and all the fields.
*/

import React, { Component } from 'react';
import { Form, Button, Grid, Image} from 'react-bootstrap';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import '../../styles/reset_password.css';
import submitBtn from '../../assets/submit_ok.png';
import disableSubmitBtn from '../../assets/submit_disabled.png';
import { ResetPassword } from '../../serviceAPI';
import openEye from '../../assets/open_eye.png';
import closedEye from '../../assets/closed_eye.png';
import { connect } from 'react-redux';

<<<<<<< HEAD
export class EnterEmailForm extends Component {

    constructor(props) {
        super(props);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.emailOnFocus = this.emailOnFocus.bind(this);
        this.state = {
            email: "",
            disableButton: true,
            showError: false,
            errorMessage: ""
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
        this.sendRestartCode();
    }

    sendRestartCode() {
        // Sends package and handling the respond.
         SendRestartCode(this.state.email).then(res => {  // When respond package is with status 200
            this.props.nextPage();
         }).catch(error => { // When respond package is with error status - 400 ...
                 console.log(error.response);
                 if(error.response.data.code === "994") {   // parent was not found
                    this.setState({
                        ...this.state,
                        errorMessage: "Parent was not found in the system",
                        showError: true
                    });
                 }
             }
         );
     }

    emailOnFocus() {
        this.setState({
            ...this.state,
            showError: false
        });
    }

    render() {
        return(
            <Grid className="reset_password_container">
                <p className="forgot_pass_text">Forgot your password? don't worry, just enter your email address below and we'll send you some instructions.</p>
                <Form onSubmit={this.sendCode}>
                    <FloatingLabelInput ref="email" onFocus={this.emailOnFocus} type={"email"} labelName={"ENTER YOUR EMAIL ADDRESS"} 
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        isValid={this.isValidEmail(this.state.email)} 
                        errorMessage={this.getValidationMessages()} />
                        {this.state.showError && <span className="error_message"> {this.state.errorMessage} </span>}
                        <Button className="btn_submit" type="submit" disabled={this.state.disableButton}>
                            <Image style={{width: 70 + 'px'}} src={this.state.disableButton ? disableSubmitBtn : submitBtn} 
                                circle={true}
                            />
                        </Button>
                </Form>
            </Grid> 
        );
    }
}

export class RestoreForm extends Component {
=======
class RestoreForm extends Component {
>>>>>>> 0cf360aded0638026aabf89a769ea0cc16378f0a

    constructor(props) {
        super(props);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.restartPassword = this.restartPassword.bind(this);
        this.fieldOnFocus = this.fieldOnFocus.bind(this);
        this.changePasswordEye = this.changePasswordEye.bind(this);
        this.state = {
            email: "",
            code: "",
            password: "",
            disableButton: true,
            showError: false,
            errorMessage: "",
            showPassword: false,
            resetSuccess: false
        }
    }

    changePasswordEye() {
        let type = "";
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });
        this.state.showPassword ? type = "password" : type = "text";
        this.refs.password.inputs.type = type;
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
               return this.props.currLang.invalid_email;
            case "CODE":
               return this.props.currLang.code_warning;
            case "PASSWORD":
                return this.props.currLang.password_warning;
        }
    }

    enableButton(type, input) {
        let emailIsValid, codeIsValid, passwordIsValid;
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

    resetPassword(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.restartPassword(this.state.email, this.state.code, this.state.password);
    }

    restartPassword(email, code, password) {
        // Sends package and handling the respond.
         ResetPassword(email, code, password).then(res => {  // When respond package is with status 200
            this.setState({
                ...this.state,
                showError: true,
                errorMessage: this.props.currLang.success_restart,
                resetSuccess: true
            });
            setTimeout(() => {
                this.props.history.push("/login");   // Redirect to main menu.
            }, 2000);
         }).catch(error => { // When respond package is with error status - 400 ...
             if(error.response.data.code === "825") {   // the code is not corrent
                this.setState({
                    ...this.state,
                    errorMessage: this.props.currLang.error_825,
                    showError: true
                });
             }
             else if(error.response.data.code === "827") {   // for that email you didnt ask for reset password
                this.setState({
                    ...this.state,
                    errorMessage: this.props.currLang.error_827,
                    showError: true
                });
             }
         });
    }

    fieldOnFocus() {
        this.setState({
            ...this.state,
            showError: false
        });
    }

    render() {
        return(
            <Grid className="reset_password_container" >
                <p className="intro_text">{this.props.currLang.into_password_text}</p>
                <Form onSubmit={this.resetPassword}>
                
                <FloatingLabelInput onFocus={this.fieldOnFocus} type={"code"} labelName={this.props.currLang.enter_code} 
                        onChange={(e) => {e.preventDefault();
                        this.handleCode(e.currentTarget.value)}}
                        name={"CODE"}
                        value={this.state.code} 
                        isValid={this.state.code !== ""} 
                        errorMessage={this.getValidationMessages('CODE')}/>

                    {' '}

                    <FloatingLabelInput onFocus={this.fieldOnFocus} type={"email"} labelName={this.props.currLang.email} 
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        isValid={this.isValidEmail(this.state.email)} 
                        errorMessage={this.getValidationMessages('EMAIL')} />
                   
                    {' '}

                    <FloatingLabelInput ref="password" onFocus={this.fieldOnFocus} type={"password"} labelName={this.props.currLang.password} 
                        onChange={(e) => {e.preventDefault();this.handlePassword(e.currentTarget.value)}}
                        name={"PASSWORD"}
                        value={this.state.password} 
                        isValid={this.isValidPassword(this.state.password)} 
                        errorMessage={this.getValidationMessages('PASSWORD')}/>

                    <Image onClick={this.changePasswordEye} className={!this.state.showPassword ? "eyes closed_eye" : "eyes open_eye"}
                        src={!this.state.showPassword ? closedEye : openEye} 
                            circle />

                    {this.state.showError && 
                        (!this.state.resetSuccess ? <span className="error_message"> {this.state.errorMessage} </span> : <span className="error_message" style={{color: "green"}}> {this.state.errorMessage} </span>)
                    }

                    <Button className="btn_submit" type="submit" disabled={this.state.disableButton}>
                        <Image style={{width: 70 + 'px'}} src={this.state.disableButton ? disableSubmitBtn : submitBtn} 
                            circle={true}
                        />
                    </Button>                
                </Form>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currLang: state.lang.currLang.password_recovery
    };
}; 

export default connect(mapStateToProps)(RestoreForm);