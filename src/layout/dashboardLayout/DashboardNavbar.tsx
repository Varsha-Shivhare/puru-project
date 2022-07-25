// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import {
  AssessmentRounded,
  AccountCircleRounded,
  LightModeRounded,
  DarkModeRounded,
} from "@mui/icons-material";
import { useColorMode } from "../../App";

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
  zIndex: theme.zIndex.drawer + 1,
}));

const ToolbarStyle = styled(Toolbar)(() => ({
  minHeight: "64px",
}));

// ----------------------------------------------------------------------

interface DashboardNavbarProps {
  onOpenSidebar: () => void;
}

export default function DashboardNavbar({
  onOpenSidebar,
}: DashboardNavbarProps) {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={onOpenSidebar}
          sx={{ mr: 1, display: { lg: "none" } }}
        >
          <AssessmentRounded />
        </IconButton>

        <Typography variant="h4" color="primary" component="div">
          QA Productivity Portal
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {mode === "light" ? (
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={toggleColorMode}
              sx={{ mr: 1, color: "primary" }}
            >
              <LightModeRounded color="primary" />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={toggleColorMode}
              sx={{ mr: 1, color: "primary" }}
            >
              <DarkModeRounded color="primary" />{" "}
            </IconButton>
          )}
          <AccountCircleRounded color="primary" />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
