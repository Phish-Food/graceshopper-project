import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Styled_AddItem } from './AddItem.styled';
import { addItemThunk } from '../../../../redux/reducers/item';

export const AddItem = ({ addItem }) => {
	const [form, setForm] = useState({
		name: '',
		price: 0,
		description: '',
		stock: 0,
	});

	const { name, price, description, stock } = form;
	const handleChange = ({ target }) => {
		console.log('this form from handleChange', form);
		setForm({ ...form, [target.id]: target.value });
	};

	const handleSubmit = () => {
		addItem(form);
	};

	return (
		<Styled_AddItem>
			<div>
				<form>
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={handleChange}
					></input>
					<label htmlFor="price">Price: </label>
					<input
						type="number"
						id="price"
						value={price}
						onChange={handleChange}
					></input>
					<label htmlFor="description">Description: </label>
					<input
						type="text"
						id="description"
						value={description}
						onChange={handleChange}
					></input>
					<label htmlFor="stock">Stock: </label>
					<input
						type="number"
						id="stock"
						value={stock}
						onChange={handleChange}
					></input>
				</form>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</Styled_AddItem>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (form) => dispatch(addItemThunk(form)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
