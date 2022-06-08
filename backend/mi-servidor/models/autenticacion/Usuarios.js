const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuarios', {
    idUsuario: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    roles: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'Usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
};
