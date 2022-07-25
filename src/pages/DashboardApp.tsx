import React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Container,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import {
  AvTimerRounded,
  BugReport,
  FactCheckRounded,
  Search,
  TaskAltRounded,
} from "@mui/icons-material";
import Page from "../components/Helmet/Page";
import TotalChart from "../components/Charts/TotalChart";
import { GroupStackedBar } from "../components/Charts/StackedBarChart";
import DetailsSection from "../components/DetailsSection";
import DialogContainer from "../components/Dialog/DialogContainer";
import SummaryTable from "../components/Tables/SummaryTable";
import MetricsCard from "../components/Dashboard/MetricsCard";
import { useSearchParams } from "react-router-dom";
import SearchId from "../components/SearchId";
import SearchIdDialog from "../components/Dialog/SearchIdDialog";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "fit-content",
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

const DashboardApp: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState({});
  const [testId, setTestId] = React.useState<string | null>("");
  let [searchParams] = useSearchParams();

  React.useEffect(() => {
    setTestId(searchParams.get("testRunId"));
  }, [searchParams]);

  return (
    <Page title="Execution Report ">
      {testId ? (
        <Container maxWidth="xl">
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={10.5} sm={10.5} md={10.5} lg={10.5}>
              <Typography variant="h4">
                Hi, Welcome to{" "}
                <span style={{ color: "blue" }}>Execution Report</span>
              </Typography>
            </Grid>
            <Grid item xs={1.5} sm={1.5} md={1.5} lg={1}>
              <SearchIdDialog />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Total Tests"
                color="info"
                total={1000}
                icon={<FactCheckRounded />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Passed"
                color="success"
                total={820}
                icon={<TaskAltRounded />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="In Progress"
                color="warning"
                total={100}
                icon={<AvTimerRounded />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Failed"
                color="error"
                total={80}
                icon={<BugReport />}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Item>
                <DetailsSection details={details} />
              </Item>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <Item>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignContent: "flex-start",
                    pl: 1,
                    mb: 2,
                  }}
                >
                  Feature Test Report
                </Typography>
                <GroupStackedBar setData={setData} setOpen={setOpen} />
              </Item>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Item>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignContent: "flex-start",
                    pl: 1,
                    mb: 3,
                  }}
                >
                  Test Summary Report
                </Typography>
                <TotalChart />
              </Item>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Item>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignContent: "flex-start",
                    pl: 1,
                    mb: 3,
                  }}
                >
                  Feature Summary
                </Typography>
                <SummaryTable />
              </Item>
            </Grid>
          </Grid>
          {open && (
            <DialogContainer data={data} open={open} setOpen={setOpen} />
          )}
        </Container>
      ) : (
        <SearchId />
      )}
    </Page>
  );
};

export default DashboardApp;
