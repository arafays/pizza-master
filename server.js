const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const menuRoute = require('./routes/menu');
const ordersRoutes = require('./routes/orders');

const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const db = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/pizza-app"
).then(
  ()=>console.log("Database connected"),
  err=>console.log("Cannot connect to Database" + err)
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/menu', menuRoute.menuRoutes);
app.use('/crusts', menuRoute.crustRoutes);
app.use('/size', menuRoute.sizeRoutes);
app.use('/topping', menuRoute.toppingRoutes);
app.use('/orders', ordersRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 3001;
app.listen(PORT);

