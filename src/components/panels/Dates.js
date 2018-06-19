import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
import '../../styles/dates.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

/*
    Dates panel is a panel in the top panel that let the user pick the dates he wants the data to be shown from.
    Handle the start date and end date from redux to change the information on all charts and messages.
*/
class Dates extends Component {
    constructor(props) {
        super(props);
        this.bindFunctions();
    }
    
    componentDidMount() {
        // sets the dates to locale date.
        this.props.startDate.locale(this.props.lang.language);
        this.props.endDate.locale(this.props.lang.language);
        this.props.setDate([moment(this.props.startDate), moment(this.props.endDate)]);
        if(this.props.activeDate > 2) { // change the date picker input text to show the text in new locale.
            this.props.setText(moment(this.props.startDate).format("MMM DD, YYYY") + " - " + moment(this.props.endDate).format("MMM DD, YYYY"));
        }
        this.handleButtons(this.props.activeDate);
    }

    componentDidUpdate(){
        this.handleButtons(this.props.activeDate);
    }

    // bind all functioon to work with "this".
    bindFunctions() {
        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleWeekSelect = this.handleWeekSelect.bind(this);
        this.handleMonthSelect = this.handleMonthSelect.bind(this);
        this.backDateOnClickListener = this.backDateOnClickListener.bind(this);
        this.forwardDateOnClickListener = this.forwardDateOnClickListener.bind(this);
    }

    // handle day select - shows last day.
    handleDaySelect() {
        this.props.setDate([moment().startOf('day'), moment()]); // set dates.
        this.props.setText(""); // date picker input is now default.
        this.props.setActive(0); // set active to day.
        this.handleButtons(0); 
    }

    // handle week select - shows last week.
    handleWeekSelect() {
        this.props.setDate([moment().startOf('week'), moment()]); // set dates.
        this.props.setText(""); // date picker input is now default.
        this.props.setActive(1); // set active to week.
        this.handleButtons(1);
    }

    // handle month select - shows last month.
    handleMonthSelect() {
        this.props.setDate([moment().startOf('month'), moment()]); // set dates.
        this.props.setText(""); // date picker input is now default.
        this.props.setActive(2); // set active to month.
        this.handleButtons(2);
    }

    // handle all buttons - which button to show/hide.
    // active indicates which button is active and by that we can set all buttons.
    handleButtons(active) {
        switch(active){
            // day is active.
            case 0:
                this.handleActive(this.refs.day, this.refs.date1);
                this.handleInactive(this.refs.week, this.refs.date2);
                this.handleInactive(this.refs.month, this.refs.date3);
                break;
            // week is active.
            case 1:
                this.handleInactive(this.refs.day, this.refs.date1);
                this.handleActive(this.refs.week, this.refs.date2);
                this.handleInactive(this.refs.month, this.refs.date3);
                break;
            // month is active.
            case 2:
                this.handleInactive(this.refs.day, this.refs.date1);
                this.handleInactive(this.refs.week, this.refs.date2);
                this.handleActive(this.refs.month, this.refs.date3);
                break;
            // day picker is used.
            default:
                this.handleInactive(this.refs.day, this.refs.date1);
                this.handleInactive(this.refs.week, this.refs.date2);
                this.handleInactive(this.refs.month, this.refs.date3);
                break;
        }
    }

    // change class to active.
    handleActive(activate, text) {
        activate.className = "date_active";
        text.className = "tiny";
    }

    // change class to inactive.
    handleInactive(deactivate, text) {
        deactivate.className = "date_button";
        text.className = "normal";
    }

    // date picker logic.
    datepicker(ev, picker) {
        if(ev.type === 'apply') {

            // defines the locale of start/end date.
            let pickerStartDate = moment(picker.startDate);
            let pickerEndDate = moment(picker.endDate);
            pickerStartDate.locale(this.props.lang.language);
            pickerEndDate.locale(this.props.lang.language);
            
            // sets locale of start/end date in redux.
            this.props.startDate.locale(this.props.lang.language);
            this.props.endDate.locale(this.props.lang.language);
            
            let textSet = false; // indicates if text already changed.
            if(this.props.activeDate !== 3){ // when date picker wasnt active from before.
                textSet = true; // text will be set in here.
                this.handleButtons(3);
                this.props.setActive(3);
                let text = pickerStartDate.format("MMM DD, YYYY") + " - " + pickerEndDate.format("MMM DD, YYYY"); // date picker text.
                this.props.setText(text);
            }

            if(!pickerStartDate.isSame(this.props.startDate, 'date') || !pickerEndDate.isSame(this.props.endDate, 'date')){ // checks if date picked is new.
                if(!textSet) { // checks if the text already set in last if.
                    let text = pickerStartDate.format("MMM DD, YYYY") + " - " + pickerEndDate.format("MMM DD, YYYY");
                    this.props.setText(text);
                }
                this.props.setDate([pickerStartDate, pickerEndDate]);
            }
        }
    }

    // rewind dates listener.
    // listener of the back arrow click.
    backDateOnClickListener(active) {
        switch(active) {
            // day active - rewind one day.
            case 0:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'days'), moment(this.props.endDate).subtract(1, 'days')]);
                break;
            // week active - rewind one week.
            case 1:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'week').startOf('week'), moment(this.props.startDate).subtract(1, 'week').endOf('week')]);
                break;
            // month active - rewind one month.
            case 2:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'month').startOf('month'), moment(this.props.startDate).subtract(1, 'month').endOf('month')]);
                break;
            default: 
                break;
        }
    }

    // forward dates listener.
    // listener of the forward arrow click.
    forwardDateOnClickListener(active) {
        let start = moment(this.props.startDate);
        let end = moment(this.props.endDate).endOf('day');
        let currDate = moment().endOf('day');
        let newStart;
        if(!end.isSame(currDate)) { // checks if the next day/week/month is after current date - if not get in the condition.
            switch(active) {
            // day active - forward one day.
            case 0:                
                this.props.setDate([moment(start).add(1, 'days').startOf('day'), moment(end).add(1, 'days').startOf('day')]);
                break;
            // week active - forward one week.
            case 1:
                newStart = start.add(1, 'week');
                if(currDate.diff(newStart) >= 0)
                    this.props.setDate([newStart, currDate.diff(moment(newStart).endOf('week').endOf('day')) > 0 ? moment(newStart).endOf('week').endOf('day') : currDate]);
                break;
            // month active - forward one month.
            case 2:
                newStart = start.add(1, 'month');
                if(currDate.diff(newStart) >= 0)
                    this.props.setDate([newStart, currDate.diff(moment(newStart).endOf('month').endOf('day')) > 0 ? moment(newStart).endOf('month').endOf('day') : currDate]);
                break;
            default:
                break;
            }
        }
    }

    render() {
        let maxSpans = {
            "months": 1
        }
        let panel = 
            (<div>
                <div className="choose_dates">
                    <div className="date_title">&#128065; {this.props.lang.title} </div>
                        <div className="dates">
                            {/* day button  */}
                            <div ref="day" className="date_active"> 
                                <span ref="date1" className="span_date tiny" onClick={this.handleDaySelect}>{this.props.lang.day}</span>
                                <br/>
                                {this.props.activeDate === 0 && <Arrows active={0} rewind={this.backDateOnClickListener} forward={this.forwardDateOnClickListener} startDate={this.props.startDate} endDate={this.props.endDate} isOneDay={this.props.isOneDay} lang={this.props.lang.language} />}
                            </div>

                            {/* week button  */}
                            <span className="c">|</span>
                            <div ref="week" className="date_button"> 
                                <span ref="date2" className="span_date" onClick={this.handleWeekSelect}>{this.props.lang.week}</span>
                                <br/>
                                {this.props.activeDate === 1 && <Arrows active={1} rewind={this.backDateOnClickListener} forward={this.forwardDateOnClickListener} startDate={this.props.startDate} endDate={this.props.endDate} isOneDay={this.props.isOneDay} lang={this.props.lang.language} />}
                            </div>

                            {/* month button  */}
                            <span className="c">|</span>
                            <div ref="month" className="date_button">
                                <span ref="date3" className="span_date" onClick={this.handleMonthSelect}> {this.props.lang.month} </span> 
                                <br/>
                                {this.props.activeDate === 2 && <Arrows active={2} rewind={this.backDateOnClickListener} forward={this.forwardDateOnClickListener} startDate={this.props.startDate} endDate={this.props.endDate} isOneDay={this.props.isOneDay} lang={this.props.lang.language} />}
                            </div>
            
                        {/* date range picker input. */}
                        <DateRangePicker
                            locale={{        
                                "daysOfWeek": this.props.lang.date_picker_days,
                                "monthNames": this.props.lang.date_picker_months
                                }}
                            dateLimit={maxSpans}
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            autoUpdateInput={false}
                            opens={'left'}
                            maxDate={moment()} // disable all dates after today.
                            autoApply={true}
                            onEvent={this.datepicker.bind(this)}
                        >
                            <div className="relative">
                                <input  className="choose_date_input" readOnly placeholder={this.props.lang.date_picker_placeholder} value={this.props.text}/>
                                <span className="arrow_down"> &#10095; </span>
                            </div>
                        </DateRangePicker>
                        

                    </div>
                </div>
                <hr className="line_hr"/>
            </div>
        );

        return (panel);
    }
}

// arrows statless component.
// the arrows shown around the button - let the user rewind/forward dates.
function Arrows(props) {
    // props.startDate.locale(props.lang);
    // moment(props.endDate).locale(props.lang);
    console.log(props)
    let start = moment(props.startDate);
    let end = moment(props.endData);
    start.locale(props.lang);
    end.locale(props.lang);
    let text = start.format("MMM - ddd DD") ;
    if(!props.isOneDay) {
        console.log(text)
        text += " - " + end.format("ddd DD");
    }
    return (
        <div>
            <span className="btn_left" onClick={props.rewind.bind(this, props.active)} >&#10094;</span>
                {text}
            <span className="btn_right" onClick={props.forward.bind(this, props.active)} >&#10095;</span>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        startDate: state.DashboardInfo.startDate,       // gets the start date the user looking for the information to start from throguh redux.
        endDate: state.DashboardInfo.endDate,           // gets the end date the user looking for the information to end using redux.
        range: state.DashboardInfo.datesRange,          // gets the range of the dates the user picked to see the data.
        text: state.DashboardInfo.datesText,            // date picker text.
        isOneDay: state.DashboardInfo.isOneDay,         // gets the boolean to indicate if the data is for one day.
        activeDate: state.DashboardInfo.activeDates,    // active dates indicate which button user clicked.
        lang: state.DisplayLanguage.currLang                       // use language from redux - here lets the texts the option to change all page languages.
    };
};

// redux functions.
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
        },
        setActive: (val) => {
            dispatch({
                type: "SET_ACTIVE",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);