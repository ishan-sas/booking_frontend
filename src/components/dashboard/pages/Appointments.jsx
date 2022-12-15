import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Typography, Button, Box,
  Modal, FormGroup, TextField, Select, FormControl, InputLabel, MenuItem, Grid
} from '@mui/material'
import MasterLayout from "../MasterLayout"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Appointments() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [statusSummery, setStatusSummery] = React.useState([]);
  const [timeList, setTimeList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  var storeId = localStorage.getItem('store_id');
  const handleClose = () => setOpen(false);
  const [formInput, setFormInput] = useState({
    extra_note: '',
  });

  useEffect(() => {
    getAppointmentList();
    //getTimeList();
    getCustomerList();

  }, []);

  const getAppointmentList = () => {
    axios.get(`/api/bookings-by-store/${storeId}`).then(res => {
      if (res.data.status === 200) {
        setAppointmentList(res.data.get_data);
      }
    });
  }

  const getTimeList = () => {
    axios.get(`/api/get-time-label`).then(res => {
      if (res.data.status === 200) {
        setTimeList(res.data.get_data);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const getCustomerList = () => {
    axios.get(`/api/get-customers`).then(res => {
      if (res.data.status === 200) {
        setCustomerList(res.data.get_data);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleOpen = (e, id) => {
    axios.get(`/api/get-status-summery/${id}`).then(res => {
      if (res.data.status === 200) {
        console.log(res.data.get_data);
        setStatusSummery(res.data.get_data);
      }
    });
    setSelectedBooking(id);
    setOpen(true);
  }

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  const updateStatus = (e) => {
    e.preventDefault();

    const data = {
      booking_id: selectedBooking,
      status: status,
      extra_note: formInput.extra_note
    }
    axios.post(`/api/update-status`, data).then(res => {
      if (res.data.status === 200) {
        window.location.reload();
      }
      else {
        setFormInput({ ...formInput, error_list: res.data.validation_errors });
      }
    });

  }

  return (
    <MasterLayout title={"Appointments"}>
      <Typography className='adm-page-title'>Appointment</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Appointment ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
              <TableCell>Kids</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentList.map((row, item) => (
              <TableRow
                key={item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {(() => {
                    const options = [];
                    if (row.status === 1) {
                      options.push(<div className='status_sign completed'></div>);
                    }
                    if (row.status === 2) {
                      options.push(<div className='status_sign pending'></div>);
                    }
                    if (row.status === 0) {
                      options.push(<div className='status_sign rejected'></div>);
                    }
                    return options;
                  })()}
                </TableCell>
                <TableCell>#{row.id}</TableCell>
                <TableCell>{customerList.map(item => item.id === row.user_id ? item.name : '')}</TableCell>

                <TableCell>{customerList.map(item => item.id === row.user_id ? item.email : '')}</TableCell>
                <TableCell>{customerList.map(item => item.id === row.user_id ? item.contact_no : '')}</TableCell>

                <TableCell>{row.booking_date}</TableCell>
                <TableCell>{timeList.map(item => item.id === row.time_slots_id ? item.time_slot : '')}</TableCell>
                <TableCell>{row.no_of_kids}</TableCell>
                <TableCell>
                  <Button onClick={e => handleOpen(e, row.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="booking-modal"
      >
        <Box sx={style}>
          <Grid >

          </Grid>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            #{selectedBooking}
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={6} lg={6}>
              <Box component={"form"} onSubmit={updateStatus}>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={4}
                    type='text'
                    fullWidth
                    label="Extra Note"
                    name="extra_note"
                    onChange={handleInput}
                    value={formInput.extra_note || ''}
                  />
                </FormGroup>
                <FormControl style={{width: '100%'}}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>Rejected</MenuItem>
                    <MenuItem value={2}>Pending</MenuItem>
                    <MenuItem value={1}>Completed</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  variant={"outlined"}
                  type={"submit"}
                  className="theme-btn"
                >Update</Button>
              </Box>
            </Grid>
            <Grid item sm={6} lg={6}>
              <Grid container pl={2}>
                {statusSummery?.map((row, i) => (
                  <Grid key={i} item sm={12} className="status_block">
                    <Typography className='status_lbl'>
                      { row.status === 1 ? 'Completed':'' }
                      { row.status === 2 ? 'Pending':'' }
                      { row.status === 0 ? 'Rejected':'' }
                    </Typography>
                    <Typography className='extra_note'>{row.extra_note}</Typography>
                    <Typography className='date'>Updated: {row.created_at}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

    </MasterLayout>
  )
}
