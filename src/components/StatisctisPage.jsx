import SideNavigation, { DrawerHeader }  from './SideNavigation.jsx'
import Box from '@mui/material/Box';
import Charts from './Charts.jsx';

const StatisctisPage = () => {
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