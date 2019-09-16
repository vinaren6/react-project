import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";

import { logout }from '../AuthHelper'




export const Nav = ({selectedCat, onSelect}) => {


const logoutbtn = () =>{
    logout()
    window.location.reload(false);

}




    return (
        <Paper>
        <Tabs
            value={selectedCat}
            onChange={(event, index) => {onSelect(index)}}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Home" component={Link} to="/"/>
             <Tab label="log out" onClick={() => logoutbtn()} component={Link} to={'/login'} refresh="true" />
        </Tabs>
        </Paper>
    )
}