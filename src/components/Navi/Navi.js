import React, { Component } from 'react'
import Hamburger from './Hamburger'
import './Navi.css'

export default class Navi extends Component {

  render() {

    return (
      <div>
        <div className={'gradient-header'}>
          <div>
            <Hamburger logoutSession={this.props.logoutSession} />
          </div>
          <div className={'gradient-header-title'}>
            kooodos
          </div>
        </div>
      </div>
    )
  }

}
