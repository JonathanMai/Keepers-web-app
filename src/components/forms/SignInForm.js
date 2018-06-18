import React from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { RegisterModal } from '../modals/RegisterModal';
import { Login, Register } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import '../../styles/login_page.css';
import submitBtn from '../../assets/login/submit_ok.png';
import disableSubmitBtn from '../../assets/login/submit_disabled.png';
import openEye from '../../assets/login/open_eye.png';
import closedEye from '../../assets/login/closed_eye.png';
import { WaitingModal } from '../modals/WaitingModal';

/*
    Sign in/register form.
    Main page, user enters email and password to login to the dashboard.
    When user enters unexisting email into the form a pop up asks if he wants to register.
    If yes this form turns to register form and lets the user to register.
*/
class SignInForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "", // holds the user email from input field.
            password: "", // holds the user password from input field. 
            
            // email/password validations: first cell holds if the field is valid format and second cell holds information if its an error.
            emailValidation: [true, "empty"],
            passwordValidation: [true, "empty"],
            nameValidation: [true, "empty"],

            // holds boolean that indicates if the inputs were focused and edited.
            emailOnFocus: false,
            passwordOnFocus: false
        }
        if(this.props.history.location.pathname === "/register") {
            this.state["name"] = "";
            this.handleName = this.handleName.bind(this);
        }
        this.bindFunctions();
    }

    // bind all functioon to work with "this".
    bindFunctions() {
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.changePasswordEye = this.changePasswordEye.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    // changes the password icon and show/hide password in input field
    changePasswordEye() {
        let type = "";
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });
        this.state.showPassword ? type = "password" : type = "text";
        this.refs.password.inputs.type = type;
    }

    // checks if the name input is vaild.
    // ceturns an array that in first cell holds the state(true false if name is valid).
    // second cell holds the information of the code state.
    isValidName(name) {
        if(!this.state.nameOnFocus) {
            return [true, "empty"]; // at first the code is so called valid since there were no changes in the field(When focused and not edited).
        }
        else if(name.length > 0) {
            return [true, "valid"]; // valid name - "valid" in second cell indicates that the code is valid for disable button check.
        }
        return [false, "empty"];
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
 
    // handles the name input changes.
    // adds the input into code state and checks code validation.
    handleName(name) {
        this.setState({
            ...this.state,
            name: name,
            nameValidation: this.isValidName(name)
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

    // sets name focus state.
    nameOnFocus() {
        this.setState({
            ...this.state,
            nameOnFocus: true
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
        return !((this.state.emailValidation[1] === "valid") && (this.state.passwordValidation[1] === "valid") && (this.state.name === undefined || this.state.nameValidation[1] === "valid") && this.props.agreement)
    }

    // closes the register modal - modal that asks parent if he wants to sign up when the email he entered doesn't exist.
    closeRegisterModal() {
        this.props.setShowModal(false);
    }

    // closes the loading modal.
    closeWaitingModal() {
        this.props.setShowLoadingModal(false);
    }

    // redirects page to register page when the user wanted to signup after he tried to login with email that doesn't exist.
    redirectToRegister() {
        this.props.setShowModal(false);
        this.props.history.push("/register");
    }

    // on submit - tries to sign in.
    // handles errors recieved from api call(email doesn't exist, wront password)
    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.props.setShowLoadingModal(true);
        var email = this.state.email
        var password = this.state.password;

        // sends login package and handling the respond.
        Login(email, password).then(res => {  // When respond package is with status 200
            let token = res.data.authToken;
            let parentId = res.data.parentId;
            this.props.setUser({
                id: parentId,
                authKey: token
            });

            setTimeout(() => {
                // save data to local storage.
                localStorage._id = parentId;
                localStorage._token = token;
                
                this.props.setShowLoadingModal(false); // stops the loading modal.
                this.props.setShowLogoutIcon(true); // show the logout button.
                this.props.history.push('/keepers-dashboard');  // redirect to dashboard page.
            }, 1000);
           
            
        }).catch(error => { // when respond package is with error status - 400 ...
            setTimeout(() => {
                this.props.setShowLoadingModal(false);
                if(error.response.data.code === '994') {    // parent doesn't exist
                    this.props.setShowModal(true);
                } else if(error.response.data.code === '935') { // user entered wrong password.
                    this.setState({
                    ...this.state,
                        passwordValidation: [false, this.props.currLang.error_935] // sets the error that is shown to the user.
                    });
                }
            }, 1000); 
        }); 
    }

    // user registration using user email, name, email and password.
    // handles errors recieved from api call(email exists already)
    register(event) {
        event.preventDefault(); // cancel auto refresh.
        var parentName = this.state.name;
        var email = this.state.email;
        var password = this.state.password;

        Register(parentName, email, password).then(res => {
            this.props.history.push('/login');  // redirect to login page.
        }).catch(error => {
            if(error.response.data.code === "993") {
                this.setState({
                    ...this.state,
                    emailValidation: [false, this.props.currLang.error_993] // sets the error that is shown to the user.
                });
            }
        });
    }

    render() {      
        return(
            <div>
                <Form onSubmit={this.state.name === undefined ? this.signIn.bind(this) : this.register.bind(this) }>
                    
                        

                    {   /* name input - appears only when the user is redirected to register page. */
                        this.state.name !== undefined && <FloatingLabelInput type={"text"} labelName={this.props.currLang.parents_name}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handleName(e.currentTarget.value);}}
                        onFocus={this.nameOnFocus.bind(this)}
                        name={"NAME"}
                        value={this.state.name} // puts the value of name state into input field.
                        isValid={this.state.nameValidation[0]} // shows error if its false, if true nothing.
                        errorMessage={this.props.currLang.name_warning} // the error message shown if isValid is true.
                         /> 
                    }
                    
                    {/* email input */}
                    <FloatingLabelInput type={"email"} labelName={this.props.currLang.parents_email} 
                        onFocus={this.emailOnFocus.bind(this)}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handleEmail(e.currentTarget.value);}}
                        name={"EMAIL"}
                        value={this.state.email} // puts the value of email state into input field.
                        isValid={this.state.emailValidation[0]} // shows error if its false, if true nothing.
                        errorMessage={this.state.emailValidation[1]} // the error message shown if isValid is true.
                        /> 
    
                    {/* password input */}
                    <FloatingLabelInput ref="password" type={"password"} labelName={this.props.currLang.parents_password} 
                        onFocus={this.passwordOnFocus.bind(this)}
                        onChange={(e) => {
                            e.preventDefault(); // prevents the event to refresh page.
                            this.handlePassword(e.currentTarget.value);
                        }}
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
                    { /* forgot password link - appears only when on login screen */
                       this.state.name === undefined && <Link className="link" to={"/restore-password"}>{this.props.currLang.forgot_password}</Link>
                    }

                    {/* submit button - disabled until all inputs are valid and all fields are filled. */}
                    <Button className="btn_submit" disabled={this.disableButton()} type="submit"> 
                        <Image style={{width: 70 + 'px'}} src={this.disableButton() ? disableSubmitBtn : submitBtn} 
                            circle
                        />
                    </Button>
                </Form>

                {/* register modal, pops up when the email doesn't exist. */}
                <RegisterModal 
                    showModal={this.props.showRegisterModal} 
                    closeModal={this.closeRegisterModal.bind(this)}
                    registerUser={this.redirectToRegister.bind(this)}
                    currLang={this.props.currLang.modal}/>

                {/* loading modal. */}
                 <WaitingModal
                    showModal={this.props.showWaitingModal} 
                    closeModal={this.closeWaitingModal.bind(this)}
                    />
            </div>
        );
    }
}

// variables used from redux.
const mapStateToProps = (state) => {
    return {
        showRegisterModal: state.Modal.showModal, // register modal - popup with register option when email entered doesn't exist.
        showWaitingModal: state.Modal.showLoadingModal, // loading modal.
        agreement: state.Modal.agreement, // agreement checkbox
        currLang: state.lang.currLang.login_page, // use language from redux - here lets the texts the option to change all page languages.
    };
};

// functions used to set redux states.
const mapDispatchToProps = (dispatch) => {
    return {

        // show/hide register modal.
        setShowModal: (val) => {
            dispatch({
                type: "SET_SHOW_MODAL",
                value: val
            });
        },

        // show/hide loading modal.
        setShowLoadingModal: (val) => {
            dispatch({
                type: "SET_SHOW_LOADING_MODAL",
                value: val
            });
        },

        // set user data.
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                value: user
            });
        }, 

        // show/hide logout icon.
        setShowLogoutIcon: (val) => {
            dispatch({
                type: "SET_ICON_VISIBILITY",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);