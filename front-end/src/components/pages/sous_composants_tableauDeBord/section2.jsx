import React, { useState, useEffect } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Stack from "./Stack";

export default function Section2(props) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/clients",
    }).then((res) => {
      setClients(res.data);
      setLoading(false);
    });
  }, [setClients]);

  const clientCounter = new Stack();
  const { startDate } = props;
  clientCounter.push(clients, startDate);

  return (
    <Grid.Column>
      <Segment style={{ height: "8rem", padding: "1rem" }}>
        <div className="Segment2">
          <FontAwesomeIcon className="Icon1" icon={faUser} />
          <Header
            style={{
              marginLeft: "60px",
              marginTop: "1px",
              fontFamily: "Prata-serif",
            }}
          >
            {clientCounter.getClients()}
          </Header>
        </div>
        <strong className="LegendClient">Clients</strong>
      </Segment>
    </Grid.Column>
  );
}
