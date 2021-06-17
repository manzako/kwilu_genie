import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import DiagrammeCirculaire from "../graphs/DiagrammeCirculaire";

export default function Section7 () {
  return (<Grid.Column width={4}>
    <Segment style={{ height: "26rem", padding: "0.5rem", marginTop: "0.5rem" }}>
      <DiagrammeCirculaire />
    </Segment>
  </Grid.Column>
)
};