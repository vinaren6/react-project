import React from 'react';
import Paper from '@material-ui/core/Paper';
import  Typography  from '@material-ui/core/Typography';
import  makeStyle  from '@material-ui/core/makeStyle'


const useStyles = makeStyle(theme =>({
    root: {
        padding:theme.spacing(3,2),
    },
}))


export default function Home(){
    return(
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    this is a sheet of Paper    
                </Typography>
                <Typography component="p">
                    paper can be used to build surface or other elements
                </Typography>

            </Paper>

        </div>    
    )
}