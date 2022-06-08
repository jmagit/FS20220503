const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RolesPorUsuario', {
    idUsuario: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuarios',
        key: 'idUsuario'
      }
    },
    idRol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Roles',
        key: 'idRol'
      }
    }
  }, {
    sequelize,
    tableName: 'RolesPorUsuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
          { name: "idRol" },
        ]
      },
      {
        name: "FK_RolesPorUsuario_Roles",
        using: "BTREE",
        fields: [
          { name: "idRol" },
        ]
      },
    ]
  });
};
