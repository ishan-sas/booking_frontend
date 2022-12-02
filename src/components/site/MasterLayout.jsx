import React from "react";
import { Container, Grid } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import '../../assets/scss/styles.css';
import Header from './template_parts/Header'
import Footer from './template_parts/Footer'

function MasterLayout({children, title}) {
  return (
    <div className="site__container">
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <Header />
          {children}
          <Footer />
        </Grid>
      </Container>
    </div>
  )
}

export default MasterLayout