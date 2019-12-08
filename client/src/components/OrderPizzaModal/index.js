import React, { Component } from "react";
import BModal from "react-bootstrap/Modal";

export default class OrderPizzaModal extends Component {
	render() {
		return (
			<React.Fragment>
				<BModal size="lg" show={this.props.show} {...this.props}>
					<form onSubmit={() => {}}>
						<div className="card">
							<input
								type="text"
								name="name"
								className="sr-only"
								onChange={() => {}}
								value={this.props.selecteditem.name}
							/>
							<input
								type="text"
								name="price"
								className="sr-only"
								onChange={() => {}}
								value={this.props.selecteditem.price}
							/>
							<input
								type="text"
								name="description"
								className="sr-only"
								onChange={() => {}}
								value={this.props.selecteditem.description}
							/>

							<div className="row no-gutters">
								<div className="col-md-4">
									<img
										src={this.props.selecteditem.url}
										className="card-img"
										alt="..."
									/>
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h5 className="card-title">
											{this.props.selecteditem.name}
										</h5>
										<p className="card-text">
											{this.props.selecteditem.description}
										</p>
										<p className="card-text">
											<small className="text-muted">
												Price: {this.props.selecteditem.price}$
											</small>
										</p>
										<h5>Select Size</h5>
										<div className="form-group">
											{this.props.sizes.map(s => (
												<div
													key={s._id}
													className="custom-control custom-radio custom-control-inline"
												>
													<input
														type="radio"
														id={s._id}
														name="size"
														value={s._id}
														className="custom-control-input"
													/>
													<label
														className="custom-control-label"
														htmlFor={s._id}
													>
														{s.size} <small>{s.price}$</small>
													</label>
												</div>
											))}
										</div>
										<h5>Select Crusts</h5>
										<div className="form-group">
											{this.props.crusts.map(s => (
												<div
													key={s._id}
													className="custom-control custom-radio custom-control-inline"
												>
													<input
														type="radio"
														id={s._id}
														name="crust"
														value={s._id}
														className="custom-control-input"
													/>
													<label
														className="custom-control-label"
														htmlFor={s._id}
													>
														{s.name} <small>{s.price}$</small>
													</label>
												</div>
											))}
										</div>
										<h5>Select Additional Topping</h5>
										<div className="form-group">
												<React.Fragment>
													{this.props.toppings.map(s => (
														<div
															key={s._id}
															className="custom-control custom-checkbox custom-control-inline"
														>
															<input
																type="checkbox"
																id={s._id}
																name="toppings"
																value={s._id}
																className="custom-control-input"
															/>
															<label
																className="custom-control-label"
																htmlFor={s._id}
															>
																{s.name} <small>{s.price}$</small>
															</label>
														</div>
													))}
												</React.Fragment>
										</div>
										<button
											type="submit"
											onSubmit={this.props.onSubmit}
											className="btn btn-outline-secondary btn-sm"
										>
											Add to Order
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</BModal>
			</React.Fragment>
		);
	}
}
