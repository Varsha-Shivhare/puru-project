// import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import Page from "../components/Helmet/Page";
import ScoreCardTable from "../components/Tables/ScoreCardTable";

export default function ScoreCardApp() {
  return (
    <Page title="Score Card">
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 0.8 }}>
          <Grid item>
            <ScoreCardTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
