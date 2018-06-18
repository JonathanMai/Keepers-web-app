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

class RestoreForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "", // Holds the user email from input field.
            code: "", // Holds the user code from input field.
            password: "", // Holds the user password from input field.

            // email/password/code validations: first cell holds if the field is valid format and second cell holds information if its an error.
            emailValidation: [true, "empty"],
            passwordValidation: [true, "empty"], 
            codeValidation: [true, "empty"],

            // Holds boolean that indicates if the inputs were focused and edited.
            emailOnFocus: false,
            passwordOnFocus: false,
            codeOnFocus: false,

            showPassword: false, // Holds boolean that indicates password state(hide/show).
            resetSuccess: false // Holds reset state(failed/succsseded)
        }
        this.bindFunctions();
    }
   
    // Bind all functioon to work with "this".
    bindFunctions() {
        this.isValidEmail = this.isValidEmail.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.restartPassword = this.restartPassword.bind(this);
        this.fieldOnFocus = this.fieldOnFocus.bind(this);
        this.changePasswordEye = this.changePasswordEye.bind(this);
    }
   
    // Changes the password icon and show/hide password in input field
    changePasswordEye() {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });

        let type = this.state.showPassword ? "password" : "text";
        this.refs.password.inputs.type = type;
    }

    // Checks if the code input is vaild.
    // Returns an array that in first cell holds the state(true false if code is valid).
    // Second cell holds the information of the code state.
    isValidCode(code) {
        if(!this.state.codeOnFocus) {
            return [true, "empty"]; // At first the email is so called valid since there were no changes in the field(When focused and not edited).
        }
        else if(code.length === 5) {
            return [true, "valid"];// Valid code - valid in second cell indicates that the code is valid for disable button check.
        }
        return [false,  this.props.currLang.code_warning];
    }

    // Checks if email recieved is a valid email - in the right format.
    // Returns an array that in first cell holds the state(true false if email is valid).
    // Second cell holds the information of the email state.
    isValidEmail(email) {
        if(!this.state.emailOnFocus) {
            return [true, "empty"] // At first the email is so called valid since there were no changes in the field(When focused and not edited).
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email regular expression.
        if (email === "" || !re.test(email))
            return [false, this.props.currLang.invalid_email];
        else if (this.state.emailValidation[0] === false || this.state.emailValidation[1] === "empty")
            return [true, "valid"]; // Valid email - valid in second cell indicates that the email is valid for disable button check.
        return this.state.emailValidation;
    }

    // Checks if the password input is vaild.
    // Returns an array that in first cell holds the state(true false if password is valid).
    // Second cell holds the information of the password state.
    isValidPassword(password){ 
        if(!this.state.passwordOnFocus) {
            return [true, "empty"]
        }      
        if(password.length < 6 || password.length > 15) {
            return [false, this.props.currLang.password_warning]
        }
        else if(!this.state.passwordValidation[0]) {
            return [true, "valid"]
        }
        return this.state.passwordValidation;
    }
    
    handleCode(code) {
        this.setState({
            ...this.state,
            code: code,
            codeValidation: this.isValidCode(code)
        });
    }

    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            emailValidation: this.isValidEmail(email)
        });
    }

    handlePassword(password){ 
        this.setState({
            ...this.state,
            password: password,
            passwordValidation: this.isValidPassword(password)
        });
    }

    codeOnFocus() {
        this.setState({
            ...this.state,
            codeOnFocus: true
        });
    }

    emailOnFocus() {
        this.setState({
            ...this.state,
            emailOnFocus: true
        });
    }

    passwordOnFocus() {
        this.setState({
            ...this.state,
            passwordOnFocus: true
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
                    codeValidation: [false, this.props.currLang.error_825]
                });
             }
             else if(error.response.data.code === "827") {   // for that email you didnt ask for reset password
                this.setState({
                    ...this.state,
                    emailValidation: [false, this.props.currLang.error_827]
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

    disableButton() {
        return !((this.state.emailValidation[1] === "valid") && (this.state.passwordValidation[1] === "valid") && (this.state.codeValidation[1] === "valid"))
    }

    render() {
        return(
            <Grid className="reset_password_container" >
                <p className="intro_text">{this.props.currLang.into_password_text}</p>
                <Form onSubmit={this.resetPassword}>                    
                        
                    <FloatingLabelInput type={"text"} labelName={this.props.currLang.enter_code}
                        onChange={(e) => {e.preventDefault();
                        this.handleCode(e.currentTarget.value)}}
                        onFocus={this.codeOnFocus.bind(this)}
                        name={"CODE"}
                        value={this.state.code} 
                        isValid={this.state.codeValidation[0]} 
                        errorMessage={this.state.codeValidation[1]} /> 

                    <FloatingLabelInput type={"email"} labelName={this.props.currLang.email} 
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        onFocus={this.emailOnFocus.bind(this)}
                        isValid={this.state.emailValidation[0]} 
                        errorMessage={this.state.emailValidation[1]} />
    
                    <FloatingLabelInput ref="password" type={"password"} labelName={this.props.currLang.password} 
                        onFocus={this.passwordOnFocus.bind(this)}
                        onChange={(e) => {
                            e.preventDefault();
                            this.handlePassword(e.currentTarget.value);
                        }}
                        name={"PASSWORD"}
                        value={this.state.password} 
                        isValid={this.state.passwordValidation[0]} 
                        errorMessage={this.state.passwordValidation[1]}/>

                    <Image onClick={this.changePasswordEye} className={!this.state.showPassword ? "eyes closed_eye" : "eyes open_eye"}
                        src={!this.state.showPassword ? closedEye : openEye} 
                            circle />
                    
                    {/* Submit button - disabled until all inputs are valid and all fields are filled. */}
                    <Button className="btn_submit" type="submit" disabled={this.disableButton()}>
                        <Image style={{width: 70 + 'px'}} src={this.disableButton() ? disableSubmitBtn : submitBtn} 
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