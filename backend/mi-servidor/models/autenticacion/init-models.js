var DataTypes = require("sequelize").DataTypes;
var _Roles = require("./Roles");
var _RolesPorUsuario = require("./RolesPorUsuario");
var _Usuarios = require("./Usuarios");

function initModels(sequelize) {
  var Roles = _Roles(sequelize, DataTypes);
  var RolesPorUsuario = _RolesPorUsuario(sequelize, DataTypes);
  var Usuarios = _Usuarios(sequelize, DataTypes);

  Roles.belongsToMany(Usuarios, { as: 'idUsuario_Usuarios', through: RolesPorUsuario, foreignKey: "idRol", otherKey: "idUsuario" });
  Usuarios.belongsToMany(Roles, { as: 'idRol_Roles', through: RolesPorUsuario, foreignKey: "idUsuario", otherKey: "idRol" });
  RolesPorUsuario.belongsTo(Roles, { as: "idRol_Role", foreignKey: "idRol"});
  Roles.hasMany(RolesPorUsuario, { as: "RolesPorUsuarios", foreignKey: "idRol"});
  RolesPorUsuario.belongsTo(Usuarios, { as: "idUsuario_Usuario", foreignKey: "idUsuario"});
  Usuarios.hasMany(RolesPorUsuario, { as: "RolesPorUsuarios", foreignKey: "idUsuario"});

  return {
    Roles,
    RolesPorUsuario,
    Usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
