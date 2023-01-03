import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Grid, Typography, Select, MenuItem, Box, Modal, FormGroup, Checkbox, FormControlLabel } from '@mui/material'
import MasterLayout from '../MasterLayout'
import DeleteIcon from '@mui/icons-material/Delete'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import moment from 'moment'
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: '20px 25px',
};

export default function UnavailableDates() {
  var storeId = localStorage.getItem('store_id');
  const [unavailableDateInputFields, setUnavailableDateInputFields] = useState([{ id: '', stores_id: storeId, unave_date: '', unave_type: '' }])
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [slotList, setSlotList] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedSlotsIds, setSelectedSlotsIds] = useState([]);
  const [checkedSlotList, setCheckedSlotList] = useState([]);

  useEffect(() => {
    getDateData();

  }, []);

  const getDateData = () => {
    axios.get(`/api/edit-unavailable-dates/${storeId}`).then(res => {
      if (res.data.status === 200) {
        setUnavailableDateInputFields(res.data.get_data);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleDateFormChange = (index, event) => {
    let data = [...unavailableDateInputFields];
    data[index][event.target.name] = event.target.value;
    setUnavailableDateInputFields(data);
  }
  const addDateFields = () => {
    let newfield = { id: '', stores_id: storeId, unave_date: '', unave_type: '' }
    setUnavailableDateInputFields([...unavailableDateInputFields, newfield])
  }
  const removeDateFields = (index, id) => {
    if (id) {
      axios.get('sanctum/csrf-cookie').then(response => {
        axios.delete(`/api/remove-unavaidates/${id}`).then(res => {
          if (res.data.status === 200) {
            swal("Deleted", "Date/Time Successfully deleted", "success");
          }
          else {
            console.log(res.data.errors, "error");
          }
        });
      });
    }
    let data = [...unavailableDateInputFields];
    data.splice(index, 1)
    setUnavailableDateInputFields(data)
  }

  const handleSlots = (e, stores_id, unave_date) => {
    setSelectedDate(unave_date);
    axios.get(`/api/get-unavailable-slots/${stores_id}/${unave_date}`).then(res => {
      if (res.data.status === 200) {
        setSlotList(res.data.get_data);
      }
    });
    axios.get(`/api/get-unavailable-date-slots/${stores_id}/${unave_date}`).then(res => {
      if (res.data.status === 200) {
        const unavailableSlots = JSON.parse(res.data.unavailable_slots.time_slot_id);
        setSelectedSlotsIds(unavailableSlots);
      
      }
    });
    setOpen(true);
  }

  const checkUnavailableChecked = slotId => {
    return (selectedSlotsIds.findIndex(x => x == slotId) > -1);
  }
  const handleCheckoutChange = (e, id) => {
    if (e.target.checked) {
      setSelectedSlotsIds([...selectedSlotsIds, e.target.value]);
    }
    if(!e.target.checked){
      let updatedSlots = selectedSlotsIds.filter((slotId) => slotId !== e.target.value);
      setSelectedSlotsIds([...updatedSlots]);
    }
  }
 
  const timeSlotSubmit = (e) => {
    e.preventDefault();
    const data = {
      storeId: storeId,
      selectedDate: selectedDate,
      clickedSlots: selectedSlotsIds,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post(`/api/store-unavailable-slots/${storeId}`, data).then(res => {
        if (res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      dateTimeSlots: unavailableDateInputFields,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post(`/api/store-unavailable-dates/${storeId}`, data).then(res => {
        if (res.data.status === 200) {
          swal("Success", "Date/Time Setup Successful", "success");
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });
  }

  return (
    <MasterLayout title={"Unavailable Dates"}>
      <Typography className='adm-page-title'>Setup Unavailable Dates/Slots</Typography>

      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item sx={{ width: 5 / 6 }}>
            {unavailableDateInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <Grid container>
                    <input
                      type='hidden'
                      name='id'
                      value={input.id || ''}
                      onChange={event => handleDateFormChange(index, event)}
                    />
                    <input
                      type='hidden'
                      name='stores_id'
                      value={input.stores_id || ''}
                      onChange={event => handleDateFormChange(index, event)}
                    />
                    <Grid item sx={{ width: 2 / 8 }}>
                      <TextField
                        type='text'
                        size="small"
                        name='unave_date'
                        value={input.unave_date || ''}
                        placeholder='DD.MM.YYYY'
                        onChange={event => handleDateFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sx={{ width: 2 / 8 }}>
                      <Select
                        fullWidth
                        size="small"
                        value={input.unave_type || ''}
                        name='unave_type'
                        label="Type"
                        onChange={event => handleDateFormChange(index, event)}
                      >
                        <MenuItem value={1}>Full date</MenuItem>
                        <MenuItem value={2}>Selected slots</MenuItem>
                      </Select>
                    </Grid>
                    {/* { (input.unave_type === 2) && (input.id !== 'undefined') ? */}
                    { input.id !== '' && input.unave_type === 2 ?
                      <Grid item sx={{ width: 1 / 8 }}>
                        <Button onClick={e => handleSlots(e, input.stores_id, input.unave_date)} className="theme-btn"
                          style={{ fontSize: '10px', fontWeight: 300, lineHeight: 1.5, padding: '5px 12px', marginTop: '5px' }}
                        >Add Slots</Button>
                      </Grid>
                      : null
                    }
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        name='unave_date'
                        inputFormat="YYYY.MM.DD"
                        value={input.unave_date || ''}
                        onChange={event => handleDateFormChange(index, event)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider> */}
                    <Grid item sx={{ width: 2 / 8 }}>
                      {
                        index ?
                          <button type='button' onClick={() => removeDateFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                          : null
                      }
                    </Grid>
                  </Grid>
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addDateFields()} >Add New Date</Button>
          </Grid>
        </Grid>
        <Button
          variant={"outlined"}
          type={"submit"}
          style={{ marginTop: 30 }}
          className="adm_theme-btn">
          Save
        </Button>
      </form>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="booking-modal"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item sm={12} lg={12}>
              <form onSubmit={timeSlotSubmit}>
                <FormGroup style={{height: '68vh', overflowY: 'auto', display: 'block'}}>
                  {slotList.map((row, i) => (
                    <FormControlLabel
                      key={row.id}
                      checked={checkUnavailableChecked(row.id)}
                      value={row.id}
                      label={row.time_slot}
                      control={<Checkbox 
                      value={row.slot} 
                      onChange={e => handleCheckoutChange(e, row.id)} />}
                    />
                  ))}
                </FormGroup>
                <Button
                  variant={"outlined"}
                  type={"submit"}
                  style={{ marginTop: 30 }}
                  className="adm_theme-btn">
                  Save
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>

    </MasterLayout>
  )
}
