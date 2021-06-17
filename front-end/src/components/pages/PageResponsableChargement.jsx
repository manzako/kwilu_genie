import React from "react";
import { Segment} from "semantic-ui-react";
import PageResponsableChargement from "./responsablechargement";
import HeaderExampleFloating from "./header";


const SegmentExampleRaised = () => {
  

  return (
    <div>
      <HeaderExampleFloating />
      <Segment raised style={{marginTop:"60px"}}>
        <PageResponsableChargement />
      </Segment>
    </div>
  );
};

export default SegmentExampleRaised;
