import React from 'react'
import axios from 'axios'
import { setToken} from "../AuthHelper";
import {Link} from "react-router-dom";

class Login extends React.Component{
    state = {
        email: '',
        password: ''
    };




    handleFormSubmit(event){
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3010/login',
            data:{
                email: this.state.email,
                password: this.state.password
            }
        }).then((result) => {
            if (result && result.data && result.data.signedJWT) {
                console.log("inuti then");
                setToken(result.data.signedJWT)
                this.props.history.replace('/');
            }
        })
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="form-wrapper">
                        <h1>Login</h1>

                <form onSubmit={event => this.handleFormSubmit(event)}>

                    <label htmlFor="email">Email</label>
                    <input  className="email" value={this.state.email} placeholder="Email" onChange={event => this.setState({email: event.target.value})}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" value={this.state.password} placeholder="Password" onChange={event => this.setState({password: event.target.value})}/>

                    <div className="createAccount">
                        <button type="submit"> Login</button>
                        <Link to="/signup">Don't Have an Account?</Link>
                    </div>

                </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login