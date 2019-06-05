import React from 'react'
import PageHeader from '../template/pageHeader'

export default props => (
    <div>
        <PageHeader name='Sobre' small='App'/>
        
        <p className="text-center text-primary">Universidade Fumec <br />
                    Trabalho AutoInstrucional<br /> 
                    Disciplina: Internet of Things<br /> 
                    A partir da leitura dos sensores de corrente, a placa Arduino faz os cálculos da potência gasta.<br />
                    </p>
    </div>
)