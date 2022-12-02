import React, {useState} from 'react'
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
    color: '#a4a4a4',
    fontSize: 18,
    float: 'left',
    margin: '1px 10px 0 0',
  }

  const registerWithSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formInput.name,
      email: formInput.email,
      password: formInput.password,
      contact_no: formInput.contact_no,
      user_role: 2,
      is_subscribe: 0,

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
          // localStorage.setItem('appointment_id', res.data.get_data);
          navigate(`/thank-you/${res.data.get_data}`);
        }
        // else {
        //   setRegister({ ...registerInput, error_list: res.data.validation_errors });
        // }
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
          //localStorage.setItem('appointment_id', res.data.get_data);
          navigate(`/thank-you/${res.data.get_data}`);
        }
        // else {
        //   setRegister({ ...registerInput, error_list: res.data.validation_errors });
        // }
      });
    });
  }

  return (
    <MasterLayout title={"Submit Request"}>
      <Grid container className="store_page submission_page">
        <Grid item sm={12} md={6} className="date_picker">
          <Typography className='welcome__text'><span>Submit</span> your<span> booking...</span></Typography>
          <Box className="button-row" sx={{ justifyContent: 'space-between' }}>
            <Typography>Do you have an account?</Typography>
            <Switch {...label} onClick={() => handleToggleVisibility()} />
          </Box>
          {newAccount.newAccount && (
            <Grid>
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
                <Button
                  fullWidth
                  variant={"outlined"}
                  type={"submit"}
                  className="theme-btn"
                >Login & Submit</Button>
                <Button onClick={() => navigate(-1)} className="backBtn" >Back</Button> 
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
                <Button
                  fullWidth
                  variant={"outlined"}
                  type={"submit"}
                  className="theme-btn"
                >Register with Submit</Button>
                <Button onClick={() => navigate(-1)} className="backBtn" >Back</Button> 
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid item sm={12} md={6} pl={8} sx={{
          display: 'flex',
          alignItems: 'center',}}>
          <Box className="summery_block" >
            <ul>
              <li><PlaceIcon style={menuIcon} /> Avondale store</li>
              <li><EventIcon style={menuIcon} /> {state.data.selectedDate}</li>
              <li><AccessAlarmIcon style={menuIcon} /> {state.data.selectedSlotsLbl}</li>
              <li><FaceIcon style={menuIcon} /> {state.data.noOfChild} Kid(s)</li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </MasterLayout>
  )
}


