import React from 'react'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import elearning from '../assets/elearning.jpg'
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <div>     
        <Container maxWidth="sm">
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <img src={elearning} className='logo' alt="logo" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography variant="h5" gutterBottom>
                    Learner Centred learning app
                 </Typography>

                 <Typography variant="subtitle2" gutterBottom>
                    The app put learners first
                    <br />
                    It enables teachers upload lessons, give and mark assignments and award marks
                   <br />
                   Enable students to access lessons and assignments, undertake tests and view test scores.
                </Typography>
                </Box>
                <Grid item xs={12} md={6}>
                <Box sx={{ width: '100%', maxWidth: 500, mb: '15px'}}>
                <Link to='/login'>
                <Button variant="contained" className='home-btn'  >Login</Button>
                </Link> 
                </Box>

                <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Link to='/register'>
                <Button variant="outlined" className='home-btn' >Register</Button>
                </Link>
                </Box>
                </Grid>
                </Grid>
            </Grid>
        </Container>

    </div>
  )
}

export default Public