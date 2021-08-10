const router = require("express").Router();
const {
  models: { User, Cart, Item },
} = require("../db");
module.exports = router;

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
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "firstName", "lastName"],
      include: [
        {
          model: Cart,
          include: [Item],
        },
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});


router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {
      id:req.params.userId,
      attributes: ["id", "username", "firstName", "lastName"],
      include: [
        {
          model: Cart,
          include: [Item],
        },
      ],
    }});
    res.json(user);
  } catch (err) {
    next(err);
  }
});
