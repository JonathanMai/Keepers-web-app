import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import { RegisterModal } from '../modals/RegisterModal';
import { Login } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SignInForm extends React.Component {
    render() {
        return(
            <div>
                <Form onSubmit={this.signIn.bind(this)}>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>Email</ControlLabel>{' '}
                        <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} /> 
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlinePassword" validationState={this.props.wrongPassword}>
                        <ControlLabel>Password</ControlLabel>{' '}
                        <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref} />{' '}
                        <Button type="submit">Sign In</Button>
                    </FormGroup>
                </Form>
                <Link to={"/restore-password"}>Forgot Password</Link>
                <RegisterModal 
                    showModal={this.props.registerModal.showModal} 
                    closeModal={this.closeRegisterModal.bind(this)}
                    registerUser={this.redirectToRegister.bind(this)}/>

            </div>
        );
    }

    closeRegisterModal() {
        this.props.setShowModal(false);
    }

    redirectToRegister() {
        this.props.history.push("/register");
    }

    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        var email = this.email.value;
        var password = this.password.value;
        
        console.log("email", email, "passowrd", password);
        //    Sends package and handling the respond.
        Login(email, password).then(res => {  // When respond package is with status 200
            let token = res.data.authToken;
            let parentId = res.data.parentId;
            this.props.setUser({
                id: parentId,
                authKey: token
            });
            this.props.history.push('/keepers-dashboard');   // todo: redirect to main menu.
        }).catch(error => { // When respond package is with error status - 400 ...
            if(error.response.data.message === 'Email does not exists') {
                this.props.setShowModal(true);
            } else if(error.response.data.message === 'Password does not match') {
                this.props.setPasswordErrors("error");
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        registerModal: state.reducerA,
        wrongPassword: state.reducerA.wrongPassword
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
        setPasswordErrors: (error) => {
            dispatch({
                type: "WRONG_PASSWORD_VALIDATION",
                value: error
            });
        },
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                value: user
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);