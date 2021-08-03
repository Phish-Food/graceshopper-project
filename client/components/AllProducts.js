import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllProductsThunk } from '../store/allProducts';

export class AllProducts extends Component {
	componentDidMount() {
		this.props.loadAllProducts();
	}
	render() {
		const { items } = this.props;
		return (
			<div>
				<ul>
					{items.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapState = ({ items }) => {
	return { items };
};

const mapDispatch = (dispatch, { history }) => {
	return {
		loadAllProducts: () => dispatch(fetchAllProductsThunk()),
	};
};

export default connect(mapState, mapDispatch)(AllProducts);
