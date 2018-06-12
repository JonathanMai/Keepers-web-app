import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import { Register } from '../../serviceAPI';
import FloatingLabelInput from "react-floating-label-paper-input"; 


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.isValidEmail = this.isValidEmail.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.state = {
            email: "",
            parentName: "",
            password: "",
            disableButton: true
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
            case "EMAIL":
               return "Invalid email address";
            case "NAME":
               return "Enter name";
            case "PASSWORD":
                return "Your password must be between 6 and 15 characters length";
        }
    }

    enableButton(type, input) {
        let emailIsValid, nameIsValid, passwordIsValid;

        switch(type){
            case 'name':
                emailIsValid = this.isValidEmail(this.state.email);
                nameIsValid = input;
                passwordIsValid = this.isValidPassword(this.state.password);
                break;
            case 'email':
                emailIsValid = this.isValidEmail(input);
                nameIsValid = this.state.parentName;
                passwordIsValid = this.isValidPassword(this.state.password);
                break;
            case 'password':
                emailIsValid = this.isValidEmail(this.state.email);
                nameIsValid = this.state.parentName;
                passwordIsValid = this.isValidPassword(input);
                break;
            default:
                emailIsValid = this.isValidEmail(this.state.email);
                nameIsValid = this.state.parentName;
                passwordIsValid = this.isValidPassword(this.state.password);
        } 
        if(this.state.disableButton && emailIsValid && nameIsValid !== "" && passwordIsValid){
            return false;
        }
        else if(!this.state.disableButton  && (!emailIsValid || !passwordIsValid || nameIsValid === "")){
            return true;
        }
        return this.state.disableButton;
    }
    
    handleEmail(email){
        this.setState({
            ...this.state,
            email: email,
            disableButton: this.enableButton('email', email)
        });
    }

    handleName(parentName){
        this.setState({
            ...this.state,
            parentName: parentName,
            disableButton: this.enableButton('name', parentName)
        });
    }


    handlePassword(password){ 
        this.setState({
            ...this.state,
            password: password,
            disableButton: this.enableButton('password', password)
        });
    }

    resetPass(event) {
        event.preventDefault(); // prevent auto refresh the page after submit.
        this.register(event);
    }

    render() {
        return (
        <div>
        {/* <Form onSubmit={event => this.register(event)}>
            <FormGroup controlId="formInlineparentName"> */}
        <Form onSubmit={this.register.bind(this)}>

            <FloatingLabelInput type={"parentName"} labelName={"PARENT'S NAME"} 
                onChange={(e) => {e.preventDefault();
                    this.handleName(e.currentTarget.value)}}
                parentName={"NAME"}
                value={this.state.parentName} 
                isValid={this.state.parentName !== ""} 
                errorMessage={this.getValidationMessages('NAME')}/>

            {' '}

            <FloatingLabelInput type={"email"} labelName={"PARENT'S EMAIL"} 
                onChange={(e) => {e.preventDefault();
                this.handleEmail(e.currentTarget.value)}}
                parentName={"EMAIL"}
                value={this.state.email} 
                isValid={this.isValidEmail(this.state.email)} 
                errorMessage={this.getValidationMessages('EMAIL')} />

            {' '}

            <FloatingLabelInput type={"password"} labelName={"PARENT'S PASSWORD"} 
                onChange={(e) => {e.preventDefault();this.handlePassword(e.currentTarget.value)}}
                parentName={"PASSWORD"}
                value={this.state.password} 
                isValid={this.isValidPassword(this.state.password)} 
                errorMessage={this.getValidationMessages('PASSWORD')}/>
            <Button type="submit" disabled={this.state.disableButton} style={{marginTop: 10}}>register</Button>

        </Form>
    </div>);
    }

    
}

export default RegisterForm;