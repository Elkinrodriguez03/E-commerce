const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'product_name',
    unique: true,
  },
  brand: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  price:{
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate() {
    //associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
