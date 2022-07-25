import * as React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronRightRounded, Search } from "@mui/icons-material";
import {
  alpha,
  Paper,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";

const RootStyle = styled(Paper)(({ theme }: any) => ({
  display: "flex",
  height: "80vh",
  flexDirection: "column",
  gap: 4,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.primary.light, 0.2),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }: any) => ({
  width: 260,
  color: "black",
  backgroundColor: "white",
  "&.Mui-focused": { boxShadow: theme.customShadows.z24 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function SearchId() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchId, setSearchId] = React.useState<string>("");

  const handleChangeSearchQuery = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchId(e.target.value);
  };

  const handleFetchReport = () => {
    setSearchParams({ testRunId: searchId });
  };
  return (
    <RootStyle>
      <Typography variant="h5" gutterBottom component="div">
        Please Enter{" "}
        <Typography
          sx={{ color: "secondary.main" }}
          variant="h5"
          gutterBottom
          component="span"
        >
          Test Run Id
        </Typography>
      </Typography>
      <SearchStyle
        value={searchId}
        autoFocus
        onChange={handleChangeSearchQuery}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            setSearchParams({ testRunId: searchId });
          }
        }}
        placeholder="Search here..."
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              color="secondary"
              aria-label="Fetch report for test id"
              onClick={handleFetchReport}
            >
              <ChevronRightRounded />
            </IconButton>
          </InputAdornment>
        }
      />
    </RootStyle>
  );
}
