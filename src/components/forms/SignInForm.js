import React from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { RegisterModal } from '../modals/RegisterModal';
import { Login, Register } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FloatingLabelInput from "react-floating-label-paper-input"; 
import '../../styles/login_page.css';
import submitBtn from '../../assets/submit_ok.png';
import disableSubmitBtn from '../../assets/submit_disabled.png';
import openEye from '../../assets/open_eye.png';
import closedEye from '../../assets/closed_eye.png';

class SignInForm extends React.Component {
    constructor(props){
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.changePasswordEye = this.changePasswordEye.bind(this);
        this.state = {
            email: "",
            password: "",
            disableButton: true,
            showPassword: false,
            showErrorMessage: false,
            errorMessage: ""
        }
        if(this.props.history.location.pathname === "/register") {
            this.state["name"] = "";
            this.handleName = this.handleName.bind(this);
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
            case "PASSWORD":
                return this.props.currLang.password_warning;
            case "EMAIL":
               return this.props.currLang.invalid_email;
        }
    }

    enableButton(type, input) {
        let emailIsValid, passwordIsValid;
        switch(type){
            case 'email':
                emailIsValid = this.isValidEmail(input);
                passwordIsValid = this.isValidPassword(this.state.password);
                break;
            case 'password':
                emailIsValid = this.isValidEmail(this.state.email);
                passwordIsValid = this.isValidPassword(input);
                break;
            default:
                emailIsValid = this.isValidEmail(this.state.email);
                passwordIsValid = this.isValidPassword(this.state.password);
        } 
        if(this.state.name === undefined) { // login page
            if(this.state.disableButton && emailIsValid && passwordIsValid){
                return false;
            }
            else if(!this.state.disableButton  && (!emailIsValid || !passwordIsValid)){
                return true;
            }
            return this.state.disableButton;
        } else {    // register page
            let nameIsValid =  (type === "name" ? input : this.state.name) !== "";
            if(this.state.disableButton && emailIsValid && passwordIsValid && nameIsValid){
                return false;
            }
            else if(!this.state.disableButton  && (!emailIsValid || !passwordIsValid || !nameIsValid)){
                return true;
            }
            return this.state.disableButton;
        }
      
    }
    
    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            disableButton: this.enableButton('email', email)
        });
    }

    handlePassword(password){ 
        this.setState({
            ...this.state,
            password: password,
            disableButton: this.enableButton('password', password)
        });
    }

    passwordOnFocus() {
        if(this.refs.password) {
            this.setState({
                ...this.state,
                showErrorMessage: false
            });
        }
    }

    handleName(name) {
        this.setState({
            ...this.state,
            name: name,
            disableButton: this.enableButton('name', name)
        });
    }

    render() { 
        // this.props.setUser({
        //     id: null,
        //     authKey: null
        // });       
        return(
            <div>
                <Form onSubmit={this.state.name === undefined ? this.signIn.bind(this) : this.register.bind(this) }>
                    {
                        this.state.name !== undefined && <FloatingLabelInput type={"text"} labelName={this.props.currLang.parents_name}
                        onChange={(e) => {e.preventDefault();
                        this.handleName(e.currentTarget.value)}}
                        name={"NAME"}
                        value={this.state.name} 
                        isValid={this.state.name !== ""} 
                        errorMessage={this.props.currLang.name_warning} /> 
                    }
                        
                    <FloatingLabelInput type={"email"} labelName={this.props.currLang.parents_email} 
                            onChange={(e) => {e.preventDefault();
                            this.handleEmail(e.currentTarget.value)}}
                            name={"EMAIL"}
                            value={this.state.email} 
                            isValid={this.isValidEmail(this.state.email)} 
                            errorMessage={this.getValidationMessages('EMAIL')} />
    
                    <FloatingLabelInput onFocus={this.passwordOnFocus.bind(this)} ref="password" type={"password"} labelName={this.props.currLang.parents_password} 
                            onChange={(e) => {e.preventDefault();this.handlePassword(e.currentTarget.value)}}
                            name={"PASSWORD"}
                            value={this.state.password} 
                            isValid={this.isValidPassword(this.state.password)} 
                            errorMessage={this.getValidationMessages('PASSWORD')}/>
                            
                    <Image onClick={this.changePasswordEye} className={!this.state.showPassword ? "eyes closed_eye" : "eyes open_eye"}
                        src={!this.state.showPassword ? closedEye : openEye} 
                            circle
                        />
                        {
                         this.state.showErrorMessage ? (<span className="error_message">{this.state.errorMessage}</span>) : ""
                        }

                    {
                       this.state.name === undefined && <Link className="link" to={"/restore-password"}>{this.props.currLang.forgot_password}</Link>
                    }
                    <Button className="btn_submit" disabled={this.state.disableButton || !this.props.agreement} type="submit"> 
                        <Image style={{width: 70 + 'px'}} src={this.state.disableButton || !this.props.agreement ? disableSubmitBtn : submitBtn} 
                            circle
                        />
                    </Button>
                </Form>
                <RegisterModal 
                    showModal={this.props.registerModal.showModal} 
                    closeModal={this.closeRegisterModal.bind(this)}
                    registerUser={this.redirectToRegister.bind(this)}
                    currLang={this.props.currLang.modal}/>

            </div>
        );
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

    closeRegisterModal() {
        this.props.setShowModal(false);
    }

    redirectToRegister() {
        this.props.setShowModal(false);
        this.props.history.push("/register");
    }

    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        var email = this.state.email
        var password = this.state.password;
        
        //    Sends package and handling the respond.
        Login(email, password).then(res => {  // When respond package is with status 200
            let token = res.data.authToken;
            let parentId = res.data.parentId;
            this.props.setUser({
                id: parentId,
                authKey: token
            });
            this.props.setShowLogoutIcon(true);
            localStorage._id = parentId;
            localStorage._token = token;
            this.props.history.push('/keepers-dashboard'); 
        }).catch(error => { // When respond package is with error status - 400 ...
            if(error.response.data.code === '994') {    // parent not exists
                this.props.setShowModal(true);
            } else if(error.response.data.code === '935') { // password is wrong
                this.setState({
                    ...this.state,
                    showErrorMessage: true,
                    errorMessage: this.props.currLang.error_935
                });
            }
        });
    }

    register(event) {
        event.preventDefault(); // cancel auto refresh.
        var parentName = this.state.name;
        var email = this.state.email;
        var password = this.state.password;

        Register(parentName, email, password).then(res => {
            console.log(res);
            this.props.history.push('/login'); 
        }).catch(error => {
            if(error.response.data.code === "993") {
                this.setState({
                    ...this.state,
                    showErrorMessage: true,
                    errorMessage: this.props.currLang.error_993
                });
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        registerModal: state.reducerA,
        wrongPassword: state.reducerA.wrongPassword,
        agreement: state.reducerA.agreement,
        currLang: state.lang.currLang.login_page,
        showIcon: state.reducerA.showIcon
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setShowModal: (val) => {
            dispatch({
                type: "SET_SHOW_MODAL",
                value: val
            });
        },
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                value: user
            });
        }, 
        setShowLogoutIcon: (val) => {
            dispatch({
                type: "SET_ICON_VISIBILITY",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);