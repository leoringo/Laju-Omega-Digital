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
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Judul tidak boleh kosong" },
        notEmpty: { msg: "Judul tidak boleh kosong" }
      }
    },
    totalViews: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Article',
    hooks: {
      beforeCreate: (instance) => {
        instance.slug = instance.judul.toLowerCase().split(' ').join('-')
        instance.tanggalPublikasi = instance.createdAt
        instance.totalViews = 0
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