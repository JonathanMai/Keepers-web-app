import React, { Component } from 'react';
import '../../styles/dates.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
import 'bootstrap-daterangepicker/daterangepicker.css';

class Dates extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            datePickerStart: this.props.startDate,
            datePickerEnd: this.props.endDate
        });
        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleWeekSelect = this.handleWeekSelect.bind(this);
        this.handleMonthSelect = this.handleMonthSelect.bind(this);
        this.backDateOnClickListener = this.backDateOnClickListener.bind(this);
        this.forwardDateOnClickListener = this.forwardDateOnClickListener.bind(this);
    }
    
    componentDidMount() {
        this.props.startDate.locale(this.props.lang.language);
        this.props.endDate.locale(this.props.lang.language);
        this.props.setDate([moment(this.props.startDate), moment(this.props.endDate)]);
        if(this.props.activeDate > 2) {
            this.props.setText(moment(this.props.startDate).format("MMM DD, YYYY") + " - " + moment(this.props.endDate).format("MMM DD, YYYY"));
        }
        this.handleButtons(this.props.activeDate);
    }

    componentDidUpdate(){
        this.handleButtons(this.props.activeDate);
    }

    handleDaySelect() {
        this.props.setDate([moment().startOf('day'), moment()]);
        this.props.setText("");
        this.props.setActive(0);
        this.handleButtons(0);
    }

    handleWeekSelect() {
        this.props.setDate([moment().startOf('week'), moment()]);
        this.props.setText("");
        this.props.setActive(1);
        this.handleButtons(1);
    }

    handleMonthSelect() {
        this.props.setDate([moment().startOf('month'), moment()]);
        this.props.setText("");
        this.props.setActive(2);
        this.handleButtons(2);
    }

    handleButtons(active) {
        switch(active){
            case 0:
                this.handleActive(this.refs.day, this.refs.date1);
                this.handleInactive(this.refs.week, this.refs.date2);
                this.handleInactive(this.refs.month, this.refs.date3);
                break;
            case 1:
                this.handleInactive(this.refs.day, this.refs.date1);
                this.handleActive(this.refs.week, this.refs.date2);
                this.handleInactive(this.refs.month, this.refs.date3);
                break;
            case 2:
                this.handleInactive(this.refs.day, this.refs.date1);
                this.handleInactive(this.refs.week, this.refs.date2);
                this.handleActive(this.refs.month, this.refs.date3);
                break;
            default:
                this.handleInactive(this.refs.day, this.refs.date1);
                this.handleInactive(this.refs.week, this.refs.date2);
                this.handleInactive(this.refs.month, this.refs.date3);
                break;
        }
    }

    handleActive(activate, text) {
        activate.className = "date_active";
        text.className = "tiny";
    }

    handleInactive(deactivate, text) {
        deactivate.className = "date_button";
        text.className = "normal";
    }

    datepicker(ev, picker) {
        if(ev.type === 'apply') {
            let textSet = false;
            let pickerStartDate = moment(picker.startDate);
            let pickerEndDate = moment(picker.endDate);
            
            pickerStartDate.locale(this.props.lang.language);
            pickerEndDate.locale(this.props.lang.language);
            
            this.props.startDate.locale(this.props.lang.language);
            this.props.endDate.locale(this.props.lang.language);

            if(this.props.activeDate !== 3){
                textSet = true;
                this.handleButtons(3);
                this.props.setActive(3);
                let text = pickerStartDate.format("MMM DD, YYYY") + " - " + pickerEndDate.format("MMM DD, YYYY");
                this.props.setText(text);
            }

            if(!pickerStartDate.isSame(this.props.startDate, 'date') || !pickerEndDate.isSame(this.props.endDate, 'date')){
                if(!textSet) {
                    let text = pickerStartDate.format("MMM DD, YYYY") + " - " + pickerEndDate.format("MMM DD, YYYY");
                    this.props.setText(text);
                }
                this.props.setDate([pickerStartDate, pickerEndDate]);
            }
        }
    }

    backDateOnClickListener(active) {
        switch(active) {
            case 0:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'days'), moment(this.props.endDate).subtract(1, 'days')]);
                break;
            case 1:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'week').startOf('week'), moment(this.props.startDate).subtract(1, 'week').endOf('week')]);
                break;
            case 2:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'month').startOf('month'), moment(this.props.startDate).subtract(1, 'month').endOf('month')]);
                break;
        }
    }

    forwardDateOnClickListener(active) {
        let start = moment(this.props.startDate);
        let end = moment(this.props.endDate).endOf('day');
        let currDate = moment().endOf('day');
        let newStart;
        if(!end.isSame(currDate)) {
            switch(active) {
                case 0:                
                this.props.setDate([moment(start).add(1, 'days').startOf('day'), moment(end).add(1, 'days').startOf('day')]);
                break;
            case 1:
                newStart = start.add(1, 'week');
                if(currDate.diff(newStart) >= 0)
                    this.props.setDate([newStart, currDate.diff(moment(newStart).endOf('week').endOf('day')) > 0 ? moment(newStart).endOf('week').endOf('day') : currDate]);
                break;
            case 2:
                newStart = start.add(1, 'month');
                if(currDate.diff(newStart) >= 0)
                    this.props.setDate([newStart, currDate.diff(moment(newStart).endOf('month').endOf('day')) > 0 ? moment(newStart).endOf('month').endOf('day') : currDate]);
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
                            <div ref="day" className="date_active"> 
                                <span ref="date1" className="span_date tiny" onClick={this.handleDaySelect}>{this.props.lang.day}</span>
                                <br/>
                                {this.props.activeDate === 0 && <Arrows active={0} rewind={this.backDateOnClickListener} forward={this.forwardDateOnClickListener} startDate={this.props.startDate} endDate={this.props.endDate} isOneDay={this.props.isOneDay} lang={this.props.lang.language} />}
                            </div>
                            <span className="c">|</span>
                            <div ref="week" className="date_button"> 
                                <span ref="date2" className="span_date" onClick={this.handleWeekSelect}>{this.props.lang.week}</span>
                                <br/>
                                {this.props.activeDate === 1 && <Arrows active={1} rewind={this.backDateOnClickListener} forward={this.forwardDateOnClickListener} startDate={this.props.startDate} endDate={this.props.endDate} isOneDay={this.props.isOneDay} lang={this.props.lang.language} />}
                            </div>
                            <span className="c">|</span>
                            <div ref="month" className="date_button">
                                <span ref="date3" className="span_date" onClick={this.handleMonthSelect}> {this.props.lang.month} </span> 
                                <br/>
                                {this.props.activeDate === 2 && <Arrows active={2} rewind={this.backDateOnClickListener} forward={this.forwardDateOnClickListener} startDate={this.props.startDate} endDate={this.props.endDate} isOneDay={this.props.isOneDay} lang={this.props.lang.language} />}
                            </div>
            
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
                            maxDate={moment()}
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
            </div>);
        return (panel);
    }
}

function Arrows(props) {
    props.startDate.locale(props.lang);
    moment(props.endDate).locale(props.lang);
    let text = moment(props.startDate).format("MMM") + " - " + moment(props.startDate).format("ddd DD");
    if(!props.isOneDay) {
        text += " - " + moment(props.endDate).format("ddd DD");
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
        startDate: state.dashboardInfo.startDate,
        endDate: state.dashboardInfo.endDate,
        range: state.dashboardInfo.datesRange,
        text: state.dashboardInfo.datesText,
        isOneDay: state.dashboardInfo.isOneDay,
        activeDate: state.dashboardInfo.activeDates,
        lang: state.lang.currLang
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