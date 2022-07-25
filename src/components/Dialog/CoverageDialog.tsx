import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Close as CloseIcon } from "@mui/icons-material";
import { ActualBarChart } from "../Charts/ActualBarChart";

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

const labels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DialogContainer: React.FC<ModalProps> = (props: ModalProps) => {
  const { open, setOpen } = props;

  const [month, setMonths] = React.useState<string>("6");

  const [label, setLabel] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setMonths(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const filterLabel: string[] = labels.filter((a, i) => i < +month);
    setLabel(filterLabel);
  }, [month]);

  const data = {
    labels: label,
    datasets: [
      {
        //   label: "Dataset 1",
        data: [24, 60, 20, 50, 28, 80, 40, 20, 50, 85, 30, 59],
        backgroundColor: "#6454C0",
        barPercentage: 0.6,
        borderRadius: 6,
      },
    ],
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
          {`Monthly Coverage Progress`}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            background: (theme) => theme.palette.background.default,
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-months">Months</InputLabel>
            <Select
              labelId="select-months"
              id="select-months"
              value={month}
              label="Months"
              onChange={handleChange}
            >
              <MenuItem value={3}>Last 3 Months</MenuItem>
              <MenuItem value={6}>Last 6 Months</MenuItem>
              <MenuItem value={12}>Last 12 Months</MenuItem>
            </Select>
          </FormControl>
          <ActualBarChart data={data} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default React.memo(DialogContainer);
