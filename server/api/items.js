const router = require('express').Router();
const { Item, User, Review } = require('../db/models');
// const { User } = require('../db/models/User');

const requireToken = async (req, res, next) => {
	try {
		req.user = await User.findByToken(req.cookies.token);
		next();
	} catch (e) {
		next(e);
	}
};

router.get('/', async (req, res, next) => {
	try {
		const allItems = await Item.findAll({ include: Review });
		res.json(allItems);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.get('/:itemId', async (req, res, next) => {
	try {
		const id = req.params.itemId;
		const specificItem = await Item.findByPk(id);
		if (specificItem) {
			res.json(specificItem);
		} else {
			res.status(404).send('Something went wrong.');
		}
	} catch (error) {
		next(error);
	}
});

router.post('/:itemId', requireToken, async (req, res, next) => {
	try {
		let item = await Item.findByPk(req.params.itemId);

		const newInventory = item.quantity - req.body.quantity;

		const updateditem = await item.update({
			...item,
			stock: newInventory,
		});

		res.status(201).json(updateditem);
	} catch (error) {
		next(error);
	}
});
router.delete('/:itemId', requireToken, async (req, res, next) => {
	try {
		let item = await Item.findByPk(req.params.itemId);
		await item.destroy();
		res.send(item)
		
	} catch (error) {
		next(error);
	}
});
router.put('/:itemId', requireToken, async (req, res, next) => {
	try {
		
		console.log('req',req.params.itemId)

		let item = await Item.findByPk(req.params.itemId);

		res.send(await item.update(req.body))
    } catch (error) {
		next(error);
	}
});
router.post('/', async (req, res, next) => {
	try {
		const newItem = req.body;
		const createdItem = await Item.create(newItem);
		res.send(createdItem);
    } catch (error) {
		next(error);
	}
});

router.delete('/:itemId', requireToken, async (req, res, next) => {
	try {
		let item = await Item.findByPk(req.params.itemId);
		await item.destroy();
		res.send(item)
		
	} catch (error) {
		next(error);
	}
});


module.exports = router;
