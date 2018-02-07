import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';


export const EnterEmailForm = (props) => {
    return(
        <div className="container" style={{marginTop: 20}}>
            Forgot your password? don't worry, just enter your email address below and we'll send you some instructions. 
            <Form onSubmit={(e) => {
                e.preventDefault();
                props.submit(this.email.value);}}>
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} /> 
                    <Button type="submit" style={{marginTop: 10}}>Send Restart Code</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export const RestoreForm = (props) => {
    return(
        <div className="container" style={{marginTop: 20}}>
            Password reset
            <Form onSubmit={(e) => {
                e.preventDefault();
                props.submit(this.email.value, this.password.value, this.code.value)}}>
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="Email" inputRef={ref => this.email = ref} /> 
                </FormGroup>{' '}
                <FormGroup controlId="formInlinePassword">
                    <ControlLabel>New Password</ControlLabel>{' '}
                    <FormControl type="password" placeholder="Password" inputRef={ref => this.password = ref} />
                </FormGroup>
                <FormGroup controlId="formInlineCode">
                    <ControlLabel>Code</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Code" inputRef={ref => this.code = ref} />{' '}
                    <Button type="submit" style={{marginTop: 10}}>Restart Password</Button>
                </FormGroup>
            </Form>
        </div>
    );
}