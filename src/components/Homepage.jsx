import React, {useContext} from 'react'
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import RecentApplicationBox from './RecentApplicationBox.jsx';
import Divider from '@mui/material/Divider';
import AuthContext from '../core/AuthContext';

const Homepage = () => {
  const date = new Date(); 

  const { user,logout } = useContext(AuthContext);

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

        <Typography variant= "h5" sx={{ marginBottom: 2 }}>
          Welcome, {user ? `${user.user_first_name}` : 'User'}! 
        </Typography>
        <Typography sx={{ marginBottom: 2, fontSize: "12px", color: ""}}>
          Today is {formattedDate}
        </Typography> 
        <Divider/>
        <Typography variant='h6' sx={{ marginBottom: 2, fontWeight: 600 }}>
          Your recent applications: 
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        <Typography variant='h6' sx={{fontWeight: 600}}>Do you have any updates about this applications?</Typography>
        <RecentApplicationBox/>
        <RecentApplicationBox/> 
        </Box> 
      </Box>
    </Box>
  )
}

export default Homepage