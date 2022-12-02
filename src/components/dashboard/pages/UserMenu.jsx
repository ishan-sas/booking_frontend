import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function UserMenu() {
  return (
    <div className='menu--tab'>
      <ul className='menu-tab'>
        <li><Link to='/users'>All Users</Link></li>
        <li><Link to='/'>Add New User</Link></li>
      </ul>
    </div>
  )
}
