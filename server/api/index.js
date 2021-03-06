const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/usercart', require('./usercart'));
router.use('/guestcart', require('./guestcart'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
