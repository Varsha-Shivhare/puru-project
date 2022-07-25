import { Box, Typography } from "@mui/material";

export default function RectangularTrafficBar(props: { value: number }) {
  const colorSelection = (val: number) => {
    if (val === 100) return "#53D62B";
    else if (val >= 90) return "#FE4842";
    else return "#FFD601";
  };
  return (
    <Box
      sx={{
        backgroundColor: colorSelection(props.value),
        padding: "0.2rem",
        borderRadius: "0.2rem",
      }}
    >
      <Typography
        variant="caption"
        component={"div"}
        color={`${props.value <= 89 ? "black" : "text.primary"}`}
      >
        {+(props?.value || 0).toFixed(2)}
        {"%"}
      </Typography>
    </Box>
  );
}
