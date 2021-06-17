"use strict";
module.exports = (sequelize, DataTypes) => {
  const produit = sequelize.define("produit", {
    type_produit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantite: {
      type: DataTypes.INTEGER,
    },
  });

  produit.associate = (models) => {
    produit.belongsTo(models.client, {
      onDelete: "cascade",
    });
  };

  return produit;
};
