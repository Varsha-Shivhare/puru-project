import * as React from "react";
import styled from "@emotion/styled";
import { ArrowRightOutlined } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
import NavSection from "../../components/NavSection";
import Scrollbar from "../../components/ScrollBar";
//hooks
import useResponsive from "../../hooks/useResponsive";
import navConfig from "./navConfig";
import { useLocation } from "react-router-dom";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }: any) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

interface DashboardSideNavbarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

export default function DashboardSideNavbar({
  isOpenSidebar,
  onCloseSidebar,
}: DashboardSideNavbarProps) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  React.useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />
      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ position: "absolute", bottom: 1, m: 1 }}>
        <Divider />
        <IconButton onClick={onCloseSidebar}>
          <ArrowRightOutlined />
        </IconButton>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
              },
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
