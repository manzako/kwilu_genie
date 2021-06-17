import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Step, Grid } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import "../css/truckstates.css";

export default function CourantStates() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/vehicules",
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  const donneesDuJour = data.filter(
    (camion) =>
      moment(new Date()).format("YYYY-MM-DD") ===
      moment(camion.createdAt).format("YYYY-MM-DD")
  );

  const nbParking = donneesDuJour.filter((camion) => camion.etatId === 1)
    .length;

  const nbEnChargement = donneesDuJour.filter((camion) => camion.etatId === 2)
    .length;
  const nbCharges = donneesDuJour.filter((camion) => camion.etatId === 3)
    .length;

  // const onParkingTotal = new Stack();
  // const unpackingInprogress = new Stack();
  // const truckRegisterTime = new Stack();
  // truckRegisterTime.push(packedTrucks);
  // onParkingTotal.push(onParking);
  // unpackingInprogress.push(unpacking);

  return (
    <Grid.Column width={5}>
      <Step.Group size="small">
        <Link to="/CamionsAuParking">
          <Step
            className="truck-state truck-state1"
            style={{ border: "1px solid #E57A44" }}
          >
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>{nbParking}</Step.Title>
              <Step.Description>Au parking</Step.Description>
            </Step.Content>
          </Step>
        </Link>
        <Link to="/CamionsEnChargement">
          <Step
            className="truck-state truck-state2"
            style={{ border: "1px solid #FFE381" }}
          >
            <Icon name="sync" />
            <Step.Content>
              <Step.Title>{nbEnChargement}</Step.Title>
              <Step.Description>En chargement</Step.Description>
            </Step.Content>
          </Step>
        </Link>
        <Link to="/CamionsCharges">
          <Step
            className="truck-state truck-state3"
            completed
            style={{ border: "1px solid #44FFD1" }}
          >
            <Icon name="info" />
            <Step.Content>
              <Step.Title>{nbCharges}</Step.Title>
              <Step.Description>Camions chargés</Step.Description>
            </Step.Content>
          </Step>
        </Link>
      </Step.Group>
    </Grid.Column>
  );
}
