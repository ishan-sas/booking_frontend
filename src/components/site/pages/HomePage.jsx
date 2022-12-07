import React, {useEffect} from 'react'
import axios from 'axios'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MasterLayout from "../MasterLayout"
import { useState } from 'react'

import NZMap from '../../../assets/images/nz-map.jpg'

export default function HomePage() {
  const [storeList, setStoreList] = useState([]);

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
    </MasterLayout>
  )
}
