import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ open, setOpen, children, title }) => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  return (
    <Dialog
      sx={{ padding: 4 }}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle sx={{ textAlign: "center", padding: 2 }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", padding: 3 }}>
        <DialogContentText id="alert-dialog-slide-description" variant="h6">
          {children}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={handleReturn}
          color="primary"
          variant="contained"
          size="small"
        >
          Go to Sing in
        </Button>

        <Button
          onClick={() => setOpen(false)}
          color="primary"
          variant="outlined"
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
