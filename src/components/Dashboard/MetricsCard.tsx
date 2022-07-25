// @mui
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import React from "react";
import { useColorMode } from "../../App";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface MetricsCardProps {
  title: string;
  total: number;
  icon?: React.ReactNode;
  color?: string;
  sx?: object;
}

export default function MetricsCard({
  title,
  total,
  icon: Icon,
  color = "primary",
  sx,
  ...other
}: MetricsCardProps) {
  const { mode } = useColorMode();

  return (
    <Card
      sx={{
        py: 4,
        boxShadow: 1,
        textAlign: "center",
        color: (theme: any) =>
          mode === "dark"
            ? theme.palette[color].darker
            : theme.palette[color].dark,
        bgcolor: (theme: any) =>
          mode === "dark"
            ? theme.palette[color].light
            : theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme: any) =>
            mode === "dark"
              ? theme.palette[color].darker
              : theme.palette[color].dark,
          backgroundImage: (theme: any) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0,
            )} 0%, ${alpha(
              mode === "dark"
                ? theme.palette[color].darker
                : theme.palette[color].dark,
              0.24,
            )} 100%)`,
        }}
      >
        {Icon}
      </IconWrapperStyle>

      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
