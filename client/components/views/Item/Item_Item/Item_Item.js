/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { StyledItem_Item } from './Item_Item.styled';
import { Link } from 'react-router-dom';

const Item_Item = ({ item }) => {
	return (
		<StyledItem_Item>
			<img src={item.imageUrl} />
			<ul>
				<li>
					<Link to={`/items/${item.id}`}>{item.name}</Link>
				</li>
				<li>{item.price}</li>
				<li>{item.description}</li>
			</ul>
		</StyledItem_Item>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Item_Item);
