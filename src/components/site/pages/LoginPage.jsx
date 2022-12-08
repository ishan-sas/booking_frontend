import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, Container, Box, FormGroup, Button, TextField, Typography } from '@mui/material'

import Logo from '../../../assets/images/logo-w.png'

export default function LoginPage(props) {
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: formInput.email,
      password: formInput.password,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('/api/login', data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_id', res.data.profileId);
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('store_id', res.data.storeId);
          if (res.data.usertype === 1) {
            navigate('/admin');
          }
          else if (res.data.usertype === 2) {
            navigate('/');
          }
          else {
            navigate('/login');
          }
        }
        else if (res.data.status === 401) {
          alert('error 401')
        } else {
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
              <Typography variant='h2'>Login</Typography>
              <Typography variant='body2' className='body-intro'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s standard dummy.</Typography>
              <Box component={"form"} onSubmit={loginSubmit}>
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
                <FormGroup className="form-group">
                  <TextField
                    type='password'
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleInput}
                    value={formInput.password || ''}
                  />
                </FormGroup>
                <Grid style={{display: 'block', textAlign: 'center', margin: '15px 0 25px'}}>
                  <Button
                    variant={"outlined"}
                    type={"submit"}
                    className="theme-btn"
                  >Login</Button>
                </Grid>
                <Grid style={{display: 'block', textAlign: 'center', margin: '15px 0 25px'}}>
                  <Link to="/password-reset" className='button-link reset-link'>Forgot password?</Link>
                  <br />
                  <Link to="/register" className='button-link'>Register</Link>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}


