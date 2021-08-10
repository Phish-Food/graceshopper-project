import React = from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../../../../redux/reducers/singlecart';
import { fetchUserInfo } from '../../../../redux/reducers/userinfo';

class Single_User_Info extends React.Component<{
    userInfo: any,
    cart: any,
    fetchCart: Function,
    fetchUserInfo: Function
}, {}

return() {
<div>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">User Information</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" class="form-control" value={this.props.userInfo.firstName} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" class="form-control" value={this.props.userInfo.lastName} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" value={this.props.userInfo.email} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="text" class="form-control" value={this.props.userInfo.phoneNumber} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" class="form-control" value={this.props.userInfo.address} disabled/>
                            </div>
                            <div class="form-group">
                                <label>City</label>
                                <input type="text" class="form-control" value={this.props.userInfo.city} disabled/>
                            </div>
                            <div class="form-group">
                                <label>State</label>
                                <input type="text" class="form-control" value={this.props.userInfo.state} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Zip Code</label>
                                <input type="text" class="form-control" value={this.props.userInfo.zipCode} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Country</label>
                                <input type="text" class="form-control" value={this.props.userInfo.country} disabled/>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>User Type</label>
                                <input type="text" class="form-control" value={this.props.userInfo.userType} disabled/>
                            </div>
                            <div class="form-group">
                                <label>User Status</label>
                                <input type="text" class="form-control" value={this.props.userInfo.userStatus} disabled/>
                            </div>
                            <div class="form-group">
                                <label>User Role</label>
                                <input type="text" class="form-control" value={this.props.userInfo.userRole} disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Cart Information</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Cart Total</label>
                                <input type="text" class="form-control" value={this.props.cart.total} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Cart Items</label>
                                <input type="text" class="form-control" value={this.props.cart.items} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Cart Items Quantity</label>
                                <input type="text" class="form-control" value={this.props.cart.itemsQuantity} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Cart Items Price</label>
                                <input type="text" class="form-control" value={this.props.cart.itemsPrice} disabled/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Cart Items Total</label>
                                <input type="text" class="form-control" value={this.props.cart.itemsTotal} disabled/>
                            </div>
                            <div class="form-group">
                                <label>Cart Items Total Price</label>
                                <input type="text" class="form-control" value={this.props.cart.itemsTotalPrice} disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}
export interface UserInfoProps {
    userInfo: any;
    cart: any;
    fetchUserInfo: Function;
    fetchCart: Function;
