import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Box, TextField, Typography, FormGroup, Button } from '@mui/material'
import axios from 'axios'
import AdminLayout from "../AdminLayout"

export default function StorePasswordReset() {
  const storeParams = useParams();
  const [error, setError] = useState([]);
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    getProfileDetails();

  }, [storeParams.slug]);

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const getProfileDetails = () => {
    // axios.get(`/api/edit-account/1`).then(res => {
    //   if (res.data.status === 200) {
    //     console.log(res.data.get_data);
    //     setFormInput(res.data.get_data);
    //   }
    //   else if (res.data.status === 404) {
    //     console.log(res.message);
    //   }
    // });
  }

  const resetPasswordSubmit = (e) => {
    // e.preventDefault();
    // const data = {
    //   email: formInput.email,
    //   password: formInput.password,
    // }
    // axios.get('sanctum/csrf-cookie').then(response => {
    //   axios.post('/api/store-password-reset', data).then(res => {
    //     if (res.data.status === 200) {
    //       console.log(res.data);
    //     }
    //     else {
    //       setFormInput({ ...formInput, error_list: res.data.validation_errors });
    //     }
    //   });
    // });

  }

  const deactivateStore = () => {
    // const data = {
    //   status: 0
    // }
 
    // axios.put(`/api/update-store-status/${storeParams.slug}`, data).then(res => {
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
    <AdminLayout title={"Settings"}>
      <Typography className='adm-page-title'>Reset Store Password</Typography>
      <Box component={"form"} onSubmit={resetPasswordSubmit}>
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
        <Button
          variant={"outlined"}
          type={"submit"}
        >Reset Password</Button>
      </Box>

      <Box style={{margin: '25px 0 2px'}}>
        <Typography className='adm-page-title'>Deactivate store profile?</Typography>
        <Typography style={{color: '#9f9f9f', fontSize: '14px', marginBottom: '0 !important', marginBottom: 10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
        <Button
          variant={"outlined"}
          type="button"
          style={{color: 'red', borderColor: 'red'}}
          onClick={deactivateStore}
        >Deactivate Account</Button>
      </Box>

    </AdminLayout>
  )
}
