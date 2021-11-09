import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/auth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Button, TextField } from "@material-ui/core";


export const EditUserProfile = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [userProfile, setUserProfile] = useState('')
    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/user/${id}`)
            setUserProfile(response.data)
        }
        fetchData()
    }, [])


    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
   
    let name = userProfile.name
    let email = userProfile.email

    const handleChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        name = e.target.value
        userProfile.name = name
    };
    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        email = e.target.value
        userProfile.email = email
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, userProfile))
        console.log(userProfile.name);
        alert('Profile Updated')
        history.push("/userProfile");


    };


    return (
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={userProfile.type}>
                            <h2> Name : <input
                                type='string'
                                name='name'
                                onChange={handleChangeName}
                                value={userProfile.name}
                                required
                            /></h2>
                            <h2> Email : <input
                                type='string'
                                name='email'
                                onChange={handleChangeEmail}
                                value={userProfile.email}
                                required
                            /></h2>
                           
                            <Button onClick={handleSubmit} color="primary" variant="contained"  >
                                Update
                            </Button>
                            <Button component={Link} to={{
                                pathname: `/userProfile`,
                            }} color="primary" variant="contained">
                                Back
                            </Button>
                        </div>
                    </div></form>

            </Paper>
        </div>
    )

}
export default EditUserProfile

