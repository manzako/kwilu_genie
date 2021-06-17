import React, {useState} from "react";
import {Link } from "react-router-dom";
import { Grid, Segment, Header } from "semantic-ui-react";
import animation from "../images/IMG-HomePage/animation2.gif";

const BoxThree = () => {
  const [state, setState] = useState({hover:false})

const toggleHover = () => {
	setState({hover: !state.hover})
}
let linkStyle;
let gridStyle;
if (state.hover) {
  linkStyle = {backgroundColor: 'green', color: 'white', border: '2px solid green',cursor: 'pointer'}
  gridStyle={border: '1px solid green', height: '250px', borderRadius: "7px 7px 0px 0px"}
} else {
  linkStyle = {backgroundColor: '#16AB39', color: 'white' }
  gridStyle={border: 'none', height: '250px', borderRadius: "7px 7px 0px 0px"}
}
  return (
    <Grid.Column>
      <Link to="/PageResponsableChargement">
      <Segment attached style={gridStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <img src={animation} style={{ width: "230px" }} />
        </Segment>
        <Header style={linkStyle} as="h4" attached="bottom" >
          Voir les infos de chargements
        </Header>
      </Link>
    </Grid.Column>
  );
};

export default BoxThree;
