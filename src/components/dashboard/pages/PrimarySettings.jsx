import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, FormGroup, Button } from '@mui/material'
import axios from 'axios'
import MasterLayout from "../MasterLayout"

export default function PrimarySettings() {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    getProfileDetails();

  }, [localStorage.getItem('auth_id')]);

  const getProfileDetails = () => {
    const store_id = localStorage.getItem('store_id');
    // axios.get(`/api/edit-store-primary/${store_id}`).then(res => {
    //   if (res.data.status === 200) {
    //     setFormInput(res.data.get_data);
    //   }
    //   else if (res.data.status === 404) {
    //     console.log(res.message);
    //   }
    // });
  }

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const updateProfile = (e) => {
    e.preventDefault();
    // const store_id = localStorage.getItem('store_id');
    // const data = formInput;
    // axios.put(`/api/update-account/${store_id}`, data).then(res => {
    //   if (res.data.status === 200) {
    //     console.log(res.data.message);
    //     setError([]);
    //   }
    //   else if (res.data.status === 422) {
    //     setError(res.data.errors);
    //   }
    //   else {
    //     console.log(res.data.errors);
    //   }
    // });
  }

  const updatePrimaryData = (e) => {

  }

  return (
    <MasterLayout title={"Settings"}>
      <Box component={"form"} onSubmit={updatePrimaryData}>
        <Typography className='adm-page-title'>Primary Settings</Typography>
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
            type='password'
            fullWidth
            label="Password"
            name="password"
            onChange={handleInput}
            value={formInput.password || ''}
          />
        </FormGroup>
        <Button
          variant={"outlined"}
          type={"submit"}
          className="theme-btn"
        >Update</Button>
      </Box>
    </MasterLayout>
  )
}
