import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Axios from "axios";

export default class OrderList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: []
		};
		this.getOrders = this.getOrders.bind(this);
	}
	componentDidMount() {
		this.getOrders();
	}
	getOrders() {
		Axios.get("/orders/").then(res => {
			let newOrder = [];
			res.data.map(e => {
				return e.order.map(r => {
					return newOrder.push(r);
				});
			});
			this.setState({ orders: newOrder });
		});
	}
	render() {
		let { orders } = this.state;
		const columns = [
			{ dataField: "_id", text: "ID", hidden: true },
			{ dataField: "name", text: "Flavor", sort: true },
			{ dataField: "size", text: "size", sort: true },
			{ dataField: "crust", text: "crust", sort: true },
			{
				dataField: "toppings",
				text: "toppings",
				formatter: (cell, row) => cell.join(",")
			},
			{ dataField: "price", text: "Price", sort: true }
		];
		return (
			<div className="container">
				<BootstrapTable keyField="_id" data={orders} columns={columns} />
			</div>
		);
	}
}
