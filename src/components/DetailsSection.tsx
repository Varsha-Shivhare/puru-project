import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DenseAppBar from "./AppBars/DensedAppBar";
import { alpha } from "@mui/material";

interface DetailsCardProps {
  name: string;
  value: string;
}

function DetailsCard({ name, value }: DetailsCardProps) {
  return (
    <Box
      sx={{
        "&:hover": {
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.9),
          width: "98%",
        },
        display: "flex",
        minWidth: 80,
        flexGrow: 1,
        m: 0.7,
      }}
    >
      <Typography
        color="primary"
        gutterBottom
        variant="h6"
        sx={{ ml: 1.4, mt: 1, mb: 1 }}
        noWrap
      >
        {name}:
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{
          pl: 1,
          pt: 1.4,
          color: "text.secondary",
          maxWidth: "13rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        noWrap
      >
        {value}
      </Typography>
    </Box>
  );
}

interface cardProps {
  name: string;
  value: string;
}
interface DetailsSectionProps {
  details: cardProps[];
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ details }) => {
  const time = new Date().toISOString();
  return (
    <div>
      <DenseAppBar />
      <Box
        sx={{
          pt: 1,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          maxWidth: 500,
          margin: "0rem",
        }}
      >
        {details.map((detail) => (
          <DetailsCard
            key={detail.name}
            name={detail.name}
            value={detail.value}
          />
        ))}
      </Box>
    </div>
  );
};
export default DetailsSection;
