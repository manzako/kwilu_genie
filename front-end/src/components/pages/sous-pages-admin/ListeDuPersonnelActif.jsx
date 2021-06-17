import React from 'react';
import { Icon, Grid, Header, Segment, Form, Table, Button, Input } from "semantic-ui-react";

const ListeDuPersonnelActif = () => {
    return ( 

        <Table striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Identifiant</Table.HeaderCell>
            <Table.HeaderCell>Prénom</Table.HeaderCell>
            <Table.HeaderCell>Nom</Table.HeaderCell>
            <Table.HeaderCell>Poste</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Heure de début de connextion</Table.HeaderCell>
            <Table.HeaderCell>Heure de fin de connextion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

              <tr >
                        
                <td>M3456  </td>
                <td>Joséphine  </td>
                <td>Kingombe</td>
                <td> RM </td>
                <td>Jeudi, 27 juillet 2012</td>
                <td>  12 h  30</td>
                <td> 23 h 54 </td>
              </tr>
            
        </Table.Body>
        
      </Table>
     );
}
 
export default ListeDuPersonnelActif;