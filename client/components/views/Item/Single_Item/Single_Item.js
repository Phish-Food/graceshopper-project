/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleItemThunk } from '../../../../redux/reducers/item';
import { StyledSingle_Item } from './Single_Item.styled';
import Image from '../../../utils/ImageComponent/Image';

import { addToCartThunk } from '../../../../redux/reducers/shop';

const Single_Item = ({ match, getItem, item, cart, addToCart }) => {
	useEffect(() => {
		const { itemId } = match.params;
		if (!item.name || item.id !== Number(itemId)) {
			getItem(itemId);
		} else {
			// setFormData({ name: item.name });
		}
	}, [item]);

	return (
		<StyledSingle_Item>
			<header>
				<h2>{item.name}</h2>
			</header>
			<section>
				<Image url={item.imageUrl} size={{ width: '300px', height: '300px' }} />
				<div>
					<h4>Price: ${item.price}</h4>
					<h4>Available Stock: {item.stock}</h4>
					<button onClick={() => addToCart(item.id)}>Add To Cart</button>
					<label>Quantity: </label>
					<input type="number" min="0" max={item.stock}></input>

					<p>Description: {item.description}</p>
				</div>
			</section>
		</StyledSingle_Item>
	);
};

const mapStateToProps = (state) => {
	const { item } = state.item;
	const { cart } = state.shop;

	return {
		item,
		cart,
	};
};

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		getItem: (id) => dispatch(fetchSingleItemThunk(id)),
		addToCart: (id) => dispatch(addToCartThunk(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Single_Item);
