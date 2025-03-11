import NewApplicationForm from './NewApplicationForm.jsx'
import React, {useContext} from 'react'
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import AuthContext from '../core/AuthContext';

const NewApplicationPage = () => {

    const { user,logout } = useContext(AuthContext); 

    return(
    <Box sx={{ display: 'flex' }} > 
      
    <SideNavigation></SideNavigation>
    
     <Box component="main"  sx={{ flexGrow: 1, p: 3}} > 
        <DrawerHeader />
        <NewApplicationForm></NewApplicationForm>
      </Box> 

  </Box>
)
}


export default NewApplicationPage
