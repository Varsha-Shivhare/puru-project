import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TotalChart from "../components/Charts/TotalChart";
import { GroupStackedBar } from "../components/Charts/StackedBarChart";
import DetailsSection from "../components/DetailsSection";
import AppBarComponent from "../components/AppBars/AppBarComponent";
import DialogContainer from "../components/Dialog/DialogContainer";
import SummaryTable from "../components/Tables/SummaryTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type detailsProps = {
  name: string;
  value: string;
};

const details: detailsProps[] = [
  {
    name: "Squad",
    value: "Core",
  },
  {
    name: "Application Name",
    value: "Reatil Web",
  },
  {
    name: "Environment",
    value: "Pre-prod",
  },
  {
    name: "Start Time",
    value: "2022-06-10T09:58:32.046Z",
  },
  {
    name: " End Time",
    value: "2022-06-10T09:58:32.046Z",
  },
  {
    name: "Execution Time",
    value: "8 mins",
  },
];

export default function Main() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <AppBarComponent />
      <Box sx={{ flexGrow: 1, margin: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={5}>
            <Item>
              <DetailsSection details={details} />
            </Item>
          </Grid>
          <Grid item xs={6} md={7}>
            <Item>
              <GroupStackedBar setOpen={setOpen} />
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>
              {" "}
              <TotalChart />
            </Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>
              {" "}
              <SummaryTable />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <DialogContainer open={open} setOpen={setOpen} />
    </div>
  );
}
