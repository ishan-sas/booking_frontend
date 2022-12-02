import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Typography } from '@mui/material'
import MasterLayout from "../MasterLayout"
import UserMenu from './UserMenu'

export default function Users() {
  const [appointmentList, setAppointmentList] = useState([]);

	useEffect(() => {
    // getAppointmentList();

  }, []);

  const getAppointmentList = () => {
		axios.get(`/api/appointments-by-store`).then(res => {
			if(res.data.status === 200) {
				setAppointmentList(res.data.get_data);
			}
		});
	}

  return (
    <MasterLayout title={"Users"}>
      <Typography className='adm-page-title'>Users</Typography>
      
      <UserMenu />
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentList.map((row, item) => (
              <TableRow
                key={item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{item + 1}</TableCell>
                <TableCell>{row.project_title}</TableCell>
                <TableCell>{row.start_date}</TableCell>
                <TableCell>{row.end_date}</TableCell>
                <TableCell>
                  <Link className="table-btn" to={`/edit-user/${row.id}`}>EDIT</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MasterLayout>
  )
}
