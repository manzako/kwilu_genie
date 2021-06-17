"use strict";
module.exports = (sequelize, DataTypes) => {
  const detail_produit = sequelize.define("detail_produit", {
    ref_bon: {
      type: DataTypes.STRING,
    },
    photo_bon_debut: {
      type: DataTypes.STRING,
    },
    photo_bon_fin: {
      type: DataTypes.STRING,
    },
  });

  detail_produit.associate = (models) => {
    
    detail_produit.belongsTo(models.vehicule, {
      foreignKey: {
        allowNull: false,
      },
    });

    detail_produit.hasMany(models.client, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return detail_produit;
};
