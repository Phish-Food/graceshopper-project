const router = require('express').Router();
const { Cart, User, Item, CartItem } = require('../db/models');


const requireToken = async (req, res, next) => {
	try {
		req.user = await User.findByToken(req.cookies.token);
		next();
	} catch (e) {
		next(e);
	}
};//api/usercart/:userId
router.get('/:userId/', requireToken, (req,res,next)=>{
    try{
        console.log(req.params.userId)
        const user = req.user
        console.log('user',user)
        const lastCart = user.carts.length-1
        res.send(user.carts[lastCart].items)
    }
    catch(e){
    next(e)
    }
})

module.exports = router;