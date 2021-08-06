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
router.put('/checkout', requireToken, async (req,res,next)=>{
    try{

        const user = req.user
        const lastCart = user.carts.length-1
        const userCartId = user.carts[lastCart].dataValues.id
        const userCart = await Cart.findByPk(userCartId)

        
        res.send(await userCart.update(req.body))
    }
    catch(e){
        next(e)
    }
})

router.get('/:userId/', requireToken, (req,res,next)=>{
    try{
        
        const user = req.user
        const lastCart = user.carts.length-1
        res.send(user.carts[lastCart].items)
    }
    catch(e){
    next(e)
    }
})



router.post('/:userId/',requireToken, async(req,res,next)=>{
    try{
        const userId = req.user.dataValues.id
      
        const user = await User.findByPk(userId)

        const newCart = await Cart.create()
      
        user.addCart(newCart)
        res.status(201).send(newCart)

    }
    catch(e){
        next(e)
    }
})

module.exports = router;