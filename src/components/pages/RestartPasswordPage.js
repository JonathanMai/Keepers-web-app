import React from 'react';
import RestoreForm from '../forms/RestorePasswordForm';
import EnterEmailForm from '../forms/EnterEmailForm';
import { Image } from 'react-bootstrap';
import wave from '../../assets/login/Wave_main.png';

/*
    Restart password page component.
    Its renders when the user asked for restart password.
    Once he clicked, the render function has page number from state -> page 1: enter email, page 2: enter code, email and new password.
 */
class RestartPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
        this.goToNextPage = this.goToNextPage.bind(this);
    }

    // get called from the EnterEmailFrom component if the user enter corrent email 
    // he get redirected to the next page to the RestoreForm.
    goToNextPage() {
        this.setState({
            ...this.state,
            page: this.state.page + 1
        });
    }

    render() {
        let renderPage;
        if(this.state.page === 1) { // still not asked for password recovery
            renderPage = (<EnterEmailForm nextPage={this.goToNextPage}/>)
        } else {                    // the server already sent him a code verification
            renderPage = (<RestoreForm history={this.props.history}/>)            
        }
        return (<div>
                {renderPage}
                <Image className="wave" src={wave} />  
            </div>
        );    
    }
}

export default RestartPasswordPage;