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
        <Grid item sm={12} md={7}>
          <Typography className='welcome__text'><span>Select</span> your <br />preferred <span>store...</span></Typography>
          <Grid container spacing={2}>
            {storeList.map((row, i) => (
              <Grid key={i} item sm={4} lg={3}>
                <Link to={row.slug} className="store-card">
                  <Typography className='store-name'>{row.store_name}</Typography>
                  <Typography className='store-address'>49 Commerce Street, Kaitaia 0410</Typography>       
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={5} sx={{display: { md: 'block', sm: 'none'} }}>
          <div className='map_warp'>    
            <img src={NZMap} />
          </div>
        </Grid>
      </Grid>
    </MasterLayout>
  )
}
