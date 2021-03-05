import React, { useState } from 'react'

const WheelItem = () => {

    const [state, setState] = useState({
        invoiceNum: '',
        vendedor: '',
        status: '',
        timeStamp: '',
        quantity: '',
        description: ''
    })

    return (
        <div>
            <input value={state.invoiceNum} ></input>
            <input value={state.vendedor} ></input>
            <input value={state.status} ></input>
            <input value={state.timeStamp} ></input>
            <input value={state.quantity} ></input>
            <input value={state.description} ></input>
        </div>
    )
}

export default WheelItem;