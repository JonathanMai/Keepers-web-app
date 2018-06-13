import React from 'react';
import RestoreForm from '../forms/RestorePasswordForm';
import EnterEmailForm from '../forms/EnterEmailForm';
import wave from '../../assets/Wave_main.png';
import { Image } from 'react-bootstrap';

class RestartPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.state = {
            page: 1
        }
    }

    render() {
        let renderPage;
        if(this.state.page === 1) {
            renderPage = (<EnterEmailForm nextPage={this.goToNextPage}/>)
        } else {
            renderPage = (<RestoreForm history={this.props.history}/>)            
        }
        return (<div>
                {renderPage}
                <Image className="wave" src={wave} />  
            </div>
        );    
    }

    goToNextPage() {
        this.setState({
            ...this.state,
            page: this.state.page + 1
        });
    }
}

export default RestartPasswordPage;