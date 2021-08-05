/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyledAll_Items } from './All_Items.styled';
import { fetchAllItemsThunk } from '../../../../redux/reducers/item';
import Item_Item from '../Item_Item/Item_Item';

const All_Items = ({ items, getAllItems }) => {
	useEffect(() => {
		getAllItems();
	}, [items.length]);

	return (
		<StyledAll_Items>
			{items.map((item) => {
				return <Item_Item key={item.id} item={item} />;
			})}
		</StyledAll_Items>
	);
};
const mapStateToProps = (state) => {
	const { items } = state.item;
	return {
		items,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllItems: () => dispatch(fetchAllItemsThunk()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(All_Items);
