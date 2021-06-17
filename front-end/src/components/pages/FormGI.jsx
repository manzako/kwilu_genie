import React, { state, useState, useEffect } from "react";
import {
  Grid,
  Image,
  Button,
  Form,
  Segment,
  Table,
  Container,
  Label,
  Icon,
  Modal,
  Select,
  Header,
  List
} from "semantic-ui-react";
import ModalPhoto from "./ModalPhoto";
import HeaderExampleFloating from "./header";
import "./css/formulairegi.css";
import placeholder from "./images/placeholder.png";

import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ConfirmerEnregistrementCamion from "./ConfirmerEnregistrementCamion";

const RefactorformulaireGi = (props) => {
  const { register, errors } = useForm();

  const [nomClient, setNomClient] = useState("");
  const [
    numeroReferenceBonLivraison,
    setNumeroReferenceBonLivraison,
  ] = useState("");
  const [natureMarchandise, setNatureMarchandise] = useState("");
  const [quantite, setQuantite] = useState("");
  const [marque, setMarque] = useState("");
  const [plaque, setPlaque] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [societeDeTransport, setSocieteDeTransport] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [image, setImage] = useState(placeholder);
  const [loader, setLoader] = useState("");
  const [ajoutClients, setAjoutClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [enregistrement, setEnregistrements] = useState([]);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(null);

  let idProduit = 1;
  if (natureMarchandise === "10X5") {
    idProduit = 1;
  } else if (natureMarchandise === "VCOM") {
    idProduit = 2;
  } else {
    idProduit = 3;
  }

  const addProduces = (e) => {
    e.preventDefault();

    if (natureMarchandise === "" && quantite === "") {
      setError("veillez renseigner le champs vide");
      return true;
    } else {
      setError(null);

      const detailProduit = {
        type: natureMarchandise,
        quantite: quantite,
      };
      setQuantite("");
      setNatureMarchandise("");
      setProduits((initialValue) => {
        return [...initialValue, detailProduit];
      });
    }
  };

  const addClients = (e) => {
    e.preventDefault();

    if (
      nomClient === "" &&
      numeroReferenceBonLivraison === "" &&
      produits === []
    ) {
      setError("veillez renseigner le champs vide");
      return true;
    } else {
      setError(null);
      const infosClient = {
        nomClient: nomClient,
        BL: numeroReferenceBonLivraison,
        produit: produits,
      };
      setNomClient("");
      setNumeroReferenceBonLivraison("");
      setProduits([])
      setAjoutClients((initialValue) => {
        return [...initialValue, infosClient];
      });
    }
  };

  const addChargements = (e) => {
    e.preventDefault();

    if (
      chauffeur === "" &&
      marque === "" &&
      plaque === "" &&
      ajoutClients === []
    ) {
      setErr("veillez renseigner le champs vide");
      return true;
    } else {
      setErr(null);
      const infosChargement = {
        chauffeur: chauffeur,
        societe: societeDeTransport,
        marque: marque,
        plaque: plaque,
        commentaire: commentaire,
        photo: image,
        client: ajoutClients,
      };
     
      setEnregistrements([infosChargement]);
      console.log(enregistrement);
      return enregistrement;
    }
  };

  const DeleteClient = (nomClient) => {
    const filteredUser = ajoutClients.filter((user) => user.nomClient !== nomClient);
    setAjoutClients(filteredUser);
  };
  const Delete = (type) => {
    const filteredUser = produits.filter((user) => user.type !== type);
    setProduits(filteredUser);
  };

  // remplissage des champs sur client
  const recuperationDesDonnes = (nomClient) => {
    const ElementMod = ajoutClients.filter(
      (user) => user.nomClient === nomClient
    );
    console.log("element mod" + JSON.stringify(ElementMod));
    setNomClient(ElementMod[0].nomClient);
    setNumeroReferenceBonLivraison(ElementMod[0].BL);
    setProduits(ElementMod[0].produit);
  };

  const onSubmit = () => {
    const employeId = localStorage.getItem("employeId");
    const formData = new FormData();
    setLoader("loading");
    formData.append("enregistrement", JSON.stringify(enregistrement));
    formData.append("photo_vehicule", image);

    if (
      chauffeur !== "" &&
      marque !== "" &&
      plaque !== "" &&
      ajoutClients !== []
    ) {
      // /employes/:id/enregistrements
      // const endpoint = `http://localhost:6000/employes/${employeId}/enregistrements`;

      axios({
        method: "post",
        url: `https://appkwilu2.herokuapp.com/employes/${employeId}/enregistrements`,
        data: formData /*{ enregistrement: JSON.stringify(enregistrement) }*/,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          //Affichage d'une animation de succès après l'enregitrement d'un transporteur
          props.history.push("/animation");
          console.log("ok " + res.data);
          //Redirection vers le formulaire de la garde industrielle après 2secondes
          setTimeout(function () {
            props.history.push("/Form");
          }, 3000);
        })
        .catch((err) => {
          // alert("Un problème est survenu lors de l'enregistrement du camion\n");
          console.log(err);
        });
    } else {
      //props.history.push("/animation");
      setTimeout(function () {
        props.history.push("/Form");
      });
      alert("Impossible de soumettre, veiller renseigner tous les champs");
    }
  };

  function formPhoto(photo) {
    setImage(photo);
    console.log(image);
  }

  return (
    <div>
      <HeaderExampleFloating />
      <Container className="contenu" style={{marginTop: "8rem"}}>
        <Header>Formulaire</Header>
        <Segment raised>
          <Header>Information du transporteur</Header>
          <Form>
            <Segment className="segment2">
              <Grid id="infoTrans">
                <Grid.Column width={11}>
                  <Form autocomplete="off">
                    <Form.Group widths="equal">
                      <Form.Input
                        ref={register}
                        value={chauffeur}
                        name="chauffeur"
                        placeholder="Noms du chauffeur"
                        onChange={(event) => setChauffeur(event.target.value)}
                        className="semia"
                      />
                         <Form.Input
                        ref={register}
                        value={societeDeTransport}
                        name="chauffeur"
                        placeholder="Société de transport"
                        onChange={(event) =>
                          setSocieteDeTransport(event.target.value)
                        }
                        className="semia"
                      />
                      {errors.chauffeur && <span>This field is required</span>}
                    </Form.Group>
              
                  </Form>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Input
                        ref={register}
                        value={marque}
                        name="marque"
                        placeholder="Marque du véhicule"
                        onChange={(event) => setMarque(event.target.value)}
                        className="semia"
                        fluid
                        id="form-subcomponent-shorthand-input-first-name"
                      />
                      {errors.marque && <span>This field is required</span>}
                      <Form.Input
                        ref={register}
                        value={plaque}
                        name="plaque"
                        placeholder="N° de la plaque d'immatriculation"
                        onChange={(event) => setPlaque(event.target.value)}
                        className="semia"
                        fluid
                        id="form-subcomponent-shorthand-input-last-name"
                      />
                      {errors.plaque && <span>This field is required</span>}
                    </Form.Group>
                    <div className="milieu">
                    <Form.Field
                      name="commentaire"
                      placeholder="Commentaire..."
                      value={commentaire}
                      onChange={(event) => setCommentaire(event.target.value)}
                      control="textarea"
                      rows="3"
                    />
                  </div>{" "}
                  </Form>
                  <div style={{ color: "red" }}>{err}</div>
                </Grid.Column>
                <Grid.Column width={5}>
                  <div className="milieu">
                    <Image
                      src={image}
                      value={image}
                      size="small"
                      bordered
                      ref={register}
                      onChange={(event) => setImage(event.target.value)}
                      centered
                      width="90px"
                      style={{ marginLeft: "50px", marginTop: "10px" }}
                      src={placeholder}
                    />
                    <ModalPhoto ajoutPhoto={formPhoto} />
                  </div>
                </Grid.Column>
              </Grid>
            </Segment>
            {/* style={{height :"200px"}} */}
            <Grid columns={2}>
              <Grid.Column width={5}>

                <Segment className="segment2">
                  <Header className="titre" as="h3">
                    Liste des clients
                  </Header>
                </Segment>

                <Segment className="segments2">
                <strong >     
                      <List ordered>
                        {ajoutClients.map((client) => (
                          <List.Item as='a'
                            
                            
                          >
                          . <span onClick={() =>
                              recuperationDesDonnes(client.nomClient)
                            }>{client.nomClient}</span>
                                  <Button
                                    style={{borderStyle:"none"}}
                                       circular
                                       icon="remove "
                                       type="button"
                                       floated="right"
                                       Basic
                                       inverted
                                      color="red"
                                      onClick={() => DeleteClient(client.nomClient)}
                                    />
                                
                          </List.Item> 
                          
                        ))}
                      </List>
                      
                    </strong> 
                 
                  <Button
                    onClick={addClients}
                  >
                    +Ajouter client
                  </Button>
                </Segment>
              </Grid.Column>
              <Grid.Column width={11} className="segments2">
                <Segment.Group>
                  <Segment className="segments2">
                    <Header>Information du Client</Header>

                    <div className="milieu">
                      <Form autocomplete="off">
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            id="form-subcomponent-shorthand-input-first-name"
                            ref={register}
                            value={nomClient}
                            name="nomClient"
                            placeholder="Noms du client"
                            onChange={(event) =>
                              setNomClient(event.target.value)
                            }
                            className="semia"
                          />
                           <Form.Input
                            fluid
                            id="form-subcomponent-shorthand-input-first-name"
                            ref={register}
                            value={numeroReferenceBonLivraison}
                            name="numref"
                            onChange={(event) =>
                              setNumeroReferenceBonLivraison(event.target.value)
                            }
                            placeholder="Numero de bon de livraison"
                            className="semia"
                          />
                        </Form.Group>
                      </Form>
                      
                      <Form>
                        <Segment style={{ marginBottom: "5px" }}>
                          <Header
                            className="titre"
                            as="h4"
                            style={{ marginBottom: "5px" }}
                          >
                            Sucre
                          </Header>
                          <Table striped selectable>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Quantité</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {produits.map((data) => (
                                <tr>
                                  <td> {data.type}</td>
                                  <td>
                                    {" "}
                                    {data.quantite}
                                    <Button
                                      circular
                                      icon="remove "
                                      type="button"
                                      floated="right"
                                      Basic
                                      inverted
                                      color="red"
                                      onClick={() => Delete(data.type)}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </Table.Body>
                          </Table>
                          <Form.Group widths="equal">
                            <Form.Input
                              fluid
                              id="form-subcomponent-shorthand-input-last-name"
                              ref={register}
                              control={Select}
                              value={natureMarchandise}
                              options={[
                                { key: "XXX", text: "10X5", value: "10X5" },
                                { key: "VCOM", text: "VCOM", value: "VCOM" },
                                {
                                  key: "BSB2-5",
                                  text: "BSB2-5",
                                  value: "BSB2-5",
                                },
                              ]}
                              placeholder="Type de sucre"
                              search
                              searchInput={{ id: "form-select-control-gender" }}
                              onChange={(e, { value }) => {
                                setNatureMarchandise(value);
                                console.log(e, value);
                              }}
                              className="semia"
                            />

                            <Form.Field
                              fluid
                              id="form-subcomponent-shorthand-input-last-name"
                              ref={register}
                              value={quantite}
                              name="quantite"
                              control="input"
                              type="number"
                              min={1}
                              onChange={(event) =>
                                setQuantite(event.target.value)
                              }
                              placeholder="Quantité de la marchandise"
                              className="semia"
                            />
                          </Form.Group>
                          <Button onClick={addProduces}>
                            +Ajouter produit
                          </Button>
                        </Segment>
                      </Form>
                      <div style={{ color: "red" }}>{error}</div>
                    </div>
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid>
            <div className="btnGroup">
              <div className="bnt">
                <div color="green" onClick={addChargements}>
                  <ConfirmerEnregistrementCamion
                    enregistrement={enregistrement}
                    loader={loader}
                    valider={onSubmit}
                  />

                  <Link to="/EnregistrementGi">
                    <button class="ui primary button">Enregistrements</button>
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};

export default RefactorformulaireGi;
