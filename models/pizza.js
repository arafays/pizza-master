const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Pizza
let Pizza = new Schema(
	{
		name: {
			type: String
		},
		description: {
			type: String
		},
		url: {
			type: String
		},
		price: {
			type: Number
		}
	},
	{
		versionKey: false,
		collection: "menu"
	}
);

let Crust = new Schema(
	{
		name: {
			type: String
		},
		price: {
			type: Number,
			default: 0
		}
	},
	{
		versionKey: false,
		collection: "crust"
	}
);

let Topping = new Schema(
	{
		name: {
			type: String
		},
		price: {
			type: Number,
			default: 0
		}
	},
	{
		versionKey: false,
		collection: "topping"
	}
);

let Size = new Schema(
	{
		size: {
			type: String
		},
		price: {
			type: Number,
			default: 0
		}
	},
	{
		versionKey: false,
		collection: "size"
	}
);

module.exports = {
	Pizza: mongoose.model("Pizza", Pizza),
	Crust: mongoose.model("Crust", Crust),
	Topping: mongoose.model("Topping", Topping),
	Size: mongoose.model("Size", Size)
};
