const express = require("express");
const router = express.Router();
const db = require("../../models");

let recherche = (requete) => {
  return new Promise(async (resolve, reject) => {
    const unEmploye = await db.employe.findAll({
      where: {
        id: Number(requete),
      },
    });

    if (unEmploye.length >= 0) {
      resolve(unEmploye);
    } else {
      reject({
        message: "vehicule n'existe pas",
      });
    }
  });
};

router.get("/commentaires", (req, res) => {
  db.commentaire
    .findAll()
    .then((allComment) => {
      return res.send(allComment);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/employes/:id/commentaires", (req, res) => {
  recherche(Number(req.params.id)).then((employe) => {
    const employeId = Number(employe[0]["dataValues"].id);
    db.commentaire
      .create({
        contenu: req.body.contenu,
        employeId: employeId,
        date: new Date(),
      })
      .then((comment) => {
        return res.status(201).json(comment);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
});

router.get("/employes/:id/commentaires", (req, res) => {
  db.commentaire
    .findAll({
      where: {
        employeId: req.params.id,
      },
    })
    .then((comments) => {
      return res.send(comments);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});
//implementation de la route pour ajouter un commentaire à un vehicule

router.post(
  "/employes/:idUser/vehicules/:idVeh/commentaires",
  async (req, res) => {
    await db.vehicule
      .findOne({
        where: {
          id: req.params.idVeh,
        },
      })
      .then((unVehicule) => {
        unVehicule.setEmployes(req.params.idUser);
      })
      .catch((err) => {
        return res.status(400).json({ err });
      });

    await db.commentaire
      .create({
        contenu: req.body.contenu,
        employeId: Number(req.params.idUser),
        date: new Date(),
      })
      .then((back) => {
        return res.status(201).json(back);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
);

router.get("/employes/:idUser/vehicules/:idVeh/commentaires", (req, res) => {
  db.vehicule
    .findOne({
      where: {
        id: req.params.idVeh,
      },
      include: { all: true, nested: true }
    })
    .then((unVehicule) => {
     return res.status(200).json(unVehicule);
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
});

router.get("/vehicules/:idVeh/commentaires", (req, res) => {
  db.vehicule
    .findOne({
      where: {
        id: req.params.idVeh,
      },
      include: { all: true, nested: true }
    })
    .then((unVehicule) => {
     return res.status(200).json(unVehicule);
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
});


router.delete("/employes/:id/commentaires/:commentId", (req, res) => {
  db.commentaire
    .destroy({
      where: {
        id: req.params.commentId,
      },
    })
    .then((delComment) => {
      return res.status(200).json(delComment);
    });
});

module.exports = router;
