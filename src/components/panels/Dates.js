import React, { Component } from 'react';
import '../../styles/dates.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { connect } from 'react-redux';
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

class Dates extends Component {
    constructor(props) {
        super(props);
        // this.props.setDate();
        console.log(this.props);
    }
    render() {
        let maxSpans = {
            "days": 30
        }
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
                        <DateRangePicker
                            dateLimit={maxSpans}
                            startDate={this.props.dates[0]}
                            endDate={this.props.dates[1]}
                            opens={'left'}
                            // showDropdowns={true}
                            maxDate={moment()}
                            autoApply={true}
                            autoUpdateInput={true}
                            onEvent={this.datepicker.bind(this)}
                        >
                            <input  className="choose_date_input" readOnly placeholder="Want to choose a date? &#9660;" />
                        </DateRangePicker>
                        

                    </span>
                </div>
                <hr className="line_hr"/>
            </div>
        );
    }

    datepicker(ev, picker) {
        console.log(ev)
        if(ev.type === 'apply') {
            this.props.setDate([picker.startDate, picker.endDate.startOf('day')]);
        }
        console.log(this.props);
    }
}


const mapStateToProps = (state) => {
    return {
        dates: state.dashboardInfo.dates,
        range: state.dashboardInfo.datesRange
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: (val) => {
            dispatch({
                type: "SET_DATES",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);