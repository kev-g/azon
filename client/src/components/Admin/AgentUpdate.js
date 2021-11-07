import React, { useEffect, useState } from 'react'
import { updateProfile, deleteAgent } from '../../actions/agentAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Select, MenuItem, FormControl, makeStyles, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
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
        console.log(newStatus);
    };

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [CEA, setCEA] = useState('')
    const [Agency, setAgency] = useState('')
    const [Number, setNumber] = useState('')

    let name = agentProfile.name
    let email = agentProfile.email
    let cea = agentProfile.CEA
    let agency = agentProfile.agency
    let number = agentProfile.phoneNumber

    const handleChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        name = e.target.value
        agentProfile.name = name
    };
    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        email = e.target.value
        agentProfile.email = email
    };
    const handleChangeCEA = (e) => {
        e.preventDefault();
        setCEA(e.target.value);
        cea = e.target.value
        agentProfile.CEA = cea
    };
    const handleChangeAgency = (e) => {
        e.preventDefault();
        setAgency(e.target.value);
        agency = e.target.value
        agentProfile.agency = agency
    };
    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        number = e.target.value
        agentProfile.phoneNumber = number
    };

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, agentProfile))
        alert('Agent Updated')
        agentProfile.agent_status !== "Approved" ? (
            agentProfile.agent_status === "Pending" ? (
                history.push("/agentList")
            ) : (history.push("/blacklist"))
        ) : (history.push("/approvedList"))
    };


    const handleDelete = (e) => {
        e.preventDefault();
        alert('Agent Deleted')
        agentProfile.agent_status !== "Approved" ? (
            agentProfile.agent_status === "Pending" ? (
                history.push("/agentList")
            ) : (history.push("/blacklist"))
        ) : (history.push("/approvedList"))
        dispatch(deleteAgent(id))
    };

    return (
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={agentProfile.CEA}>
                            <h2> Name : <input
                                type='string'
                                name='name'
                                onChange={handleChangeName}
                                value={agentProfile.name}
                                required
                            /></h2>
                            <h2> Email : <input
                                type='string'
                                name='email'
                                onChange={handleChangeEmail}
                                value={agentProfile.email}
                                required
                            /></h2>
                            <h2> Agency : <input
                                type='string'
                                name='agency'
                                onChange={handleChangeAgency}
                                value={agentProfile.agency}
                                required
                            /></h2>
                            <h2> CEA Number : <input
                                type='string'
                                name='CEA'
                                onChange={handleChangeCEA}
                                value={agentProfile.CEA}
                                required
                            /></h2>
                            <h2> Phone Number : <input
                                type='string'
                                name='PhoneNumber'
                                onChange={handleChangeNumber}
                                value={agentProfile.phoneNumber}
                                required
                            /></h2>

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
                            <Button onClick={handleSubmit} color="primary" variant="contained"  >
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
                            {agentProfile.agent_status !== "Approved" ? (
                                agentProfile.agent_status === "Pending" ? (
                                    <Button component={Link} to={{
                                        pathname: `/AgentList`,
                                    }} color="primary" variant="contained">
                                        Back
                                    </Button>
                                ) : (<Button component={Link} to={{
                                    pathname: `/Blacklist`,
                                }} color="primary" variant="contained">
                                    Back
                                </Button>)
                            ) : (
                                <Button component={Link} to={{
                                    pathname: `/ApprovedList`,
                                }} color="primary" variant="contained">
                                    Back
                                </Button>
                            )}
                        </div>
                    </div></form>

            </Paper>
        </div>
    )

}
export default AgentUpdate

