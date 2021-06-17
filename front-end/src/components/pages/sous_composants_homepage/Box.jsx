import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Grid, Segment, Header, Popup, Icon} from "semantic-ui-react";

const Box = ({titreBox, ouvrirPage, iconeBox }) => {
  const [state, setState] = useState({hover:false})
 
  
  const toggleHover = () => {
    setState({hover: !state.hover})
  }
    let linkStyle;
    let gridStyle;
    if (state.hover) {
      linkStyle = {backgroundColor: 'green', color: 'white', border: '2px solid green',cursor: 'pointer', textAlign: "center" }
      gridStyle={border: '1px solid green', height: '250px', borderRadius: "7px 7px 0px 0px", textAlign: "center" }
    } else {
      linkStyle = {backgroundColor: '#16AB39', color: 'white', textAlign: "center"  }
      gridStyle={border: 'none', height: '250px', borderRadius: "7px 7px 0px 0px", textAlign: "center" }
    }
  return (
    <Grid.Column>
      <Link to={ouvrirPage}>
      <Segment attached style={gridStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} >
          <img src={iconeBox} style={{ width: "230px" }} />
        </Segment>
        <Header  style={linkStyle} as="h4" attached="bottom">
          {titreBox}
        </Header>
      </Link>
    </Grid.Column>
  );
};

export default Box;

