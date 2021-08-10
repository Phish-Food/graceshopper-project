import React from 'react';
import { connect } from 'react-redux';
import {fetchAllUsers} from '../../../redux/reducers/user.js'
import {NavLink} from 'react-router-dom';

export class allUsersView extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  

  render() {   
        console.log('props',this.props)
        const Users = this.props.allUsers
        return (  
            <div>
     
              <h2>All Users</h2>
              {Users.map((user,index) => {
                return (
                  <div key={user.id}>
                    <div>
                      <h3>  
                        {index+1}.{" "} 
                        <NavLink to={`/users/${user.id}`}>
                          {user.firstName} {user.lastName}
                        </NavLink>
                      </h3>
                      <h3>Email: {user.username}</h3>
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
        allUsers: state.adminUser.userlist
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getAllUsers: () => dispatch(fetchAllUsers())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(allUsersView);
