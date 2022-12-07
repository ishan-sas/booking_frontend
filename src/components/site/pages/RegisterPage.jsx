import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Container, Box, FormGroup, Button, TextField, Switch, Typography } from '@mui/material'

import Logo from '../../../assets/images/logo-w.png'

export default function RegisterPage(props) {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    contact_no: '',
  });
  const [isSubscribe, setIsSubscribe] = useState(false);

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const handleSubscribeToggle = (e) => {
    setIsSubscribe((prevState) => {
      return {
        isSubscribe: !prevState.isSubscribe
      };
    });
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formInput.name,
      email: formInput.email,
      password: formInput.password,
      contact_no: formInput.contact_no,
      user_role: 2, // 1: store user, 2: customers
      is_subscribe: isSubscribe,
      status: 1
    }
    console.log(data);
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('/api/register', data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          navigate('/login');
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
        <Grid item sm={12} md={6} pr={6}>
          <Typography variant='h2'>Register</Typography>
          <Typography variant='body2' className='body-intro'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s standard dummy.</Typography>
          <Box component={"form"} onSubmit={registerSubmit}>
            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                label="Name"
                name="name"
                onChange={handleInput}
                value={formInput.name || ''}
              />
            </FormGroup>
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
                type='tel'
                fullWidth
                label="Contact No"
                name="contact_no"
                onChange={handleInput}
                value={formInput.contact_no || ''}
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
            <FormGroup className="form-group" style={{marginTop: '-8px'}}>
              Is subscribe?
              <Switch onClick={() => handleSubscribeToggle()} />
            </FormGroup>

            <Button
              variant={"outlined"}
              type={"submit"}
              className="theme-btn"
            >Register</Button>
            <Link to="/login" className='button-link'>Login</Link> 
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Link to="/" className="brand-logo">
            <img src={Logo} style={{ height: 35 }} />
          </Link>
        </Grid>
      </Grid>  
    </Container>
  </Grid>

  )
}


