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
  const [storeProfile, setStoreProfile] = useState([]);
  const [morningSlots, setMorningSlots] = useState([]);
  const [eveningSlots, setEveningSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [noOfChild, setNoOfChild] = useState(1);
  const [selectedSlotsLbl, setselectedSlotsLbl] = useState([]);
  const [selectedSlotsIds, setSelectedSlotsIds] = useState([]);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState([]);
  const [dateLabel, setDateLabel] = useState([]);
  const [monthLabel, setMonthLabel] = useState([]);
  const [unavailableDate, setUnavailableDate] = useState(false);
  // const [noOfChiledDisabled, setNoOfChiledDisabled] = useState(false);

  useEffect(() => {
    getStoreProfile();

  }, [storeParams.slug]);

  const getStoreProfile = () => {
    axios.get(`/api/stores/${storeParams.slug}`).then(res => {
      if(res.data.status === 200) {
        setStoreProfile(res.data.store_profile);
      }
      else {
        console.log(res.data.errors, "error");
      }
    });
  }

  const handleSelectedDate = (value) => {
    var req_date_lbl = moment(value.$d).format("DD");
    var req_month_lbl = moment(value.$d).format("MMM");
    var req_date = moment(value.$d).format("DD.MM.YYYY");
    var req_date_display = moment(value.$d).format("YYYY.MM.DD");
    setDateLabel(req_date_lbl);
    setMonthLabel(req_month_lbl);
    setSelectedDate(req_date);
    setSelectedDateDisplay(req_date_display);

    // console.log(req_date_display);

    axios.get(`/api/get-unavailable-dates/${storeParams.slug}/${req_date_display}`).then(res => {
      console.log((res.data.get_data).length);
      if(res.data.status === 200) {
        if( (res.data.get_data).length == 0 ) {
          setUnavailableDate(false);
          setIsDataLoading(true);
          setLoading(false);
        }
        else {
          setUnavailableDate(true);
          setIsDataLoading(false);
          setLoading(false);
        }
      }
      else {
        console.log(res.data.errors, "error");
      }
    });

    if(unavailableDate === true) {
      axios.get(`/api/get-slots/${storeParams.slug}/${req_date}/${noOfChild}`).then(res => {
        if(res.data.status === 200) {
          setMorningSlots(res.data.timeslots.filter(element => element.session === 'AM').map(element => element));
          setEveningSlots(res.data.timeslots.filter(element => element.session === 'PM').map(element => element));
        }
        else {
          console.log(res.data.errors, "error");
        }
      });
    }
  };

  const getNoOfChild = (e) => {
    setNoOfChild(e);
  }

  const handleCheckboxChange = (e, i) => {
    setselectedSlotsLbl([]);
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
    if(selectedSlotsIds != 0) {
      navigate('/booking-submit', {
        state: {
          data: data
        }
      });
    }
  }

  return (
    <MasterLayout title={"Store page"}>
      <Grid container spacing={4} mt={4} className="store_profile">
        <Grid item sm={12} md={4} className="date_picker">
          <Grid className='col_title'>
            <Typography variant='h4'>When and how many children for booking</Typography>
          </Grid>
          <FormGroup className="form-group child_counter">
            <Counter
              label="For"
              onChange={(e) => getNoOfChild(e)}
              value={1}
              // disabled = {(noOfChiledDisabled) ? "disabled" : ""}
            />
          </FormGroup>
          <FormGroup className="form-group">
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
          <Box className="button-row" sx={{ justifyContent: 'space-between' }}>
            <Button onClick={() => submitSelectedSlot()} className="theme-btn" style={{float: 'right'}}>Next</Button>
            <Link to="/" className="theme-btn secondary-btn">Back</Link>
          </Box>
        </Grid>
        <Grid item sm={8}>
          {loading && (
            <div className='loading_wrap'>
              <img src={LoadingImg} style={{ height: 70, display: 'block', margin: '0 auto' }} />
            </div>
          )}

          {isDataLoading && (
            <Grid container>
              <Grid item sm={12} md={6} pl={8}>
                <Typography variant='body2' className='picked_date'>{monthLabel}<Typography variant='span'>{dateLabel}</Typography></Typography>
              </Grid>
            </Grid>
          )}

          {isDataLoading && (
            <Grid container>
              <Grid item sm={12} md={6} pl={8}>
                <Grid className="time_col">
                  <Typography className='session_title'>Morning Slots</Typography>
                  <Grid container spacing={2} className="slot_row">
                    {morningSlots.map((row, i) => (
                      <Grid key={i} item sm={12} className="slot_grid">
                        <div className='slot_wrap'>  
                          <Typography>{row.time_slot}</Typography>
                          <FormControlLabel
                            value={row.id}
                            label={(() => {
                              const options = [];
                              for (let i = 1; i <= storeProfile.no_of_ftrooms-row.kids_count; i++) {
                                options.push(<div className='ft_block'></div>);
                              }
                              for (let i = 1; i <= row.kids_count; i++) {  
                                options.push(<div className='ft_block booked'></div>);
                              } 
                              return options;
                            })()}
                            control={<Checkbox value={row.slot} onChange={e => handleCheckboxChange(e, row.time_slot)} />}
                            disabled={
                              row.kids_count === storeProfile.no_of_ftrooms-row ||
                              ( ( storeProfile.no_of_ftrooms - row.kids_count + 1 ) <= noOfChild )
                                ? true
                                : false
                            }
                            className="slot_block"
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={6} pl={8}>
                <Grid className="time_col">
                  <Typography className='session_title'>Afternoon Slots</Typography>
                  <Grid container spacing={2} className="slot_row">
                    {eveningSlots.map((row, i) => (
                      <Grid key={i} item sm={12} className="slot_grid">
                        <div className='slot_wrap'>  
                          <Typography>{row.time_slot}</Typography>
                          <FormControlLabel
                            value={row.id}
                            label={(() => {
                              const options = [];
                              for (let i = 1; i <= storeProfile.no_of_ftrooms-row.kids_count; i++) {
                                options.push(<div className='ft_block'></div>);
                              }
                              for (let i = 1; i <= row.kids_count; i++) {  
                                options.push(<div className='ft_block booked'></div>);
                              } 
                              return options;
                            })()}
                            control={<Checkbox value={row.slot} onChange={e => handleCheckboxChange(e, row.time_slot)} />}
                            disabled={
                              row.kids_count === storeProfile.no_of_ftrooms-row ||
                              ( ( storeProfile.no_of_ftrooms - row.kids_count + 1 ) <= noOfChild )
                                ? true
                                : false
                            }
                            className="slot_block"
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12} pt={4} pl={8}>
                <ul className='key'>
                  <li><Box style={{background: '#0d6de5'}}></Box>Available</li>
                  <li><Box style={{background: '#a5a5a5'}}></Box>Booked</li>
                </ul>
              </Grid>

            </Grid>
          )}

          {unavailableDate && (
            <div className='loading_wrap'>
              <Typography style={{display: 'block', margin: '0 auto'}}>Sorry! there are no timeslots available on this date.</Typography>
            </div>
          )}

        </Grid>
      </Grid>
    </MasterLayout>
  )
}
