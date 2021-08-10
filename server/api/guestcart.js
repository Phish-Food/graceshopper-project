const router = require('express').Router();
const {
	db,
	models: { Cart, Item, CartItem },
} = require('../db');

router.post('/:itemId', async (req, res, next) => {
	try {
		const { quantity } = req.query;
		const { itemId } = req.params;

		const item = await Item.findByPk(itemId);
		const cart = carts.find((cart) => cart.status === 'Cart');
		await CartItem.create({
			cartId: cart.id,
			itemId: item.id,
			price: item.price,
			quantity,
		});

		// await cart.setUser(user.id);
		// await user.addCart(cart.id);

		res.send(await Cart.findByPk(cart.id, { include: Item }));
	} catch (e) {
		next(e);
	}
});

router.put('/guestcheckout', async (req, res, next) => {
	try {
		const lastCart = user.carts.find((cart) => cart.status === 'Cart');
		const userCart = await Cart.findByPk(lastCart.id);

		await userCart.update(req.body);
		const newCart = await Cart.create();

		// await newCart.setUser(user);
		// await user.addCart(newCart);

		res.send(204);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
