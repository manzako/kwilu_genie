const express = require("express");
const router = express.Router();
const db = require("../../models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/bons");
    // cb(null, "./uploads/bons");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname + ".png");
  },
});

const upload = multer({ storage: storage });

router.get("/vehicules/:id/detail_produits", (req, res) => {
  db.detail_produit
    .findAll({
      where: {
        vehiculeId: req.params.id,
      },
      include: { all: true, nested: true },
      //include: [db.vehicule, db.client, db.produit],
    })
    .then((allDetails) => {
      return res.send(allDetails);
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/detail_produits", (req, res) => {
  db.detail_produit
    .findAll({
      include: { all: true, nested: true },
      //include: [db.vehicule, db.client, db.produit],
    })
    .then((allDetails) => {
      console.log(allDetails);
      return res.send(allDetails);
    })
    .catch((err) => res.status(404).json(err));
});

router.post(
  "/vehicules/:id/detail_produits",
  upload.single("photo_bon"),
  (req, res, next) => {
    let file;
    if (req.file) {
      file = `https://appkwilu2.herokuapp.com/${req.file.path}`;
    } else {
      file = null;
    }

    db.detail_produit
      .create({
        ref_bon: req.body.ref_bon,
        photo_bon_debut: null,
        photo_bon_fin: null,
        vehiculeId: Number(req.params.id),
      })
      .then((detail) => {
        return res.status(201).json(detail);
      })
      .catch((err) => res.status(500).json(err));
  }
);

// router.put(
//   "/vehicules/:id/detail_produits/:idDetail",
//   upload.single("photo_bon_debut"),
//   (req, res, next) => {
//     let file
//     if(req.file){
//        file=`https://appkwilu2.herokuapp.com/${req.file.path}`;

//  let values = {
//       photo_bon_debut:file
//     };

//     let condition = { where: { id: Number(req.params.idDetail) } };
//     let options = { multi: true };

//     db.detail_produit
//       .update(values, condition, options)
//       .then((detail) => {
//         return res.send(detail);
//       })
//       .catch((err) => res.status(400).json(err));
//   }
//     else{
//       return res.status(400).json({message:"photo manquante"});
//     }

// })

//ajout photo debut bon de livraison nouvelle implementation

router.put(
  "/detail_produits/:idDetail/photo_bon_debut",
  upload.single("photo_bon_debut"),
  (req, res, next) => {
    let file;
    if (req.file) {
      file = `https://appkwilu2.herokuapp.com/${req.file.path}`;

      let values = {
        photo_bon_debut: file,
      };

      let condition = { where: { id: Number(req.params.idDetail) } };
      let options = { multi: true };

      db.detail_produit
        .update(values, condition, options)
        .then((detail) => {
          return res.send(detail);
        })
        .catch((err) => res.status(400).json(err));
    } else {
      return res.status(400).json({ message: "photo manquante" });
    }
  }
);

//ajout photo fin bon de livraison nouvelle implementation

router.put(
  "/detail_produits/:idDetail/photo_bon_fin",
  upload.single("photo_bon_fin"),
  (req, res, next) => {
    let file;
    if (req.file) {
      file = `https://appkwilu2.herokuapp.com/${req.file.path}`;

      let values = {
        photo_bon_fin: file,
      };

      let condition = { where: { id: Number(req.params.idDetail) } };
      let options = { multi: true };

      db.detail_produit
        .update(values, condition, options)
        .then((detail) => {
          return res.send(detail);
        })
        .catch((err) => res.status(400).json(err));
    } else {
      return res.status(400).json({ message: "photo manquante" });
    }
  }
);

router.get("/vehicules/:id/detail_produits/:idbon", (req, res) => {
  db.detail_produit
    .findAll({
      where: {
        id: req.params.idbon,
        vehiculeId: req.params.id,
      },
      include: { all: true, nested: true },
    })
    .then((unProduit) => {
      res.send(unProduit);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
