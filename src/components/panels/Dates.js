import React, { Component } from 'react';
import '../../styles/dates.css';

class Dates extends Component {
    render() {
        return (
            <div>
                <div className="choose_dates">
                    <span className="date_title">&#128065; Graph of abusive conversation </span>
                    <span className="dates">
                        <span className="day"> Day </span>
                        <span>|</span>
                        <span className="week"> Week </span>
                        <span>|</span>
                        <span className="month"> Month </span>
                        <input onClick={this.datepicker} className="choose_date_input" readOnly placeholder="Want to choose a date? &#9660;  " />
                    </span>
                </div>
                <hr className="line_hr"/>
            </div>
        );
    }

    datepicker() {
        console.log("ima date picker");
    }
}

export default Dates;