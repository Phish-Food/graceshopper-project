const router = require('express').Router();
const {Item} = require('../db/models/item');

router.get('/', async (req, res, next) => {
 try{
   const allItems = await Item.findAll({
     attributes: ['id', 'name', 'stock', 'description', 'price']
   });
   res.json(allItems)
 } catch (err){
   next(err)
 }
})

router.get('/:itemId', async (req, res, next) => {
 try{
  const id = req.params.itemId
  const specificItem = await Item.findByPk(id)
  if (specificItem) {
    res.json(specificItem)
  } else {
    res.status(404).send('Something went wrong.')
  }
} catch (error) {
  next(error)
}
})

router.post('/:productId', async (req, res, next) => {
  try {
    let item = await Item.findByPk(req.params.itemId)

    const newInventory = item.quantity - req.body.quantity

    const updateditem = await item.update({
      ...item,
      stock: newInventory
    })

    res.status(201).json(updateditem)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
