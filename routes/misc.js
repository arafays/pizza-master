
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

toppingRoutes.route("/update/:id").post(function(req, res) {
	Topping.findById(req.params.id, function(err, Topping) {
		if (!Topping) res.status(404).send("data is not found");
		else {
			Topping.name = req.body.name;
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