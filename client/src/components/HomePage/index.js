import React from "react";
import Axios from "axios";
import { store as notifications } from "react-notifications-component";
import OrderPizzaModal from "../OrderPizzaModal";

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: [],
			crusts: [],
			toppings: [],
			sizes: [],
			order: [],
			modalShow: false,
			selectedItem: {}
		};
		this.removeOrderItem = this.removeOrderItem.bind(this);
		this.openModalWithItem = this.openModalWithItem.bind(this);
		this.addOrderItem = this.addOrderItem.bind(this);
		this.orderNowAction = this.orderNowAction.bind(this);
	}

	componentDidMount() {
		this.getMenu();
	}

	addOrderItem(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		var orderItem = {};
		data.forEach((value, key) => {
			if (!Reflect.has(orderItem, key)) {
				orderItem[key] = value;

				return;
			}
			if (!Array.isArray(orderItem[key])) {
				orderItem[key] = [orderItem[key]];
			}
			orderItem[key].push(value);
		});
		if (!orderItem.size) {
			notifications.addNotification({
				message: "Please select Size",
				type: "danger",
				insert: "top",
				container: "top-center",
				dismiss: {
					duration: 5000
				}
			});
			return;
		}
		if (!orderItem.crust) {
			notifications.addNotification({
				message: "Please select crust",
				type: "danger",
				insert: "top",
				container: "top-center",
				dismiss: {
					duration: 5000
				}
			});
			return;
		}
		if (!orderItem.toppings) {
			orderItem.toppings = ["-"];
		}

		if (typeof orderItem.toppings.valueOf() === "string") {
			orderItem.toppings = orderItem.toppings.split();
		}

		if (typeof orderItem.price.valueOf() === "string") {
			orderItem.price = parseFloat(orderItem.price);
		}
		console.log(orderItem)

		let size = this.state.sizes.find(c => c._id === orderItem.size);
		orderItem.size = size.size;
		orderItem.price = orderItem.price + size.price;

		let crust = this.state.crusts.find(c => c._id === orderItem.crust);
		orderItem.crust = crust.name;
		orderItem.price = orderItem.price + crust.price;

		let toppingArray = [];
		orderItem.toppings.forEach((item, index) => {
			this.state.toppings.find(c =>
				c._id === item ? toppingArray.push(c) : null
			);
		});
		let toppingNames = [];
		toppingArray.forEach(item => {
			toppingNames.push(item.name);
			orderItem.price = orderItem.price + item.price;
		});
		orderItem.toppings = toppingNames;

		console.log(orderItem)

		this.setState(state => {
			const order = this.state.order.push(orderItem);
			return order;
		});
		this.setState({ modalShow: false });
	}
	orderNowAction() {
		if (this.state.order.length) {
			Axios.post("/orders/add", { order: this.state.order })
				.then(res => {
					notifications.addNotification({
						message: "Order Placed",
						type: "success",
						insert: "top",
						container: "bottom-right",
						dismiss: {
							duration: 2000
						}
					});
					this.setState({ order: [] });
				})
				.catch(err => {
					notifications.addNotification({
						message: err,
						type: "danger",
						insert: "top",
						container: "bottom-right",
						dismiss: {
							duration: 2000
						}
					});
				});
		}
	}
	openModalWithItem(item) {
		this.setState({
			modalShow: true,
			selectedItem: item
		});
	}
	removeOrderItem(itemIndex) {
		let newOder = this.state.order.splice(itemIndex, 1);
		notifications.addNotification({
			message: "Item removed from order",
			type: "danger",
			insert: "top",
			container: "bottom-right",
			dismiss: {
				duration: 2000
			}
		});
		this.setState({ order: newOder });
		this.setState({ order: this.state.order });
	}
	getMenu() {
		Axios.get("/menu/")
			.then(res => {
				this.setState({
					menu: res.data
				});
			})
			.catch(err => console.log(err));

		Axios.get("/crusts/")
			.then(res => {
				this.setState({
					crusts: res.data
				});
			})
			.catch(err => console.log(err));
		Axios.get("/topping/")
			.then(res => {
				this.setState({
					toppings: res.data
				});
			})
			.catch(err => console.log(err));
		Axios.get("/size/")
			.then(res => {
				this.setState({
					sizes: res.data
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		let {
			menu,
			order,
			modalShow,
			selectedItem,
			toppings,
			sizes,
			crusts
		} = this.state;
		return (
			<div className="container-fluid full-height d-flex flex-column">
				<div className="row h-100">
					<div className="col-md-8">
						<div className="row">
							{menu.map(s => (
								<div
									key={s._id}
									className="col-12 col-md-6 col-lg-3 col-xl-4 mt-4 p-2"
								>
									<div
										className="pizza-item"
										style={{ backgroundImage: "url(" + s.url + ")" }}
									>
										<div className="pizza-flavor py-3">{s.name}</div>

										<button
											href="#"
											className="btn btn-success mt-auto"
											onClick={() => {
												this.openModalWithItem(s);
											}}
										>
											Add to Order
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="col-md-4 pr-0">
						<div className="d-flex flex-column order-area h-100">
							<ul className="list-group">
								{order.map((s, index) => (
									<li
										key={index}
										className="list-group-item d-flex justify-content-between align-items-center"
									>
										<ul className="list-unstyled">
											<li>
												<h6 className="mb-0">{s.name}</h6>
											</li>
											<li>
												<small>Size: {s.size}</small>
											</li>
											<li>
												<small>Crust: {s.crust}</small>
											</li>
											<li>
												<small>Toppings: {s.toppings.join(",")}</small>
											</li>
											<li>
												<small>Price: {s.price}$</small>
											</li>
										</ul>
										<button
											className="btn btn-danger btn-sm"
											onClick={this.removeOrderItem}
										>
											x
										</button>
									</li>
								))}
							</ul>
							<button
								onClick={this.orderNowAction}
								className="btn btn-primary mt-auto"
							>
								ORDER NOW
							</button>
						</div>
					</div>
				</div>
				<OrderPizzaModal
					show={modalShow}
					sizes={sizes}
					crusts={crusts}
					toppings={toppings}
					onSubmit={this.addOrderItem}
					onHide={() => {
						this.setState({ modalShow: false });
					}}
					selecteditem={selectedItem}
				></OrderPizzaModal>
			</div>
		);
	}
}
