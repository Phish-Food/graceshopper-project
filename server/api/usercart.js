const router = require("express").Router();
const {
  db,
  models: { User, Cart, Item, Review, CartItem },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies.token);
    next();
  } catch (e) {
    next(e);
  }
};

router.put("/checkout", requireToken, async (req, res, next) => {
  try {
    const user = req.user;

    const lastCart = user.carts.find((cart) => cart.status === "Cart");
    const userCart = await Cart.findByPk(lastCart.id, { include: Item });
    userCart.items.forEach(async (item) => {
      let newStock = item.stock - item["cart-item"].quantity;
      if (newStock < 0) {
        throw Error;
      } else {
        await Item.update(
          { stock: item.stock - item["cart-item"].quantity },
          { where: { id: item.id } }
        );
      }
    });
    await userCart.update(req.body);
    const newCart = await Cart.create();

    await newCart.setUser(user);
    await user.addCart(newCart);

    res.send(204);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/", requireToken, (req, res, next) => {
  try {
    const user = req.user;
    const lastCart = user.carts.find((cart) => cart.status === "Cart");

    res.send(lastCart.items);
  } catch (e) {
    next(e);
  }
});

router.post("/:itemId", requireToken, async (req, res, next) => {
  try {
    const { quantity } = req.query;
    const { itemId } = req.params;
    const user = req.user;
    const item = await Item.findByPk(itemId);
    let cart = user.carts.find((cart) => cart.status === "Cart");
    if (!cart) {
      cart = await Cart.create({});
      await cart.setUser(user);
      await user.addCart(cart);
    }
    await CartItem.create({
      cartId: cart.id,
      itemId: item.id,
      price: item.price,
      quantity,
    });

    await cart.setUser(user.id);
    await user.addCart(cart.id);

    res.send(await Cart.findByPk(cart.id, { include: Item }));
  } catch (e) {
    next(e);
  }
});

router.put("/update/:itemId", requireToken, async (req, res, next) => {
  try {
    const { quantity } = req.query;
    const { itemId } = req.params;
    const user = req.user;
    const item = await Item.findByPk(itemId);
    const cart = user.carts.find((cart) => cart.status === "Cart");
    await CartItem.update(
      { quantity },
      { where: { cartId: cart.id, itemId: item.id } }
    );
    res.send(await Cart.findByPk(cart.id, { include: Item }));
  } catch (e) {
    next(e);
  }
});

router.delete("/:itemId", requireToken, async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const user = req.user;
    const item = await Item.findByPk(itemId);
    const cart = user.carts.find((cart) => cart.status === "Cart");
    await CartItem.destroy({ where: { cartId: cart.id, itemId: item.id } });

    res.send(await Cart.findByPk(cart.id, { include: Item }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
