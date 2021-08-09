"use strict";

const {
  db,
  models: { User, Cart, Item, Review, CartItem },
} = require("../server/db");
const {
  uniqueNamesGenerator,
  names,
  starWars,
  countries,
  adjectives,
  colors,
} = require("unique-names-generator");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const myDB = {
    users: (() =>
      [...Array(10).keys()].map((_) => {
        const firstName = uniqueNamesGenerator({
          dictionaries: [names],
        });
        const lastName = uniqueNamesGenerator({
          dictionaries: [names],
        });
        return {
          firstName,
          lastName,
          username: `${firstName}${lastName}@gmail.com`,
          password: "12345678",
          role: "Customer",
        };
      }))(),
    carts: (() =>
      [...Array(1).keys()].map((_) => {
        return {};
      }))(),
    items: (() =>
      [...Array(10).keys()].map((_, i) => {
        return {
          name: uniqueNamesGenerator({
            dictionaries: [starWars],
          }),
          stock: 10,
          price: 1099,
          description: `My ${uniqueNamesGenerator({
            dictionaries: [adjectives],
          })} description`,
        };
      }))(),
    reviews: (() =>
      [...Array(10).keys()].map((_) => {
        return {
          rating: Math.floor(Math.random() * 5 + 1),
          reviewtext: `this item is ${uniqueNamesGenerator({
            dictionaries: [adjectives],
          })}`,
        };
      }))(),
  };
  const { users, carts, items, reviews } = myDB;

  const allUsers = await User.bulkCreate(users, {
    returning: true,
  });
  //const allCarts = await Cart.bulkCreate(carts, { returning: true });
  const allItems = await Item.bulkCreate(items, {
    returning: true,
  });

  const allReviews = await Review.bulkCreate(reviews, {
    returning: true,
  });

  const [item1] = allItems;
  //const [user1] = allUsers;
  //const [cart1] = allCarts;
  const quantity = 2;

  // allUsers.forEach(async (user)=>{
  //   console.log('user',user)
  //   const randomreview = allReviews[Math.floor((Math.random()*allReviews.length-1)+1)]
  //   console.log('random',randomreview)
  //   await user.addReview(randomreview)
  // })

  allReviews.forEach(async (review) => {
    const randomUser =
      allUsers[Math.floor(Math.random() * (allUsers.length - 1) + 1)];

    await review.setUser(randomUser);
  });

  // allItems.forEach(async (item)=>{

  //   const randomreview = allReviews[Math.floor((Math.random()*(allReviews.length))-1)]

  //   await item.addReview(randomreview)
  // })

  await item1.addReviews(allReviews);
  // await CartItem.create({
  //   cartId: cart1.id,
  //   itemId: item1.id,
  //   price: item1.price,
  //   quantity,
  // });

  // await cart1.setUser(user1);
  // await user1.addCart(cart1);
  // await cart1.addItems(allItems);

  // console.log("cart", cart1.dollars);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
