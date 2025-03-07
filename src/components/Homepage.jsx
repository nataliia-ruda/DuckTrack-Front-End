import React from 'react'
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import RecentApplicationBox from './RecentApplicationBox.jsx';

const Homepage = () => {
  const date = new Date() 

  const formattedDate = date.toLocaleDateString('en-GB', {
    weekday: 'long', 
    day: 'numeric',  
    month: 'long',
    year: 'numeric'  
  });
  return (
     <Box sx={{ display: 'flex' }} > 
      
      <SideNavigation></SideNavigation>
      
       <Box component="main"  sx={{ flexGrow: 1, p: 3 }} >
       <DrawerHeader />

        <Typography variant= "h4" sx={{ marginBottom: 2 }}>
          Welcome, User Name! 
        </Typography>
        <Typography variant= "p" sx={{ marginBottom: 2 }}>
          Today is {formattedDate}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Your recent applications
        </Typography> 
      </Box>
    </Box>
  )
}

export default Homepage