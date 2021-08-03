const { STRING, INTEGER, TEXT, FLOAT, ARRAY } = require("sequelize");
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
    type: FLOAT,
    allowNull: false,
  },
});

module.exports = Item;
