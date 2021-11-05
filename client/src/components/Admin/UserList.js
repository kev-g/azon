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
import { Button } from "@material-ui/core";
import Refresh from '@mui/icons-material/Refresh';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setorder] = useState('ASC')
  const [user, setUsers] = useState([])

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...user.sort((a, b) => (a[col] > b[col] ? 1 : -1))]
      setUsers(sorted)
      setorder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...user.sort((a, b) => (a[col] < b[col] ? 1 : -1))]
      setUsers(sorted)
      setorder('ASC')
    }
  }

  useEffect(() => {
    axios.get('/user').then((res) => {
      setUsers(res.data)
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
        pathname: `/AgentList`,
      }} >
        AgentList
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
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user
              .filter((user) => {
                if (searchTerm === '') {
                  return user
                } else if (
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return user
                }
              })
              .map((d) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={d._id}
                >
                  <TableCell component='th' scope='row'>
                    {d.name}
                  </TableCell>
                  <TableCell align='left'>{d.email}</TableCell>
                  <TableCell align='left'>{d.type}</TableCell>

                  <TableCell align='left'>
                    <Button component={Link} to={{
                      pathname: `/userList/${d._id}`,
                    }} color="primary" variant="contained">
                      Edit
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
