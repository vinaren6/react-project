import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import Skapa from './Components/Main/Skapa'
import { Nav } from './Components/Header/Nav'
import {Home} from './Components/Main/Home'
import {Redigera} from './Components/Main/Redigera'
import Login from './Components/Main/Login'

class App extends React.Component {
    state = {
        categorySelected : 0,
        selectedBeerName : '',
        searchTerm: ''
    }
    
    onCategoryChange = selectedCat => {
        console.log("selected category: " + selectedCat)
        this.setState({
            categorySelected : selectedCat
        })
    }

    updateSearchTerm = queryString => {
        this.setState({searchTerm: queryString})
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Nav selectedCat={this.state.categorySelected} onSelect={this.onCategoryChange}/>
                        <Route exact path="/" component={Home} />
                        <Route path="/Redigera" component={Login} />
                        <Route path="/Skapa" component={Skapa}/>
                    </div>
                </Router>
            </div>
        );
    }
}



export default App;
