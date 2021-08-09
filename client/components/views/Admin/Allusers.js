import React from 'react';
import { connect } from 'react-redux';
import {allUsers} from '../store/auth'
import {NavLink} from 'react-router-dom';


class allUsersView extends React.Component {

  componentDidMount() {
    this.props.dispatch(allUsers());
  }
    render() {
        return (
            <div>
                <h3>All Users</h3>
                <ul>
                    {this.props.allUsers.map((user, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={`/admin/users/${user.id}`}>{user.username}</NavLink>
                            </li>
                        )
                    })}
                </ul>
                    <NavLink to="/admin/users/add">Add User</NavLink>
                    {this.props.allUsers.map((user) => {
                        return <li key={user.id}>{user.username}</li>
                    })}

              <NavLink to = "/user/${user.id}">{user.username}</NavLink>
                removeUser(user) {
                  this.props.dispatch(removeUser(user));
                  this.props.allUsers();
                }
            </div>
        );
}
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.auth.allUsers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      allUsers: () => dispatch(allUsers())
    };
};

export default connect()(allUsersView);
