import React from 'react'
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import AuthContext from '../core/AuthContext';
import EditApplicationTable from './EditApplicationTable.jsx';
import Typography from "@mui/material/Typography";

const EditApplicationPage = () => {

  return (
    <Box sx={{ display: 'flex' }} > 
          
    <SideNavigation></SideNavigation>
    
     <Box component="main"  sx={{ flexGrow: 1, p: 3 }} >
     <DrawerHeader />

   {/*    <Typography variant= "h5" sx={{ marginBottom: 2 }}>
        Edit Application
      </Typography> */}
       
       <EditApplicationTable></EditApplicationTable>
    </Box>
  </Box>
)
}

export default EditApplicationPage