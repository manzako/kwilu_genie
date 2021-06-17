"use strict";
module.exports = (sequelize, DataTypes) => {
  const page_acces = sequelize.define("page_acces", {
    acces: {
      type: DataTypes.STRING,
    },
    page: {
      type: DataTypes.STRING,
    },
  });

  page_acces.associate = (models) => {
    page_acces.belongsTo(models.employe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return page_acces;
};
