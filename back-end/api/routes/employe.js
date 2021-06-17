const express = require("express");
const router = express.Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/employes", (req, res) => {
  db.employe
    .findAll({
      include: [db.commentaire, db.page_acces],
    })
    .then((allEmploye) => {
      return res.send(allEmploye);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/employes", (req, res) => {
  db.employe
    .create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      pwd: req.body.pwd,
      role: req.body.role,
    })
    .then((unEmploye) => res.status(201).json(unEmploye))
    .catch((err) => res.status(400).json(err));
});

router.get("/employes/:id", (req, res) => {
  db.employe
    .findAll({
      where: {
        id: req.params.id,
      },
      include: [db.commentaire, db.page_acces],
    })
    .then((employes) => {
      return res.send(employes);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.delete("/employes/:id", (req, res) => {
  db.employe
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((delEmploye) => {
      return res.status(200).json(delEmploye);
    });
});

router.post("/employes/login", (req, res, next) => {
  db.employe
    .findAll({ where: { email: req.body.email }, include: [db.page_acces] })
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "email non trouvé, cet employé n existe pas",
        });
      }
      bcrypt.compare(req.body.pwd, user[0].pwd, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "authentification échouée",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              employeId: user[0].id,
              nom: user[0].nom,
              prenom: user[0].prenom,
              role: user[0].role,
              page_acces: user[0].page_acces,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "authentification reussie",
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
