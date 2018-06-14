import React, { Component } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import AbusiveConversationsChart from '../charts/AbusiveConversationsChart.js'
import { GetMessagesStatistics } from '../../serviceAPI';

export class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}, // {"18-05-18" : {***}, "19-05-18": {***}}
            // useData: [],
            // dateLabels: [],
            labels: [],
            // tickValues: []
        }
        // this.buildChart = this.buildChart.bind(this);
        // moment.locale(props.lang.map_lang)
        this.getChildMessagesStatisticsByRange(this.props);
    }
    
    componentWillReceiveProps(props){
        // this.setState({
        //     ...this.state,
        //     useData: []
        // });
        // moment.locale(props.lang.map_lang)
        
        this.getChildMessagesStatisticsByRange(props);
    }

    // Gets the child statistics and sets data using it.
    getChildMessagesStatisticsByRange(props) {
        // console.log(props);
        // console.log(props.dates[0],props.dates[1],props.dates[0].isSame(props.dates[1]));
        let day = moment(props.startDate); // Creates a moment object from the first day.
        // let newData = [];
        let range = props.isOneDay ? 24 : props.range;
        let addBy = props.isOneDay ? 'hours' : 'day';
        let tempDay =  moment(day);
        let labels = new Array(range + 1);
        let tickVals = new Array((range > 7) ? range/5 | 0 : range);
        let countEasy = new Array(range+1);
        let countMedium = new Array(range+1);
        let countHard = new Array(range+1);
        let newData = this.state.data;
        let flag = 0;
        // let insertToData = false;
        // console.log(this.state);
        // console.log((range > 7 || range <= 1)? "YEAHH" : "NOOOOOOO");
        for(let i=0; i<=range;  i++, tempDay=moment(day).add(i,addBy)) {

            // datesLabel.push(moment(day).format("MMMM DD"));
            // day=moment(day).add(1,'days').format("MMMM D");
            // if(i ===2 | i === 3) {
            //     console.log(child, moment(tempDay).startOf('day').valueOf(),"and", moment(tempDay).endOf('day').valueOf())
            //     console.log(child, moment.utc(tempDay).startOf('day').valueOf(),"and", moment.utc(tempDay).add(1,'days').startOf('day').valueOf())
            // }
            // Checks if data is available in array.
            // console.log(newData);
            // console.log(objectNames);
            // console.log(!props.isOneDay && this.state.data !== undefined && this.state.data[tempDay.format("YY-MM-DD")] !== undefined);

            if(!props.isOneDay && this.state.data !== undefined && newData[tempDay.format("YY-MM-DD")] !== undefined) {
                let format = tempDay.format("YY-MM-DD");
                this.insertTickVal(tickVals, newData[format][0]["x"], range, i);
                labels[i] = moment(tempDay).format("MMM Do").toString();
                countEasy[i] = newData[format][0]; // easy count.
                countMedium[i] = newData[format][1];// medium count.
                countHard[i] = newData[format][2]; // heavy count.
                flag++;
                if(flag > range) {
                    this.insertNewData(newData, [countEasy, countMedium, countHard], labels);
                }
            }
            // If data wasnt called before - fetch data from server.
            else {

                // insertToData = true;
                let startTime;
                let endTime;
                if(props.isOneDay) {
                    startTime = moment(tempDay);
                    endTime = moment(tempDay).add(1, 'hours');
                } 
                else {
                    startTime = moment(tempDay).startOf('day');
                    endTime =  moment(tempDay).endOf('day');
                }
                // console.log(tempDay);
                let label =  "";
                if(props.isOneDay) {
                    label += moment(tempDay).format("Ha").toString();
                }
                else {
                    label += moment(tempDay).format("MMM Do").toString();
                }
                labels[i] = label; 
                this.insertTickVal(tickVals, label, range, i);
                //  (range <= 1 && i !== ) ? moment(tempDay).add(i, 'hours').valueOf() :.valueOf();
                // (range <= 1) ? moment(tempDay).add(i+1, 'hours').valueOf() :.valueOf();
                GetMessagesStatistics(props.child.id, startTime, endTime).then(res => {  // When respond package is with status 200
                    let result = res.data;
                    countEasy[i] = parseInt(result.easyCount); // easy count.
                    countMedium[i] = parseInt(result.mediumCount); // medium count.
                    countHard[i] = parseInt(result.heavyCount); // heavy count.
    
                    // this.createStatisticObject(label, dayStatistics); 
                    if(!props.isOneDay)
                        newData[moment(day).add(i, 'day').format("YY-MM-DD")] = [countEasy[i], countMedium[i], countHard[i]];
                    flag++;
                    if(flag > range)
                        this.insertNewData(newData, [countEasy, countMedium, countHard], labels);

                // if(this.state.draw[0] == false){
                //     let tempDraw = this.state.draw;
                //     tempDraw[0] = true;
                //     this.setState({
                //         ...this.state,
                //         draw: tempDraw
                //     });
                //     console.log(this.state.draw);
                // }

                }).catch(error => { // When respond package is with error status - 400 ...
                    console.log(error);
                });
            };
        }
    }

    insertNewData(newData, useData, labels) {
        // let data = this.state.data;
        // if (insertToData) data.push(newData);
        // console.log(tempData, newData);
        this.setState({
            ...this.state,
            data: newData,
            useData: useData,
            labels: labels
        });

        // let tempData = [];
        // tempData.push(countEasy);
        // tempData.push(countMedium);
        // tempData.push(countHard);
        // let data = this.state.data;
        // if(insertToData)
        //     data.push(newData);

        // this.createStatisticsDataset(tempData);
            // console.log(this.state);
    }

    insertTickVal(tickVals, label, range, index) {
        if(range > 7 && (index%5 === 0 || index === range)) {
            // if(i === range && range%8 !== 0)
                tickVals[index/5 | 0] = label;
        }
        else if(range <= 7)
            tickVals[index] = label;
    }
    getMessagesStatisticsByRange(){}

    createStatisticObject(date, count) { // date: {label: "", data: [[],[],[]]}
        return ({
            "label": date,
            "data": count
        });
    }


    render() {
        // this.getChildMessagesStatistics();
        // return <div>ok</div>
        return (this.state.useData !== undefined && <AbusiveConversationsChart style={{height: 'inherit'}} data={this.state.useData} labels={this.state.labels} />);
    }
}



function LineChartPanel(props) {
    // console.log(props);
    return <LineChart style={{height: 'inherit'}} child={props.childrens[props.childIndex]} startDate={props.startDate} range={props.range} isOneDay={props.isOneDay} lang={props.lang}/>
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        range: state.dashboardInfo.datesRange,
        isOneDay: state.dashboardInfo.isOneDay,
        lang: state.lang.currLang
    };
  };

export default connect(mapStateToProps)(LineChartPanel);