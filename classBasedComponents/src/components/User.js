import { Component } from 'react';
import classes from './User.module.css';


class User extends Component{

  componentWillUnmount() {
    console.log('unmounting')
  }

  render () { // render method is necessary; what React calls
    return <li className={classes.user}>{this.props.name}</li>;
  }
};


// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;