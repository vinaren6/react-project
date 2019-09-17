import React, { useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import {getToken, isLoggedIn} from "../AuthHelper";

export const CTX = React.createContext();

const initState = {
    general: [
        {from: 'Kalle', msg: 'Hallå!!'},
    ],
    topic2: [
        {from: 'Stefan', msg: 'Hej!!'},
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

let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
}

export default function Store(props) {
    const [count, setCount] = useState('');

    if (count === '' && isLoggedIn()) {
        axios(
        {
            method: 'get',
                url: 'http://localhost:3010/getname',
            headers: {
            authorization: 'Bearer ' + getToken()
        }

        })
            .then(res => {

                setCount(res.data)
            })
            .catch(function (error) {

                console.log(error);
            })

    }


    const [allChats, dispatch] = React.useReducer(reducer, initState)
    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function (msg) {
            dispatch({type: 'RECIEVE_MESSAGE', payload: msg});
        })};



        const user = {count}.count

         return (
             <CTX.Provider value={{allChats, sendChatAction, user}}>
                 {props.children}
             </CTX.Provider>
         )





}