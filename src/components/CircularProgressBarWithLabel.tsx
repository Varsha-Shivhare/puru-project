import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Typography, Box } from "@mui/material";

export default function CircularProgressBarWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const colorSelection = (val: number) => {
    if (val >= 90) return "#53D62B";
    else if (val <= 70) return "#FE4842";
    else return "#FFD601";
  };
  return (
    <Box sx={{ position: "relative", dispaly: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{ color: colorSelection(props.value) }}
      />
      <Box
        sx={{
          inset: 0,
          paddingBottom: "0.4rem",
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component={"div"} color="text.secondary">
          {`${Math.round(props?.value || 0)}`}
        </Typography>
      </Box>
    </Box>
  );
}
