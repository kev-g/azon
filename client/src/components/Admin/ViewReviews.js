import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/agentAuth'
import { useParams, Link } from 'react-router-dom'
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



  return (
    <div >
      <div>
        <Button
          variant='outlined'
          style={{ fontSize: '25px' }}
          onClick={() => {
            setIsShowProfile(true)
          }}
        >
          Agent Profile
        </Button>
        <Button
          variant='outlined'
          style={{ fontSize: '25px' }}
          onClick={() => {
            setIsShowProfile(false)
          }}
        >
          Reviews
        </Button>
      </div>
      <div>
        {isShowProfile ? (
          <div>

            <h1>Name : {agentProfile.name}</h1>
            <h1>Email: {agentProfile.email}</h1>
            <h1>Phone Number : {agentProfile.PhoneNumber}</h1>
            <h1>CEA : {agentProfile.CEA}</h1>
            <h1>Agency : {agentProfile.agency}</h1>
            <h1>Overall Rating : {agentProfile.overallRating}</h1>
            <h1>Status : {agentProfile.agent_status}</h1>

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
  )
}

export default AgentDetail
