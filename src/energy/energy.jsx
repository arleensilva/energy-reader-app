import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import Graph from '../template/graph'


export default class Energy extends Component {
    constructor(props){
        super(props)
        this.state = { data: [] , maxValue: 0}
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
        debugger
        this.setState({...this.state, data: teste})
    }
    

    render() {
        return (
            <div>
                <PageHeader name='Energy' small='Reader'/>
                <Graph data={this.state.data} />                
            </div>
        )
    }
}