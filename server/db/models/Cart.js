const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
	status: {
		type: Sequelize.ENUM('Purchased', 'Cart'),
		allowNull: false,
        defaultValue:'Cart'
	},
    totalprice:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        get(){
            const rawValue = this.getDataValue('totalprice')
            const dollar = (rawValue/100).toFixed(2)
          
            return `${dollar}`
            
        }
    }

});

module.exports = Cart;
