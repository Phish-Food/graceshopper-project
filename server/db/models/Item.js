const { STRING, INTEGER, TEXT, FLOAT, VIRTUAL } = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: STRING,
    allowNull: false,
  },
  stock: {
    type: INTEGER,
    defaultValue: 0,
  },
  imageUrl: {
    type: STRING,
    defaultValue: "/image.jpeg",
  },
  description: TEXT,
  price: {
    type: INTEGER,
    allowNull: false,
  },
  dollars: {
    type: VIRTUAL,
    get() {
      const rawValue = this.getDataValue("price");
      const dollar = (rawValue / 100).toFixed(2);
      return `$${dollar}`;
    },
  },
});

module.exports = Item;
