const express = require("express");
const ordersRoutes = express.Router();

let Orders = require("../models/orders");

ordersRoutes.route("/add").post(function(req, res) {
	let orders = new Orders(req.body);
	console.log(typeof req.body)
	orders
		.save()
		.then(orders => {
			res.status(200).json({ orders: "orders in added successfully" });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

ordersRoutes.route("/").get(function(req, res) {
	Orders.find(function(err, ordersItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(ordersItems);
		}
	});
});

module.exports = ordersRoutes;
