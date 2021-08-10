const fs = require("fs");
const theItems = [];
fs.readFile("data.json", (err, data) => {
  if (err) throw err;
  let items = JSON.parse(data);
  for (let item in items) {
    theItems.push(items[item]);
  }
});
module.exports = theItems;
