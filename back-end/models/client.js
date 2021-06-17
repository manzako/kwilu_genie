"use strict";
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define("client", {
    nom_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  client.associate = (models) => {
    client.hasMany(models.produit, {
      foreignKey: {
        allowNull: false,
      },
    });

    client.belongsTo(models.detail_produit, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return client;
};
