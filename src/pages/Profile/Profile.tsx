import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import React from 'react'
import BioSection from './BioSection'
import UsersFavorite from './UsersFavorite'
import UsersListSection from './UsersListSection'
import UsersReview from './UsersReview'



const Profile:React.FC = () => {
  return (
      <Stack sx={{width: '100%', backgroundColor: "#F9F6F0"}} >
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3}}>
              <Grid item xs={12}>
                  <BioSection />
              </Grid>
              <Grid item xs={12}>
                  <UsersListSection />
              </Grid>
              <Grid item xs={12}>
                  <Grid container>
                      <UsersFavorite />
                      <UsersReview />
                  </Grid>
              </Grid>
          </Grid>
    </Stack>
  )
}

export default Profile