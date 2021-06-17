import React from "react";
import { Header, Segment, Image } from "semantic-ui-react";
import logo from "./images/compagnieSucriere.gif";
import ProfilUtilisateur from "./profilutilisateur";
import CourantStates from"./sous_composants_tableauDeBord/courantStates"
import "./css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



const HeaderExampleFloating = () => {
  return (
    <div>
    <div className="header-container">
      <Segment className="yezi" clearing>
        <Header className="header" as="h2" >
          <ProfilUtilisateur 
          />
        </Header>
        <Header className="header" as="h2" >
          <Link to="/homepage">
          <FontAwesomeIcon
                className='retour'
                icon={faArrowLeft}
              />
              </Link>
            <Image circular src={logo} />
        </Header> 
        <Header className="header" as="h2" >
          <CourantStates/>
        </Header>
        
      </Segment>
    </div>
    
    </div>
  );
};

export default HeaderExampleFloating