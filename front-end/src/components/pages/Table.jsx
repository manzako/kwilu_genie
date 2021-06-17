import React from 'react';
import { Segment, Button, Table, Input } from 'semantic-ui-react';
// import { Icon, InlineIcon } from '@iconify/react';
// import bxsEdit from '@iconify/icons-bx/bxs-edit';
import deleteForeverOutline from '@iconify/icons-mdi/delete-forever-outline';
import '../pages/css/table.css'

const TableExampleStackable = (props) => {
  console.log("modal==>"+ JSON.stringify(props.enregistrement));

  const [liste, setListe] = React.useState(props.enregistrement)
  const index = liste.length - 1;
  const [array, setArray] = React.useState({});

  //remove function
  // const removeEntryClick = () => {
  //   if (index > -1) {
  //     liste(liste.splice(index + 1, index));
  //   }
  // };

  return (
  <>
    {liste.map(data=>( 
    
    <Table celled structured>
        <Table.Header>

          <Table.Row>      
            {/* <Table.HeaderCell >photo</Table.HeaderCell> */}
            <Table.HeaderCell > <p><b>chauffeur</b> </p></Table.HeaderCell>
            <Table.HeaderCell > <p><b>societe</b> </p></Table.HeaderCell>
            <Table.HeaderCell >Marque </Table.HeaderCell>
            <Table.HeaderCell >N°_plaque </Table.HeaderCell>
          </Table.Row>   

          <Table.Row>
            <Table.Cell > {data.chauffeur}</Table.Cell>
            <Table.Cell > {data.societe}</Table.Cell>
            <Table.Cell >{data.marque} </Table.Cell>
            <Table.Cell >{data.plaque}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell colSpan='2'> client</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>Sucre</Table.HeaderCell>
           
          </Table.Row>
          
          <Table.Row>
            <Table.HeaderCell > Noms</Table.HeaderCell>
            <Table.HeaderCell > Bon de Liv.</Table.HeaderCell> 
            <Table.HeaderCell > Type</Table.HeaderCell>
            <Table.HeaderCell > Quantité </Table.HeaderCell>
          </Table.Row>

        </Table.Header>

        {data.client.map(e=>
        <Table.Body>
          <Table.Row>
              <Table.Cell>{e.nomClient}</Table.Cell>
              <Table.Cell>{e.BL}</Table.Cell>
              <Table.Cell>
                  {e.produit.map(i=>
                  <Table.Row >
                    <p>{i.type}  </p>
                  </Table.Row>
                  )}
            </Table.Cell>
            <Table.Cell>
              {e.produit.map(i=>
                <Table.Row>
                  <p> {i.quantite} </p>
                </Table.Row>
                 
              )}
             </Table.Cell>
             {/* <Table.Cell> 
               <Button basic color='red'content='Red'
              onClick={removeEntryClick}><Icon icon={bxsEdit} />
              </Button> <Button color='red' content='Red'><Icon style={{fontSize:'15px'}} icon={deleteForeverOutline} /></Button>
              </Table.Cell>  */}
          </Table.Row>
      </Table.Body> 
      )} 

      <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'><b>Commentaire</b></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan='4'><Segment> <p>{data.commentaire}</p></Segment></Table.Cell> 
          </Table.Row>
      </Table.Footer>
    </Table>
    ))} 
  </>
)
}

export default TableExampleStackable;