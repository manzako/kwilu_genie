import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import HistogrammeGroupe from "../graphs/HistogrammeGroupe";
// import CourantStates from './courantStates'

export default function Section5() {
  return (
    <Grid.Column width={8}>
      <Segment
        style={{ height: "26rem", padding: "0.5rem", marginTop: "0.5rem" }}
      >
        <HistogrammeGroupe />
      </Segment>
      {/* <Grid relaxed columns={3}>
      <CourantStates />
    </Grid> */}
    </Grid.Column>
  );
}
