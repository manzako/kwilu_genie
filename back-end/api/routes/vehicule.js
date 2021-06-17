const express = require("express");
const router = express.Router();
const db = require("../../models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/vehicules");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// let recherche = (requete) => {
//   return new Promise(async (resolve, reject) => {
//     const unEmploye = await db.employe.findAll({
//       where: {
//         id: Number(requete),
//       },
//     });

//     if (unEmploye) {
//       resolve(unEmploye);
//     }
//   });
// };

router.get("/vehicules", (req, res) => {
  db.vehicule
    .findAll({
      include: [db.employe, db.etat],
    })
    .then((allVehicule) => {
      return res.send(allVehicule);
    })
    .catch((err) => res.status(404).json(err));
});

router.post(
  "/employes/:id/vehicules",
  upload.single("photo_vehicule"),
  (req, res, next) => {
    let file;
    if (req.file) {
      file = `https://appkwilu2.herokuapp.com/${req.file.path}`;
    } else {
      file = null;
    }
    // let employe=null;
    //  recherche(req.params.id).then((oneEmploye)=>{
    //    employe=oneEmploye[0]["dataValues"];
    db.vehicule
      .create({
        numero_plaque: req.body.numero_plaque,
        transporteur: req.body.transporteur,
        photo_vehicule: file,
        marque: req.body.marque,
        heure_parking: new Date(),
        etatId: Number(req.query.etatId),
      })
      .then((vehicule1) => {
        // console.log(employe);
        // console.log(vehicule1);

        vehicule1.setEmployes(req.params.id);
        return res.status(201).json(vehicule1);
      })
      .catch((err) => res.status(500).json(err));
  }
);

router.get("/vehicules/:vehiculeId", (req, res) => {
  db.vehicule
    .findAll({
      where: {
        id: req.params.vehiculeId,
      },
      include: { all: true, nested: true },
      // include: [db.employe, db.etat],
    })
    .then((unVehicle) => {
      res.send(unVehicle);
    })
    .catch((err) => res.status(404).json(err));
});

router.put("/employes/:id/vehicules/:vehiculeId", (req, res) => {
  let { etatId } = req.query;
  etatId = Number(etatId);
  let values = null;

  if (etatId === 2) {
    values = {
      heure_chargement: req.body.heure_chargement,
      etatId: etatId,
    };
  }
  if (etatId === 3) {
    values = {
      heure_charge: req.body.heure_charge,
      etatId: etatId,
    };
  }

  let condition = { where: { id: req.params.vehiculeId } };
  let options = { multi: true };
  db.vehicule
    .update(values, condition, options)
    .then((vehiculeUp) => {
      return res.send(vehiculeUp);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
