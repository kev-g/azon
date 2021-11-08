import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";

const AgentHub = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setorder] = useState('ASC')
  const [agents, setAgents] = useState([])

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
    axios.get('/agent').then((res) => {
      setAgents(res.data)
    })
    
  }, [])

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CEA Number</TableCell>
              <TableCell onClick={() => sorting('overallRating')}>
                Rating
                <SwapVertIcon />
              </TableCell>
              <TableCell>View details</TableCell>
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
                d.agent_status === "Approved" ? (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={d._id}
                >
                  <TableCell component='th' scope='row'>
                    {d.name}
                  </TableCell>
                  <TableCell align='left'>{d.CEA}</TableCell>
                  <TableCell align='left'>{d.overallRating}</TableCell>
                  <TableCell align='left'>
                    {/* <Link
                      to={{
                        pathname: `/agentHub/${d._id}`,
                      }}
                    >
                      Click here
                    </Link> */}

                    <Button component={Link} to=  {{
                        pathname: `/agentHub/${d._id}`,
                      }} color="primary"  variant="contained">
                     Click Here
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

export default AgentHub
