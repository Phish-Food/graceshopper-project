const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false,	
		defaultValue:5,
		validate:{
			min:1,
			max:5
		}
	},
	reviewtext:{
		type: Sequelize.TEXT,
		validate:{
			len:[0,1000]
		}
	}

});

module.exports = Review;
