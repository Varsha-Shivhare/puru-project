import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  AvTimerRounded,
  BugReport,
  TaskAltRounded,
  Close as CloseIcon,
} from "@mui/icons-material";
import CollapsibleTable from "../Tables/FeatureTestTable";
import MetricsCard from "../Dashboard/MetricsCard";
import DashboardFeatureTestCase from "./DashboardFeatureTestCase";

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
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  onClose: () => void;
}

export interface ModalProps {
  open: boolean;
  // eslint-disable-next-line react/require-default-props
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
      // eslint-disable-next-line react/jsx-props-no-spreading
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
  const { open, setOpen, data } = props;

  const [openTestReport, setOpenTestReport] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    setOpenTestReport(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        open={open}
      >
        <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
          {`Test Report of ${data?.feature} ${
            openTestReport ? " [Test Case Name]" : ""
          } ` || "Modal Title"}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            background: (theme) =>
              openTestReport
                ? theme.palette.background.default
                : theme.palette.background.paper,
          }}
        >
          {/* map corresponding data of metrics*/}

          {open && openTestReport ? (
            <DashboardFeatureTestCase setOpenTestReport={setOpenTestReport} />
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={4} md={4}>
                  <MetricsCard
                    title="Passed"
                    color="success"
                    total={data.featureData[0]}
                    icon={<TaskAltRounded />}
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <MetricsCard
                    title="Skipped"
                    color="warning"
                    total={data.featureData[2]}
                    icon={<AvTimerRounded />}
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <MetricsCard
                    title="Failed"
                    color="error"
                    total={data.featureData[1]}
                    icon={<BugReport />}
                  />
                </Grid>
              </Grid>

              <CollapsibleTable setOpenTestReport={setOpenTestReport} />
            </>
          )}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default React.memo(DialogContainer);
