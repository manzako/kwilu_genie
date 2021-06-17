import React,{state, useState, useEffect } from 'react'
import { Grid, Image,Button,Form,Segment,Table, Container,Icon,Modal,Select,Header
} from 'semantic-ui-react'
import ModalPhoto from "./ModalPhoto";
import HeaderExampleFloating from "./header";
import"./css/RefactorFormulaire.css"
import placeholder from "./images/placeholder.png";

import axios from "axios";
import{Link} from "react-router-dom"
import { useForm } from "react-hook-form";
import ConfirmerEnregistrementCamion from "./ConfirmerEnregistrementCamion";

const RefactorformulaireGi = (props) => {

  const { register, errors } = useForm();

  const [idClient, setIdClient] = useState("");
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
  const [users,setUsers]=useState([]);
  const [marchandises,setMarchandises]=useState([]);
  const[identifiant,setIdentifiant]=useState(1)

  

  

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
      produits !== []
    ) {
      setError("veillez renseigner le champs vide");
      return true;
    } else {
      setError(null);
      const identifiant = idClient !== "" ? idClient : genererIdentifiant();
      const infosClient = {
        identifiant : identifiant,
        nomClient: nomClient,
        numeroReferenceBonLivraison: numeroReferenceBonLivraison,
        produit: produits,
      };
      
      setNomClient("");
      setNumeroReferenceBonLivraison("");

      
      if (idClient !== "") {
        updateClient(infosClient)
      }else{
        setAjoutClients((initialValue) => {
          return [...initialValue, infosClient];
        });
      }
    }
    setProduits([]);
  };

  const updateClient = (infosClient)=>{
    
    let index = ajoutClients.findIndex(item=>{
      return item.identifiant == infosClient.identifiant
    })
    ajoutClients[index] = infosClient;
  }

 
  const addChargements = (e) => {
    e.preventDefault();

    if (
      chauffeur === "" &&
      marque === "" &&
      plaque === "" &&
      ajoutClients !== []
    ) {
      setErr("veillez renseigner le champs vide");
      return true;
    } else {
      setErr(null);
      const infosChargement = {
        chauffeur: chauffeur,
        societe : societeDeTransport,
        marque: marque,
        plaque: plaque,
        commentaire: commentaire,
        photo: image,
        client: ajoutClients,
      };
      setNomClient("");
      setNumeroReferenceBonLivraison("");
     
      setEnregistrements([infosChargement]);
      console.log(enregistrement)
      return enregistrement;
      ;
    }
  };
  
  const genererIdentifiant = () =>{
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}



  const preremplir=(e)=>{
    console.dir(e.target)
    const clientFilter=ajoutClients.find(client =>client.identifiant===e.target.id )
    setIdClient(clientFilter.identifiant)
    setNomClient(clientFilter.nomClient);
    setNumeroReferenceBonLivraison(clientFilter.numeroReferenceBonLivraison);
    setProduits(clientFilter.produit);
  
  }

 


  const onSubmit = () => {
    const employeId = localStorage.getItem("employeId");
    const formData = new FormData();
    setLoader("loading");
    formData.append("enregistrement", JSON.stringify(enregistrement));
    formData.append("photo_vehicule", image);

    if(chauffeur !== "" &&
    marque !== "" &&
    plaque !== "" &&
    ajoutClients !== []){
    axios({
      method: "post",
      url: `https://appkwilu2.herokuapp.com/employes/${employeId}/enregistrements`,
      data: formData ,/*{ enregistrement: JSON.stringify(enregistrement) }*/
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        //Affichage d'une animation de succès après l'enregitrement d'un transporteur
        props.history.push("/animation");
        console.log("ok " +res.data);
        //Redirection vers le formulaire de la garde industrielle après 2secondes
        setTimeout(function () {
          props.history.push("/RefactorFormulaireGi");
        }, 3000);
      })
      .catch((err) => {
        // alert("Un problème est survenu lors de l'enregistrement du camion\n");
        console.log(err);
      });
    }else{
      // props.history.push("/animation");
      // setTimeout(function () {
      //   props.history.push("/RefactorFormulaireGi");
      // });
      alert("Impossible de soumettre, veiller renseigner tous les champs")
    }

  };

  function formPhoto(photo) {
    setImage(photo);
    console.log(image);
  }


return(
    <div>
        <HeaderExampleFloating/>
        
        
        <Container className='contenu'>
          <Form>
          <Segment className="segment2">
            <Grid id="infoTrans">
              <Grid.Column width={11}>
                <h3>Information du transporteur</h3>
                <Form autocomplete="off">
                      <Form.Group widths="equal">
                        <Form.Input
                           ref={register}
                           value={chauffeur}
                           name="chauffeur"
                           placeholder="Nom du chauffeur"
                           onChange={(event) => setChauffeur(event.target.value)}
                           className="semia"
                        />
                          {errors.chauffeur && <span>This field is required</span>}
                      </Form.Group>
                </Form>
                <Form>
                      <Form.Group widths="equal">
                        <Form.Input
                          ref={register}
                          value={societeDeTransport}
                          name="chauffeur"
                          placeholder="Société de transport"
                          onChange={(event) => setSocieteDeTransport(event.target.value)}
                          className="semia"
                        />
                         {errors.chauffeur && <span>This field is required</span>}
                      </Form.Group>
                </Form>
                <Form>
                    <Form.Group widths='equal'>
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
                  style={{marginLeft:"50px",marginTop:"30px"}}

                    src={placeholder}
                  />
                   <ModalPhoto ajoutPhoto={formPhoto}/>
                </div>

        </Grid.Column>
      </Grid>
      </Segment><br/>

  <Grid >
    <Grid.Column width={5}>
      <Segment className="segment2" style={{height:"450px"}}>
      <h3>Liste des clients</h3>
      <div style={{height:"10px"}}>
      
     {
      ajoutClients.map((index)=>(
       <a  id={index.identifiant} key={index.identifiant} onClick={preremplir} style={{}} >{index.nomClient} </a>
       ))
     }
    

     
     </div>
      <div  >  <Button  color="green" id="ajout" value="ajouter client"
      onClick={addClients}> +Ajouter client</Button></div>
      </Segment>

    </Grid.Column>

    <Grid.Column width={11}>


    <Segment className="segment2" style={{height:"300px"}}>
    <h3>Information du client</h3>
        <div className="milieu">
        <Form>
            <Form.Group widths='equal'>
              <input type="text" value={idClient} name="idClient" hidden/>
            <Form.Input
               fluid
               id="form-subcomponent-shorthand-input-first-name"
               ref={register}
               value={nomClient}
               name="nomClient"
               placeholder="Nom du client"
               onChange={(event) => setNomClient(event.target.value)}
               className="semia"
            />
             {errors.nomClient && <span>This field is required</span>}

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
            {errors.numref && <span>This field is required</span>}
            </Form.Group>
        </Form>
        <div >
            <h3>Listes des produits</h3>
            <div style={{
          height: "110px",
          padding: "0.5rem",
          // marginTop: "0.5rem",
          overflow: "auto",
         
        }}>

            <Table celled>
    <Table.Header>
      <Table.Row>
        
        <Table.HeaderCell>Nature</Table.HeaderCell>
        <Table.HeaderCell>Quantité</Table.HeaderCell>
        <Table.HeaderCell> <Icon name='edit' size='large' /></Table.HeaderCell>

      </Table.Row>
    </Table.Header>

    <Table.Body>
    {
      produits.map((produit)=>(
        <tr key={produit.id}>
          <td>{produit.type}</td>
          <td>{produit.quantite}</td>
          <td> 
      <Modal trigger={<Button 
     
      icon="edit"
      color="red" style={{marginLeft:"0px",marginTop:""}}>Modifier</Button>} closeIcon className="droite">
    <Header icon='edit' content='Modifier un produit ' />
    <Modal.Content>
       <Form>
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
                      
                    </Form> 
    </Modal.Content>
    <Modal.Actions>
      <Button color='red'
      icon="thumbs up"
      color="green"
      className="floatBnt"
      floated="top"
   
     loader={loader}
     valider={onSubmit}
     
     
     >
     <Icon name='thumbs up' /> Confirmer
      </Button>
      <div style={{ color: "red" }}>{error}</div>
    </Modal.Actions>
  </Modal></td>
        </tr>
      ))
    }
      
    </Table.Body>
  </Table>
  </div>
  

      
      <Modal trigger={<Button 
     
      icon="plus"
      color="green" style={{marginLeft:"0px",marginTop:""}}>Ajouter produit</Button>} closeIcon className="droite">
    <Header icon='plus' content='Ajouter un produit ' />
    {/* <Modal.Content> */}
       <Form>
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
                      
                    </Form> 
    {/* </Modal.Content> */}
    {/* <Modal.Actions> */}
      <Button color='red'
      icon="plus"
      color="green"
      className="floatBnt"
      floated="top"
     onClick={addProduces}
     loader={loader}
    //  valider={onSubmit}
     
     >
     <Icon name='plus' /> Ajouter
      </Button>
      <div style={{ color: "red" }}>{error}</div>
    {/* // </Modal.Actions> */}
  </Modal> 
           </div>

       
        </div>
      
      </Segment>
      <Segment className="segment2" style={{height:"135px"}} >
      <h3>Commentaire de la GI</h3>
        <div className="milieu">
        
                  <Form.Field
                    name="commentaire"
                    value={commentaire}
                    onChange={(event) => setCommentaire(event.target.value)}
                    control="textarea"
                    rows="3"
                    
                  />
                </div>{" "}

      </Segment>


</Grid.Column>

</Grid>
<div className='btnGroup'>
            <div className="bnt"> 
              <div color="green"onClick={addChargements} >
                <ConfirmerEnregistrementCamion
                  enregistrement={enregistrement}
                  loader={loader}
                  valider={onSubmit}
                />

                <Link to="/EnregistrementGi">
             <button class="ui primary button"  >Enregistrements
             </button>
             </Link>
              </div>
            </div>
          </div>
          </Form>
   </Container>
   
</div>

 ) };

export default RefactorformulaireGi
