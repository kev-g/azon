import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from "@material-ui/core";
import Refresh from '@mui/icons-material/Refresh';




const AgentList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setorder] = useState('ASC')
  const [agents, setAgents] = useState([])
  const history = useHistory();

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...agents.sort((a, b) => (a[col] > b[col] ? 1 : -1))]
      setAgents(sorted)
      setorder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...agents.sort((a, b) => (a[col] < b[col] ? 1 : -1))]
      setAgents(sorted)
      setorder('ASC')
    }
  }

  useEffect(() => {
    history.push('/agentlist')
    axios.get('/agent').then((res) => {
      setAgents(res.data)
      console.log(res.data);
    })
  }, [])



  function refreshPage() {
    window.location.reload(false);
  }


  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        style={{ marginTop: 30, marginBottom: 20, width: '30%' }}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      ></input>
      <Button component={Link} to={{
        pathname: `/UserList`,
      }} >
        UserList
      </Button>
      <Button component={Link} to={{
        pathname: `/Blacklist`,
      }} >
        Blacklist
      </Button>
      <Button component={Link} to={{
        pathname: `/ApprovedList`,
      }} >
        Approved List
      </Button>
      <Button onClick={refreshPage}><Refresh
        fontSize="inherit"
        style={{ fontSize: "30px" }} /></Button>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sorting('overallRating')}>
                Name<SwapVertIcon /></TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Agency</TableCell>
              <TableCell>CEA Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Agent Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents
              .filter((agent) => {
                if (searchTerm === '') {
                  return agent
                } else if (
                  agent.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return agent
                }
              })
              .map((d) => (
                d.agent_status === "Pending" ? (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={d._id}
                  >
                    <TableCell component='th' scope='row'>
                      {d.name}
                    </TableCell>
                    <TableCell align='left'>{d.email}</TableCell>
                    <TableCell align='left'>{d.agency}</TableCell>
                    <TableCell align='left'>{d.CEA}</TableCell>
                    <TableCell align='left'>{d.phoneNumber}</TableCell>
                    <TableCell align='left'>{d.type}</TableCell>
                    <TableCell align='left'>{d.overallRating}</TableCell>
                    <TableCell align='left'>{d.agent_status}</TableCell>
                    <TableCell align='left'>
                      <Button component={Link} to={{
                        pathname: `/agentList/${d._id}`,
                      }} color="primary" variant="contained">Edit
                      </Button>
                      <Button component={Link} to={{
                        pathname: `/viewReviews/${d._id}`,
                      }} color="primary" variant="contained">View Reviews
                      </Button>

                    </TableCell>
                  </TableRow>) : (<TableRow hidden></TableRow>)
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AgentList
