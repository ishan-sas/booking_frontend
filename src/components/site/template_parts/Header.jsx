import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'

import Logo from '../../../assets/images/logo.png'

export default function Header() {
  return (
    <Grid container spacing={2} pt={7}>
      <Grid item md={6}>
        <Link to="/" className="brand-logo">
          <img src={Logo} style={{ height: 35, display: 'flex', margin: '10px 0' }} />
        </Link>
      </Grid>
      {/* <Grid item xs={12} md={6} sx={{ display: { md: 'block', sm: 'none' } }}>
        
      </Grid> */}
    </Grid>
  )
}
