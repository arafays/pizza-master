const express = require("express");
const menuRoutes = express.Router();
const crustRoutes = express.Router();
const sizeRoutes = express.Router();
const toppingRoutes = express.Router();

let Pizza = require("../models/pizza");

let Menu = Pizza.Pizza;
let Crust = Pizza.Crust;
let Size = Pizza.Size;
let Topping = Pizza.Topping;

menuRoutes.route("/add").post(function(req, res) {
	let menu = new Menu(req.body);
	menu
		.save()
		.then(menu => {
			res.status(200).json({ menu: "New Pizza added successfully" });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

menuRoutes.route("/update/:id").post(function(req, res) {
	Menu.findById(req.params.id, function(err, Menu) {
		if (!Menu) res.status(404).send("data is not found");
		else {
			Menu.name = req.body.name;
			Menu.description = req.body.description;
			Menu.url = req.body.url;
			Menu.price = req.body.price;
			Menu.save()
				.then(Menu => {
					res.json("Update complete");
				})
				.catch(err => {
					res.status(400).send("unable to update the database");
				});
		}
	});
});

menuRoutes.route("/delete/:id").get(function(req, res) {
	Menu.findByIdAndRemove({ _id: req.params.id }, function(err, menu) {
		if (err) res.json(err);
		else res.json("Successfully removed");
	});
});

crustRoutes.route("/add").post(function(req, res) {
	let crust = new Crust(req.body);
	console.log(req.body);
	crust
		.save()
		.then(crust => {
			res.status(200).json({ crust: "New Crust added successfully" });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

crustRoutes.route("/").get(function(req, res) {
	Crust.find(function(err, crustItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(crustItems);
		}
	});
});

crustRoutes.route("/update/:id").post(function(req, res) {
	Crust.findById(req.params.id, function(err, Crust) {
		if (!Crust) res.status(404).send("data is not found");
		else {
			Crust.name = req.body.name;
			Crust.price = req.body.price;
			Crust.save()
				.then(Crust => {
					res.json("Update complete");
				})
				.catch(err => {
					res.status(400).send("unable to update the database");
				});
		}
	});
});

crustRoutes.route("/delete/:id").get(function(req, res) {
	Crust.findByIdAndRemove({ _id: req.params.id }, function(err, crust) {
		if (err) res.json(err);
		else res.json("Successfully removed");
	});
});

sizeRoutes.route("/add").post(function(req, res) {
	let size = new Size(req.body);
	size
		.save()
		.then(size => {
			res.status(200).json({ size: "New Size added successfully" });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

sizeRoutes.route("/").get(function(req, res) {
	Size.find(function(err, sizeItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(sizeItems);
		}
	});
});

sizeRoutes.route("/update/:id").post(function(req, res) {
	Size.findById(req.params.id, function(err, Size) {
		if (!Size) res.status(404).send("data is not found");
		else {
			Size.size = req.body.size;
			Size.price = req.body.price;
			Size.save()
				.then(Size => {
					res.json("Update complete");
				})
				.catch(err => {
					res.status(400).send("unable to update the database");
				});
		}
	});
});

sizeRoutes.route("/delete/:id").get(function(req, res) {
	Size.findByIdAndRemove({ _id: req.params.id }, function(err, size) {
		if (err) res.json(err);
		else res.json("Successfully removed");
	});
});

toppingRoutes.route("/add").post(function(req, res) {
	let topping = new Topping(req.body);
	topping
		.save()
		.then(topping => {
			res.status(200).json({ topping: "New Topping added successfully" });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

toppingRoutes.route("/").get(function(req, res) {
	Topping.find(function(err, toppingItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(toppingItems);
		}
	});
});

menuRoutes.route("/").get(function(req, res) {
	Menu.find(function(err, menuItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(menuItems);
		}
	});
});
toppingRoutes.route("/update/:id").post(function(req, res) {
	Topping.findById(req.params.id, function(err, Topping) {
		if (!Topping) res.status(404).send("data is not found");
		else {
			Topping.name = req.body.name;
			Topping.price = req.body.price;
			Topping.save()
				.then(Topping => {
					res.json("Update complete");
				})
				.catch(err => {
					res.status(400).send("unable to update the database");
				});
		}
	});
});

toppingRoutes.route("/delete/:id").get(function(req, res) {
	Topping.findByIdAndRemove({ _id: req.params.id }, function(err, topping) {
		if (err) res.json(err);
		else res.json("Successfully removed");
	});
});

module.exports = {
	menuRoutes,
	crustRoutes,
	sizeRoutes,
	toppingRoutes
};
