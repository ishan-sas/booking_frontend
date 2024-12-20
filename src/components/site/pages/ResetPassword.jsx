import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, Container, Box, FormGroup, Button, TextField, Typography } from '@mui/material'

import Logo from '../../../assets/images/logo-w.png'

export default function ResetPassword(props) {
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const resetSubmit = (e) => {
    e.preventDefault();
    var token = window.location.href.split("/").pop();

    const data = {
      email: formInput.email,
      password: formInput.password,
      token: token
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post(`/api/reset-password/${token}`, data).then(res => {
        if (res.data.status === 200) {
          navigate('/login'); 
        }
        else if (res.data.status === 401) {
          alert('error 401')
        } 
        else {
          setFormInput({ ...formInput, error_list: res.data.validation_errors });
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
              <Typography variant='h2'>Password Reset</Typography>
              <Box component={"form"} onSubmit={resetSubmit}>
                <FormGroup className="form-group">
                  <TextField
                    type='email'
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleInput}
                    value={formInput.email || ''}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleInput}
                    value={formInput.password || ''}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Confirm Password"
                    name="confirm_password"
                    onChange={handleInput}
                    value={formInput.confirm_password || ''}
                  />
                </FormGroup>
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


