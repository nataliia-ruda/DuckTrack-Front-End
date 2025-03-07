import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Fab from '@mui/material/Fab'; 
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';



const RecentApplicationBox = ({ color}) => {
  return (
    <Card sx={{ maxWidth: "50%", display: 'flex', justifyContent: "space-between" }}>

    <Box sx={{ width: 7, backgroundColor: 'blue', borderRadius: "4px 0 0 4px" }} />

   
    <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 1 }}>
      <CardContent>
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

export default RecentApplicationBox