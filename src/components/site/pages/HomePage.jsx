import React, {useEffect} from 'react'
import axios from 'axios'
import { Button, Grid, Typography, Modal, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import MasterLayout from "../MasterLayout"
import { useState } from 'react'

import NZMap from '../../../assets/images/nz-map.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: '20px 25px',
};

const welcomeStyle = {
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

export default function HomePage() {
  const [storeList, setStoreList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [welcomeOpen, setWelcomeOpen] = React.useState(false);
  const handleWelcomeClose = () => setWelcomeOpen(false); 

  useEffect(() => {
    getStoreList();

  }, []);

  const getStoreList = () => {
    axios.get(`/api/get-stores`).then(res => {
      if(res.data.status === 200) {
        setStoreList(res.data.stores);
      }
      else {
        console.log(res.data.errors, "error");
      }
    });
  }

  const handleWelcomeOpen = (e) => {
    setWelcomeOpen(true);
  }

  const viewSchoolList = (e, id) => {
    axios.get(`/api/get-schools/${id}`).then(res => {
      if (res.data.status === 200) {
        setSelectedSchool(res.data.store_name);
        setSchoolList(res.data.get_data);
      }
    });
    setOpen(true);
  }

  return (
    <MasterLayout title={"Home page"}>
      <Grid container className='welcome_wrap'>
        <Grid item sm={12} md={8}>
          <Grid className='col_title' mt={2}>
            <Typography variant='h4'>Select your <br />preferred store</Typography>  
          </Grid>

          <Grid container spacing={2}>
            {storeList.map((row, i) => (
              <Grid key={i} item sm={4} md={3} mt={0}>
                <Link to={row.slug} className="store-card">
                  <Typography className='store-name'>{row.store_name}</Typography>
                  <Typography className='store-address'>{row.address}</Typography>    
                  <Typography className='store-contact'>{row.contact_no}</Typography>   
                </Link>
                <Button onClick={e => viewSchoolList(e, row.id)} className="theme-btn"
                  style={{fontSize: '10px', fontWeight: 300, lineHeight: 1.5, padding: '5px 12px', marginTop: '5px'}}
                >View Schools</Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={4} pl={5} sx={{display: { md: 'block', sm: 'none'} }}>
          <div className='map_warp'>    
            <img src={NZMap} />
          </div>
        </Grid>
      </Grid>

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
          <Typography id="modal-modal-title" component="h2"
            style={{color: '#0d6de5', display: 'block',  fontSize: '14px', fontWeight: 600, margin: '0 0 22px', borderBottom: '2px solid'}}>
            {selectedSchool.store_name} School List
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={6} lg={6}>
              {schoolList.map((row, i) => (
                <Typography key={i}
                  style={{color: '#575757', fontSize: '14px', display: 'block', marginBottom: '4px'}}
                >{row.school_name}</Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Welcome Message */}
      <Modal
        open={welcomeOpen}
        // onClose={handleWelcomeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="booking-modal"
      >
        <Box sx={welcomeStyle} style={{textAlign: 'center'}}>
          {/* <Typography style={{fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px'}}>Note</Typography>   */}
          <Typography style={{fontSize: '15px', fontWeight: 500, margin: '0 0 12px'}}>
            APOLOGIES, OUR BOOKING SYSTEM IS CURRENTLY FACING TECHNICAL ISSUES.<br />
            PLEASE RING 0273038087 OR EMAIL longbayshop@sas.co.nz<br />
            TO MAKE A BOOKING</Typography>
          {/* <Typography style={{fontSize: 14}}>
            contact : Lee Alesich<br />
            Shop Manager<br />
            The Uniform Shoppe<br />
            P: 027 3038 087<br />
            Long Bay Village Courtyard ( Near New World)<br />
            Shop Hours:<br />
            Tuesday : 12noon - 4pm<br />
            Thursday : 2.00pm - 6.00pm<br />
            Saturday : 10.00am - 2.00pm<br />
            Monday, Wednesday, Friday Closed<br />
            83, Te Oneroa Way, Long Bay, Auckland 0630
          </Typography> */}
        </Box>
      </Modal>

    </MasterLayout>
  )
}
