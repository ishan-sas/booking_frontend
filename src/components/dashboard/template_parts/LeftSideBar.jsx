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
      { localStorage.getItem('auth_type') === '1' ?
        <ul className='primary_menu' style={{listStyle: 'none', padding: 0, margin: 0}}>
          {/* <li style={menuListItem}>
            <Link to="/admin" style={menuItem}><InboxIcon style={menuIcon} /> Dashboard</Link>
          </li> */}
          <li style={menuListItem}>
            <Link to="/admin/appointments" style={menuItem}><InboxIcon style={menuIcon} /> Appointments</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/time-slots" style={menuItem}><InboxIcon style={menuIcon} /> Time slots</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/add-schools" style={menuItem}><InboxIcon style={menuIcon} /> Schools</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/store-settings" style={menuItem}><InboxIcon style={menuIcon} /> Store Settings</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/add-unavailable-dates" style={menuItem}><InboxIcon style={menuIcon} /> Unavailable Dates</Link>
          </li>
          {/* <li style={menuListItem}>
            <Link to="/admin/users" style={menuItem}><InboxIcon style={menuIcon} /> Users</Link>
          </li> */}
        </ul>
      : 
        <ul className='primary_menu' style={{listStyle: 'none', padding: 0, margin: 0}}>
          <li style={menuListItem}>
            <Link to="/my-bookings" style={menuItem}><InboxIcon style={menuIcon} /> My Bookings</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/account-settings" style={menuItem}><InboxIcon style={menuIcon} /> Settings</Link>
          </li>
        </ul>
      }
      </Grid>
      <Typography style={{color: '#040033', fontSize: 12, fontWeight: 500}}>
        &copy; Copyright 2023 SAS creative | All Rights Reserved.<br />
        Design & Developed by: <a href='http://sascreative.co.nz/' target='_blank' rel="noreferrer">SAS CREATIVE</a>
      </Typography>
    </div>
  )
}
