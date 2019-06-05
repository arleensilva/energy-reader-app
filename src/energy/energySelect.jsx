import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Grid from '../template/grid'

const options = [
  { value: '10', label: '10 Dias' },
  { value: '30', label: '30 Dias' },
  { value: '60', label: '60 Dias' },
  { value: '120', label: '120 Dias'}
]


export default props => {

  return (
      <div role='form' className='todoForm'>
          <Grid cols='12 5 4'>
            <Select
              name="form-field-name"
              value={props.daysLimit}
              onChange={props.handleSelect}
              options={options}
            />
          </Grid>
      </div>
  )
}