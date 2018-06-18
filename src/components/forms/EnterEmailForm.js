import React, { Component } from 'react';
import { Form, Button, Grid, Image} from 'react-bootstrap';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import { SendRestartCode } from '../../serviceAPI';
import { connect } from 'react-redux';
import disableSubmitBtn from '../../assets/login/submit_disabled.png';
import submitBtn from '../../assets/login/submit_ok.png';
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
            email: "", // holds the user email from input field.
            emailValidation: [true, "empty"], // email validation: first cell holds if its a valid format and second cell holds information if its an error.
            emailOnFocus: false // holds a boolean that indicates if the email input was focused.
        }
        this.bindFunctions();
    }

    // bind all functioon to work with "this".
    bindFunctions() {
        this.isValidEmail = this.isValidEmail.bind(this);
        this.submit = this.submit.bind(this);
        this.emailOnFocus = this.emailOnFocus.bind(this);
        this.disableButton = this.disableButton.bind(this);
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

    // handles the email input changes.
    // adds the input into email state and checks email validation.
    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            emailValidation: this.isValidEmail(email)
        });
    }

    // sets email focus state.
    emailOnFocus() {
        this.setState({
            ...this.state,
            emailOnFocus: true
        });
    }

    // disable button - check if email is a valid email.
    disableButton() {  
        return this.state.emailValidation[1] !== "valid";
    }
    
    // submit information on fields.
    // prevent page refresh and sends restart code to user.
    submit(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.sendRestartCode();
    }

    // send restart code to users email.
    // also handles the errors recieved from api call(email doesn't exist)
    sendRestartCode() {
        // sends package and handling the respond.
        SendRestartCode(this.state.email).then(res => {  // when respond package is with status 200
            this.props.nextPage();
        }).catch(error => { // when respond package is with error status - 400 ...
                 if(error.response.data.code === "994") {   // parent was not found
                    this.setState({
                        ...this.state,
                        emailValidation: [false, this.props.currLang.error_994] // sets the error that is shown to the user.
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
                    
                    {/* email input */}
                    <FloatingLabelInput ref="email" type={"email"} labelName={ this.props.currLang.email} 
                        onFocus={this.emailOnFocus}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handleEmail(e.currentTarget.value);}}        
                        name={"EMAIL"}
                        value={this.state.email} // puts the value of email state into input field.
                        isValid={this.state.emailValidation[0]}  // shows error if its false, if true nothing.
                        errorMessage={this.state.emailValidation[1]} // the error message shown if isValid is true.
                        /> 

                    {/* submit button - disabled until all inputs are valid and all fields are filled. */}
                    <Button className="btn_submit" type="submit" disabled={this.disableButton()}>
                        <Image style={{width: 70 + 'px'}} src={this.disableButton() ? disableSubmitBtn : submitBtn} 
                            circle={true}/>
                    </Button>
                </Form>
            </Grid> 
        );
    }
}

// variables used from redux.
const mapStateToProps = (state) => {
    return {
        currLang: state.DisplayLanguage.currLang.password_recovery // use language from redux - here lets the texts the option to change all page languages.
    };
}; 

export default connect(mapStateToProps)(EnterEmailForm);
