import React, { Component } from 'react'
import axios from 'axios'

import Firebase from 'firebase';
import firebaseConfig from '../utils/firebaseConfig'
//import { FirebaseService } from '../services/firebase-service'

import PageHeader from '../template/pageHeader'
import Graph from '../template/graph'

export default class Energy extends Component {
    constructor(props){
        super(props)
        if (!Firebase.apps.length)
            Firebase.initializeApp(firebaseConfig)
        this.state = { data: [] , sensorValue: 1.2, maxValue: 0}

        this.getData = this.getData.bind(this)
    }

    componentDidMount(){
        this.refresh()
    }
    
    refresh(){
        let teste = [{name: 'Teste A', value: 400, pv: 2400, amt: 2400}, 
            {name: 'Teste B', value: 200, pv: 1200, amt: 1200},
            {name: 'Teste C', value: 370, pv: 1800, amt: 1800},
            {name: 'Teste D', value: 295, pv: 1800, amt: 1800},
            {name: 'Teste E', value: 275, pv: 1800, amt: 1800},
        ];

        let a =this.getData()
        
        //this.setState({...this.state, data: teste})
    }


    getData(){
        let ref = Firebase.database().ref('/potenciometro').limitToLast(10);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            let stateValue = Object.keys(state).map(key =>  ({value: state[key]}))
            this.setState({...this.state, data: stateValue})
            
        });
        console.log('DATA RETRIEVED');
    }

    

    render() {
        return (
            <div>
                <PageHeader name='Energy' small='Reader'/>
                <p>Teste {this.state.sensorValue}</p>
                <Graph data={this.state.data} />                
            </div>
        )
    }
}