const router = require('express').Router();
const { createDispatchHook } = require('react-redux');
const {
	db,
	models: { Cart, Item, CartItem },
} = require('../db');

router.post('/', async (req, res, next) => {
	try {
		console.log('this is req.body', req.body);

		const items = [];
		for (let itemId in req.body) {
			const item = await Item.findByPk(Number(itemId));
			item.quantity = req.body[itemId];
			console.log('item', item);
			console.log('req.body[itemId]', req.body[itemId]);
			items.push({
				id: itemId,
				name: item.name,
				quantity: req.body[itemId],
				price: item.price,
				stock: item.stock,
				image: item.imageUrl,
			});
		}

		res.send(items);
	} catch (error) {
		next(error);
	}
});

router.put('/checkout', async (req, res, next) => {
	try {
		const guestItems = req.body;
		const totalprice = guestItems.reduce((price, item) => {
			return (price += item.price);
		}, 0);
		await Cart.create({
			status: 'Purchased',
			totalprice,
		});
		guestItems.forEach(async (item) => {
			let newStock = item.stock - item.quantity;
			await Item.update(
				{ stock: newStock },
				{
					where: {
						id: item.id,
					},
				}
			);
		});
		res.send(204);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
