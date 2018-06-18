import React, { Component } from 'react';
import { Form, Button, Grid, Image} from 'react-bootstrap';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import { SendRestartCode } from '../../serviceAPI';
import { connect } from 'react-redux';
import disableSubmitBtn from '../../assets/submit_disabled.png';
import submitBtn from '../../assets/submit_ok.png';
import '../../styles/reset_password.css';

/*
    Enter email form is the form that uploads after user press forgot password.
    In this form the user enters the email he wants to restart the password for.
    After he enters valid email an email is sent to the user with a code to restart hes password and-
    -hes being redirected to the restore password form.
*/
class EnterEmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "", // Holds the user email.
            emailValidation: [true, "empty"], // Email validation: first cell holds if its a valid format and second cell holds information if its an error.
            emailOnFocus: false // Holds a boolean that indicates if the email input was focused.
        }
        this.bindFunctions();
    }

    // Bind all functioon to work with "this".
    bindFunctions() {
        this.isValidEmail = this.isValidEmail.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.emailOnFocus = this.emailOnFocus.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    // Disable button - check if email is a valid email.
    disableButton() {  
        return this.state.emailValidation[1] !== "valid";
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

    // Handles the email input changes.
    // Adds the input into email state and checks email validation.
    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            emailValidation: this.isValidEmail(email)
        });
    }

    // Sets email focus state.
    emailOnFocus() {
        console.log(this.state)
        this.setState({
            ...this.state,
            emailOnFocus: true
        });
    }

    // Submit information on fields.
    // Prevent page refresh and sends restart code to user.
    submit(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.sendRestartCode();
    }

    // Send restart code to users email.
    // Also handles the errors recieved from api call(email doesn't exist)
    sendRestartCode() {
        // Sends package and handling the respond.
        SendRestartCode(this.state.email).then(res => {  // When respond package is with status 200
            this.props.nextPage();
        }).catch(error => { // When respond package is with error status - 400 ...
                 if(error.response.data.code === "994") {   // parent was not found
                    this.setState({
                        ...this.state,
                        emailValidation: [false, this.props.currLang.error_994] // Sets the error that is shown to the user.
                    });
                 }
             }
         );
     }

    render() {
        return(
            <Grid className="reset_password_container">
                <p className="forgot_pass_text">{this.props.currLang.intro}</p>
                <Form onSubmit={this.submit}>
                    
                    {/* Email input */}
                    <FloatingLabelInput ref="email" type={"email"} labelName={ this.props.currLang.email} 
                        onFocus={this.emailOnFocus}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handleEmail(e.currentTarget.value);}} // Handles email field being edited.       
                        name={"EMAIL"}
                        value={this.state.email} // Puts the value of email state into input field.
                        isValid={this.state.emailValidation[0]}  // Shows error if its false, if true nothing.
                        errorMessage={this.state.emailValidation[1]} // The error message shown if isValid is true.
                        /> 

                    {/* Submit button - disabled until all inputs are valid and all fields are filled. */}
                    <Button className="btn_submit" type="submit" disabled={this.disableButton()}>
                        <Image style={{width: 70 + 'px'}} src={this.disableButton() ? disableSubmitBtn : submitBtn} 
                            circle={true}/>
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

export default connect(mapStateToProps)(EnterEmailForm);
