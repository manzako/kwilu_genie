import React, { useEffect, useState } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Stack from "./Stack";

const Section3 = (props) => {
  const [quantities, setQuantities] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/detail_produits",
    }).then((res) => {
      setQuantities(res.data);
      // setLoading(false);
    });
  }, [setQuantities]);

  const totalQuantity = new Stack();
  const {startDate} = props;
  totalQuantity.push(quantities, startDate);

  return (
    <Grid.Column>
      <Segment style={{ height: "8rem", padding: "1rem" }}>
        <div className="Segment3">
          <FontAwesomeIcon className="Icon2" icon={faWeightHanging} />
          <Header
            style={{
              marginLeft: "60px",
              marginTop: "1px",
              fontFamily: "Prata-serif",
            }}
          >
            {totalQuantity.getQuantity()} (Tonnes)
          </Header>
        </div>
        <strong className="LegendMarchandises">Marchandises</strong>
      </Segment>
    </Grid.Column>
  );
};

export default Section3;
