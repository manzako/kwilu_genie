import React, { useState, useEffect } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "./loader";
import Stack from "./Stack";

export default function Section1(props) {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/detail_produits/",
    }).then((res) => {
      setTrucks(res.data);
      setLoading(false);
    });
  }, []);

  const truckRegisterTime = new Stack();
  const { startDate } = props;
  truckRegisterTime.push(trucks, startDate);
  console.log(startDate);
  return (
    <Grid.Column>
      {loading && <Loader />}
      {!loading && (
        <>
          <Segment attached style={{ height: "8rem", padding: "1rem" }}>
            <div className="Segment1">
              <FontAwesomeIcon className="Icon1" icon={faTruck} />
              <Header
                style={{
                  marginLeft: "60px",
                  marginTop: "1px",
                  fontFamily: "Prata-serif",
                }}
              >
                {truckRegisterTime.getPackedTrucks()}
              </Header>
            </div>
            <div>
              <strong className="Legend" style={{ textAlign: "center" }}>
                Camions chargés
              </strong>
            </div>
          </Segment>
        </>
      )}
    </Grid.Column>
  );
}
