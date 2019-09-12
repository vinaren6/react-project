import React from 'react'

export const CTX = React.createContext();

/*
     msg{
         from: 'user'
         msg:  'hi'
         topic: 'general'
     }

     state{
        general: [
            {msg}, {msg}, {msg}, {newmsg}
        ]
        topic2: [

        ]
     }

*/

const initState = {
    general: [
        {from: 'aaron', msg: 'hello'},
        {from: 'arnold', msg: 'hello'},
        {from: 'archer', msg: 'hello'}
    ],
    topic2: [
        {from: 'aaron', msg: 'hello'},
        {from: 'aaron', msg: 'hello'},
        {from: 'aaron', msg: 'hello'}
    ]
}


function reducer(state, action){
    const {from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECIEVE_MESSAGE':
            return{
                ...state,
                [topic]: [
                    ...state[topic],
                    {from,msg}
                ]
             }
        default:
            return state
    }
}

export default function Store(props) {

    const reducerHook = React.useReducer(reducer, initState)

    return(
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}