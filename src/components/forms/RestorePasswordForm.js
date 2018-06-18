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


/* 
    Restore password form.
    Redirected to this form after enter email form.
    Using the code sent to the user email to restart password.
*/
class RestoreForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "", // holds the user email from input field.
            code: "", // holds the user code from input field.
            password: "", // holds the user password from input field.

            // email/password/code validations: first cell holds if the field is valid format and second cell holds information if its an error.
            emailValidation: [true, "empty"],
            passwordValidation: [true, "empty"], 
            codeValidation: [true, "empty"],

            // holds boolean that indicates if the inputs were focused and edited.
            emailOnFocus: false,
            passwordOnFocus: false,
            codeOnFocus: false,

            showPassword: false, // holds boolean that indicates password state(hide/show).
            resetSuccess: false // holds reset state(failed/succsseded)
        }
        this.bindFunctions();
    }
   
    // bind all functioon to work with "this".
    bindFunctions() {
        this.isValidEmail = this.isValidEmail.bind(this);
        this.submit = this.submit.bind(this);
        this.restartPassword = this.restartPassword.bind(this);
        this.changePasswordEye = this.changePasswordEye.bind(this);
    }
   
    // changes the password icon and show/hide password in input field
    changePasswordEye() {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });

        let type = this.state.showPassword ? "password" : "text";
        this.refs.password.inputs.type = type;
    }

    // checks if the code input is vaild.
    // returns an array that in first cell holds the state(true false if code is valid).
    // second cell holds the information of the code state.
    isValidCode(code) {
        if(!this.state.codeOnFocus) {
            return [true, "empty"]; // at first the code is so called valid since there were no changes in the field(When focused and not edited).
        }
        else if(code.length === 5) {
            return [true, "valid"]; // valid code - "valid" in second cell indicates that the code is valid for disable button check.
        }
        return [false,  this.props.currLang.code_warning];
    }

    // checks if email recieved is a valid email - in the right format.
    // returns an array that in first cell holds the state(true false if email is valid).
    // second cell holds the information of the email state.
    isValidEmail(email) {
        if(!this.state.emailOnFocus) {
            return [true, "empty"] // at first the email is so called valid since there were no changes in the field(When focused and not edited).
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // email regular expression.
        if (email === "" || !re.test(email))
            return [false, this.props.currLang.invalid_email];
        else if (this.state.emailValidation[0] === false || this.state.emailValidation[1] === "empty")
            return [true, "valid"]; // valid email - "valid" in second cell indicates that the email is valid for disable button check.
        return this.state.emailValidation;
    }

    // checks if the password input is vaild.
    // returns an array that in first cell holds the state(true false if password is valid).
    // second cell holds the information of the password state.
    isValidPassword(password){ 
        if(!this.state.passwordOnFocus) {
            return [true, "empty"] // at first the password is so called valid since there were no changes in the field(When focused and not edited).
        }      
        if(password.length < 6 || password.length > 15) {
            return [false, this.props.currLang.password_warning]
        }
        else if(!this.state.passwordValidation[0]) {
            return [true, "valid"] // valid password - "valid" in second cell indicates that the password is valid for disable button check.
        }
        return this.state.passwordValidation;
    }
    
    // handles the code input changes.
    // adds the input into code state and checks code validation.
    handleCode(code) {
        this.setState({
            ...this.state,
            code: code,
            codeValidation: this.isValidCode(code)
        });
    }

    // handles the email input changes.
    // adds the input into email state and checks email validation.
    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            emailValidation: this.isValidEmail(email)
        });
    }

    // handles the password input changes.
    // adds the input into password state and checks password validation.
    handlePassword(password){ 
        this.setState({
            ...this.state,
            password: password,
            passwordValidation: this.isValidPassword(password)
        });
    }

    // sets code focus state.
    codeOnFocus() {
        this.setState({
            ...this.state,
            codeOnFocus: true
        });
    }

    // sets email focus state.
    emailOnFocus() {
        this.setState({
            ...this.state,
            emailOnFocus: true
        });
    }

    // sets password focus state.
    passwordOnFocus() {
        this.setState({
            ...this.state,
            passwordOnFocus: true
        });
    }

    // disable button - check if email is a valid email.
    disableButton() {
        return !((this.state.emailValidation[1] === "valid") && (this.state.passwordValidation[1] === "valid") && (this.state.codeValidation[1] === "valid"))
    }

    // sets email focus state.
    submit(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.restartPassword(this.state.email, this.state.code, this.state.password);
    }

    // restart password using user email, code that was sent to his email and the new password.
    // handles errors recieved from api call(code not related to email, wrong email).
    restartPassword(email, code, password) {
        // sends package and handling the respond.
        ResetPassword(email, code, password).then(res => {  // when respond package is with status 200
        this.setState({
            ...this.state,
            showError: true,
            errorMessage: this.props.currLang.success_restart,
            resetSuccess: true
        });
        setTimeout(() => {
            this.props.history.push("/login");   // redirect to login page.
        }, 2000);
        }).catch(error => { // when respond package is with error status - 400 ...
            if(error.response.data.code === "825") { // the code is not corrent
            this.setState({
                ...this.state,
                codeValidation: [false, this.props.currLang.error_825] // sets the error that is shown to the user.
            });
            }
            else if(error.response.data.code === "827") { // that email didn't ask for password reset.
            this.setState({
                ...this.state,
                emailValidation: [false, this.props.currLang.error_827] // sets the error that is shown to the user.
            });
            }
        });
    }    

    render() {
        return(
            <Grid className="reset_password_container" >
                <p className="intro_text">{this.props.currLang.into_password_text}</p>
                <Form onSubmit={this.submit}>                    

                    {/* code input */}
                    <FloatingLabelInput type={"text"} labelName={this.props.currLang.enter_code}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handleCode(e.currentTarget.value)}}  
                        onFocus={this.codeOnFocus.bind(this)}
                        name={"CODE"}
                        value={this.state.code} // puts the value of code state into input field.
                        isValid={this.state.codeValidation[0]} // shows error if its false, if true nothing.
                        errorMessage={this.state.codeValidation[1]} // the error message shown if isValid is true.
                        /> 

                    {/* email input */}
                    <FloatingLabelInput type={"email"} labelName={this.props.currLang.email} 
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handleEmail(e.currentTarget.value)}} 
                        name={"EMAIL"}
                        value={this.state.email} // puts the value of email state into input field.
                        onFocus={this.emailOnFocus.bind(this)}
                        isValid={this.state.emailValidation[0]} // shows error if its false, if true nothing.
                        errorMessage={this.state.emailValidation[1]} // the error message shown if isValid is true.
                        />
                    
                    {/* password input */}
                    <FloatingLabelInput ref="password" type={"password"} labelName={this.props.currLang.password} 
                        onFocus={this.passwordOnFocus.bind(this)}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handlePassword(e.currentTarget.value);}}
                        name={"PASSWORD"}
                        value={this.state.password} // puts the value of password state into input field.
                        isValid={this.state.passwordValidation[0]} // shows error if its false, if true nothing. 
                        errorMessage={this.state.passwordValidation[1]} // the error message shown if isValid is true.
                        />

                    {/* eye button - show/hide password input. */}
                    <Image onClick={this.changePasswordEye} className={!this.state.showPassword ? "eyes closed_eye" : "eyes open_eye"}
                        src={!this.state.showPassword ? closedEye : openEye} 
                            circle 
                        />
                    
                    {/* submit button - disabled until all inputs are valid and all fields are filled. */}
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

// Variables used from redux.
const mapStateToProps = (state) => {
    return {
        currLang: state.lang.currLang.password_recovery // Use language from redux - here lets the texts the option to change all page languages.
    };
}; 

export default connect(mapStateToProps)(RestoreForm);