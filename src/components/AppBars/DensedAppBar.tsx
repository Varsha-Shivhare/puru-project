import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  // backdropFilter: "blur(6px)",
  // WebkitBackdropFilter: "blur(6px)",
  backgroundColor: theme.palette.background.default,
}));

const DenseAppBar: React.FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <RootStyle position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="primary" component="div">
          Execution Statistics
        </Typography>
      </Toolbar>
    </RootStyle>
  </Box>
);

export default DenseAppBar;
