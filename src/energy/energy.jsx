import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Firebase from 'firebase';
import firebaseConfig from '../utils/firebaseConfig'
//import { FirebaseService } from '../services/firebase-service'

import PageHeader from '../template/pageHeader'
import Graph from '../template/graph'

import EnergyForm from './energyForm'

export default class Energy extends Component {
    constructor(props){
        super(props)
        if (!Firebase.apps.length)
            Firebase.initializeApp(firebaseConfig);
        this.state = { data: [] , sensorValue: 0, maxValue: ''};

        this.getData = this.getData.bind(this);
        this.getMaxValue = this.getMaxValue.bind(this);

        this.refresh();
    }
    
    refresh(){

        this.getData()
        this.getMaxValue()
        
        //this.setState({...this.state, data, maxValue})
    }


    getData(){
        let ref = Firebase.database().ref('/data').limitToLast(10);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            let stateValue = [];
            Object.keys(state).map(key =>  {
                let item = state[key]
                let dateString = `${item.day}/${item.month}/${item.year}`
                stateValue.push({
                    kW: item.value,
                    date: moment(dateString, 'DD/MM/YYYY').format('DD/MM/YYYY')
                })
            })
                this.setState({...this.state, data: stateValue});
            return stateValue;
            
        });
        console.log('DATA RETRIEVED');
    }

    getMaxValue(){
        let ref = Firebase.database().ref('/maxValue');
        ref.on('value', snapshot => {
            let maxValue = snapshot.val();
            console.log(maxValue)
                this.setState({...this.state, maxValue})
            return maxValue
        });
        console.log('MAXVALUE RETRIEVED');
    }

    render() {
        return (
            <div>
                <PageHeader name='Energy' small='Reader'/>
                <EnergyForm maxValue={ this.state.maxValue }/>
                <Graph data={this.state.data} maxValue={this.state.maxValue}/>                
            </div>
        )
    }
}