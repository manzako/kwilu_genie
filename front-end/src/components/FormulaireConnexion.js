import React, { Component } from "react";
import "../components/pages/css/connexion.css";
import logo from "./pages/images/compagnieSucriere.gif";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { Loader } from "semantic-ui-react";
const jwtDecode = require("jwt-decode");

class FormulaireConnexion extends Component {
  userData;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      pwd: "",
      emailError: "",
      pwdError: "",
      loader: "",
    };
  }

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let emailError = "";
    let pwdError = "";

    if (!this.state.email) {
      emailError = "Identifiant incorrect!";
    }
    if (!this.state.pwd) {
      pwdError = "Mot de passe incorrect!";
    }

    if (emailError || pwdError) {
      this.setState({ emailError, pwdError });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // const isValid = this.validate();

    this.setState({ loader: "loading" });

    const endpoint = "https://appkwilu2.herokuapp.com/employes/login";

    let user = {
      email: this.state.email,
      pwd: this.state.pwd,
    };

    axios
      .post(endpoint, user)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("authorization", token);

        const decryptedToken = jwtDecode(token);

        console.log(token);
        console.log(decryptedToken);

        const {
          email,
          employeId,
          nom,
          page_acces,
          prenom,
          pwd,
          role,
        } = decryptedToken;

        localStorage.setItem("employeId", employeId);
        localStorage.setItem("email", email);
        localStorage.setItem("poste", role);
        localStorage.setItem("nom", nom);
        localStorage.setItem("email", prenom);
        localStorage.setItem("page", page_acces[0].page);
        localStorage.setItem("acces", page_acces[0].acces);
        console.log(
          employeId,
          email,
          role,
          nom,
          prenom,
          pwd,
          page_acces[0].page,
          page_acces[0].acces
        );

        const poste = localStorage.getItem("poste");
        console.log(poste);
        const page = localStorage.getItem("page");
        console.log(page);
        const acces = localStorage.getItem("acces");
        console.log(acces);
        return this.props.history.push("/Homepage");
      })
      .catch((err) => {
        alert("Authentification echoué");
        this.setState({ loader: "", email: "", pwd: "" });
      });
  };

  render() {
    const { loader } = this.state;
    return (
      <div>
        <div className="connexions">
          <div className="form-containers">
            <img src={logo} alt="logo Kwilu" />

            <form className="ui large form" onSubmit={this.handleSubmit}>
              <div className="ui stacked secondary">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Identifiant"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ color: "red" }}>{this.state.emailError}</div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="pwd"
                      placeholder="Mot de passe"
                      minLength="5"
                      maxLength="20"
                      value={this.state.pwd}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ color: "red" }}>{this.state.pwdError}</div>
                </div>

                <button
                  className={`ui fluid ${loader} large green submit button`}
                  onClick={this.handleSubmit}
                >
                  se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FormulaireConnexion);
