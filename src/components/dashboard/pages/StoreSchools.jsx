import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Grid, Typography } from '@mui/material'
import MasterLayout from '../MasterLayout'
import DeleteIcon from '@mui/icons-material/Delete'

export default function StoreSchools() {
  var storeId = localStorage.getItem('store_id');
  const [schoolInputFields, setSchoolInputFields] = useState([{id: '', stores_id:storeId, school_name: ''}])

  useEffect(() => {
    getSchoolData();

  }, []);

  const getSchoolData = () => {
    axios.get(`/api/edit-storeschools/${storeId}`).then(res => {
      if (res.data.status === 200) {
        setSchoolInputFields(res.data.get_data);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleSchoolFormChange = (index, event) => {
    let data = [...schoolInputFields];
    data[index][event.target.name] = event.target.value;
    setSchoolInputFields(data);
  }
  const addSchoolFields = () => {
    let newfield = { id: '', stores_id: storeId, school_name: '' }
    setSchoolInputFields([...schoolInputFields, newfield])
  }
  const removeSchoolFields = (index, id) => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`/api/remove-schools/${id}`).then(res => {
        if(res.data.status === 200) {
          window.location.reload(); 
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    });

    let data = [...schoolInputFields];
    data.splice(index, 1)
    setSchoolInputFields(data)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      schoolTimeSlots: schoolInputFields,
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post(`/api/store-schools/${storeId}`, data).then(res => {
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
    <MasterLayout title={"Schools"}>
      <Typography className='adm-page-title'>Schools</Typography>

      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item sx={{ width: 4/6 }}>
            {schoolInputFields.map((input, index) => {
              return (
                <div key={index} className="slotBlock">
                  <input
                    type='hidden'
                    name='id'
                    value={input.id || ''}
                    onChange={event => handleSchoolFormChange(index, event)}
                  />
                  <input
                    type='hidden'
                    name='stores_id'
                    value={input.stores_id || ''}
                    onChange={event => handleSchoolFormChange(index, event)}
                  />
                  <TextField
                    type='text'
                    size="small"
                    name='school_name'
                    value={input.school_name || ''}
                    onChange={event => handleSchoolFormChange(index, event)}
                  />
                  {
                    index ?
                      <button type='button' onClick={() => removeSchoolFields(index, input.id)} className="removeBtn"><DeleteIcon /></button>
                      : null
                  }
                </div>
              )
            })}
            <Button type='button' variant="outlined" onClick={() => addSchoolFields()} >Add New School</Button>
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
