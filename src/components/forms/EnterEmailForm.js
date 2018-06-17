import React, { Component } from 'react';
import { Form, Button, Grid, Image} from 'react-bootstrap';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import '../../styles/reset_password.css';
import submitBtn from '../../assets/submit_ok.png';
import disableSubmitBtn from '../../assets/submit_disabled.png';
import { SendRestartCode } from '../../serviceAPI';
import { connect } from 'react-redux';

class EnterEmailForm extends Component {

    constructor(props) {
        super(props);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.emailOnFocus = this.emailOnFocus.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.state = {
            email: "",
            emailValidation: [true, "empty"],
            emailOnFocus: false
        }
    }

    render() {
        return(
            <Grid className="reset_password_container">
                <p className="forgot_pass_text">{this.props.currLang.intro}</p>
                <Form onSubmit={this.sendCode}>
                    <FloatingLabelInput ref="email" type={"email"} labelName={ this.props.currLang.email} 
                        onFocus={this.emailOnFocus}
                        onChange={(e) => {e.preventDefault();
                        this.handleEmail(e.currentTarget.value)}}
                        name={"EMAIL"}
                        value={this.state.email} 
                        isValid={this.state.emailValidation[0]} 
                        errorMessage={this.state.emailValidation[1]} />

                        <Button className="btn_submit" type="submit" disabled={this.disableButton()}>
                            <Image style={{width: 70 + 'px'}} src={this.disableButton() ? disableSubmitBtn : submitBtn} 
                                circle={true}
                            />
                        </Button>
                </Form>
            </Grid> 
        );
    }

    disableButton() {  
        return this.state.emailValidation[1] !== "valid";
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

    isValidEmail(email) {
        if(!this.state.emailOnFocus) {
            return [true, "empty"]
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "" || !re.test(email))
            return [false, this.props.currLang.invalid_email];
        else if (this.state.emailValidation[0] === false || this.state.emailValidation[1] === "empty")
            return [true, "valid"];
        return this.state.emailValidation;
    }

    handleEmail(email){
        console.log(this.state)

        this.setState({
            ...this.state,
            email: email,
            emailValidation: this.isValidEmail(email)
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
                 if(error.response.data.code === "994") {   // parent was not found
                    this.setState({
                        ...this.state,
                        emailValidation: [false, this.props.currLang.error_994]
                    });
                 }
             }
         );
     }

    emailOnFocus() {
        console.log(this.state)
        this.setState({
            ...this.state,
            emailOnFocus: true
        });
    }
}

const mapStateToProps = (state) => {
    return {
        currLang: state.lang.currLang.password_recovery
    };
}; 

export default connect(mapStateToProps)(EnterEmailForm);
