import React from "react";
import { Container, Grid } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline'
import '../../assets/scss/styles.css';
import Header from './template_parts/Header'
import Footer from './template_parts/Footer'
import LeftSideBar from './template_parts/LeftSideBar'

function MasterLayout({children, title}) {
  return (
    <div className="store__dashboard">
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" >
        <Grid container spacing={2}>
          <Grid item md={3} sx={{display: { md: 'block', sm: 'none'} }}>
            <LeftSideBar />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid sx={{padding: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>
              {children}
            </Grid>
          </Grid>
        </Grid>
        {/* =========== Footet =========== */}
        <Grid container spacing={2}>
          <Grid item md={3} sx={{display: { md: 'block', sm: 'none'} }}>
          </Grid>
          <Grid item xs={12} md={9}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default MasterLayout