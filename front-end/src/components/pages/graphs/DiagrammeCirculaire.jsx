import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const DiagrammeCirculaire = () => {
  const [chartData, setChartData] = useState({});

  let sucre10X5 = 0;
  let sucreVCOM = 0;
  let sucreBSB2 = 0;
  let quantiteSucre = [];

  useEffect(() => {
    axios
      .get("https://appkwilu2.herokuapp.com/detail_produits/")
      .then((res) => {
        res.data.forEach((elt) => {
          elt.clients.forEach((client) => {
            client.produits.forEach((sucre) => {
              if (
                moment(sucre.createdAt).format("YYYY-MM-DD") ===
                moment(new Date()).format("YYYY-MM-DD")
              ) {
                switch (sucre.type_produit) {
                  case "10X5":
                    sucre10X5 += parseInt(sucre.quantite);
                    break;
                  case "VCOM":
                    sucreVCOM += parseInt(sucre.quantite);
                    break;
                  case "BSB2-5":
                    sucreBSB2 += parseInt(sucre.quantite);
                    break;
                }
              }
            });
          });
        });

        quantiteSucre = [sucre10X5, sucreVCOM, sucreBSB2];

        setChartData({
          labels: ["Sucre 10X5", "Sucre VCOM", "Sucre BSB2"],
          datasets: [
            {
              label: "Chargement par société",
              backgroundColor: ["#FF6384", "#3cba9f", "#36A2EB"],
              data: quantiteSucre,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, [setChartData]);

  return (
    <div className="chart">
      <Doughnut
        data={chartData}
        width={120}
        options={{
          title: {
            display: true,
            text: "Chargements par type de sucre",
          },
          legend: {
            display: true,
            position: "bottom",
            align: "start",
          },
        }}
      />
    </div>
  );
};

export default DiagrammeCirculaire;
