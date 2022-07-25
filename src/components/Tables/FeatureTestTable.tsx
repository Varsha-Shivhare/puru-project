import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface CollapsibleTableProps {
  setOpenTestReport: (value: boolean) => void;
}

type UpdaterFunction = (value: boolean) => void;

function createData(
  status: string,
  testcase: string,
  exec_time: string,
  excep_name: string,
  fail_message: string,
  artifacts: string[],
) {
  return {
    status,
    testcase,
    exec_time,
    excep_name,
    fail_message,
    artifacts,
    details: [
      {
        date: "2020-01-05",
        message: "perform launch of app",
        time: "2 min 4sec",
        step: 1,
        status: "success",
      },
      {
        date: "2020-01-06",
        message: "perform basic tests",
        time: "3 min 56sec",
        step: 2,
        status: "success",
      },
      {
        date: "2020-01-07",
        message: "validate profile icons",
        time: "3 min 56sec",
        step: 2,
        status: "failed",
      },
    ],
  };
}

const buttonStyle = {
  Failed: {
    backgroundColor: "#ffcdd2",
    color: "#f44336",
  },
  Success: {
    backgroundColor: "#c8e6c9",
    color: "#4caf50",
  },
  Skipped: {
    backgroundColor: "#fff9c4",
    color: "#ffeb3b",
  },
};

function TimeLineSteps({ item, isLast }: { item: any; isLast: boolean }) {
  const { date, step, message, status, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={(status === "success" && "success") || "error"} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">
          {step}.{message}
        </Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {date}:{time}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function Row(props: {
  row: ReturnType<typeof createData>;
  setOpenTestReport: UpdaterFunction;
}) {
  const { row, setOpenTestReport } = props;
  const [open, setOpen] = React.useState(false);

  const checkBackground = () => {
    const stat: string = row.status;
    return buttonStyle[stat as keyof typeof buttonStyle].backgroundColor;
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right" onClick={() => setOpenTestReport(true)}>
          <Link sx={{ cursor: "pointer" }} underline="hover">
            {row.testcase}
          </Link>
        </TableCell>

        <TableCell align="right">{row.exec_time}</TableCell>

        <TableCell component="th" scope="row">
          <Typography
            sx={{
              p: 0.6,
              borderRadius: "12%",
              backgroundColor: checkBackground(),
              color: `${
                buttonStyle[row.status as keyof typeof buttonStyle].color
              }`,
            }}
            align="center"
            variant="button"
          >
            {row.status}
          </Typography>
        </TableCell>

        <TableCell align="center">{row.excep_name}</TableCell>
        <TableCell align="right">{row.fail_message}</TableCell>
        <TableCell align="left">
          <ul style={{ listStyle: "none", cursor: "pointer" }}>
            {row.artifacts.map((name) => (
              <li key={name}>
                <Link underline="hover">{name}</Link>
              </li>
            ))}
          </ul>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                component="div"
              >
                Test Step-wise Details
              </Typography>

              <Timeline>
                {row.details.map((historyRow, index) => (
                  <TimeLineSteps
                    key={historyRow.date}
                    item={historyRow}
                    isLast={index === row?.details?.length - 1}
                  />
                ))}
              </Timeline>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData("Failed", "Test case 1", " 5 min 4sec", "NPE", "Message ...", [
    "log",
    "screenshot",
    "video link",
  ]),
  createData(
    "Success",
    "Test case 2",
    " 8 min 4sec",
    "ArrayIndexOutOfBound",
    "Message ...",
    ["log", "screenshot", "video link"],
  ),
  createData("Success", "Test case 3", " 3 min 4sec", "NPE", "Message ...", [
    "log",
    "screenshot",
  ]),
  createData(
    "Failed",
    "Test case 4",
    " 6 min 4sec",
    "ArithmeticException",
    "Message ...",
    ["log", "screenshot", "video link"],
  ),
  createData(
    "Success",
    "Test case 5",
    " 4 min 4sec",
    "IllegalArgument",
    "Message ...",
    ["screenshot", "video link"],
  ),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
    color: theme.palette.primary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function CollapsibleTable({ setOpenTestReport }: CollapsibleTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="right">Test Case</StyledTableCell>
            <StyledTableCell align="center">Execution Time</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Exception Name</StyledTableCell>
            <StyledTableCell align="center">Failure Message</StyledTableCell>
            <StyledTableCell align="center">Artifacts</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.testcase}
              row={row}
              setOpenTestReport={setOpenTestReport}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
