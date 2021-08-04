/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Item_Item from '../Item/Item_Item/Item_Item';
import { StyledHome } from './Home.styled';

const Home = ({ auth }) => {
	return (
		<StyledHome>
			<header>
				<h1>
					{auth.firstName} {auth.lastName}
				</h1>
			</header>
			<section>
				<div>
					<h2>Cart:</h2>
					{auth.cart.items.map((item) => (
						<Item_Item key={item.id} item={item} />
					))}
				</div>
			</section>
		</StyledHome>
	);
};
export default connect(null, null)(Home);
