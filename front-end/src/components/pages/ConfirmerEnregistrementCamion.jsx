import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import TableExampleStackable from "./Table";
import "./css/Modal.css";

const ConfirmerEnregistrementCamion = (props) => {

  const [state, setState] = useState({ modal_open: false });
  const handleOpen = () => setState({ modal_open: true });
  const handleClose = () => setState({ modal_open: false });


  return (
    <Modal

    
      trigger={
        <Button color="green" onClick={handleOpen}>
          Enregistrer
        </Button>
      }
      closeIcon
      id="modal"
      open={state.modal_open}
      onClose={handleClose}
    >
    <Modal.Content>
      <div>
        <TableExampleStackable
             enregistrement={props.enregistrement}
        />
      </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" onClick={handleClose}>
          ANNULER
        </Button>

        <Button
          color="green"
          // onClick={handleClose}
          // className={`${props.loader}`}
          onClick={props.valider} 
        >
          CONFIRMER
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmerEnregistrementCamion;

/*
as={Link} to="/formulairegi"
*/
