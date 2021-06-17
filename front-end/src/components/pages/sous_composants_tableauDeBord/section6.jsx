import React from "react";
import { Grid, Segment, List } from "semantic-ui-react";
import Clients from "./clients";

export default function Section6() {
  return (
    <Grid.Column width={4}>
      <Segment
        style={{
          height: "26rem",
          padding: "0.5rem",
          marginTop: "0.5rem",
          overflow: "auto",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <List divided verticalAlign="middle">
          <List.Item>
            <List.Content floated="right"></List.Content>
            <List.Header style={{ marginBottom: "1.6rem" }}>
              Chargement par client
            </List.Header>
            <hr />
          </List.Item>
        </List>
        <Clients />
      </Segment>
    </Grid.Column>
  );
}
