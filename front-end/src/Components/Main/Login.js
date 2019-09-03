import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    state = {
        user: '',
        pass: ''
    };

    handleFormSubmit(event){
        event.preventDefault()
        axios({
            method: 'post',
            //url till servern
            url: '',
            data:{
                username: this.state.user,
                password: this.state.pass
            }
        }).then((result) => {
            if (result.data) {
                console.log(result.data)
            }
        })
    }

    render() {
        return (
            <div>
                <p>Login</p>
                <form onSubmit={event => this.handleFormSubmit(event)}>
                    <input type="text" value={this.state.user} placeholder="email" onChange={event => this.setState({user: event.target.value})}/>
                    <br/>
                    <input type="password" value={this.state.pass} placeholder="password" onChange={event => this.setState({pass: event.target.value})}/>
                    <br/>
                    <input type="submit" value="Submit"/>

                </form>
            </div>
        );
    }
}
export default Login