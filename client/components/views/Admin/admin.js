import { render } from 'enzyme';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchAllUsers} from '../store.user'

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: []
        }
    }
    this.renderUserstate = this.renderUserstate.bind(this);

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    renderUserstate() {
      this.setState({
        current: this.props.users
      }
      );
    }
    render() {
        return (
            <div>
                <h1>Admin</h1>
                <button onClick={this.props.fetchAllUsers}>Refresh</button>
                <ul>
                  {this.state.current.map((user, index) => {
                    return (
                      <li key={index}>
                        <NavLink to={`/admin/user/${user.id}`}>{user.name}</NavLink>
                      </li>
                    )
                  }
      }
}
