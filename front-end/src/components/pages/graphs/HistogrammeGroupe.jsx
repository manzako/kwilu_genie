import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

const HistogrammeGroupe = () => {
  const [chartData, setChartData] = useState({});

  let sucre10X5 = [];
  let sucreVCOM = [];
  let sucreBSB2 = [];

  useEffect(() => {
    axios
      .get("https://appkwilu2.herokuapp.com/detail_produits/")
      .then((res) => {
        res.data.forEach((elt) => {
          elt.clients.forEach((client) => {
            client.produits.forEach((sucre) => {
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
            });
          });
        });

        setChartData({
          // labels: [
          //   "Lundi",
          //   "Mardi",
          //   "Mercredi",
          //   "Jeudi",
          //   "Vendredi",
          //   "Samedi",
          //   "Dimanche",
          // ],
          datasets: [
            {
              label: "Sucre 10X5",
              data: sucre10X5,
              backgroundColor: "#FF6384",
            },
            {
              label: "Sucre VCOM",
              data: sucreVCOM,
              backgroundColor: "#3cba9f",
            },
            {
              label: "Sucre BSB2-5",
              data: sucreBSB2,
              backgroundColor: "#36A2EB",
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, [chartData]);

  return (
    <>
      <Line
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Chargement hebdomadaire par type de sucre",
          },
          legend: {
            display: true,
            position: "top",
          },
          scales: {
            xAxes: [
              {
                barPercentage: 0.2,
                labels: [
                  "Lundi",
                  "Mardi",
                  "Mercredi",
                  "Jeudi",
                  "Vendredi",
                  "Samedi",
                  "Dimanche",
                ],
              },
            ],
          },
        }}
      />
    </>
  );
};

export default HistogrammeGroupe;
