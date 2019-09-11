import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from "react-router-dom";
import App from './Components/App';
import Signup from './Components/Main/Signup';
import Login from './Components/Main/Login';
import './Skapa.css'


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </div>
    </Router>
    ,document.getElementById('root'));
