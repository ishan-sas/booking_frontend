import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Typography, Button} from '@mui/material'
import AdminLayout from "../AdminLayout"

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

export default function StoreList() {
  const [storeList, setStoreList] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    getStoresList();

  }, []);

  const getStoresList = () => {
    axios.get(`/api/get-all-stores`).then(res => {
      if (res.data.status === 200) {
        setStoreList(res.data.get_data);
      }
    });
  }

  const deactivateStore = (e, id) => {
    e.preventDefault();
    const data = {
      status: 0
    }
    axios.put(`/api/update-store-status/${id}`, data).then(res => {
      if (res.data.status === 200) {
        window.location.reload();
        setError([]);
      }
      else if (res.data.status === 422) {
        setError(res.data.errors);
      }
      else {
        console.log(res.data.errors);
      }
    });
  }

  const activateStore = (e, id) => {
    e.preventDefault();
    const data = {
      status: 1
    }
    axios.put(`/api/update-store-status/${id}`, data).then(res => {
      if (res.data.status === 200) {
        window.location.reload();
        setError([]);
      }
      else if (res.data.status === 422) {
        setError(res.data.errors);
      }
      else {
        console.log(res.data.errors);
      }
    });
  }

  return (
    <AdminLayout title={"Settings"}>
      <Typography className='adm-page-title' style={{ marginBottom: '5px' }}>Store List</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Store Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeList.map((row, item) => (
              <TableRow
                key={item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.store_name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Link className='sa_theme-btn' to={`/admin/store-reset/${row.id}`}>Edit</Link>
                  <Button className='sa_theme-btn' onClick={e => deactivateStore(e, row.id)}>Deactivate</Button>
                  <Button className='sa_theme-btn' onClick={e => activateStore(e, row.id)}>Activate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </AdminLayout>

  )
}


