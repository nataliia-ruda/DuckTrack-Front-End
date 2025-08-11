import NewApplicationForm from './NewApplicationForm.jsx'
import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';


const NewApplicationPage = () => {

    return(
    <Box sx={{ display: 'flex' }} > 
      
    <SideNavigation></SideNavigation>
    
     <Box component="main"  sx={{ flexGrow: 1, p: 3, height: "auto"}} > 
        <DrawerHeader />
        <NewApplicationForm></NewApplicationForm>
      </Box> 

  </Box>
)
}


export default NewApplicationPage
