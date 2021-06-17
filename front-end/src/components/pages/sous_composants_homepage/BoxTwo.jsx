import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Grid, Segment, Header } from "semantic-ui-react";
import animation2 from "../images/IMG-HomePage/animation.gif";

const BoxTwo = () => {

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
      <Link to="/formulairegi">
        <Segment attached style={gridStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <img src={animation2} style={{ width: "230px" }} />
        </Segment>
        <Header style={linkStyle}  as="h4" attached="bottom" >
          Enregistrer un chargement
        </Header>
      </Link>
    </Grid.Column>
  );
};

export default BoxTwo;
