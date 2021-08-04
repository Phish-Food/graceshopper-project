/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleItemThunk } from '../../../../redux/reducers/item';
import { StyledSingle_Item } from './Single_Item.styled';
import Image from '../../../utils/ImageComponent/Image';

const Single_Item = ({ match, getItem, item }) => {
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
			</section>
		</StyledSingle_Item>
	);
};

const mapStateToProps = (state) => {
	const { item } = state.item;
	return {
		item,
	};
};

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		getItem: (id) => dispatch(fetchSingleItemThunk(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Single_Item);
