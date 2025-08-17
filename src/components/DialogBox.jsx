import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

/**
 * Styled dialog to match the MUI "Customized Dialog" demo
 */
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogBox = ({
  open,
  setOpen,
  title,
  message,
  buttons = [],
  children,
  maxWidth = "sm",
  fullWidth = true,
  dividers = true,
  showCloseIcon = true,
  ...dialogProps
}) => {
  const handleClose = () => setOpen(false);

  const handleButtonClick = (btn) => () => {
    if (typeof btn.onClick === "function") {
      btn.onClick();
    }
    if (btn.closeOnClick !== false) {
      handleClose();
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...dialogProps}
    >
      <DialogTitle id="dialog-title" sx={{ m: 0, p: 2, textAlign: "center" }}>
        {title}
      </DialogTitle>

      {showCloseIcon && (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent /* dividers={dividers} */ sx={{ textAlign: "center" }}>
        {children ? (
          children
        ) : (
          <DialogContentText
            id="dialog-message"
            variant="h6"
            sx={{ fontSize: { xs: 15, md: 18 }, py: 2 }}
          >
            {message}
          </DialogContentText>
        )}
      </DialogContent>

      {buttons.length > 0 && (
        <DialogActions sx={{ justifyContent: "center", py: 2 }}>
          {buttons.map(
            (
              {
                text,
                onClick,
                variant = "contained",
                color = "primary",
                bgColor,
                textColor,
                startIcon,
                autoFocus,
                closeOnClick,
                ...btnProps
              },
              index
            ) => (
              <Button
                key={index}
                onClick={handleButtonClick({
                  onClick,
                  closeOnClick,
                })}
                variant={variant}
                color={color}
                autoFocus={autoFocus}
                startIcon={startIcon}
                sx={{
                  my: 2,
                  fontSize: { xs: 11, md: 13 },
                  ...(variant === "contained" && {
                    backgroundColor: bgColor || undefined,
                    color: textColor || undefined,
                    "&:hover": {
                      backgroundColor: bgColor ? bgColor : undefined,
                    },
                  }),
                }}
                {...btnProps}
              >
                {text}
              </Button>
            )
          )}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default DialogBox;
