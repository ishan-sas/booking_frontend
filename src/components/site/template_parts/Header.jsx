import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'

import Logo from '../../../assets/images/logo.png'

export default function Header() {
  return (
    <Grid container spacing={2} pt={7}>
      <Grid item md={6}>
        <Link to="/" className="brand-logo">
          <img src={Logo} style={{ height: 35, display: 'flex', margin: '10px 0' }} />
        </Link>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography style={{fontSize: '24px', fontWeight: '700', lineHeight: '1.35', color: '#842029', background: '#f8d7da', borderRadius: '4px', padding: '10px 12px', border: '1px solid #f5c2c7'}}>This system is not for actual booking. Team is still working on this and please do not add live booking details</Typography>
      </Grid>
    </Grid>
  )
}
