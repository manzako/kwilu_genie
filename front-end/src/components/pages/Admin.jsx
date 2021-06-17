import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Spring } from "react-spring/renderprops";
import { Icon, Grid, Header, Segment, Form, Table, Button, Input, Container } from "semantic-ui-react";
import IndicateurDeChargement from "./IndicateurDeChargement";
import HeaderExampleFloating from "./header";
import ListeDuPersonnelActif from "./sous-pages-admin/ListeDuPersonnelActif";
import ListeDesEmployes from "../pages/sous-pages-admin/ListeDesEmployes"


const Admin = () => {

  const Body = styled.div`
  margin-top : 200px;
  margin-bottom :300px;
  `;
    return (
        <>
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => {
          return (
            <div style={props}>
              <HeaderExampleFloating />
            </div>
          );
        }}
    </Spring>
    <Body>
    <Container>
      <Header>Personnel actif</Header>
      <Segment raised>
        <ListeDuPersonnelActif />
      </Segment>
      <ListeDesEmployes/>
      </Container>
      </Body>
 </>

  );
}
 
export default Admin;