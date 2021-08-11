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
const fs = require("fs");
// const theItems = require("./test");
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  const theItems = [];
  await fs.readFile(__dirname + "/data.json", (err, data) => {
    if (err) throw err;
    let items = JSON.parse(data);
    for (let item in items) {
      theItems.push(items[item]);
      console.log(items[item]);
    }
  });
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
  };
  const { users } = myDB;

  const allUsers = await User.bulkCreate(users, {
    returning: true,
  });

  const allItems = await Item.bulkCreate(theItems, {
    returning: true,
  });

  const adminUser = await User.create({
    firstName: "Ray",
    lastName: "Tam",
    username: `RayTam@gmail.com`,
    password: "123",
    role: "Admin",
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  console.log(theItems);
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
