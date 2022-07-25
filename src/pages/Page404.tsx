import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="div"
          sx={{ height: 240, mx: "auto", my: { xs: 4, sm: 8 } }}
        >
          <Typography variant="h1" sx={{ color: "red" }}>
            404
          </Typography>
        </Box>

        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Go to ScoreCard
        </Button>
      </ContentStyle>
    </Container>
  );
}
