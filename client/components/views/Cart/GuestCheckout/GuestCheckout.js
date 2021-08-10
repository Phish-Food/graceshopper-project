import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StyledCheckout from './GuestCheckout.styled';

class GuestCheckout extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			address: '',
			paymentMethod: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();

		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			address: '',
			paymentMethod: '',
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		return (
			<StyledCheckout>
				<section>
					<div>Order Summary</div>
					<header id="form-section">
						<form onSubmit={this.handleSubmit}>
							<label htmlFor="firstName">FirstName:</label>
							<input
								type="text"
								name="firstName"
								value={this.state.firstName}
								onChange={this.handleChange}
							/>
							<label htmlFor="lastName">LastName:</label>
							<input
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={this.handleChange}
							/>
							<label htmlFor="email">Email:</label>
							<input
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<label htmlFor="address">Address:</label>
							<input
								type="text"
								name="address"
								value={this.state.address}
								onChange={this.handleChange}
							/>
							<label htmlFor="paymentMethod">Payment Method:</label>
							<input
								type="text"
								name="paymentMethod"
								value={this.state.paymentMethod}
								onChange={this.handleChange}
							/>
							<button type="submit">Place Order</button>
							<Link to="/">
								<button type="submit">Cancel</button>
							</Link>
						</form>
					</header>
				</section>
			</StyledCheckout>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(GuestCheckout);

export default GuestCheckout;
