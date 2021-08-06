//this is the access point for all things database related!

const db = require("./db");

const { User, Cart, Item, Review, CartItem } = require("./models");

// Cart.belongsTo(User)
// User.hasMany(Cart)
const UserCartThroughTable = { through: "user-cart" };
User.belongsToMany(Cart, UserCartThroughTable);
User.hasMany(Review);
Review.belongsTo(User);
Item.hasMany(Review);
Review.belongsTo(Item);
// User.belongsTo(Cart);
// Cart.belongsTo(User);
const cartThroughTable = { through: CartItem };
Cart.belongsToMany(Item, cartThroughTable);
Item.belongsToMany(Cart, cartThroughTable);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Item,
    Review,
    CartItem,
  },
};
