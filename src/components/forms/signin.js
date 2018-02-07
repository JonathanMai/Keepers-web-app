import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import RegisterModal from './RegisterModal'
import Login from '../serviceAPI'
import { connect } from 'react-redux'

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validPassword: null,
        };
    }
    render() {
        return(
            <div>
                <Form onSubmit={this.signIn.bind(this)}>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>Email</ControlLabel>{' '}
                        <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlinePassword" validationState={this.state.validPassword}>
                        <ControlLabel>Password</ControlLabel>{' '}
                        <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref} />{' '}
                        <Button type="submit">Sign In</Button>
                    </FormGroup>
                </Form>
                <RegisterModal redirectTo={this.redirectToRegister.bind(this)} />
            </div>
        );
    }

    redirectToRegister() {
        this.props.history.push("/register");
    }

    
    signIn(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        var email = this.email.value;
        var password = this.password.value;
        Login(email, password).then(res => {
            console.log(res);   // todo: redirect to main menu.
        }).catch(error => {
            if(error.response.data.message === 'Email does not exists') {
                this.props.setShowModal(true);
            } else if(error.response.data.message === 'Password does not match') {
                this.setState({
                    validPassword: "error"
                });
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        registerModal: state.reducerA
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setShowModal: (val) => {
            dispatch({
                type: "SET_SHOW_MODAL",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);