import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = ({ firstName, cart }) => {
	// console.log('items => ', items);
	return (
		<div>
			<h3>Welcome, {firstName}</h3>
			<ul>
				{cart.items.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	const { firstName, cart } = state.auth;
	return {
		// username: state.auth.username,
		firstName,
		cart,
	};
};

export default connect(mapState)(Home);
