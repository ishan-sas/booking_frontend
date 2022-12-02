import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function LeftSideBar() {
  const menuListItem = {
    marginBottom: 20,
  }
  const menuItem = {
    color: '#a4a4a4', 
    fontSize: 14, 
    display: 'block',
    textDecoration: 'none'
  }
  const menuIcon = {
    fontSize: 18,
    float: 'left',
    margin: '1px 5px 0 0',
  }

  return (
    <div>
      <Grid sx={{marginBottom: 2, padding: 2, borderRadius: 1, border: '1px solid #ebebeb'}}>
        <ul className='primary_menu' style={{listStyle: 'none', padding: 0, margin: 0}}>
          <li style={menuListItem}>
            <Link to="/admin" style={menuItem}><InboxIcon style={menuIcon} /> Dashboard</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/appointments" style={menuItem}><InboxIcon style={menuIcon} /> Appointments</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/time-slots" style={menuItem}><InboxIcon style={menuIcon} /> Time slots</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/users" style={menuItem}><InboxIcon style={menuIcon} /> Users</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/settings" style={menuItem}><InboxIcon style={menuIcon} /> Settings</Link>
          </li>
        </ul>
      </Grid>
      <Typography style={{color: '#040033', fontSize: 12, fontWeight: 500}}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Typography>
    </div>
  )
}
