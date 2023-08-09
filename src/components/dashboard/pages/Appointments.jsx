import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CssBaseline from '@mui/material/CssBaseline'
import Header from '../template_parts/Header'
import {TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Typography, Button, Box, Modal, FormGroup, 
  TextField, Select, FormControl, InputLabel, MenuItem, Grid, Container} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
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
  const [bookingData, setBookingData] = React.useState([]);
  const [customerData, setCustomerData] = React.useState([]);
  const [timeSlotData, setTimeSlotData] = React.useState([]);
  const [statusSummery, setStatusSummery] = React.useState([]);
  const [filterDate, setFilterDate] = React.useState([]);
  // const [timeList, setTimeList] = useState([]);
  // const [customerList, setCustomerList] = useState([]);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState([]);
  var storeId = localStorage.getItem('store_id');
  const handleClose = () => setOpen(false);
  const [formInput, setFormInput] = useState({
    extra_note: '',
  });
  const [searchFormInput, setSearchFormInput] = useState([]);

  useEffect(() => {
    getAppointmentList();
    // getTimeList();
    // getCustomerList();

  }, []);

  const getAppointmentList = () => {
    axios.get(`/api/bookings-by-store/${storeId}`).then(res => {
      if (res.data.status === 200) {
        setAppointmentList(res.data.get_data);
      }
    });
  }

  // const getTimeList = () => {
  //   axios.get(`/api/get-time-label`).then(res => {
  //     if (res.data.status === 200) {
  //       setTimeList(res.data.get_data);
  //     }
  //     else if (res.data.status === 404) {
  //       console.log(res.message, "message");
  //     }
  //   });
  // }

  const clearPage = () => {
    window.location.reload();
  }

  // const getCustomerList = () => {
  //   axios.get(`/api/get-customers`).then(res => {
  //     if (res.data.status === 200) {
  //       setCustomerList(res.data.get_data);
  //     }
  //     else if (res.data.status === 404) {
  //       console.log(res.message, "message");
  //     }
  //   });
  // }

  const handleOpen = (e, id) => {
    axios.get(`/api/get-status-summery/${id}`).then(res => {
      if (res.data.status === 200) {
        setStatusSummery(res.data.get_data);
      }
    });
    axios.get(`/api/get-booking-info/${id}`).then(res => {
      if (res.data.status === 200) {
        setBookingData(res.data.get_data);
        setCustomerData(res.data.get_data.customer_data);
        setTimeSlotData(res.data.timeSlot_data);
      }
    });
    setSelectedBooking(id);
    setOpen(true);
  }

  const handleSelectedDate = (value) => {
    var req_date_display = moment(value.$d).format("YYYY.MM.DD");
    let filterDate = moment(value.$d).format("DD.MM.YYYY");
    axios.get(`/api/bookings-by-date/${storeId}/${filterDate}`).then(res => {
      if (res.data.status === 200) {
        setAppointmentList(res.data.get_data);
      }
    });
    setFilterDate(filterDate);
    setSelectedDateDisplay(req_date_display);
  }

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const handleSearchInput = (e) => {
    setSearchFormInput(e.target.value);
  }

  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  const handlePDFDownloader = () => {
    if (filterDate.length === 0) { var filterDates = 'null'; } else { var filterDates = filterDate }
    const url = `${axios.defaults.baseURL}api/download-pdf/${storeId}/${filterDates}`;
    window.open(url, "_blank");
  }

  const stringSearch = () => {
    axios.get(`/api/bookings-by-string/${storeId}/${searchFormInput}`).then(res => {
      if (res.data.status === 200) {
        setAppointmentList(res.data.get_data);
      }
    });
  }

  const displayTimeLable = () => {
    if(!timeSlotData || timeSlotData.length < 0) {
      return '';      
    }
    return timeSlotData?.map((row, i) => (
      <> { row && row.time_slot ? row.time_slot+', ' : '' } </>
    ))
  }

  const updateStatus = (e) => {
    e.preventDefault();

    const data = {
      booking_id: selectedBooking,
      status: status,
      extra_note: formInput.extra_note,
      customer_name:customerData.name,
      customer_email:customerData.email,
      booking_date: bookingData.booking_date,
      // booking_time: displayTimeLable()
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

    <div className="store__dashboard">
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" >
        <Grid container>
          <Grid item xs={12} md={12}>
            <Grid sx={{ padding: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>

                <Typography className='adm-page-title' style={{ marginBottom: '5px' }}>Appointments</Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item md={3} flex sx={{ flexDirection: 'row-reverse' }} className="datePicker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        inputFormat="DD.MM.YYYY"
                        value={selectedDateDisplay}
                        onChange={handleSelectedDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item>
                    <TextField
                      size='small'
                      type='text'
                      fullWidth
                      name="filter"
                      style={{ width: '200px', display: 'inline-block' }}
                      onChange={handleSearchInput}
                    />
                    <Button
                      variant={"outlined"}
                      type="button"
                      onClick={stringSearch}
                      style={{ minWidth: 'auto', height: '40px', padding: '0 10px', margin: '0 5px' }}
                    ><SearchIcon /></Button>
                    <Button
                      variant={"outlined"}
                      type='button'
                      onClick={clearPage}
                      style={{ height: '40px', display: 'inline-block' }}
                    >Clear</Button>
                  </Grid>
                  <Button ariant={"outlined"} type='button' onClick={handlePDFDownloader}
                    style={{ color: 'red', height: '40px', minWidth: 'auto', padding: '8px 12px 0', margin: '16px 0px 0px', display: 'inline-block' }}><PictureAsPdfIcon />
                  </Button>
                </Grid>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact No</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell style={{ minWidth: '145px' }}>Time Slot</TableCell>
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
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.contact_no}</TableCell>
                          <TableCell>{row.booking_date}</TableCell>
                          <TableCell>{row.slots}</TableCell>
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
                    <Typography variant="h6" style={{ fontWeight: 700, fontSize: '15px', margin: '0 0 5px' }}>
                      Booking ID: #{selectedBooking}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item sm={6} lg={6}>
                        <ul className='bookingpop-summery'>
                          <li><Typography>Booking Date</Typography>: {bookingData.booking_date}</li>
                          <li><Typography>Booking Time</Typography>:
                            {displayTimeLable()}
                          </li>
                          <li><Typography>No of Kids</Typography>: {bookingData.no_of_kids}</li>
                          <li><Typography>Customer Name</Typography>: {customerData.name}</li>
                          <li><Typography>Customer Email</Typography>: {customerData.email}</li>
                          <li><Typography>Contact No</Typography>: {customerData.contact_no}</li>
                        </ul>
                        <Grid container>
                          {statusSummery?.map((row, i) => (
                            <Grid key={i} item sm={12} className="status_block">
                              <Typography className='status_lbl'>
                                {row.status === 1 ? 'Completed' : ''}
                                {row.status === 2 ? 'Pending' : ''}
                                {row.status === 0 ? 'Rejected' : ''}
                              </Typography>
                              <Typography className='extra_note'>{row.extra_note}</Typography>
                              <Typography className='date'>Updated: {row.created_at}</Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
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
                          <FormControl style={{ width: '100%' }}>
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
                            className="adm_theme-btn"
                          >Update</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>

            </Grid>
          </Grid>
        </Grid>
        {/* =========== Footet =========== */}
        <Grid container spacing={2}>
          <Grid item md={3} sx={{ display: { md: 'block', sm: 'none' } }}>
          </Grid>
          <Grid item xs={12} md={9}>
         
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
