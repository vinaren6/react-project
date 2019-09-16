import React from 'react';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; 
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Store from './Store'
import {CTX } from './Store'

const useStyle = makeStyles(theme => ({
root: {
    margin: '50px',
    padding: theme.spacing(3,2),
    textAlign: "center"
},
flex: {
    display: 'flex',
    alignItems:'center' 
},
topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey'
},
chatWindow: {
    width: '70',
    height: '300px',
    padding: '20px'
},
chatBox:{
    width: '85%'
},
button: {
    width: '15%'
}

}))


    


export function Dashboard() {
    const  classes = useStyle();

    //CTX store
    const {allChats, sendChatAction, user} = React.useContext(CTX);
    const topic = Object.keys(allChats);

    const[activeTopic,changeActiveTopic] = React.useState(topic[0])

    const[textValue, changeTextValue] = React.useState('');


    return (
        <Store>
        <Paper className={classes.root}>
            <Typography variant="h4" component="h4">
                imBored chat
            </Typography>
            <Typography variant="h5"component="h5">
            {activeTopic}
            </Typography>
            <div className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <List>
                        {
                            topic.map(topic =>(
                                <ListItem onClick={e => changeActiveTopic(e.target.innerText)}key={topic} button>
                                    <ListItemText primary={topic} />
                                </ListItem>
                            ))
                        }
                    
                    </List>
                </div>
                <div className={classes.chatWindow}>  
                    {
                        allChats[activeTopic].map((chat, i) =>(
                            <div className={classes.flex} key={i}>
                                <Chip label={chat.from} className={classes.chip} />
                                <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                            </div>
                        ))
                    }
                </div>
            </div>
                 <div className={classes.flex}>
                     <TextField
                         label="Send a message"
                         className={classes.chatBox}
                         value={textValue}
                         onChange={e => changeTextValue(e.target.value)}
                         
                     />
                 <Button 
                     variant="contained" 
                     color="primary" 
                     className={classes.button}
                     onClick={() => {
                         sendChatAction({from: user, msg: textValue, topic: activeTopic});
                         changeTextValue('')
                         
                         }}>
                     Send
                 </Button>
            </div>
        </Paper>
        </Store>

    )
}
