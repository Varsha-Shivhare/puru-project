import * as React from "react";
import Table from "@mui/material/Table";
import { styled, alpha } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Link, Stack } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import AppleIcon from "@mui/icons-material/Apple";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ChromeIcon from "../Icons/ChromeIcon";
import { Settings } from "@mui/icons-material";
import CircularProgressBarWithLabel from "../CircularProgressBarWithLabel";
import RectangularTrafficBar from "../RectangularTrafficBar";
import ApplicationDialog from "../Dialog/ApplicationNameDialog";
import ActualValueDialog from "../Dialog/ActualValueDialog";
import CoverageDialog from "../Dialog/CoverageDialog";
import { useNavigate } from "react-router-dom";

function createRow(
  application: string,
  platform: React.ReactNode,
  palnned: number,
  actual: number,
  coverage: number,
  duration: string,
  pass: number,
  fail: number,
  skip: number,
  pass_percentage: number,
  test_report: string,
  last_5_transaction: string[],
) {
  return {
    application,
    platform,
    palnned,
    actual,
    coverage,
    duration,
    pass,
    fail,
    skip,
    pass_percentage,
    test_report,
    last_5_transaction,
  };
}

const rows = [
  createRow(
    "Remi++_Android",
    <AdbIcon fontSize="small" sx={{ color: "#A3BB46" }} />,
    140,
    134,
    95,
    "5.04 mins",
    10,
    20,
    30,
    100,
    "2022-05-08 02:54:23",
    ["pass", "fail", "pass", "pass", "pass"],
  ),
  createRow(
    "Remi++_iOS",
    <AppleIcon fontSize="small" sx={{ color: "#A4ACB7" }} />,
    140,
    134,
    80,
    "5.04 mins",
    10,
    20,
    30,
    70.32,
    "2022-05-08 02:54:23",
    ["pass", "fail", "fail", "fail", "fail"],
  ),
  createRow(
    "RAAS_API",
    <Settings fontSize="small" />,
    140,
    134,
    65,
    "5.04 mins",
    10,
    20,
    30,
    72,
    "2022-05-08 02:54:23",
    ["pass", "fail", "fail", "pass", "pass"],
  ),
  createRow(
    "Retail_Webapp_Chrome",
    <ChromeIcon fontSize="small" />,
    140,
    134,
    100,
    "5.04 mins",
    10,
    20,
    30,
    98,
    "2022-05-08 02:54:23",
    ["pass", "pass", "fail", "fail", "fail"],
  ),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
    color: theme.palette.primary.main,
    borderBottomWidth: "1px",
    borderBottomColor: alpha(theme.palette.primary.light, 0.2),
    borderBottomStyle: "solid",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// interface Row {
//   application: string;
//   platform: string;
//   palnned: string;
//   actual: string;
//   coverage: number;
//   duration: string;
//   pass: number;
//   fail: number;
//   skip: number;
//   pass_percentage: number;
//   test_report: string;
//   last_5_transaction: string[];
// }

// const HEADER_TITLE = [
//   { title: "Application", rows: 2 },
//   { title: "Platform", rows: 2 },
//   {
//     title: "Automation: Interation Tests/ Functional Tests/ End to End Tests",
//     rows: 1,
//   },
//   { title: "Planned", rows: 1 },
//   { title: "Actual", rows: 1 },
//   { title: "Coverage", rows: 1 },
//   { title: "Duration", rows: 1 },
//   { title: "Test Status", rows: 1 },
//   { title: "%Passed", rows: 1 },
//   { title: "Latest Test Report", rows: 2 },
//   { title: "Last 5 Tests", rows: 2 },
// ];

const ScoreCardTable: React.FC = () => {
  const [openApplication, setOpenApplication] = React.useState<boolean>(false);
  const [openCoverage, setOpenCoverage] = React.useState<boolean>(false);
  const [openActual, setOpenActual] = React.useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 800, maxHeight: 440 }}
          aria-label="spanning table"
        >
          <TableHead>
            <TableRow key={"top-level-row-name"}>
              <StyledTableCell align="center" rowSpan={2}>
                Application
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                Platform
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={6}>
                Automation: Interation Tests/ Functional Tests/ End to End Tests
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                Last Report
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                Last 5 Test
              </StyledTableCell>
            </TableRow>
            <TableRow key={"bottom-level-row-name"}>
              <StyledTableCell align="right"> Planned</StyledTableCell>
              <StyledTableCell align="right">Actual</StyledTableCell>
              <StyledTableCell align="right">Coverage</StyledTableCell>
              <StyledTableCell align="right">Duration</StyledTableCell>
              <StyledTableCell align="center"> Test Status</StyledTableCell>
              <StyledTableCell align="right"> %Passed</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.application}>
                <TableCell>
                  <Link
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpenApplication(true)}
                  >
                    {row.application}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.platform}</TableCell>
                <TableCell align="center">{row.palnned}</TableCell>
                <TableCell align="center">
                  <Link
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpenActual(true)}
                  >
                    {row.actual}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Link
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpenCoverage(true)}
                  >
                    <CircularProgressBarWithLabel
                      value={row.coverage}
                      size="1.8rem"
                    />
                  </Link>
                </TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      size="small"
                      label={row.pass}
                      color="success"
                      sx={{ color: "text.primary" }}
                    />
                    <Chip size="small" label={row.fail} color="error" />
                    <Chip size="small" label={row.skip} color="default" />
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <RectangularTrafficBar value={row.pass_percentage} />
                </TableCell>
                <TableCell align="right">
                  <Link
                    underline="hover"
                    onClick={() =>
                      navigate({
                        pathname: "/executionReport",
                        search: `?testRunId=${row.test_report || ""}`,
                      })
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    {row.test_report}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0}>
                    {row.last_5_transaction.map((stat, index) =>
                      stat === "fail" ? (
                        <CancelRoundedIcon
                          fontSize="small"
                          color="error"
                          key={`${index}-cancel-icon`}
                        />
                      ) : (
                        <CheckCircleRoundedIcon
                          fontSize="small"
                          key={`${index}-success-icon`}
                          color="success"
                        />
                      ),
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ApplicationDialog open={openApplication} setOpen={setOpenApplication} />
      <ActualValueDialog open={openActual} setOpen={setOpenActual} />
      <CoverageDialog open={openCoverage} setOpen={setOpenCoverage} />
    </Paper>
  );
};

export default ScoreCardTable;
