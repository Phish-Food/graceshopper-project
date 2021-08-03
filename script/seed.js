"use strict";

const {
  db,
  models: { User, Cart, Item },
} = require("../server/db");
const {
  uniqueNamesGenerator,
  names,
  adjectives,
  colors,
} = require("unique-names-generator");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const myDB = {
    users: (() =>
      [...Array(1).keys()].map((_) => {
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
      [...Array(6).keys()].map((_, i) => {
        return {
          name: uniqueNamesGenerator({
            dictionaries: [names],
          }),
          stock: 10,
          price: 10.99,
          description: `My ${uniqueNamesGenerator({
            dictionaries: [adjectives],
          })} description`,
        };
      }))(),
  };
  const { users, carts, items } = myDB;

  const allUsers = await User.bulkCreate(users, {
    returning: true,
  });
  const allCarts = await Cart.bulkCreate(carts, { returning: true });
  const allItems = await Item.bulkCreate(items, {
    returning: true,
  });

  const [user1] = allUsers;
  const [cart1] = allCarts;

  await user1.setCart(cart1);
  await cart1.addItems(allItems);

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
