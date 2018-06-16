import React, { Component } from 'react';
import '../../styles/dates.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

class Dates extends Component {
    constructor(props) {
        super(props);
        //moment.locale(props.lang.language);
        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleWeekSelect = this.handleWeekSelect.bind(this);
        this.handleMonthSelect = this.handleMonthSelect.bind(this);
        this.backDateOnClickListener = this.backDateOnClickListener.bind(this);
        this.forwardDateOnClickListener = this.forwardDateOnClickListener.bind(this);
    }

    componentWillReceiveProps(props){
        //moment.locale(props.lang.language);
        if(this.props.lang.language !== props.lang.language) {
            props.startDate.locale(props.lang.language);
            props.endDate.locale(props.lang.language);
            this.props.setDate([moment(props.startDate), moment(props.endDate)]);
            if(props.activeDate === 3) {
                this.props.setText(moment(props.startDate).format("MMM DD, YYYY") + " - " + moment(props.endDate).format("MMM DD, YYYY"));
            }
        }
        this.handleButtons(props.activeDate);
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

    datepicker(ev, picker) { // TODO: fix two days pick logic.
        if(ev.type === 'show') {
            // picker.EndDate = this.props.endDate;
            // console.log(ev)
        }
        if(ev.type === 'apply') {
            let textSet = false;
            
            //moment.locale(this.props.lang.language);

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
                this.props.setDate([pickerStartDate, pickerEndDate.startOf('day')]);
            }
        }
    }

    backDateOnClickListener(active) {
        let start = this.props.startDate.format("MM/DD/YYYY");
        let end = this.props.startDate.format("MM/DD/YYYY");;

        // console.log(start, end);
        switch(active) {
            case 0:
                this.props.setDate([moment(start).subtract(1, 'days').startOf('day'), moment(end).subtract(1, 'days').startOf('day'),]);

                break;
            case 1:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'week').startOf('week'), moment(this.props.startDate).startOf('day').subtract(1, 'week').endOf('week').subtract(1, 'day')]);
                break;
            case 2:
                this.props.setDate([moment(this.props.startDate).subtract(1, 'month').startOf('month'), moment(this.props.startDate).subtract(1, 'month').endOf('month').startOf('day')]);
                break;
        }
    }

    forwardDateOnClickListener(active) {
        // console.log("forward");
        if (!this.props.endDate.endOf('day').isSame(moment().endOf('day'))) {
            switch(active) {
                case 0:
                case 1:
                case 2:
            }
        }
    }

    componentWillMount() {
        this.props.setActive(0);
        this.props.setText("");
    }

    render() {
        let costumeEnd = this.props.endDate;
        // console.log(costumeEnd);
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
                            // startDate={this.props.startDate}
                            opens={'left'}
                            // endDate={moment(this.props.endDate).format("MM/DD/YYYY")}
                            // showDropdowns={true}
                            // maxDate={moment()}
                            // autoApply={true}
                            // autoUpdateInput={true}
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
    props.endDate.locale(props.lang);
    let text = moment(props.startDate).format("MMM") + " - " + moment(props.startDate).format("ddd DD");
    if(!props.isOneDay) {
        text += " - " + moment(props.endDate).format("ddd DD");
    }
    return (
        <div>
            <span className="btn_left" onClick={props.rewind.bind(this, props.active)} >&#10094;</span>
                {text}
            <span className="btn_right" >&#10095;</span>
        </div>
    );
}

// function DatesPanel(props) {
//     retur
// }

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