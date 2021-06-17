import React, { useState } from "react";
import {CameraFeed} from "./camera-feed";
import { Button, Modal } from "semantic-ui-react";


const modal={
  width:"auto",
  height:"auto",

}

const ModalPhoto = (props) => {
  const [imagSrc, setImageSrc] = useState();

  function ajoutPhoto(file) {
    setImageSrc(file);
    props.ajoutPhoto(file);
    
  }

  return (
    <div  >
    <Modal 
    style={modal}

      trigger={
        <Button circular icon="camera " color="green" className="floatBnt" />
      }
    >
      <Modal.Content image>
        <Modal.Description>
          <CameraFeed sendFile={ajoutPhoto} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  );
};

export default ModalPhoto;
