import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Grid, Typography, TextField, FormGroup, Button, FormControlLabel, Checkbox, Box } from '@mui/material'
import MasterLayout from '../MasterLayout'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import Counter from 'react-mui-counter'

import LoadingImg from '../../../assets/images/loading.gif'

export default function StoreProfile(props) {
  const storeParams = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [ftrooms, setFtrooms] = useState(4);
  const [morningSlots, setMorningSlots] = useState([]);
  const [eveningSlots, setEveningSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [noOfChild, setNoOfChild] = useState();
  const [selectedSlotsLbl, setselectedSlotsLbl] = useState([]);
  const [selectedSlotsIds, setSelectedSlotsIds] = useState([]);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState([]);

  useEffect(() => {

  }, [storeParams.slug]);

  const handleSelectedDate = (value) => {
    var req_date = moment(value.$d).format("DD.MM.YYYY");
    var req_date_display = moment(value.$d).format("YYYY.MM.DD");
    setSelectedDate(req_date);
    setSelectedDateDisplay(req_date_display);
    setIsDataLoading(true);
    setLoading(false);

    axios.get(`/api/get-slots/${storeParams.slug}/${req_date}/${noOfChild}`).then(res => {
      if(res.data.status === 200) {
        setMorningSlots(res.data.timeslots.filter(element => element.session === 'AM').map(element => element));
        setEveningSlots(res.data.timeslots.filter(element => element.session === 'PM').map(element => element));
      }
      else {
        console.log(res.data.errors, "error");
      }
    });

  };

  const getNoOfChild = (e) => {
    setNoOfChild(e);
  }

  const handleCheckboxChange = (e, i) => {
    if (e.target.checked) {
      setselectedSlotsLbl([...selectedSlotsLbl, i]);
      setSelectedSlotsIds([...selectedSlotsIds, e.target.value]);
    }
  }

  const submitSelectedSlot = () => {
    const data = {
      storeId: storeParams.slug,
      selectedDate: selectedDate,
      noOfChild: noOfChild,
      selectedSlotsLbl: selectedSlotsLbl,
      selectedSlotsIds: selectedSlotsIds
    }
    navigate('/booking-submit', {
      state: {
        data: data
      }
    });
  }

  return (
    <MasterLayout title={"Store page"}>
      <Grid container className="store_profile">
        <Grid item sm={12} md={6} className="date_picker">
          <Typography className='welcome__text'><span>When</span> and<span> howmany <br /></span> Childrens for Booking?</Typography>
          <FormGroup className="form-group child_counter">
            <Typography className="prefixes">for</Typography>
            <Counter
              onChange={(e) => getNoOfChild(e)}
              min={1}
            />
            <Typography className="suffixes">Child</Typography>
          </FormGroup>
          <FormGroup className="form-group">
            <Typography className="prefixes">It will be on</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select a Date"
                inputFormat="YYYY.MM.DD"
                value={selectedDateDisplay}
                onChange={handleSelectedDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormGroup>
          {/* <Button onClick={() => submitSelectedSlot()} className="theme-btn" style={{marginTop: 20}}>Next</Button> */}

          <Box className="button-row" sx={{ justifyContent: 'space-between' }}>
            <Link to="/" className="theme-btn button-link">Back</Link>
            <Button onClick={() => submitSelectedSlot()} className="theme-btn">Next</Button>
          </Box>

        </Grid>
        <Grid item sm={6}>
          {loading && (
            <div className='loading_wrap'>
              <img src={LoadingImg} style={{ height: 70, display: 'block', margin: '0 auto' }} />
            </div>
          )}

          {isDataLoading && (
            <Grid sm={12}>
              <Typography variant='body2' className='picked_date'>Mon<Typography variant='span'>22</Typography></Typography>
            </Grid>
          )}

          {isDataLoading && (
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Typography className='session_title'>Morning Slots</Typography>
                <Grid container spacing={2}>
                  {/* <Grid item sm={12} md={6}>
                    <FormControlLabel
                      value=''
                      label='08:00 - 08:30'
                      className='slot_label'
                      control={<Checkbox value='' onChange={e => handleCheckboxChange(e)} />}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <FormControlLabel
                      value=''
                      label='08:30 - 09:00'
                      className='slot_label'
                      control={<Checkbox value='' onChange={e => handleCheckboxChange(e)} />}
                    />
                  </Grid> */}

                  {morningSlots.map((row, i) => (
                    <Grid key={i} item sm={12}>
                      <FormControlLabel
                        value={row.id}
                        label={<div>{row.time_slot} - {4 - row.kids_count}</div>}
                        control={<Checkbox value={row.slot} onChange={e => handleCheckboxChange(e, row.time_slot)} />}
                        disabled={
                          row.kids_count === 4 ||
                          ( (5 - row.kids_count) <= noOfChild )
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Typography className='session_title'>Evening Slots</Typography>
                <Grid container spacing={2}>
                  {/* <Grid item sm={12} md={6}>
                    <FormControlLabel
                      value=''
                      label='08:00 - 08:30'
                      className='slot_label'
                      control={<Checkbox value='' onChange={e => handleCheckboxChange(e)} />}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <FormControlLabel
                      value=''
                      label='08:30 - 09:00'
                      className='slot_label'
                      control={<Checkbox value='' onChange={e => handleCheckboxChange(e)} />}
                    />
                  </Grid> */}

                  {eveningSlots.map((row, i) => (
                    <Grid key={i} item sm={12}>
                      <FormControlLabel
                        value={row.id}
                        label={<div>{row.time_slot} - {4 - row.kids_count}</div>}
                        control={<Checkbox value={row.slot} onChange={e => handleCheckboxChange(e, row.time_slot)} />}
                        disabled={
                          row.kids_count === 4 ||
                          ( (5 - row.kids_count) < noOfChild )
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </MasterLayout>
  )
}
