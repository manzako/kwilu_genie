import React /*, { useEffect } */ from "react";
// import profil from "./images/profil.jpeg";
import { Dropdown, /*, Image,*/ Label } from "semantic-ui-react";
import "./css/profilutilisateur.css";
import { Link } from "react-router-dom";
// import { useState } from "react";

const ProfilUtilisateur = () => {
  // Récupération de l'email du local storage
  let emailEmploye = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";

  const poste = localStorage.getItem("poste")
    ? localStorage.getItem("poste")
    : "";

  let trigger;
  let items;

  const deconnect = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  //Mise en majuscule de l'email
  emailEmploye = emailEmploye.toString().toUpperCase();

  if (poste === "Directrice commerciale") {
    trigger = (
      <span>
        <Label content={emailEmploye} color="green" icon="user" />
      </span>
    );
    items = (
      <Dropdown.Menu>
        <Dropdown.Item
          key="deconnexion"
          text="Déconnexion"
          icon="sign out"
          onClick={deconnect}
        />
        <Dropdown.Item
          key="parametre"
          text="Paramètre"
          icon="settings"
          as={Link}
          to="/Admin"
        />
      </Dropdown.Menu>
    );
  } else {
    trigger = (
      <span>
        <Label content={emailEmploye} color="blue" icon="user" />
      </span>
    );
    items = (
      <Dropdown.Menu>
        <Dropdown.Item
          key="deconnexion"
          text="Deconnexion"
          icon="sign out"
          onClick={deconnect}
        />
      </Dropdown.Menu>
    );
  }
  return (
    <>
      <Dropdown
        trigger={trigger}
        // options={options}
        pointing="top right"
        icon={null}
      >
        {items}
      </Dropdown>
    </>
  );
};
export default ProfilUtilisateur;
