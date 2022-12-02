import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, Box, FormGroup, Button, TextField } from '@mui/material'
import MasterLayout from "../MasterLayout"

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
    <MasterLayout title={"Login"}>
      <Grid container className="login_page">
        <Grid item sm={12} md={6}>

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
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
            >Login</Button>
          </Box>

        </Grid>
      </Grid>
    </MasterLayout>
  )
}


