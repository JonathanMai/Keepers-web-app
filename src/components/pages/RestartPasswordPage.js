import React from 'react';
import { SendRestartCode, ResetPassword } from '../../serviceAPI';
import { connect } from 'react-redux';
import { EnterEmailForm, RestoreForm } from '../forms/RestorePasswordForm';

class RestartPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    render() {
        var renderPage;

        if(this.state.page == 1) {
            renderPage = (<EnterEmailForm submit={this.sendRestartCode.bind(this)}/>)
        }

        else {
            renderPage = (<RestoreForm submit={this.restartPassword.bind(this)}/>)            
        }

        return renderPage;
    }

    sendRestartCode(email) {
       // Sends package and handling the respond.
        SendRestartCode(email).then(res => {  // When respond package is with status 200
            this.setState({
                page: 2
            });
        }).catch(error => { // When respond package is with error status - 400 ...
                console.log(error.response);
            }
        );
    }

    restartPassword(email, password, code) {
       // Sends package and handling the respond.
        ResetPassword(email, password, code).then(res => {  // When respond package is with status 200
            this.props.history.push("/login");   // todo: redirect to main menu.
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.response);
            if(error.response.data.message === "Email does not exists") {
                // TODO: change field color to red after mistake.
            } else if(error.response.data.code === "Confirmation code is not valid") {
                // TODO: change field color to red after mistake.
            }
        });
    }
}

export default RestartPasswordPage;