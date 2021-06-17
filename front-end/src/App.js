import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import FormulaireConnexion from "./components/FormulaireConnexion";
// import FormulaireGI from './components/pages/FormulaireGI';
import PageResponsableChargement from "./components/pages/PageResponsableChargement";
import TableauDeBord from "./components/pages/tableaud_de_bord.jsx";
import DetailsChargements from "./components/pages/DetailsChargements";
import HomePage from "./components/pages/homePage";
import SuccessAnimation from "./components/pages/SuccessAnimation";
// import FormGI from "./components/pages/FormGI";
import ListeDesEmployes from "./components/pages/sous-pages-admin/ListeDesEmployes";
import Admin from "./components/pages/Admin";
import formGI from "./components/pages/ExFormGI";
import FormGI from "./components/pages/FormGI";
import RefactorformulaireGi from "./components/pages/RefactorformulaireGi";
import EnregistrementGi from "./components/pages/EnregistrementGi";
import CamionsAuParking from "./components/pages/CamionsAuParking";
import CamionsEnChargement from "./components/pages/CamionsEnChargement";
import CamionsCharges from "./components/pages/CamionsCharges";
import SelecteurDate from "./components/pages/SelecteurDate";
import SelecteurHeure from "./components/pages/SelecteurHeure";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <FormulaireConnexion />
                </>
              )}
            />
            <Route path="/homepage" component={HomePage} />
            {/* <Route path="/formulairegi" component={FormulaireGI}/> */}
            <Route path="/Details" component={DetailsChargements} />
            <Route
              path="/PageResponsableChargement"
              component={PageResponsableChargement}
            />
            <Route path="/tableauDebord" component={TableauDeBord} />
            <Route path="/animation" component={SuccessAnimation} />
            {/* <Route path="/timedude" component={TimeDude}/> */}
            <Route path="/formGi" component={RefactorformulaireGi} />
            <Route path="/EnregistrementGi" component={EnregistrementGi} />
            <Route path="/ListeDesEmployes" component={ListeDesEmployes} />
            <Route path="/CamionsAuParking" component={CamionsAuParking} />
            <Route
              path="/CamionsEnChargement"
              component={CamionsEnChargement}
            />
            <Route path="/CamionsCharges" component={CamionsCharges} />
            {/* <Route path="/formulaires" component={formGI}/> */}
            <Route path="/form" component={FormGI} />
            <Route path="/Admin" component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
