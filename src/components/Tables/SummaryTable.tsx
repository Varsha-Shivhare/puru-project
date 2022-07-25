import * as React from "react";
import Table from "@mui/material/Table";
import { styled, alpha } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function totalCountRow(pass: number, fail: number, skip: number) {
  return pass + fail + skip;
}

function createRow(
  desc: string,
  execTime: string,
  pass: number,
  fail: number,
  skip: number,
) {
  const sum = totalCountRow(pass, fail, skip);
  return {
    desc,
    execTime,
    pass,
    fail,
    skip,
    sum,
  };
}

const rows = [
  createRow("Feature 1", "5.04 mins", 10, 20, 30),
  createRow("Feature 2", "6.04 mins", 2, 20, 7),
  createRow("Feature 3", "5.45 mins", 10, 2, 22),
  createRow("Feature 4", "2.14 mins", 11, 20, 7),
  createRow("Feature 5", "9.24 mins", 19, 20, 3),
  createRow("Feature 6", "5.45 mins", 10, 20, 21),
  createRow("Feature 7", "2.14 mins", 11, 22, 17),
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

interface Row {
  desc: string;
  execTime: string;
  pass: number;
  fail: number;
  skip: number;
  sum: number;
}
function totalPass(items: readonly Row[]) {
  return items.map(({ pass }) => pass).reduce((sum, i) => sum + i, 0);
}

function totalFail(items: readonly Row[]) {
  return items.map(({ fail }) => fail).reduce((sum, i) => sum + i, 0);
}

function totalSkip(items: readonly Row[]) {
  return items.map(({ skip }) => skip).reduce((sum, i) => sum + i, 0);
}
function totalSum(items: readonly Row[]) {
  return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
}

const passTotal = totalPass(rows);
const failTotal = totalFail(rows);
const skipTotal = totalSkip(rows);
const sumTotal = totalSum(rows);

const SummaryTable: React.FC = () => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center" rowSpan={2}>
            Feature
          </StyledTableCell>
          <StyledTableCell align="center" rowSpan={2}>
            Execution Time
          </StyledTableCell>
          <StyledTableCell align="center" colSpan={4}>
            Tests Count
          </StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell align="right"> Passed</StyledTableCell>
          <StyledTableCell align="right">Failed</StyledTableCell>
          <StyledTableCell align="right">Skipped</StyledTableCell>
          <StyledTableCell align="right">Total</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow hover key={row.desc}>
            <TableCell>{row.desc}</TableCell>
            <TableCell align="center">{row.execTime}</TableCell>
            <TableCell align="right">{row.pass}</TableCell>
            <TableCell align="right">{row.fail}</TableCell>
            <TableCell align="right">{row.skip}</TableCell>
            <TableCell align="right">{row.sum}</TableCell>
          </TableRow>
        ))}
        <TableRow hover>
          <TableCell align="center" colSpan={2}>
            Total
          </TableCell>
          <TableCell align="right">{passTotal}</TableCell>
          <TableCell align="right">{failTotal}</TableCell>
          <TableCell align="right">{skipTotal}</TableCell>
          <TableCell align="right">{sumTotal}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export default SummaryTable;
