import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'rgb(35, 41, 70)', gap: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: '200px' }}>4</Typography>
        <img src="images/zoey.jpg" alt="404 - Zoey did not find it" style={{ width: '150px', borderRadius: '50%', border: '16px solid rgb(35, 41, 70)' }} />
        <Typography variant="h2" sx={{ fontSize: '200px' }}>4</Typography>
      </Box>
      <Typography variant='h3'>Page not found</Typography>
      <Typography variant="body1">
        You can return to <Link to="/" style={{ textDecoration: 'underline', cursor: 'pointer' }}>homepage</Link> and find a nice place to visit!
      </Typography>
    </Box>
  )
}

export default NotFound;
