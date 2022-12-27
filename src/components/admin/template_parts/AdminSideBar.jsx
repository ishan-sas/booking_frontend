import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function AdminSideBar() {
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
            <Link to="/admin/store-register" style={menuItem}><InboxIcon style={menuIcon} /> Add New Store</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/admin/store-list" style={menuItem}><InboxIcon style={menuIcon} /> Store List</Link>
          </li>
        </ul>
      </Grid>
      <Typography style={{color: '#040033', fontSize: 12, fontWeight: 500}}>
        &copy; Copyright 2023 SAS creative | All Rights Reserved.<br />
        Design & Developed by: <a href='http://sascreative.co.nz/' target='_blank' rel="noreferrer">SAS CREATIVE</a>
      </Typography>
    </div>
  )
}
