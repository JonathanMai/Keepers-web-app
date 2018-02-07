import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import { Register } from '../../serviceAPI';

class RegisterForm extends React.Component {
    render() {
        return (
        <div>
        <Form onSubmit={event => this.register(event)}>
            <FormGroup controlId="formInlineName">
                <ControlLabel>Parent's Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Parent's Name" inputRef={ref => this.name = ref}/>
            </FormGroup>{' '}
            <FormGroup controlId="formInlineEmail">
                <ControlLabel>Email</ControlLabel>{' '}
                <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref}/>
            </FormGroup>{' '}
            <FormGroup controlId="formInlinePassword" >
                <ControlLabel>Password</ControlLabel>{' '}
                <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref}/>{' '}
                <Button type="submit">Sign Up</Button>
            </FormGroup>
        </Form>
    </div>);
    }

    register(event) {
        event.preventDefault(); // cancel auto refresh.
        var name = this.name.value;
        var email = this.email.value;
        var password = this.password.value;
        Register(name, email, password).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error.response);
        });
    }
}

export default RegisterForm;