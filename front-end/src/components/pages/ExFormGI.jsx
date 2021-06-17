// import React, { state, useState, useEffect } from "react";
// import {
//   Grid,
//   Image,
//   Form,
//   Button,
//   Segment,
//   Header,
//   Select,
//   Container,
// } from "semantic-ui-react";
// import HeaderExampleFloating from "./header";
// import ConfirmerEnregistrementCamion from "./ConfirmerEnregistrementCamion";
// import ModalPhoto from "./ModalPhoto";
// import { useForm } from "react-hook-form";
// import placeholder from "./images/placeholder.png";
// import "./css/formulairegi.css";
// import axios from "axios";
// import{Link} from "react-router-dom"


// const FormGI = (props) => {
//   const { register, errors } = useForm();

//   const [nomClient, setNomClient] = useState("");
//   const [
//     numeroReferenceBonLivraison,
//     setNumeroReferenceBonLivraison,
//   ] = useState("");
//   const [natureMarchandise, setNatureMarchandise] = useState("");
//   const [quantite, setQuantite] = useState("");
//   const [marque, setMarque] = useState("");
//   const [plaque, setPlaque] = useState("");
//   const [chauffeur, setChauffeur] = useState("");
//   const [societeDeTransport, setSocieteDeTransport] = useState("");
//   const [commentaire, setCommentaire] = useState("");
//   const [image, setImage] = useState(placeholder);
//   const [loader, setLoader] = useState("");
//   const [ajoutClients, setAjoutClients] = useState([]);
//   const [produits, setProduits] = useState([]);
//   const [enregistrement, setEnregistrements] = useState([]);
//   const [error, setError] = useState(null);
//   const [err, setErr] = useState(null);


//   let idProduit = 1;
//   if (natureMarchandise === "10X5") {
//     idProduit = 1;
//   } else if (natureMarchandise === "VCOM") {
//     idProduit = 2;
//   } else {
//     idProduit = 3;
//   }

//   const addProduces = (e) => {
//     e.preventDefault();

//     if (natureMarchandise === "" && quantite === "") {
//       setError("veillez renseigner le champs vide");
//       return true;
//     } else {
//       setError(null);

//       const detailProduit = {
//         type: natureMarchandise,
//         quantite: quantite,
//       };
//       setQuantite("");
//       setNatureMarchandise("");
//       setProduits((initialValue) => {
//         return [...initialValue, detailProduit];
//       });
//     }
//   };

//   const addClients = (e) => {
//     e.preventDefault();

//     if (
//       nomClient === "" &&
//       numeroReferenceBonLivraison === "" &&
//       produits !== []
//     ) {
//       setError("veillez renseigner le champs vide");
//       return true;
//     } else {
//       setError(null);
//       const infosClient = {
//         nomClient: nomClient,
//         BL: numeroReferenceBonLivraison,
//         produit: produits,
//       };
//       setNomClient("");
//       setNumeroReferenceBonLivraison("");

//       setAjoutClients((initialValue) => {
//         return [...initialValue, infosClient];
//       });
//     }
//   };

//   const addChargements = (e) => {
//     e.preventDefault();

//     if (
//       chauffeur === "" &&
//       marque === "" &&
//       plaque === "" &&
//       ajoutClients !== []
//     ) {
//       setErr("veillez renseigner le champs vide");
//       return true;
//     } else {
//       setErr(null);
//       const infosChargement = {
//         chauffeur: chauffeur,
//         societe : societeDeTransport,
//         marque: marque,
//         plaque: plaque,
//         commentaire: commentaire,
//         photo: image,
//         client: ajoutClients,
//       };
//       setNomClient("");
//       setNumeroReferenceBonLivraison("");
     
//       setEnregistrements([infosChargement]);
//       console.log(enregistrement)
//       return enregistrement;
//       ;
//     }
//   };

//   const onSubmit = () => {
//     const employeId = localStorage.getItem("employeId");
//     const formData = new FormData();
//     setLoader("loading");
//     formData.append("enregistrement", JSON.stringify(enregistrement));
//     formData.append("photo_vehicule", image);

//     if(chauffeur !== "" &&
//     marque !== "" &&
//     plaque !== "" &&
//     ajoutClients !== []){

//     // /employes/:id/enregistrements
//     // const endpoint = `http://localhost:6000/employes/${employeId}/enregistrements`;

//     axios({
//       method: "post",
//       url: `https://appkwilu2.herokuapp.com/employes/${employeId}/enregistrements`,
//       data: formData ,/*{ enregistrement: JSON.stringify(enregistrement) }*/
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//       .then((res) => {
//         //Affichage d'une animation de succès après l'enregitrement d'un transporteur
//         props.history.push("/animation");
//         console.log("ok " +res.data);
//         //Redirection vers le formulaire de la garde industrielle après 2secondes
//         setTimeout(function () {
//           props.history.push("/formulaire");
//         }, 3000);
        
//       })
//       .catch((err) => {
//         // alert("Un problème est survenu lors de l'enregistrement du camion\n");
//         console.log(err);
//       });
//     }else{
//       //props.history.push("/animation");
//       setTimeout(function () {
//         props.history.push("/formulaire");
//       });
//       alert("Impossible de soumettre, veiller renseigner tous les champs")
//     }

//   };

//   function formPhoto(photo) {
//     setImage(photo);
//     console.log(image);
//   }

//   return (
//     <div className="formulaire">
//       <HeaderExampleFloating />

//       <Container style={{marginTop: "150px"}}>
//         <Form id="color">
//           <Grid stackable columns={2}>
//             <Grid.Column>
//               <Segment className="segment1" style={{height: "305px"}}>
//                 <Header className="titre" as="h3">
//                   Information du transporteur
//                 </Header>

//                 <div className="milieu">
//                   <Form autocomplete="off">
//                     <Form.Field>
//                       <input
//                         ref={register}
//                         value={chauffeur}
//                         name="chauffeur"
//                         placeholder="Nom du chauffeur"
//                         onChange={(event) => setChauffeur(event.target.value)}
//                         className="semia"
//                       />
//                       {errors.chauffeur && <span>This field is required</span>}
//                     </Form.Field>
//                     <Form.Field>
//                       <input
//                         ref={register}
//                         value={societeDeTransport}
//                         name="chauffeur"
//                         placeholder="Société de transport"
//                         onChange={(event) => setSocieteDeTransport(event.target.value)}
//                         className="semia"
//                       />
//                       {errors.chauffeur && <span>This field is required</span>}
//                     </Form.Field>
//                   </Form>
//                   <Form>
//                     <br />
//                     <Form.Group widths="equal">
//                       <Form.Input
//                         ref={register}
//                         value={marque}
//                         name="marque"
//                         placeholder="Marque du véhicule"
//                         onChange={(event) => setMarque(event.target.value)}
//                         className="semia"
//                         fluid
//                         id="form-subcomponent-shorthand-input-first-name"
//                       />
//                       <Form.Input
//                         ref={register}
//                         value={plaque}
//                         name="plaque"
//                         placeholder="N° de la plaque d'immatriculation"
//                         onChange={(event) => setPlaque(event.target.value)}
//                         className="semia"
//                         fluid
//                         id="form-subcomponent-shorthand-input-last-name"
//                       />
//                     </Form.Group>
//                   </Form>
//                 </div>
//                 <div style={{ color: "red" }}>{err}</div>
//               </Segment>
//             </Grid.Column>

//             <Grid.Column>
//               <Segment.Group>
//                 <Segment className="segment1" style={{height: "305px"}}>
//                   <Header className="titre" as="h3">
//                     Information du Client
//                   </Header>

//                   <div className="milieu">
//                     <Form autocomplete="off">
//                       <Form.Group widths="equal">
//                         <Form.Input
//                           fluid
//                           id="form-subcomponent-shorthand-input-first-name"
//                           ref={register}
//                           value={nomClient}
//                           name="nomClient"
//                           placeholder="Nom du client"
//                           onChange={(event) => setNomClient(event.target.value)}
//                           className="semia"
//                         />
//                       </Form.Group>
//                     </Form>
//                     <Form>
//                       <Form.Group widths="equal">
//                         <Form.Input
//                           fluid
//                           id="form-subcomponent-shorthand-input-first-name"
//                           ref={register}
//                           value={numeroReferenceBonLivraison}
//                           name="numref"
//                           onChange={(event) =>
//                             setNumeroReferenceBonLivraison(event.target.value)
//                           }
//                           placeholder="Numero de bon de livraison"
//                           className="semia"
//                         />
//                       </Form.Group>
//                     </Form>
//                     <Form >
//                       <Segment  style={{marginBottom : "5px"}}>
//                         <Header className="titre" as="h4" style={{marginBottom: "5px"}}>
//                           Sucre
//                         </Header>
//                         <Form.Group widths="equal">
//                           <Form.Input
//                             fluid
//                             id="form-subcomponent-shorthand-input-last-name"
//                             ref={register}
//                             control={Select}
//                             value={natureMarchandise}
//                             options={[
//                               { key: "XXX", text: "10X5", value: "10X5" },
//                               { key: "VCOM", text: "VCOM", value: "VCOM" },
//                               {
//                                 key: "BSB2-5",
//                                 text: "BSB2-5",
//                                 value: "BSB2-5",
//                               },
//                             ]}
//                             placeholder="Type de sucre"
//                             search
//                             searchInput={{ id: "form-select-control-gender" }}
//                             onChange={(e, { value }) => {
//                               setNatureMarchandise(value);
//                               console.log(e, value);
//                             }}
//                             className="semia"
//                           />

//                           <Form.Field
//                             fluid
//                             id="form-subcomponent-shorthand-input-last-name"
//                             ref={register}
//                             value={quantite}
//                             name="quantite"
//                             control="input"
//                             type="number"
//                             min={1}
//                             onChange={(event) =>
//                               setQuantite(event.target.value)
//                             }
//                             placeholder="Quantité de la marchandise"
//                             className="semia"
//                           />
//                           <Button
//                             circular
//                             icon="plus"
//                             color="green"
//                             className="floatBnt"
//                             floated="top"
//                             onClick={addProduces}
//                           />
//                         </Form.Group>
//                       </Segment>
//                     </Form>
//                     <Button
//                         circular
//                         icon="plus "
//                         color="green"
//                         style={{marginRight : "10px"}}
//                         className="floatBnt"
//                         onClick={addClients}
//                       />
//                      <div style={{ color: "red" }}>{error}</div>
//                   </div>
//                 </Segment>
//               </Segment.Group>
//             </Grid.Column>
//           </Grid>

//           <Grid stackable columns={2}>
//             <Grid.Column>
//               <Segment className="segment2">
//                 <Header className="titre" as="h3">
//                   Ajouter photo
//                 </Header>
//                 <div className="milieu">
//                   <Image
//                     src={image}
//                     value={image}
//                     size="small"
//                     bordered
//                     ref={register}
//                     onChange={(event) => setImage(event.target.value)}
//                     centered
//                   />
//                 </div>
//                 <ModalPhoto ajoutPhoto={formPhoto} />
//               </Segment>
//             </Grid.Column>
//             <Grid.Column>
//               <Segment className="segment2">
//                 <Header className="titre" as="h3">
//                   Commentaire
//                 </Header>
//                 <div className="milieu">
//                   <Form.Field
//                     name="commentaire"
//                     value={commentaire}
//                     onChange={(event) => setCommentaire(event.target.value)}
//                     control="textarea"
//                     rows="3"
//                   />
//                 </div>{" "}
//               </Segment>
//             </Grid.Column>
//           </Grid>
//           <div className='btnGroup'>
//             <div className="bnt"> 
//               <div color="green"onClick={addChargements} >
//                 <ConfirmerEnregistrementCamion
//                   enregistrement={enregistrement}
//                   loader={loader}
//                   valider={onSubmit}
//                 />
//               </div>
//             </div>
//             <div>
//             <Link to="/EnregistrementGi">
//              <button class="ui primary button"  >Infos enregistrement
//              </button>
//              </Link>
//             </div>
//           </div>
//         </Form>
       
//       </Container>
//     </div>
//   );
// };

// export default FormGI;

// {details.map((detail) =>
//   {detail.vehicule.employes.map((employe) => 
   
//     <Segment className="seg-com">
//       <div>
//         <p>
//           {" "}
//           <b> {employe.nom}</b> &ensp;
//           {/* <span>{moment(data.date).calendar()}</span> */}
//         </p>
//         {/* <p>{data.commentaire}</p> */}
//       </div>
//     </Segment>
//   )}
// )}
