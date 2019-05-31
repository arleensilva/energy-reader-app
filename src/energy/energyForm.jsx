import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        } else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    return (
        <div role='form' className='todoForm'>
            <Grid cols='12 5 4'>
                <input id='description' className='form-control' type='number'
                    placeholder='Valor máximo'
                    onChange={props.handleChange}
                    value={props.maxValue > 0 ? props.maxValue : ''}
                    // onKeyUp={keyHandler} 
                    />
            </Grid>
            <Grid cols='12 3 2'>
            <IconButton style='primary' icon='plus' 
                //onClick={props.handleAdd}
                />
            <IconButton style='default' icon='close'
                onClick={props.handleClear} 
                />
            </Grid>
        </div>
    )
}