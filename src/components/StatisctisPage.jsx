import NewApplicationForm from './NewApplicationForm.jsx'
import React, {useContext} from 'react'
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import AuthContext from '../core/AuthContext';
import Charts from './Charts.jsx';
import Typography from "@mui/material/Typography";


const StatisctisPage = () => {
    const { user,logout } = useContext(AuthContext); 
  return (
    <Box sx={{ display: 'flex' }} > 
      
    <SideNavigation></SideNavigation>
    
     <Box component="main"  sx={{ flexGrow: 1, p: 3}} > 
        <DrawerHeader />
        <Charts></Charts>
      </Box> 

  </Box>
  )
}

export default StatisctisPage