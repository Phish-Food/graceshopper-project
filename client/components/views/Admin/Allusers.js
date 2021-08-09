import React from 'react';
import { connect } from 'react-redux';
import {allUsers} from '../store/auth'
import {NavLink} from 'react-router-dom';


class allUsersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: []
        }


  componentDidMount() {
    this.props.dispatch(allUsers());
  }
    render() {
        const Users = this.props.users
        return (
            <div>
              <h2>All Users</h2>
              {Users.map(user => {
                return (
                  <div key={user.id}>
                    <div>
                      <h3>
                        <NavLink to={`/users/${user.id}`}>
                          {user.firstName} {user.lastName}
                        </NavLink>
                      </h3>
                      <h3>{user.address}</h3>
                      <h3>{user.email}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
          )
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
