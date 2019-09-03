import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";


export const Nav = ({selectedCat, onSelect}) => {

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
            <Tab label="Skapa" component={Link} to="/Skapa"/>
            <Tab label="Redigera" component={Link} to="/Redigera"/>
        </Tabs>
        </Paper>
    )
}