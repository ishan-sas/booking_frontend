import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Switch, FormGroup, Button, Box, TextField } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import EventIcon from '@mui/icons-material/Event'
import FaceIcon from '@mui/icons-material/Face'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import MasterLayout from "../MasterLayout"

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BookingSubmit(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    contact_no: '',
    user_role: '',
    is_subscribe: '',
  });
  const [newAccount, setNewAccount] = useState(true);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [validationError, setValidationError] = useState([]);

  useEffect(() => {
    //getStoreInfo();

  }, []);

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const handleToggleVisibility = () => {
    setNewAccount((prevState) => {
      return {
        newAccount: !prevState.newAccount
      };
    });
  }

  const menuIcon = {
    color: '#fff',
    fontSize: 18,
    float: 'left',
    margin: '1px 20px 0 0',
  }

  const handleSubscribeToggle = (e) => {
    setIsSubscribe((prevState) => {
      return {
        isSubscribe: !prevState.isSubscribe
      };
    });
  }

  // const getStoreInfo = () => {
  //   console.log(state.data.storeId);
  // }

  const registerWithSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formInput.name,
      email: formInput.email,
      password: formInput.password,
      contact_no: formInput.contact_no,
      user_role: 2,
      is_subscribe: isSubscribe,

      stores_id: state.data.storeId,
      time_slots_id: state.data.selectedSlotsIds,
      no_of_kids: state.data.noOfChild,
      booking_date: state.data.selectedDate,
      ftroom: state.data.ftroom,
      extra_note: state.data.extra_note,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('api/register-with-booking', data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          navigate(`/thank-you/${res.data.get_data}`);
        }
        else {
          setValidationError(res.data);
        }
      });
    });
  }

  const loginWithSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: formInput.email,
      password: formInput.password,

      stores_id: state.data.storeId,
      time_slots_id: state.data.selectedSlotsIds,
      no_of_kids: state.data.noOfChild,
      booking_date: state.data.selectedDate,
      ftroom: state.data.ftroom,
      extra_note: state.data.extra_note,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('api/login-with-booking', data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          navigate(`/thank-you/${res.data.get_data}`);
        }
        else {
          setValidationError(res.data.message);
        }
      });
    });
  }

  return (
    <MasterLayout title={"Submit Request"}>
      <Grid container className="store_page submission_page">
        <Grid item sm={12} md={8} className="date_picker">
          <Grid className='col_title'>
            <Typography variant='h4'>Submit your <br />booking</Typography>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={7}>
              <Box mt={2} mb={4} style={{ width: '100%' }}>
                <Typography>{validationError}</Typography>
                <Typography style={{display: 'inline-block'}}>Do you have an account?</Typography>
                <Switch {...label} onClick={() => handleToggleVisibility()} />
              </Box>
              {newAccount.newAccount && (
              <Grid style={{width: '100%'}}>
                <Box component={"form"} onSubmit={loginWithSubmit}>
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
                  <Box className="button-row" mb={10} sx={{ justifyContent: 'space-between' }}>
                    <Button variant={"outlined"} type={"submit"} className="theme-btn" style={{float: 'right'}}>Login & Submit</Button>
                    <Button onClick={() => navigate(-1)} className="theme-btn secondary-btn" >Back</Button>
                  </Box>
                </Box>
              </Grid>
              )}
              {!newAccount.newAccount && (
                <Grid>
                  <Box component={"form"} onSubmit={registerWithSubmit}>
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
                    <Box style={{ width: '100%', marginTop: '-10px' }}>
                      <Typography style={{display: 'inline-block'}}>Is subscribe?</Typography>
                      <Switch onClick={() => handleSubscribeToggle()} />
                    </Box>
                    <Box className="button-row" mb={10} sx={{ justifyContent: 'space-between' }}>
                      <Button variant={"outlined"} type={"submit"} className="theme-btn" style={{float: 'right'}}>Register & Submit</Button>
                      <Button onClick={() => navigate(-1)} className="theme-btn secondary-btn" >Back</Button>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
            <Grid item sm={12} md={5} pl={6}>
              <Box className="summery_block" >
                <Typography className='selected_store'><PlaceIcon style={menuIcon} /> {state.data.storeId}</Typography>
                <ul>
                  <li><EventIcon style={menuIcon} /> {state.data.selectedDate}</li>
                  <li><AccessAlarmIcon style={menuIcon} /> {state.data.selectedSlotsLbl} </li>
                  <li><FaceIcon style={menuIcon} /> {state.data.noOfChild} Kid(s)</li>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MasterLayout>
  )
}


