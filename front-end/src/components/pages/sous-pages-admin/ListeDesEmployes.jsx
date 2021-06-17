import React ,{ useState , useEffect } from 'react'
import { Icon, Grid, Header, Segment, Form, Table,Container,Select,Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import axios from "axios";

import { Spring } from "react-spring/renderprops";
import HeaderExampleFloating from "../header";
const jwtDecode = require("jwt-decode");



const ListeDesEmployes = () => {
  const { register, errors } = useForm();

  const [formDatas, setFormDatas] = useState([]);
  const [acces, setAcces] = useState("");
  const [page, setPage] = useState("");
  const [poste, setPoste] = useState("");
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [data, setData] = useState([])
  const [prenom, setPrenom] = useState("");
  const [formData, setFormData] = useState([]);
  const [password, setPassword] = useState("");
  const [ ids , setIds ] = useState("");
  const [show, setShow] = useState(false);

  // // const handleClick = () => {
  //   setShow(!show);
  // };

  const index = formData.length - 1;

  const Body = styled.div`
    margin-top: 30px;
  `;

  let idAcces = 1;
  if (acces === "Lecture") {
    idAcces = 1;
  } else {
    idAcces = 2;
  }

  let idPoste = 1;
  if ( poste === "Garde industrielle") {
    idPoste = 1;
  }  else if ( poste === "Responsable de magasin") {
    idPoste = 2;
  } else {
    idPoste = 3;
  }

  let idPage = 1;
  if ( page === "Chargement") {
    idPage = 1;
  }  else if ( page === "Enregistrement") {
    idPage = 2;
  } else {
    idPage = 3;
  }

  let ajoutAcces = (e) => {
    e.preventDefault();

    const infosAcces = {
      page: page,
      acces: acces,
    };
    setAcces("");
    setPage("");
    setFormDatas((initialValue) => {
      return [...initialValue, infosAcces];
    });
    console.log(formDatas);
  };

const AjoutAccesEtEmploye = (e) =>{
  e.preventDefault()
  
  const user  = {
      nom : nom,
      prenom : prenom,
      mail : mail,
      poste : poste,
      password : password,
      pageAcces : formDatas
  }
  setNom("");
  setPrenom("");
  setPoste("");
  setMail("")
  setPassword("")
  setFormDatas([])
  setFormData((initialValue) => {
    return [ ...initialValue,user]
  });
  console.log(formData)
}
  // suppression des acces sur clients
  const Delete = (page) => {
    console.log("form : "+formData)
    const filteredUser = formDatas.filter(user => user.page !== page);
    setFormDatas(filteredUser);
  };  
// suppression des employes
  const handleDelete = (nom) => {
    console.log("form : " + formData);
    const filteredUser = formData.filter((user) => user.nom !== nom);
    setFormData(filteredUser);
  };
  const removeEntryClick = () => {
    if (index > -1) {
      setFormData(formData.splice(index + 1, index));
    }
  }

  // remplissage des champs sur client
  const modifierUser = nom => {
    const ElementMod = formData.filter(user => user.nom === nom);
    console.log("element mod" + JSON.stringify(ElementMod));

    setPrenom(ElementMod[0].prenom);
    setNom(ElementMod[0].nom);
    setPassword(ElementMod[0].password);
    setPoste(ElementMod[0].poste);
    setFormDatas(ElementMod[0].pageAcces)

  };

  const validerModification = id => {
    let idUser
    const user = {
      nom : nom,
      prenom : prenom,
      pwd : password,
      email : mail,
      role : poste,
      
    };
    const typeAcces ={
      pageAcces : JSON.stringify(formDatas)
    };
   
}

  useEffect(() => {
    axios
      .get(
        `https://appkwilu2.herokuapp.com/employes`
      )
      .then((response) => {setData(response.data)});

    console.log(data);
  }, []);

const recuperationDesDonnes = (id) => {

  const ElementMod = data.filter(user => user.id === id)
  // const idPageAcces = data.map(acces => acces.page_acces)
   console.log(data)
  // console.log(JSON.stringify(idPageAcces))
 
  setIds(id)
  setNom(ElementMod[0].nom);
  setPrenom(ElementMod[0].prenom);
  setPoste(ElementMod[0].role);
  setPassword(ElementMod[0].pwd);
  setMail(ElementMod[0].email);
  setPoste(ElementMod[0].role);
  setFormDatas(ElementMod[0].page_acces);
  console.log(formDatas)
  const idPageAcces = formDatas.map(index =>( 
    index.id))  
  // console.log(...idPageAcces) 
}

const mettreAjour = async () => {
  let idUser
  console.log(ids);
  
  const user = {
    nom : nom,
    prenom : prenom,
    pwd : password,
    email : mail,
    role : poste,
    
  };
  const typeAcces ={
    pageAcces : JSON.stringify(formDatas)
  };

  const endpoint1 = `https://appkwilu2.herokuapp.com/employes/${ids}`;

    await axios
      .put(endpoint1, user)
      .then((res) => {
        alert("put employe ok 1")
        console.log(res.data);
        console.log(res.data.id);
        idUser=res.data.id

        // window.location.reload(false);
      })
      .catch((err) => {
        alert(
          "Un problème est survenu lors de la soumission de l'employe\n"
        );
        console.log(err);
      });
      console.log(typeAcces)

      const endpoint2 = `https://appkwilu2.herokuapp.com/employes/${ids}/page_acces/all`
      await  axios
      .delete(endpoint2, typeAcces)
      .then((res) => {
        console.log(res.data);
        alert("suppression ok")
      })
      .catch((err) => {
        alert(
          "Un problème est survenu lors de la suppression\n"
        );
        console.log(err);
      });
   //     https://appkwilu2.herokuapp.com/employes/${idUser}/page_acces
  // employes/:idEmploye/page_acces/:id
  const endpoint3 = `https://appkwilu2.herokuapp.com/employes/${ids}/page_acces`
      
    await  axios
    .post(endpoint3, typeAcces)
    .then((res) => {
      console.log(res.data);
      alert(" acces ok1")
      axios.get("https://appkwilu2.herokuapp.com/employes").then(res =>{ setData(res.data)})
      console.log(data)
      })
      .catch((err) => {
        alert(
          "Un problème est survenu lors de la soumission de l'acess\n"
        );
        console.log(err);
      });
    } 
const onSubmit = async () => {
  // if (commentaire === "") {
  //   setComError("Name cant be blank!");
  // //   return true;
  // } else {
    // setComError(null);
    let idUser
    const user = {
      nom : nom,
      prenom : prenom,
      pwd : password,
      email : mail,
      role : poste,
      
    };
    const typeAcces ={
      pageAcces : JSON.stringify(formDatas)
    };

    const endpoint1 = `https://appkwilu2.herokuapp.com/employes`;
    await axios
      .post(endpoint1, user)
      .then((res) => {
        alert("post ok1")
        console.log(res.data);
        console.log(res.data.id);
        idUser=res.data.id

        // window.location.reload(false);
      })
      .catch((err) => {
        alert(
          "Un problème est survenu lors de la soumission de l'employe\n"
        );
        console.log(err);
      });
  //  
      const endpoint2 = `https://appkwilu2.herokuapp.com/employes/${idUser}/page_acces`
      await  axios
      .post(endpoint2, typeAcces)
      .then((res) => {
        console.log(res.data);
        
        alert("ok2")
        axios.get("https://appkwilu2.herokuapp.com/employes").then(res => setData(res.data))
       
          console.log(data)
        // window.location.reload(false);https://appkwilu2.herokuapp.com/employes/5/page_acces
      })
      .catch((err) => {
        alert(
          "Un problème est survenu lors de la soumission de l'acess\n"
        );
        console.log(err);
      });
  //}
};


  // const deleteUser = id => {
  //   axios.delete(`https://us-central1-deux-e42ba.cloudfunctions.net/http/contacts/${id}`)
  //   .then(res=>{
  //   })
  // };

  return (
    <>
      <Header>Formulaire</Header>
      <Segment
        style={{ paddingBottom: "60px", width: "80%", margin: "0 auto" }}
        raised
      >
        <Form>
          <Header>Employé</Header>
          <Form.Group widths="equal">
            <Form.Field
              placeholder="Nom"
              name="nom"
              value={nom}
              control="input"
              onChange={(event) => setNom(event.target.value)}
            />
            <Form.Field
              placeholder="Prenom"
              name="prenom"
              value={prenom}
              control="input"
              onChange={(event) => setPrenom(event.target.value)}
            />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Field 
              placeholder='Pseudo-name' 
              name ='mail'
              value={mail} 
              control='input'
              onChange={(event) => setMail(event.target.value)}
            />
              <Form.Field 
              placeholder='Mot de passe' 
              name='pwd' 
              value={" "}
              control='input' 
              onChange={(event) => setPassword(event.target.value)}
            />
            </Form.Group>
            <Form>
            <Form.Field
              fluid
              placeholder="Poste"
              id="form-subcomponent-shorthand-input-last-name"
              ref={register}
              control={Select}
              value={poste}
              options={[
              { key: "GI", text: "Garde industrielle", value: "Garde industrielle" },
              { key: "RM", text: "Responsable de magasin", value: "Responsable de magasin" },
              { key: "DC",text: "Directrice commerciale", value: "Directrice commerciale"}
              ]}
              search
              searchInput={{ id: "form-select-control-gender" }}
              onChange={(e, { value }) => {
              setPoste(value);
              console.log(e, value);
                                  }}
              />
            </Form>
            <Segment>
              <Table striped selectable>
                  <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell>Pages</Table.HeaderCell>
                      <Table.HeaderCell>Accès</Table.HeaderCell> 
                  </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  {formDatas.map(data =>
                    <tr >
                      <td> {data.page}</td>
                      <td> {data.acces} 
                      <Button circular
                      icon="remove "
                      type='button' 
                      floated="right"
                      Basic inverted color='red'
                      onClick={()=>Delete(data.page)}
                      /> </td>
                    
                    </tr>
                  )}
              </Table.Body> 
              </Table>
              <Form>
                  <Form.Group widths='equal'>

                      <Form.Field
                          fluid
                          label='Page'
                          id="form-subcomponent-shorthand-input-last-name"
                          ref={register}
                          control={Select}
                          name = 'poste'
                          value={page}
                          options={[
                          { key: "F", text: "Chargement", value: "Chargement" },
                          { key: "E",text: "Enregistrement", value: "Enregistrement"},
                          { key: "TB",text: "Tableau de bord", value: "Tableau de bord"}
                          ]}
                          
                          placeholder=" "
                          search
                          searchInput={{ id: "form-select-control-gender" }}
                          onChange={(e, { value }) => {
                          setPage(value);
                          console.log(e, value);
                                              }}
                          />
                          <Form.Field
                          fluid
                          label="Type d'accès"
                          id="form-subcomponent-shorthand-input-last-name"
                          ref={register}
                          control={Select}
                          value={acces}
                          options={[
                          { key: "L", text: "En lecture", value: "En lecture" },
                          { key: "E", text: "En écriture", value: " En ecriture" }
                          ]}
                          
                          placeholder=" "
                          search
                          searchInput={{ id: "form-select-control-gender" }}
                          onChange={(e, { value }) => {
                          setAcces(value);
                          console.log(e, value);
                          }} 
                          />
                      </Form.Group>
                      <Button onClick={ajoutAcces}>Add acces</Button>
                  </Form>
                </Segment>
                <Button color = "green"
                  onClick={onSubmit} 
                  className="floatBnt">
                Ajouter
                </Button>
                <Button onClick={mettreAjour} 
                  className="floatBnt">mettre à jour</Button>
          </Form>
      </Segment>
    <Header>Liste des employés</Header> 
    <Segment raised>
    <Table striped selectable>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Identifiant</Table.HeaderCell>
            <Table.HeaderCell>Prénom</Table.HeaderCell>
            <Table.HeaderCell>Nom</Table.HeaderCell>
            <Table.HeaderCell>Pseudonyme</Table.HeaderCell>
            <Table.HeaderCell>Poste</Table.HeaderCell>
            {/* <Table.HeaderCell>Mot de  passe</Table.HeaderCell> */}
            <Table.HeaderCell>Pages</Table.HeaderCell>
            <Table.HeaderCell>Types d'accès</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {data.map((e) =>
              <tr key={e.id}>
                <td>{e.id}</td>      
                <td>{e.prenom} </td>
                <td>{e.nom}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                {/* <td>{e.pwd}</td> */}
                <td>
                    {e.page_acces.map(i =>
                    <tr>
                      <p>{i.page}</p>
                    </tr>
                  )}
                </td>
                <td>
                    {e.page_acces.map(i =>
                    <tr>
                      <p>{i.acces}</p>
                    </tr>
                  )}
                </td>
                <td>
                  
                    <Button 
                        icon="pencil alternate"
                        type='button' 
                        inverted color='blue'
                        className={show ? 'showing' : 'not-showing'}
                        onClick={()=>recuperationDesDonnes(e.id)}
                    />
                    {/* <Button 
                        icon="remove"
                        type='button' 
                        floated="right"
                        inverted color='red'
                        onClick={()=>handleDelete(e.nom)}
                      /> */}
                    
                </td>
              </tr>
            )}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};

export default ListeDesEmployes;
