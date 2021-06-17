const express = require("express");
const router = express.Router();
const db = require("../../models");
const multer = require("multer");
const { Op } = require("sequelize");
const cors = require("cors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

function createClient(detail, client) {
  return new Promise((successCallback, failureCallback) => {
    try {
      db.client
        .create({
          nom_client: client.nomClient,
          detailProduitId: Number(detail["dataValues"].id),
        })
        .then((result) => {
          successCallback(result);
        });
    } catch (err) {
      failureCallback(err);
    }
  });
}

function rechercheEmploye(reqId) {
  return new Promise((successCallback, failureCallback) => {
    db.employe
      .findAll({
        where: {
          id: reqId,
        },
      })
      .then((result) => {
        if (result.length >= 0) {
          successCallback(result[0]);
        } else {
          failureCallback("Not found");
        }
      });
  });
}

function createVehicule(car, req, file) {
  return new Promise((successCallback, failureCallback) => {
    try {
      db.vehicule
        .create({
          numero_plaque: car.plaque,
          transporteur: car.chauffeur,
          photo_vehicule: file,
          marque: car.marque,
          societe: car.societe,
          heure_parking: new Date(),
          etatId: 1,
        })
        .then((result) => {
          //result.setEmployes(employe["dataValues"].id)
          result.setEmployes(req.params.id);
          successCallback(result);
        });
    } catch (err) {
      failureCallback(err);
    }
  });
}

function createDetail(unVehicule, client) {
  return new Promise((successCallback, failureCallback) => {
    try {
      db.detail_produit
        .create({
          ref_bon: client.BL,
          photo_bon_debut: null,
          photo_bon_fin: null,
          vehiculeId: Number(unVehicule["dataValues"].id),
          // clientId: Number(unClient["dataValues"].id),
        })
        .then((result) => {
          successCallback(result);
        });
    } catch (err) {
      failureCallback(err);
    }
  });
}

function createProduit(client, produit) {
  return new Promise((successCallback, failureCallback) => {
    try {
      db.produit
        .create({
          type_produit: produit.type,
          quantite: Number(produit.qt),
          clientId: Number(client["dataValues"].id),
        })
        .then((result) => {
          successCallback(result);
        });
    } catch (err) {
      failureCallback(err);
    }
  });
}

router.get("/enregistrements", (req, res) => {
  db.vehicule
    .findAll({
      include: { all: true, nested: true },
      // include: [db.employe, db.etat],
    })
    .then((allVehicule) => {
      return res.send(allVehicule);
    })
    .catch((err) => res.status(404).json(err));
});

router.get("enregistrements/:id", (req, res) => {
  db.vehicule
    .findAll({
      where: {
        id: req.params.id,
      },
      include: { all: true, nested: true },
      // include: [db.employe, db.etat],
    })
    .then((unVehicle) => {
      res.send(unVehicle);
    })
    .catch((err) => res.status(404).json(err));
});

router.put("/enregistrements/:id", (req, res) => {
  let values = {
    heure_chargement: new Date(),
    heure_charge: new Date(),
    etatId: req.body.etatId,
  };
  let condition = { where: { id: req.params.id } };
  let options = { multi: true };

  db.vehicule
    .update(values, condition, options)
    .then((vehiculeUp) => {
      res.send(vehiculeUp);
    })
    .catch((err) => res.status(400).json(err));
});

router.post(
  "/employes/:id/enregistrements",
  cors(),
  upload.single("photo_vehicule"),
  async (req, res) => {
    let data = JSON.parse(req.body.enregistrement);
    let employeId = Number(req.params.id);
    let file;
    if (req.file) {
      file = `https://appkwilu2.herokuapp.com/${req.file.path}`;
    } else {
      file = null;
    }
    for (let car of data) {
      const unVehicle = await createVehicule(car, req, file);
      for (let client of car.client) {
        const detail = await createDetail(unVehicle, client);
        const unClient = await createClient(detail, client);
        for (let produit of client.produit) {
          const back = await createProduit(unClient, produit);
        }
      }
    }
    return res.status(201).json("un enregistrement créé avec succès");
  }
);

router.get("/employes/:id/enregistrements", (req, res) => {
  db.employe
    .findAll({
      where: {
        id: req.params.id,
      },

      include: { all: true, nested: true },
    })
    .then((unVehicle) => {
      res.send(unVehicle);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
