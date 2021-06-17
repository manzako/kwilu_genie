import React, { useEffect, useState } from 'react'
import { Table, Card, Segment, Button, Menu, Icon, Image, Header, Input, Label, Popup, Grid } from 'semantic-ui-react';
import HeaderExampleFloating from "./header";
import axios from "axios";
import "./css/EnregistrementGi.css";
import PopupGi from './pop-GI/popGI'

const EnregistrementGi = () => {
    const employeId = localStorage.getItem("employeId");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://appkwilu2.herokuapp.com/employes/${employeId}/enregistrements`)
            .then((response) => setData(response.data))
    }, []);
    // console.log(data)
    return (
        <>
            <HeaderExampleFloating />
            {data.map((item) =>
                <Card.Group style={{ marginTop: "160px", marginLeft: "5%" }}>
                    {item.vehicules.map((veh) =>
                        <Card>
                            <Card.Content>
                                <Card.Meta><Label as='a' color='yellow' image>
                                    <img src='https://legacytransportationloscabos.com/resources/node_modules/semantic-ui/examples/assets/images/avatar/tom.jpg' />
                                    {veh.transporteur}
                                    <Label.Detail>Chaufeur</Label.Detail>
                                </Label>
                                </Card.Meta>
                                <Card.Meta>N°Plaque : {veh.numero_plaque}</Card.Meta>
                                <Card.Meta>Marque : {veh.marque} </Card.Meta>
                                <Card.Meta>Societé : {veh.societe} </Card.Meta>
                                <Card.Content extra>

                                    {/* <div className='ui two buttons'>
                                        <Popup style={{ width: '80px' }} trigger={<Button basic color='green'>
                                            Modifier
                                        </Button>} flowing hoverable>
                                            <Grid centered divided columns={1}>
                                                <Grid.Column textAlign='center'>
                                                    <p>Chaufeur</p>
                                                    <Input style={{ margin: '5px' }} focus defaultValue={veh.transporteur} />
                                                    <p>N°Plaque</p>
                                                    <Input style={{ margin: '5px' }} focus defaultValue={veh.numero_plaque} />
                                                    <p>Marque</p>
                                                    <Input style={{ margin: '5px' }} focus defaultValue={veh.marque} />
                                                    <p>Societé</p>
                                                    <Input style={{ margin: '5px' }} focus defaultValue={veh.societe} />
                                                    <Button>Confirmer</Button>
                                                </Grid.Column>
                                            </Grid>
                                        </Popup>

                                        <Button basic color='red'>
                                            Suprimer
                                        </Button>
                                    </div> */}
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    )
                    }
                </Card.Group >)}
        </>
    )
}
export default EnregistrementGi;