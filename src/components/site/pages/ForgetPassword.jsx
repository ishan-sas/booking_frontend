import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, Container, Box, FormGroup, Button, TextField, Typography } from '@mui/material'
import swal from 'sweetalert'

import Logo from '../../../assets/images/logo-w.png'

export default function ForgetPassword(props) {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState([]);

  const [formInput, setFormInput] = useState({
    email: ''
  });

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const forgetSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: formInput.email,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('/api/forget-password', data).then(res => {
        if (res.data.status === 200) {
          setValidationError([]);
          swal(res.data.message, "", "success");
        }
        else if (res.data.status === 401) {
          setValidationError(res.data.message);
        } 
        else {
          setFormInput({ ...formInput, error_list: res.data });
        }
      });
    });

  }

  return (
    <Grid container className="site__container">
      <Container className='login_page'>
        <Grid container className='login_container'>
          <Grid item sm={12} md={6}>
            <Link to="/" className="brand-logo">
              <img src={Logo} style={{ height: 35 }} />
            </Link>
          </Grid>
          <Grid item sm={12} md={6} pr={6}>
            <Box className='form-wrap'>
              <Typography variant='h2'>Forget Password</Typography>
              {/* <Typography variant='body2' className='body-intro'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s standard dummy.</Typography> */}
              <Box component={"form"} onSubmit={forgetSubmit}>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleInput}
                    value={formInput.email || ''}
                  />
                </FormGroup>
                <Typography style={{color: 'red'}}>{validationError}</Typography>
                <Grid style={{ display: 'block', textAlign: 'center', margin: '15px 0 25px' }}>
                  <Button
                    variant={"outlined"}
                    type={"submit"}
                    className="theme-btn"
                  >Password Reset</Button>
                </Grid>
                <Grid style={{ display: 'block', textAlign: 'center', margin: '15px 0 25px' }}>
                  <Link to="/login" className='button-link'>Login</Link>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}


