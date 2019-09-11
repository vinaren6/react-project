import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';
import  { Nav }  from './Header/Nav'
import {Home} from './Main/Home'
import {isLoggedIn, getToken, logout} from './AuthHelper';

class App extends React.Component {
    state = {
        categorySelected : 0,
        checkLogout: false
    }

    componentDidMount() {
        const { myKey } = this.props.match.params
        console.log(myKey)
        if (!isLoggedIn()) {
            this.props.history.replace('/Login')} else {
            axios({
                method: 'get',
                url: 'http://localhost:3010/api/books',
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            }).then((result) => {
                console.log("app protected resource")
                console.log(result)
            })
        }
    }


    
    onCategoryChange = selectedCat => {
        console.log("selected category: " + selectedCat)
        this.setState({
            categorySelected : selectedCat
        })
    }



    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Nav selectedCat={this.state.categorySelected} onSelect={this.onCategoryChange}/>
                        <Route exact path="/" component={Home}/>
                        <Router>

                        </Router>




                    </div>
                </Router>
            </div>
        );
    }
}



export default App;
