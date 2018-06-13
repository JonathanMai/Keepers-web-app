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
        return this.props.currLang.invalid_email;
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
                 if(error.response.data.code === "994") {   // parent was not found
                    this.setState({
                        ...this.state,
                        errorMessage: this.props.currLang.error_994,
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
                <p className="forgot_pass_text">{this.props.currLang.intro}</p>
                <Form onSubmit={this.sendCode}>
                    <FloatingLabelInput ref="email" onFocus={this.emailOnFocus} type={"email"} labelName={ this.props.currLang.email} 
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

const mapStateToProps = (state) => {
    return {
        currLang: state.lang.currLang.password_recovery
    };
}; 

export default connect(mapStateToProps)(EnterEmailForm);
