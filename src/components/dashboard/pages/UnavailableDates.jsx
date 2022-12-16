import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Grid, Typography } from '@mui/material'
import MasterLayout from '../MasterLayout'
import DeleteIcon from '@mui/icons-material/Delete'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment'

export default function UnavailableDates() {
  var storeId = localStorage.getItem('store_id');
  const [unavailableDateInputFields, setUnavailableDateInputFields] = useState([{id: '', stores_id:storeId, unave_date: ''}])

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
    // var req_date_display = moment(value.$d).format("YYYY.MM.DD");
    let data = [...unavailableDateInputFields];
    data[index][event.target.name] = event.target.value;
    setUnavailableDateInputFields(data);
  }
  const addDateFields = () => {
    let newfield = { id: '', stores_id: storeId, unave_date: '' }
    setUnavailableDateInputFields([...unavailableDateInputFields, newfield])
  }
  const removeDateFields = (index, id) => {
    if(id) {
      axios.get('sanctum/csrf-cookie').then(response => {
        axios.delete(`/api/remove-unavaidates/${id}`).then(res => {
          if(res.data.status === 200) {
            //window.location.reload(); 
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

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      dateTimeSlots: unavailableDateInputFields,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post(`/api/store-unavailable-dates/${storeId}`, data).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });
  }

  return (
    <MasterLayout title={"Unavailable Dates"}>
      <Typography className='adm-page-title'>Setup unavailable dates</Typography>

      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item sx={{ width: 2/6 }}>
            {unavailableDateInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
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
                  <TextField
                    type='text'
                    size="small"
                    name='unave_date'
                    value={input.unave_date || ''}
                    placeholder='YYYY.MM.DD'
                    onChange={event => handleDateFormChange(index, event)}
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      name='unave_date'
                      inputFormat="YYYY.MM.DD"
                      value={input.unave_date || ''}
                      onChange={event => handleDateFormChange(index, event)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider> */}
                  {
                    index ?
                      <button type='button' onClick={() => removeDateFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addDateFields()} >Add New Date</Button>
          </Grid>
        </Grid>
        <Button
          variant={"outlined"}
          type={"submit"} 
          style={{marginTop: 30}}
          className="adm_theme-btn">
          Save
        </Button>
      </form>
    </MasterLayout>
  )
}
