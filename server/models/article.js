'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, { foreignKey: "penulis" })
    }
  }
  Article.init({
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Judul tidak boleh kosong" },
        notEmpty: { msg: "Judul tidak boleh kosong" }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Slug tidak boleh kosong" },
        notEmpty: { msg: "Slug tidak boleh kosong" }
      }
    },
    penulis: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Penulis tidak boleh kosong" },
        notEmpty: { msg: "Penulis tidak boleh kosong" }
      }
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Konten tidak boleh kosong" },
        notEmpty: { msg: "Konten tidak boleh kosong" }
      }
    },
    tanggalPublikasi: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Tanggal tidak boleh kosong" },
        notEmpty: { msg: "Tanggal tidak boleh kosong" }
      }
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Judul tidak boleh kosong" },
        notEmpty: { msg: "Judul tidak boleh kosong" }
      }
    },
  }, {
    sequelize,
    modelName: 'Article',
    hooks: {
      beforeCreate: (instance) => {
        instance.slug = instance.judul.toLowerCase().split(' ').join('-')
        instance.tanggalPublikasi = instance.createdAt
      },
      beforeBulkUpdate: (instance) => {
        instance.attributes.slug = instance.attributes.judul
          .toLowerCase()
          .split(" ")
          .join("-");
        instance.fields.push("slug");
      }
    }
  });
  return Article;
};