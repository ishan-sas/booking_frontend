import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Grid, Typography } from '@mui/material'
import MasterLayout from '../MasterLayout'
import DeleteIcon from '@mui/icons-material/Delete'

export default function TimeSlots() {
  const [mondayInputFields, setMondayInputFields] = useState([{id: '', monday: ''}])
  const [tuesdayInputFields, setTuesdayInputFields] = useState([{id: '', tuesday: ''}])
  const [wednesdayInputFields, setWednesdayInputFields] = useState([{id: '', wednesday: ''}])
  const [thursdayInputFields, setThursdayInputFields] = useState([{id: '', thursday: ''}])
  const [fridayInputFields, setFridayInputFields] = useState([{id: '', friday: ''}])
  const [saturdayInputFields, setSaturdayInputFields] = useState([{id: '', saturday: ''}])
  var storeId = localStorage.getItem('store_id');

  useEffect(() => {
    getTimeslotsData();

  }, []);

  const getTimeslotsData = () => {
    axios.get(`/api/edit-timeslots/${storeId}`).then(res => {
      if (res.data.status === 200) {
        setMondayInputFields(res.data.get_data.filter(element => element.day === 'Monday').map(element => element));
        setTuesdayInputFields(res.data.get_data.filter(element => element.day === 'Tuesday').map(element => element));
        setWednesdayInputFields(res.data.get_data.filter(element => element.day === 'Wednesday').map(element => element));
        setThursdayInputFields(res.data.get_data.filter(element => element.day === 'Thursday').map(element => element));
        setFridayInputFields(res.data.get_data.filter(element => element.day === 'Friday').map(element => element));
        setSaturdayInputFields(res.data.get_data.filter(element => element.day === 'Saturday').map(element => element));
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleMondayFormChange = (index, event) => {
    let data = [...mondayInputFields];
    data[index][event.target.name] = event.target.value;
    setMondayInputFields(data);
  }
  const addMondayFields = () => {
    let newfield = { id: '', stores_id: storeId, day: 'Monday', time_slot: '' }
    setMondayInputFields([...mondayInputFields, newfield])
  }
  const removeMondayFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-timeslot/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });

    let data = [...mondayInputFields];
    data.splice(index, 1)
    setMondayInputFields(data)
  }

  const handleTuesdayFormChange = (index, event) => {
    let data = [...tuesdayInputFields];
    data[index][event.target.name] = event.target.value;
    setTuesdayInputFields(data);
  }
  const addTuesdayFields = () => {
    let newfield = { id: '', stores_id: storeId, day: 'Tuesday', time_slot: '' }
    setTuesdayInputFields([...tuesdayInputFields, newfield])
  }
  const removeTuesdayFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-timeslot/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });

    let data = [...tuesdayInputFields];
    data.splice(index, 1)
    setTuesdayInputFields(data)
  }

  const handleWednesdayFormChange = (index, event) => {
    let data = [...wednesdayInputFields];
    data[index][event.target.name] = event.target.value;
    setWednesdayInputFields(data);
  }
  const addWednesdayFields = () => {
    let newfield = { id: '', stores_id: storeId, day: 'Wednesday', time_slot: '' }
    setWednesdayInputFields([...wednesdayInputFields, newfield])
  }
  const removeWednesdayFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-timeslot/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });
    
    let data = [...wednesdayInputFields];
    data.splice(index, 1)
    setWednesdayInputFields(data)
  }

  const handleThursdayFormChange = (index, event) => {
    let data = [...thursdayInputFields];
    data[index][event.target.name] = event.target.value;
    setThursdayInputFields(data);
  }
  const addThursdayFields = () => {
    let newfield = { id: '', stores_id: storeId, day: 'Thursday', time_slot: '' }
    setThursdayInputFields([...thursdayInputFields, newfield])
  }
  const removeThursdayFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-timeslot/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });

    let data = [...thursdayInputFields];
    data.splice(index, 1)
    setThursdayInputFields(data)
  }

  const handleFridayFormChange = (index, event) => {
    let data = [...fridayInputFields];
    data[index][event.target.name] = event.target.value;
    setFridayInputFields(data);
  }
  const addFridayFields = () => {
    let newfield = { id: '', stores_id: storeId, day: 'Friday', time_slot: '' }
    setFridayInputFields([...fridayInputFields, newfield])
  }
  const removeFridayFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-timeslot/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });
    let data = [...fridayInputFields];
    data.splice(index, 1)
    setFridayInputFields(data)
  }

  const handleSaturdayFormChange = (index, event) => {
    let data = [...saturdayInputFields];
    data[index][event.target.name] = event.target.value;
    setSaturdayInputFields(data);
  }
  const addSaturdayFields = () => {
    let newfield = { id: '', stores_id: storeId, day: 'Saturday', time_slot: '' }
    setSaturdayInputFields([...saturdayInputFields, newfield])
  }
  const removeSaturdayFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-timeslot/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });

    let data = [...saturdayInputFields];
    data.splice(index, 1)
    setSaturdayInputFields(data)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      mondayTimeSlots: mondayInputFields,
      tuesdayTimeSlots: tuesdayInputFields,
      wednesdayTimeSlots: wednesdayInputFields,
      thursdayTimeSlots: thursdayInputFields,
      fridayTimeSlots: fridayInputFields,
      saturdayTimeSlots: saturdayInputFields
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post(`/api/store-timeslots/${storeId}`, data).then(res => {
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
    <MasterLayout title={"Time slots"}>
      <Typography className='adm-page-title'>Time Slots</Typography>

      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item sx={{ width: 1/6 }}>
            <Typography className='day-label'>Monday</Typography>
            {mondayInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleMondayFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='day'
                    value={input.day || ''}
                    onChange={event => handleMondayFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='time_slot'
                    placeholder='08.00 - 08.30'
                    value={input.time_slot || ''}
                    onChange={event => handleMondayFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeMondayFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addMondayFields()} >New slot</Button>
          </Grid>
          <Grid item sx={{ width: 1/6 }}>
            <Typography className='day-label'>Tuesday</Typography>
            {tuesdayInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleTuesdayFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='day'
                    value={input.day || ''}
                    onChange={event => handleTuesdayFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='time_slot'
                    placeholder='08.00 - 08.30'
                    value={input.time_slot}
                    onChange={event => handleTuesdayFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeTuesdayFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addTuesdayFields()} >New slot</Button>
          </Grid>
          <Grid item sx={{ width: 1/6 }}>
            <Typography className='day-label'>Wednesday</Typography>
            {wednesdayInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleWednesdayFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='day'
                    value={input.day || ''}
                    onChange={event => handleWednesdayFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='time_slot'
                    placeholder='08.00 - 08.30'
                    value={input.time_slot}
                    onChange={event => handleWednesdayFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeWednesdayFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addWednesdayFields()} >New slot</Button>
          </Grid>
          <Grid item sx={{ width: 1/6 }}>
            <Typography className='day-label'>Thursday</Typography>
            {thursdayInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleThursdayFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='day'
                    value={input.day || ''}
                    onChange={event => handleThursdayFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='time_slot'
                    placeholder='08.00 - 08.30'
                    value={input.time_slot}
                    onChange={event => handleThursdayFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeThursdayFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addThursdayFields()} >New slot</Button>
          </Grid>
          <Grid item sx={{ width: 1/6 }}>
            <Typography className='day-label'>Friday</Typography>
            {fridayInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleFridayFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='day'
                    value={input.day || ''}
                    onChange={event => handleFridayFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='time_slot'
                    placeholder='08.00 - 08.30'
                    value={input.time_slot}
                    onChange={event => handleFridayFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeFridayFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addFridayFields()} >New slot</Button>
          </Grid>
          <Grid item sx={{ width: 1/6 }}>
            <Typography className='day-label'>Saturday</Typography>
            {saturdayInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleSaturdayFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='day'
                    value={input.day || ''}
                    onChange={event => handleSaturdayFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='time_slot'
                    placeholder='08.00 - 08.30'
                    value={input.time_slot}
                    onChange={event => handleSaturdayFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeSaturdayFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addSaturdayFields()} >New slot</Button>
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
