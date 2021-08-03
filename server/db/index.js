//this is the access point for all things database related!

const db = require("./db");

const { User, Cart, Item } = require("./models");

User.belongsTo(Cart);
// Cart.belongsTo(User);
const cartThroughTable = { through: "cart-item" };
Cart.belongsToMany(Item, cartThroughTable);
Item.belongsToMany(Cart, cartThroughTable);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Item,
  },
};
