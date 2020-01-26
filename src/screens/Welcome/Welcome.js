import React, {Component} from 'react'
import Auth from '../Auth'


export default class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: localStorage.getItem('sessionToken')
    }
  }

  render() {

    return (
      <div>
        <Auth />
      </div>
    )
  }
}
