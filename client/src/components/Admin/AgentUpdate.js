import React, { useEffect, useState, component } from 'react'
import { updateAgentPwd, updateProfile,deleteAgent } from '../../actions/agentAuth'
import { useParams, Link,useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Select, MenuItem, FormControl, makeStyles, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AgentUpdate = (router) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [agentProfile, setAgentProfile] = useState('')
    let history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const useStyles = makeStyles(theme => ({
        FormControl: { minWidth: 100 }
    }));

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/agent/${id}`)
            setAgentProfile(response.data)
            console.log(agentProfile)
        }
        fetchData()
    }, [])

    const [Status, setStatus] = useState('')

    var newStatus = '';

    const handleChange = (event) => {
        event.preventDefault();
        setStatus(event.target.value);
        newStatus = event.target.value;
        agentProfile.agent_status = newStatus;
    };

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, agentProfile))
        alert('Status Updated')
        history.push("/agentList");
    };


    const handleDelete = (e) => {
        e.preventDefault();
        alert('Agent Deleted')
        history.push("/AgentList");
        dispatch(deleteAgent(id))
    };

    return (
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={agentProfile.CEA}>
                            <h2> Name : {agentProfile.name}</h2>
                            <h2> Email : {agentProfile.email}</h2>
                            <h2> Agency : {agentProfile.agency}</h2>
                            <h2> CEA Number : {agentProfile.CEA}</h2>
                            <h2> Phone Number : {agentProfile.phoneNumber}</h2>

                            <h2> Status :
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl className={classes.FormControl}>
                                        <Select
                                            id="StatusOpt"
                                            name="StatusOpt"
                                            label="Status"
                                            onChange={handleChange}
                                            defaultValue={agentProfile.agent_status}
                                            value={Status}
                                            displayEmpty
                                            defaultValue=""
                                        >
                                            <MenuItem value="" disabled>{agentProfile.agent_status}</MenuItem>
                                            <MenuItem value={"Approved"}>Approved</MenuItem>
                                            <MenuItem value={"Pending"}>Pending</MenuItem>
                                            <MenuItem value={"Blacklisted"}>Blacklisted</MenuItem>
                                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box></h2>
                            <Button onClick={handleSubmit}  color="primary" variant="contained"  >
                                Update
                            </Button>
                            <Button onClick={handleClickOpen} color="secondary" variant="contained" >
                        Delete
                    </Button>
                    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete an Agent?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
                    <Button component={Link} to=  {{
                        pathname: `/AgentList`,
                      }} color="primary" variant="contained">
                     Back
                    </Button>
                        </div>
                    </div></form>
                    
            </Paper>
        </div>
    )

}
export default AgentUpdate

