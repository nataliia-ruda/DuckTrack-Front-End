import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ 
  open, 
  setOpen, 
  title, 
  message, 
  buttons = []  
}) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
    >
      <DialogTitle id="dialog-title" sx={{ textAlign: "center", padding: 2 }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", padding: 3 }}>
        <DialogContentText id="dialog-message" variant="h6" sx={{fontSize: {xs: 15, md: 18}}}>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        {buttons.map(({ text, onClick, variant = "contained", bgColor, textColor }, index) => (
          <Button 
            key={index} 
            onClick={onClick} 
            variant={variant} 
            sx={{
              fontSize: {xs: 11, md: 13},
              backgroundColor: bgColor || "#FFC107",  
              color: textColor || "#0D1117",  
              "&:hover": { backgroundColor: bgColor ? bgColor : "#e0a800" } 
            }}
          >
            {text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;