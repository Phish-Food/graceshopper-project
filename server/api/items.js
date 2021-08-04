const router = require("express").Router();
const { Item } = require("../db/models/item");
const { User } = require("../db/models/User");

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies.token);
    next();
  } catch (e) {
    next(e);
  }
};

router.get("/", requireToken, async (req, res, next) => {
  try {
    const allItems = await Item.findAll({
      attributes: ["id", "name", "stock", "description", "price"],
    });
    res.json(allItems);
  } catch (err) {
    next(err);
  }
});

router.get("/:itemId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const specificItem = await Item.findByPk(id);
    if (specificItem) {
      res.json(specificItem);
    } else {
      res.status(404).send("Something went wrong.");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:itemId", requireToken, async (req, res, next) => {
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

module.exports = router;
