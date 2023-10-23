'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article, { foreignKey: "penulis" })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: { msg: "Email telah terdaftar!" },
      allowNull: false,
      validate: {
        notNull: { msg: "Email tidak boleh kosong!" },
        notEmpty: { msg: "Email tidak boleh kosong!" },
        isEmail: { msg: "Format email anda salah" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password tidak boleh kosong!" },
        notEmpty: { msg: "Password tidak boleh kosong!" },
        len: {
          args: [4, 20],
          msg: "Panjang password minimal 4 kata dan tidak boleh lebih dari 20 kata!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        let hash = bcrypt.hashSync(instance.password, 5)
        instance.password = hash
      }
    }
  });
  return User;
};