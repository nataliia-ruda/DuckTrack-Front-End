import React from "react";
import { Typography} from "@mui/material";
import RegistrationForm from "./RegistrationForm.jsx";
import Grid from '@mui/material/Grid2';
import { useState } from "react";

const url="http://localhost:3000/signup";

const Registration = () => {
  const [ cleanForm, setCleanForm ] = useState(false);
  
  const handleUserCreate = async (data) => {
    try {
        const response = await fetch(`${url}`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        if (!response.ok) {
            if (response.status===409) {
                const result = await response.json();
                throw Error(result.message);
            } else {
                throw Error("There was a problem connecting to the database!");
            }
        }
        const result = await response.json();
        alert(result.message);
        setCleanForm(true);
    } catch (error) {
        console.log(error);
        alert(error);
    } 
}




  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >

     
        <RegistrationForm onSubmitForm={ handleUserCreate} cleanForm={cleanForm} />
    

     

    </Grid>
  );
};

export default Registration;
