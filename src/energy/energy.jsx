import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Firebase from 'firebase';
import firebaseConfig from '../utils/firebaseConfig'
//import { FirebaseService } from '../services/firebase-service'

import PageHeader from '../template/pageHeader'
import Graph from '../template/graph'

import EnergyForm from './energyForm'
import EnergySelect from './energySelect'

export default class Energy extends Component {
    constructor(props){
        super(props)
        if (!Firebase.apps.length)
            Firebase.initializeApp(firebaseConfig);
        this.state = { data: [], 
            sensorValue: 0, 
            maxValue: '', 
            daysLimit: 10, 
            topValue: 0, 
            sensorValue: 0 };

        this.getData = this.getData.bind(this);
        this.getSensorValue = this.getSensorValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
        this.getSensorValue()
        this.getData()
        
    }

    handleChange(e){
        this.setState({...this.state,  maxValue: e.target.value })
    }

    handleClear(e){
        this.setState({...this.state, maxValue: 0})
    }

    handleSelect(e){
        this.setState({...this.state,  daysLimit: parseInt(e.value) }, this.getData)
        
    }


    getData(){
        let limit = 10;
        limit = this.state.daysLimit > 0 ? this.state.daysLimit : 10;
        let ref = Firebase.database().ref('/data').limitToLast(limit);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            let stateValue = [];
            let topValue = limit > 30 ? 50 : 0

            Object.keys(state).map(key =>  {
                let item = state[key]

                if(limit > 30){
                    let dateMonthString = `${item.month}/${item.year}`
                    dateMonthString = moment(dateMonthString, 'MM/YYYY').format('MM/YYYY');
                    
                    let monthIndex = stateValue.findIndex(element => element.date == dateMonthString);

                    if (monthIndex >= 0){
                        stateValue[monthIndex].kW += (item.value/1000)
                        stateValue[monthIndex].kW = parseFloat(stateValue[monthIndex].kW).toFixed(2)
                    } else {
                        stateValue.push({
                            kW: item.value,
                            date: dateMonthString
                        })
                    }

                } else {
                    let dateString = `${item.day}/${item.month}/${item.year}`
                    stateValue.push({
                        kW: (item.value/1000).toFixed(2),
                        date: moment(dateString, 'DD/MM/YYYY').format('DD/MM/YYYY')
                    })
                }

            })

            
            this.setState({...this.state, data: stateValue, topValue });
            // return stateValue;
            
        });
        console.log('DATA RETRIEVED');
    }

    getSensorValue(){
        let ref = Firebase.database().ref('/sensorValue');
        ref.on('value', snapshot => {
            const sensorValue = snapshot.val();            
            this.setState({...this.state, sensorValue});
            // return sensorValue;
            
        });
        console.log('SENSOR VALUE RETRIEVED');
    }

    render() {
        return (
            <div>
                <PageHeader name='Energy' small='Reader'/>
                <EnergySelect 
                    daysLimit={this.state.daysLimit} 
                    handleSelect={this.handleSelect} />
                <EnergyForm maxValue={ this.state.maxValue }
                    handleChange={this.handleChange}
                    handleClear={this.handleClear} 
                    placeholder='Valor máximo' 
                    typeForm='number' />
                <EnergyForm maxValue={parseFloat(this.state.sensorValue /1000).toFixed(2) + ' kW' }
                    disabled={true} 
                    placeholder='Valor da potência'/>
                <Graph 
                    data={this.state.data} 
                    maxValue={this.state.maxValue}
                    topValue={this.state.topValue} />                
            </div>
        )
    }
}