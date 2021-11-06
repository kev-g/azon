import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/agentAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Button, TextField } from "@material-ui/core";


export const EditProfile = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [agentProfile, setAgentProfile] = useState('')
    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/agent/${id}`)
            setAgentProfile(response.data)
            console.log(agentProfile)
        }
        fetchData()
    }, [])


    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [CEA, setCEA] = useState('')
    const [Agency, setAgency] = useState('')
    const [Number, setNumber] = useState('')
    const [Des, setDes] = useState('');

    let name = agentProfile.name
    let email = agentProfile.email
    let cea = agentProfile.CEA
    let agency = agentProfile.agency
    let number = agentProfile.phoneNumber
    let des = agentProfile.description

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
    const handleChangeDes = (e) => {
        e.preventDefault();
        setDes(e.target.value);
        des = e.target.value
        agentProfile.description = des
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, agentProfile))
        console.log(agentProfile);
        alert('Profile Updated')
        history.push("/profile");

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
                            <h2> Description : <TextField
                                name="desctiption"
                                variant="outlined"
                                fullWidth
                                value={agentProfile.description}
                                onChange={handleChangeDes}
                            /></h2>


                            <Button onClick={handleSubmit} color="primary" variant="contained"  >
                                Update
                            </Button>
                            <Button component={Link} to={{
                                pathname: `/profile`,
                            }} color="primary" variant="contained">
                                Back
                            </Button>
                        </div>
                    </div></form>

            </Paper>
        </div>
    )

}
export default EditProfile

