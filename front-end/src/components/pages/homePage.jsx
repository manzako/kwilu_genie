import React from "react";
import { Grid, Container, Popup, Dropdown } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import Box from "./sous_composants_homepage/Box";
import animation1 from "../pages/images/IMG-HomePage/animation.gif";
import animation2 from "../pages/images/IMG-HomePage/animation2.gif";
import animation3 from "../pages/images/IMG-HomePage/animation1.gif";
import { Spring } from "react-spring/renderprops";
import HeaderExampleFloating from "./header";
import HomePageTitle from "./sous_composants_homepage/HomaPageTitle";
// import { Icon, withRouter } from "react-router-dom";
// import { Icon, InlineIcon } from '@iconify/react';
// import administratorLine from '@iconify/icons-clarity/administrator-line';
// import { useState } from "react";

const HomePage = (props) => {
  const poste = localStorage.getItem("poste")
    ? localStorage.getItem("poste")
    : "";
  console.log(poste);

  if (localStorage.getItem("authorization") === null) {
    window.location.href = "/";
  }

  const redirection1 = () => "/Form";
  const redirection2 = () => "/PageResponsableChargement";
  const redirection3 = () => "/tableauDebord";

  const Acces1 = (props) => {
    if (poste === "Garde industrielle" || poste === "Directrice commerciale") {
      return redirection1();
    } else {
    }
  };

  const Acces2 = (props) => {
    if (
      poste === "Responsable de magasin" ||
      poste === "Directrice commerciale"
    ) {
      return redirection2();
    }
  };

  const Acces3 = (props) => {
    if (poste === "Directrice commerciale") {
      return redirection3();
    }
  };

  return (
    <>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => {
          return (
            <div style={props}>
              <HeaderExampleFloating />
            </div>
          );
        }}
      </Spring>

      <Container>
        <HomePageTitle />
        <Grid columns={3} style={{ marginTop: "10px" }}>
          <Box
            titreBox="Enregistrer un chargement"
            iconeBox={animation1}
            ouvrirPage={Acces1}
          />
          <Box
            titreBox="Voir les infos de chargement"
            iconeBox={animation2}
            ouvrirPage={Acces2}
          />
          <Box
            titreBox="Voir le tableau de bord"
            iconeBox={animation3}
            ouvrirPage={Acces3}
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
