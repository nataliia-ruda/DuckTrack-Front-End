import { useState, useEffect, useContext } from "react";

import SideNavigation from "./SideNavigation.jsx";
import { DrawerHeader } from "./SideNavigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AuthContext from '../core/AuthContext.jsx';

const EditProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: null,
  });
  

 
  useEffect(() => {
    console.log(`http://localhost:3000/get-user/${user.user_id}`)
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/get-user/${user.user_id}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setFormData({
              firstName: data.user_first_name,
              lastName: data.user_last_name,
              email: data.email,
              photo: data.photo,
            });

        
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(" http://localhost:3000/update-profile", 
        {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Edit Your Profile
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
        {/*  Image display and input */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar /* src={} */ alt="Profile" sx={{ width: 120, height: 120, mb: 2 }} />
            <Button variant="contained" component="label">
              Upload Picture
              <input type="file" hidden accept="image/*" />
            </Button>
          </Box>

          {/* Profile Edit Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              fullWidth
              disabled 
            />

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
