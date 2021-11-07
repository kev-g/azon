import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/agentAuth'
import { useParams } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const AgentDetail = () => {
  const defaultPic =
    'https://www.back-tobasics.org/wp-content/uploads/2017/05/default-profile-pic.png'
  const labels = {
    0: 'No rating',
    1: 'Poor',
    2: 'Poor+',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  }
  const [isShowProfile, setIsShowProfile] = useState(true)
  const [isAddReview, setIsAddReview] = useState(false)
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
    console.log(agentProfile)
    dispatch(updateProfile(id, agentProfile))
    alert('Leave a review successfully')
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 0.5 }}>
        <p style={{ fontSize: '50px' }}>Hi there, I'm</p>
        <img
          style={{ width: 300, borderRadius: '150px' }}
          src={`${agentProfile.profile_pic}` || defaultPic}
          alt={{}}
        ></img>
        <h1>
          {agentProfile.name}-{agentProfile.agent_status}
        </h1>
        <p style={{ fontSize: '30px' }}>Agent From {agentProfile.agency}</p>
        <h2 style={{ fontSize: '35px', textDecoration: 'underline' }}>
          About Me
        </h2>
        <p style={{ fontSize: '25px', width: '500px' }}>
          {agentProfile.description}
        </p>
      </div>
      <div style={{ flex: 0.45 }}>
        <div>
          <Button
            variant='outlined'
            style={{ fontSize: '25px' }}
            onClick={() => {
              setIsAddReview(false)
              setIsShowProfile(true)
            }}
          >
            My Profile
          </Button>
          <Button
            variant='outlined'
            style={{ fontSize: '25px' }}
            onClick={() => {
              setIsAddReview(false)
              setIsShowProfile(false)
            }}
          >
            My Review
          </Button>
          <Button
            variant='outlined'
            style={{ fontSize: '25px' }}
            onClick={() => setIsAddReview(true)}
          >
            Add Review
          </Button>
        </div>
        {isAddReview ? (
          <div>
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
              <TextField
                name='review'
                variant='outlined'
                fullWidth
                placeholder='leave a review'
                required
              />{' '}
              <button color='primary' variant='contained'>
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div>
            {isShowProfile ? (
              <div>
                <h1>
                  Name: {agentProfile.name}
                  <Rating
                    name='text-feedback'
                    value={`${agentProfile.overallRating}`}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                    }
                  />
                  {labels[agentProfile.overallRating]}
                </h1>
                <h1>CEA Number: {agentProfile.CEA}</h1>

                <h1>
                  Call me: {agentProfile.phoneNumber}
                  <LocalPhoneIcon />
                </h1>
                <h1>Email: {agentProfile.email}</h1>
              </div>
            ) : (
              <div>
                {reviewList.length === 0 ? (
                  <h1>No Review</h1>
                ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Review</TableCell>
                          <TableCell>Rating</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {agentProfile.reviewList.map((data, index) => (
                          <TableRow
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                            key={index}
                          >
                            <TableCell component='th' scope='row'>
                              {data}
                            </TableCell>
                            <TableCell>
                              <Rating
                                name='text-feedback'
                                value={`${agentProfile.ratingList[index]}`}
                                readOnly
                                precision={1}
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize='inherit'
                                  />
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentDetail
