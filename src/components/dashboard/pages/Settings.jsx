import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, FormGroup, Button } from '@mui/material'
import axios from 'axios'
import MasterLayout from "../MasterLayout"
import swal from 'sweetalert'

export default function Settings() {
  const [formInput, setFormInput] = useState({
    store_name: '',
    no_of_ftrooms: '',
    contact_no: '',
    address: '',
    email: ''
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    getProfileDetails();

  }, [localStorage.getItem('auth_id')]);

  const getProfileDetails = () => {
    const store_id = localStorage.getItem('store_id');
    axios.get(`/api/edit-account/${store_id}`).then(res => {
      if (res.data.status === 200) {
        setFormInput(res.data.get_data);
      }
      else if (res.data.status === 404) {
        console.log(res.message);
      }
    });
  }

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const updateProfile = (e) => {
    e.preventDefault();
    const store_id = localStorage.getItem('store_id');
    const data = formInput;
    axios.put(`/api/update-account/${store_id}`, data).then(res => {
      if (res.data.status === 200) {
        swal("Successfully Updated ", "", "success");
        setError([]);
      }
      else if (res.data.status === 422) {
        setError(res.data.errors);
      }
      else {
        console.log(res.data.errors);
      }
    });
  }

  return (
    <MasterLayout title={"Settings"}>
      <Box component={"form"} onSubmit={updateProfile}>
        <Typography className='adm-page-title'>Settings</Typography>
        <FormGroup className="form-group">
          <TextField
            type='text'
            fullWidth
            label="Store Name"
            name="store_name"
            onChange={handleInput}
            value={formInput.store_name || ''}
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
            type='email'
            fullWidth
            label="Email"
            name="email"
            onChange={handleInput}
            value={formInput.email || ''}
          />
        </FormGroup>
        <Button
          variant={"outlined"}
          type={"submit"}
          className="adm_theme-btn"
        >Update</Button>
      </Box>
    </MasterLayout>
  )
}
