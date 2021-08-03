import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username } = props;
	// const items = props.items;
	// console.log('items => ', items);
	return (
		<div>
			<h3>Welcome, {username}</h3>
			{/* <ul>
				{items.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul> */}
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		username: state.auth.username,
		// items: state.items,
	};
};

export default connect(mapState)(Home);
