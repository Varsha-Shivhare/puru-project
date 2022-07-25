import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ApplicationRegressionChart } from "../Charts/ApplicationRegressionChart";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  backdropFilter: "blur(5px)",
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface ModalProps {
  open: boolean;

  data?: any;
  setOpen: any;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        p: 2,
        background: (theme) => alpha(theme.palette.primary.light, 0.1),
        color: (theme) => theme.palette.primary.main,
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const DialogContainer: React.FC<ModalProps> = (props: ModalProps) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        fullWidth
        open={open}
      >
        <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
          {`Application Regression Trend`}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            background: (theme) => theme.palette.background.default,
          }}
        >
          <ApplicationRegressionChart setOpen={setOpen} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default React.memo(DialogContainer);
