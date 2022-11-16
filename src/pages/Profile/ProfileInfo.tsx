import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import NearMeIcon from "@mui/icons-material/NearMe";

const ProfileInfo = () => {
    return (
      <Box sx={{textAlign: {lg: 'left'}}}>
            <Typography component="h3" variant="h4" mt={8} sx={{color: '#232946'}}>
              Megumi Akama
            </Typography>
            <Box sx={{ width:{sm:'70%'}, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: {sm:'center', lg: 'flex-start'} }}>
              <NearMeIcon />
              <Typography component="span" variant="h6" sx={{color: '#232946'}}>
                Vancouver
              </Typography>
            </Box>
            <Typography component="span" variant="h6" sx={{color: '#232946'}}>
              Gimme some wine please...
            </Typography>
      </Box>
  )
}

export default ProfileInfo