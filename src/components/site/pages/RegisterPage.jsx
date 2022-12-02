import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Grid, Box, FormGroup, Button, TextField, Switch } from '@mui/material'
import MasterLayout from "../MasterLayout"

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
      user_role: 1,
      is_subscribe: isSubscribe,
      status: 1
    }
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
    <MasterLayout title={"Submit Request"}>
      <Grid container className="store_page">
        <Grid item sm={12} md={6}>

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
            <FormGroup className="form-group">
              Is subscribe?
              <Switch onClick={() => handleSubscribeToggle()} />
            </FormGroup>

            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
            >Register</Button>
          </Box>

        </Grid>
      </Grid>
    </MasterLayout>
  )
}


