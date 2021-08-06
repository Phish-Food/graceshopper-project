const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  status: {
    type: Sequelize.ENUM("Purchased", "Cart"),
    allowNull: false,
    defaultValue: "Cart",
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  dollars: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawValue = this.getDataValue("price");
      const dollar = (rawValue / 100).toFixed(2);
      return `$${dollar}`;
    },
  },
});

module.exports = Cart;
