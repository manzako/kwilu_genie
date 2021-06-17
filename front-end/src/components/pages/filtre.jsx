import React, { useState, useEffect } from "react";
import { Dropdown, Input } from "semantic-ui-react";
import "./css/filter.css";
import PageResponsableChargement from "./responsablechargement";

const DropdownExampleInput = () => (
  <Dropdown
    id="filter"
    text="Filter"
    icon="filter"
    floating
    labeled
    button
    className="icon"
  >
    <Dropdown.Menu>
      <Dropdown.Header content="Tappez votre recherche ici" />
      <Input icon="search" iconPosition="left" name="search" />
      <Dropdown.Header
        icon="tags"
        content="Ou Filtrer par état de chargement"
      />
      <Dropdown.Divider />
      <Dropdown.Item
        icon="truck"
        iconPosition="left"
        text="Véhicule au parking"
      />
      <Dropdown.Item
        icon="sync"
        iconPosition="left"
        text="Véhicule en chargement"
      />
      <Dropdown.Item icon="check" iconPosition="left" text="Véhicule chargé" />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownExampleInput;
