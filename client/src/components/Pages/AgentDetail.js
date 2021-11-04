import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/agentAuth'
import { useParams } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'

const AgentDetail = () => {
  const [isShow, setIsShow] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [agentProfile, setAgentProfile] = useState('')

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`http://localhost:5000/agent/${id}`)
      setAgentProfile(response.data)
      console.log(agentProfile)
    }
    fetchData()
  }, [])

  let reviewList = agentProfile.reviewList

  let ratingList = agentProfile.ratingList

  const averageArr = (arraylist) =>
    arraylist.reduce((a, b) => parseInt(a) + parseInt(b), 0) / arraylist.length

  const handleSubmit = (e) => {
    e.preventDefault()
    const { rating, review } = e.target.elements

    reviewList = [...reviewList, review.value]
    agentProfile.reviewList = reviewList

    ratingList = [...ratingList, rating.value]
    agentProfile.ratingList = ratingList

    agentProfile.overallRating = averageArr(ratingList).toFixed(0)

    dispatch(updateProfile(id, agentProfile))
    alert('Leave a review successfully')
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div key={agentProfile.CEA}>
          <h1>{agentProfile.profile_pic}</h1>
          <h2>
            {agentProfile.name} - Rating : {agentProfile.overallRating}
          </h2>
          <h4>From: {agentProfile.agency}</h4>
          <h3>CEA Number: {agentProfile.CEA}</h3>
          <p>
            <LocalPhoneIcon />
            {agentProfile.phoneNumber}
          </p>
          <p style={{ color: 'black' }}>Description</p>
          <div
            style={{
              border: '3px solid',
              padding: '25px 50px 75px 100px',
            }}
          >
            <p>{agentProfile.description}</p>
           
          </div>
          <Button onClick={() => setIsShow(!isShow)} color="primary"  variant="contained">
           Click to see {agentProfile.name}'s Reviews
          </Button>
        </div>
        {isShow ? (
          <div>
            <div
              style={{
                border: '3px solid',
                textAlign: 'left',
              }}
            >
              {reviewList.length === 0 ? (
                <div style={{ textAlign: 'center' }}>No review</div>
              ) : (
                agentProfile.reviewList.map((data, index) => {
                  return (
                    <ul key={index}>
                      <li style={{ fontSize: '20px' }}>{data}</li>
                    </ul>
                  )
                })
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='rating'>Rating </label>
              <input
                type='number'
                placeholder='Enter 1 to 5'
                name='rating'
                min='1'
                max='5'
                required
              />
              <label>Add review</label>
              <TextField
                name='review'
                variant='outlined'
                fullWidth
                placeholder='leave a review'
                required
              />
              <button color="primary"  variant="contained">Submit</button>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default AgentDetail
