import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'




export const CTX = React.createContext();

const initState = {
    general: [
        {from: 'Kalle', msg: 'Hallå!!'},
    ],
    topic2: [
        {from: 'Stefan', msg: 'Hej!!'},
    ]
}
const getUserName = () =>
{
    axios.get('http://localhost:3010/getname')
        .then(function (response) {
            // handle success
           const testing = response.data
            return "hello"

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })


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

let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
}

export default function Store(props) {

    if (!socket){
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type:'RECIEVE_MESSAGE', payload: msg});
        });
    }
    ;
    const user =  getUserName(1);


    const [allChats, dispatch] = React.useReducer(reducer, initState)

    return(
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}