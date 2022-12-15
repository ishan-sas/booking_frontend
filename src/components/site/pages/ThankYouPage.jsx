import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Box, Button } from '@mui/material'

import Logo from '../../../assets/images/logo.png'

export default function ThankYouPage() {
  const navigate = useNavigate();

  var lastPart = window.location.href.split("/").pop();

  return (
    <Grid container className="thankyou_page site__container">
      <Grid item sm={12} md={12} style={{minHeight: '95vh'}}>
        <Box className='thank_you-message'>
          <img src={Logo} style={{ height: 40, margin: '0px 0px 35px' }} />
          <Box className='msg-box'>
            <Typography className='thnk-title'>Thank you</Typography>
            <Typography style={{fontSize: '15px', marginBottom: '20px'}}></Typography>
            <Typography className='appoint_no'>#{lastPart}</Typography>
          </Box>
          <Button onClick={() => navigate(-3)} className="theme-btn secondary-btn" >Back</Button> 
        </Box>
      </Grid>
    </Grid>
  )
}
