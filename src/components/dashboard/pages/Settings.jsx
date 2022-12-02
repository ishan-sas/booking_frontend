import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, FormGroup, Button } from '@mui/material'
import axios from 'axios'
import MasterLayout from "../MasterLayout"

export default function Settings() {
  const [profileInput, setProfile] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    // getAccountDetails();
    
  }, [localStorage.getItem('auth_id')]);

  const getAccountDetails = () => {
    const user_id = localStorage.getItem('auth_id');
    axios.get(`/api/edit-account/${user_id}`).then(res => {
      if (res.data.status === 200) {
        setProfile(res.data.profile_data);
      }
      else if (res.data.status === 404) {
        console.log(res.message);
      }
    });
  }

  const handleInput = (e) => {
    e.persist();
    setProfile({ ...profileInput, [e.target.name]: e.target.value });
  }

  const updateProfile = (e) => {
    e.preventDefault();
    // const user_id = localStorage.getItem('auth_id');
    // const data = profileInput;
    // axios.put(`/api/update-profile/${user_id}`, data).then(res => {
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

  return (
    <MasterLayout title={"Settings"}>
      <Typography className='adm-page-title'>Settings</Typography>

      <Box component={"form"} onSubmit={updateProfile}>
        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Primary Account</Typography>
            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                label="Name"
                name="name"
                onChange={handleInput}
                value={profileInput.name}
              />
              <Typography variant="span">{error.name}</Typography>
            </FormGroup>
            <FormGroup className="form-group">
              <TextField
                type='email'
                fullWidth
                label="Email"
                name="email"
                onChange={handleInput}
                value={profileInput.email}
              />
              <Typography variant="span">{error.email}</Typography>
            </FormGroup>
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Change Password</Typography>
            <FormGroup className="form-group">
              <TextField
                type='password'
                fullWidth
                label="New password"
                name="password"
                onChange={handleInput}
                value={profileInput.password}
              />
              <Typography variant="span">{error.password}</Typography>
            </FormGroup>
            <FormGroup className="form-group">
              <TextField
                type='password'
                fullWidth
                label="Confirm new password"
                name="re_password"
                onChange={handleInput}
                value={profileInput.re_password}
              />
              <Typography variant="span">{error.re_password}</Typography>
            </FormGroup>
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
            >
              Update Password
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Deactivate the account</Typography>
            <Typography variant="body2">Components may have multiple widths defined, causing the layout to change at the defined breakpoint.</Typography>
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn deactivate-btn"
            >
              Deactivate
            </Button>
          </Grid>
        </Grid>

      </Box>
    </MasterLayout>
  )
}
