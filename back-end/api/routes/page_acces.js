const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/employes/:idEmploye/page_acces", (req, res) => {
  db.page_acces
    .findAll({
      where: {
        employeId: req.params.idEmploye,
      },
    })
    .then((page) => {
      return res.send(page);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/employes/:idEmploye/page_acces", (req, res) => {
  db.page_acces
    .create({
      acces: req.body.acces,
      page: req.body.page,
    })
    .then((page_created) => res.status(201).json(page_created))
    .catch((err) => res.status(400).json(err));
});

router.put("/employes/:idEmploye/page_acces/:id", (req, res) => {
  const values = {
    acces: req.body.acces,
    page: req.body.page,
  };

  let condition = { where: { id: req.params.id } };
  let options = { multi: true };
  db.page_acces
    .update(values, condition, options)
    .then((pageUp) => {
      return res.send(pageUp);
    })
    .catch((err) => res.status(400).json(err));
});
router.delete("/page_acces/:id", (req, res) => {
  db.page_acces
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((delPage) => {
      return res.status(200).json(delPage);
    });
});

module.exports = router;
