import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab'; 
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const OldApplicationsBox = () => {

    
      useEffect(() => {
         const fetchJobApplications = async () => {
           if (user) {
             try {
               const response = await fetch(
                 `http://localhost:3000/my-applications`
               );
     
               if (!response.ok) {
                 throw new Error(`Error: ${response.statusText}`);
               }
     
               const data = await response.json();
     
               if (data.applications && Array.isArray(data.applications)) {
                 setJobApplications(data.applications);
               } else {
                 console.error("Expected an array but got:", data);
                 setJobApplications([]);
               }
             } catch (error) {
               console.error("Error fetching job applications:", error);
               setJobApplications([]);
             }
           }
         };
     
         fetchJobApplications();
       }, [user]);
     

  return (
    <Card sx={{ maxWidth: "50%", display: 'flex', justifyContent: "space-between" }}>

    <Box sx={{ width: 7, backgroundColor: 'blue', borderRadius: "4px 0 0 4px" }} />

   
    <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 1 }}>
      <CardContent sx={{display: flex, flexDirection: "column", gap: 3}}>
        <Typography variant="body1" gutterBottom sx={{ fontSize: 13, fontWeight: 700 }}>
          Junior Web-Developer
        </Typography>
        <Typography variant="body2">IBM</Typography>
      </CardContent>

      <CardActions>
        <Fab color="primary" aria-label="add" size='small'
        sx={{
                backgroundColor: "inherit",
                color: "#141E27",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                transition: "all 0.3s ease",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "#141E27",
                  color: "white",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.6)",
                 
                },
              }}>
          <ArrowForwardOutlinedIcon /* sx={{ fontSize: 19 }}  *//>
        </Fab>
      </CardActions>
    </Box>
  </Card>
  )
}

export default OldApplicationsBox