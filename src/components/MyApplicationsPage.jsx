import React, {useContext} from 'react'
import AuthContext from '../core/AuthContext';
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import MyApplicationsTable from './MyApplicationsTable.jsx';



const MyApplicationsPage = () => {

    const { user,logout } = useContext(AuthContext);

  return (
    <Box sx={{ display: 'flex' }} > 
          
          <SideNavigation></SideNavigation>
          
           <Box component="main"  sx={{ flexGrow: 1, p: 3 }} >
           <DrawerHeader />
    
            <Typography variant= "h5" sx={{ marginBottom: 2 }}>
              My Applications
            </Typography>
             
             <MyApplicationsTable></MyApplicationsTable>
          </Box>
        </Box>
  )
}

export default MyApplicationsPage