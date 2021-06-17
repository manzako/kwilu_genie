import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import axios from "axios";
import Loader from "./loader";
import logo from "../images/compagnieSucriere.gif";
import moment from "moment";

const Clients = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get("https://appkwilu2.herokuapp.com/detail_produits").then((res) => {
      setNames([...res.data]);
      // console.log(res.data);
      setLoading(false);
    });
  }, [setNames]);

  let clientsDuJour = names.filter(
    (name) =>
      moment(selectedDate).format("YYYY-MM-DD") ===
      moment(name.createdAt).format("YYYY-MM-DD")
  );
  // console.log(clientsDuJour);
  return (
    <List divided verticalAlign="middle">
      {loading && <Loader />}
      {!loading && (
        <>
          {clientsDuJour.map((elt, i) => {
            return (
              <List.Item
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={logo}
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px solid green",
                    borderRadius: "50%",
                    // float:"left"
                    marginRight: "5px",
                  }}
                />
                <List.Content>
                  <List.Header as="a">{elt.clients[0].nom_client}</List.Header>
                  <List.Description as="a">
                    <span style={{ color: "#422040", fontSize: "14px" }}>
                      {elt.clients[0].produits[0].quantite}
                    </span>
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </>
      )}
    </List>
  );
};

export default Clients;
