import { AppBar, Button, InputAdornment, OutlinedInput, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Header({handleInputChange, page}) {
  return (
    <div className="header">
      <AppBar sx={{background:'white', color:'black'}} position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin:'auto 5%' }}>
          {page === 'list' ?
            <OutlinedInput
              sx={{ width: '400px' }}
              inputProps={{
                style: {
                  padding: 10
                }
              }}
              id="standard-adornment-amount"
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}

              onChange={handleInputChange}
            /> :
            <h2>Movie Details</h2>
          }
          <Link to='/'><Button><HomeIcon sx={{color:'black'}} /></Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
