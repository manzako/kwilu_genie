import React, { useState, useEffect } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Stack from "./Stack";

export default function (props) {
  const [bon, setBon] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/detail_produits/",
    }).then((res) => {
      setBon(res.data);
      setLoading(false);
    });
  }, [setBon]);

  const noDeBon = new Stack();
  const { startDate } = props;
  noDeBon.push(bon, startDate);
  return (
    <Grid.Column>
      <Segment style={{ height: "8rem", padding: "1rem" }}>
        <div className="Segment4">
          <FontAwesomeIcon className="Icon3" icon={faFileAlt} />
          <Header
            style={{
              marginLeft: "60px",
              marginTop: "1px",
              fontFamily: "Prata-serif",
            }}
          >
            {" "}
            {noDeBon.nombreDeBon()}{" "}
          </Header>
        </div>
        <strong className="LegendMarchandises">No. de bon</strong>
      </Segment>
    </Grid.Column>
  );
}
