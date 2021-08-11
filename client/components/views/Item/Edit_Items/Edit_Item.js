/* eslint-disable no-unused-vars */
import React, {Component } from "react";
import { connect } from "react-redux";
import { StyledEdit_Items } from "./Edit_Items.styled";
import { fetchSingleItemThunk, editItemThunk } from "../../../../redux/reducers/item";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export class EditItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ``,
        stock: ``,
        description: "",
        price: ``,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        const itemId = this.props.match.params.itemId;
       
        this.props.getSingleItem(itemId);
       
      }
      handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
      }
      handleSubmit(evt) {
        evt.preventDefault();
        const itemId = this.props.match.params.itemId;
    
        this.props.editItem({ ...this.state }, itemId);
      }
    render(){
        const { name, stock, description, price } = this.state;
        console.log('props',this.props)
  return (
  <div> 
        <h3>Edit: {this.props.item.name}</h3>
      <form id="item-form" onSubmit={this.handleSubmit}>
        <div>
            
          <label htmlFor="name">Edit Item Name ({`${this.props.item.name}`}):</label>
          <input name="name" onChange={this.handleChange} value={name} />
        </div>
        <div>
        
          <label htmlFor="stock">Edit Stock ({`${this.props.item.stock}`}):</label>
          <input
          type="number"
            name="stock"
            onChange={this.handleChange}
            value={Number(stock)}
          />
        </div>
        <div>
          <label htmlFor="description">Edit Description:</label>
          <input
            name="description"
            onChange={this.handleChange}
            value={description}
          />
        </div>
        <div>
       
          <label htmlFor="price">Edit Price ({`${this.props.item.price}`}):</label>
          <input
            name="price"
            type="number"
            onChange={this.handleChange}
            value={Number(price)}
          />
        </div>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
      </div>
    );
    

  
  }
}
const mapStateToProps = (state) => {

  const { item } = state.item;

  return {
    item,
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    getSingleItem: (id) => dispatch(fetchSingleItemThunk(id)),
    editItem: (state,id) => dispatch(editItemThunk(state,id,history))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
