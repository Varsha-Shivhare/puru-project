import { Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import TCExecutionLineChart from "../Charts/TCExecutionTimeLineChart";
import TCStatusTrendLineChart from "../Charts/TCStatusTrendLineChart";
import TotalChart from "../Charts/TotalChart";
import DetailsSection from "../DetailsSection";

interface DashboardFeatureTestCaseProps {
  setOpenTestReport: (value: boolean) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type detailsProps = {
  name: string;
  value: string;
};

function DashboardFeatureTestCase({
  setOpenTestReport,
}: DashboardFeatureTestCaseProps) {
  const details: detailsProps[] = [
    {
      name: "Test Case Name",
      value: "Test Case 1",
    },
    {
      name: "Platform",
      value: "Reatil Web",
    },
    // {
    //   name: "Environment",
    //   value: "Pre-prod",
    // },
    {
      name: "Most Failed Step",
      value: "Sample Test Step",
    },
  ];
  return (
    <>
      <Button
        onClick={() => setOpenTestReport(false)}
        variant="contained"
        color="secondary"
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Grid container spacing={3}>
        <Grid item md={5} sm={12} lg={5}>
          <Item>
            <DetailsSection details={details} />
          </Item>
        </Grid>
        <Grid item md={7} sm={12} lg={7}>
          <Item>
            <TCExecutionLineChart />
          </Item>
        </Grid>
        <Grid item md={4} sm={12} lg={4}>
          <Item>
            <TotalChart />
          </Item>
        </Grid>
        <Grid item md={8} sm={12} lg={8}>
          <Item>
            <TCStatusTrendLineChart />
          </Item>
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(DashboardFeatureTestCase);
