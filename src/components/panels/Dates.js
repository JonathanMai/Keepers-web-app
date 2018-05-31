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

        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleWeekSelect = this.handleWeekSelect.bind(this);
        this.handleMonthSelect = this.handleMonthSelect.bind(this);

    }

    handleDaySelect() {
        this.props.setDate([moment().subtract(1,'days'), moment().subtract(1,'days')]);
        this.refs.day.className = "date_active";
        this.refs.week.className = "date_button";
        this.refs.month.className = "date_button";
        this.props.setText("");
    }

    handleWeekSelect() {
        this.props.setDate([moment().subtract(1,'week').startOf('day'), moment()]);
        this.refs.day.className = "date_button";
        this.refs.week.className = "date_active";
        this.refs.month.className = "date_button";
        this.props.setText("");
    }

    handleMonthSelect() {
        this.props.setDate([moment().subtract(1,'month').startOf('day'), moment()]);
        this.refs.day.className = "date_button";
        this.refs.week.className = "date_button";
        this.refs.month.className = "date_active";
        this.props.setText("");
    }

    datepicker(ev, picker) { // TODO: fix two days pick logic.
        if(ev.type === 'apply') {
            // console.log
            console.log(picker.startDate, picker.endDate)
            // console.log(!picker.startDate.isSame(this.props.dates[0], 'date') || !picker.endDate.startOf('day').isSame(this.props.dates[1]), 'date'))
            if(!picker.startDate.isSame(this.props.startDate, 'date') || !picker.endDate.isSame(this.props.endDate, 'date')){
                let text = picker.startDate.format("MMM DD, YYYY") + " - " + picker.endDate.format("MMM DD, YYYY");
                this.props.setText(text);
                this.props.setDate([picker.startDate, picker.endDate.startOf('day')]);
            }
        }
    }

    render() {
        let maxSpans = {
            "months": 1
        }
        return (
            <div>
                <div className="choose_dates">
                    <span className="date_title">&#128065; Graph of abusive conversation </span>
                    <span className="dates">
                        <span ref="day" className="date_button" onClick={this.handleDaySelect}> Day </span>
                        <span>|</span>
                        <span ref="week" className="date_button" onClick={this.handleWeekSelect}> Week </span>
                        <span>|</span>
                        <span ref="month" className="date_button" onClick={this.handleMonthSelect}> Month </span>
                        
                        <DateRangePicker
                            dateLimit={maxSpans}
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            opens={'left'}
                            // showDropdowns={true}
                            maxDate={moment()}
                            autoApply={true}
                            autoUpdateInput={true}
                            onEvent={this.datepicker.bind(this)}
                        >
                            <div className="relative">
                                <input  className="choose_date_input" readOnly placeholder="Want to choose a date?" value={this.props.text}/>
                                <span className="arrow_down"> &#9660; </span>
                            </div>
                        </DateRangePicker>
                        

                    </span>
                </div>
                <hr className="line_hr"/>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        startDate: state.dashboardInfo.startDate,
        endDate: state.dashboardInfo.endDate,
        range: state.dashboardInfo.datesRange,
        text: state.dashboardInfo.datesText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: (val) => {
            dispatch({
                type: "SET_DATES",
                value: val
            });
        },
        setText: (val) => {
            dispatch({
                type: "SET_TEXT",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);