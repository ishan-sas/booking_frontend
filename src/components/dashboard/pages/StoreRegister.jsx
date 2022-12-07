import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Grid, Box, TextField, Typography, FormGroup, Button } from '@mui/material'
import axios from 'axios'
import MasterLayout from "../MasterLayout"

export default function StoreRegister() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    contact_no: '',
    no_of_ftrooms: '',
    address: ''
  });

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formInput.name,
      email: formInput.email,
      password: formInput.password,
      contact_no: formInput.contact_no,
      address: formInput.address,
      no_of_ftrooms: formInput.no_of_ftrooms,
      user_role: 1,
      is_subscribe: 0,
      status: 1
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('/api/store-register', data).then(res => {
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
    <MasterLayout title={"Settings"}>
      <Typography className='adm-page-title'>Register New Store</Typography>

      <Box component={"form"} onSubmit={registerSubmit}>
        <FormGroup className="form-group">
          <TextField
            type='text'
            fullWidth
            label="Store Name"
            name="name"
            onChange={handleInput}
            value={formInput.name || ''}
          />
        </FormGroup>
        <FormGroup className="form-group">
          <TextField
            type='number'
            fullWidth
            label="No of Fitton Rooms"
            name="no_of_ftrooms"
            onChange={handleInput}
            value={formInput.no_of_ftrooms || ''}
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
            type='number'
            fullWidth
            label="Contact No"
            name="contact_no"
            onChange={handleInput}
            value={formInput.contact_no || ''}
          />
        </FormGroup>
        <FormGroup className="form-group">
          <TextField
            multiline
            rows={3}
            type='text'
            fullWidth
            label="Address"
            name="address"
            onChange={handleInput}
            value={formInput.address || ''}
          />
        </FormGroup>

        <Button
          fullWidth
          variant={"outlined"}
          type={"submit"}
        >Add New Store</Button>
      </Box>

    </MasterLayout>
  )
}
