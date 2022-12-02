import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Typography, Button, Box, 
  Modal, FormGroup, TextField, Select, FormControl, InputLabel, MenuItem, Grid } from '@mui/material'
import MasterLayout from "../MasterLayout"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
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
  const handleClose = () => setOpen(false);
  const [formInput, setFormInput] = useState({
    extra_note: '',
  });

	useEffect(() => {
    getAppointmentList();

  }, []);

  const getAppointmentList = () => {
		axios.get(`/api/bookings-by-store/avondale`).then(res => {
			if(res.data.status === 200) {
				setAppointmentList(res.data.get_data);
			}
		});
	}

  const handleOpen = (e, id) => {
    axios.get(`/api/get-status-summery/${id}`).then(res => {
			if(res.data.status === 200) {
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
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
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
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.user_id}</TableCell>
                <TableCell>{row.booking_date}</TableCell>
                <TableCell>{row.time_slots_id}</TableCell>
                <TableCell>{row.no_of_kids}</TableCell>
                <TableCell>
                  {/* <Link className="table-btn" to={`/edit-project/${row.id}`}>EDIT</Link> */}
                  <Button onClick={ e => handleOpen(e, row.id) }>Open modal</Button>
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
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            #{selectedBooking}
          </Typography>
            <Grid container spacing={2}>
            {statusSummery?.map((row, i) => (
              <Grid key={i} item sm={4} lg={3}>
                <Typography className='store-name'>{row.status}</Typography>
                <Typography className='store-name'>{row.extra_note}</Typography>      
              </Grid>
            ))}
          </Grid>
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
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select
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
            >Update</Button>
          </Box>
        </Box>
      </Modal>

    </MasterLayout>
  )
}
