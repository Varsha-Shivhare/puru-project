import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { ChevronRightRounded, Search } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  backdropFilter: "blur(5px)",
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }: any) => ({
  width: "100%",
  color: "black",
  backgroundColor: "white",
  "&.Mui-focused": { boxShadow: theme.customShadows.z24 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const SearchIdDialog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSearchId, setOpenSearchId] = React.useState<boolean>(false);

  const [searchId, setSearchId] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(()=> {
    setTimeout(()=> {
      setSearchId('');
      inputRef.current?.focus();
    }, 100);
  }, [openSearchId]);

  const handleClose = () => {
    setOpenSearchId(false);
  };


  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };
  const handleFetchReport = (e: React.MouseEvent<HTMLElement>) => {
    setSearchParams({ testRunId: searchId });
    setOpenSearchId(false);
    setSearchId("");
  };

  return (
    <div>
      <Tooltip title="Click to search test run id">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Search />}
          onClick={() => {
            setOpenSearchId(true);
          }}
        >
          Search
        </Button>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="xs"
        fullWidth
        open={openSearchId}
      >
        <SearchStyle
          value={searchId}
          onChange={handleChangeSearchQuery}
          inputRef={inputRef}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setSearchParams({ testRunId: searchId });
              setOpenSearchId(false);
              setSearchId("");
            }
          }}
          placeholder="Enter Test Id..."
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
      </BootstrapDialog>
    </div>
  );
};

export default React.memo(SearchIdDialog);
