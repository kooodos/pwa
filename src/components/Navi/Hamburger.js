import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { slide as Menu } from 'react-burger-menu'
import { Icon, List } from 'semantic-ui-react'
import './Hamburger.css';

class Hamburger extends Component {

  render () {

    return (
          <Menu slide customBurgerIcon={ <Icon name='bars' size='large' /> }>
            <List verticalAlign='middle'>
              <List.Item>
                <List.Content>
                  <a href="/my_kooodos" className={'btnStyle'}><Icon name='angle right' /> My kooodos</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <a href="#top" className={'btnStyle'}><Icon name='angle right' /> Settings</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <a href="#top" className={'btnStyle'}><Icon name='angle right' /> Contact Us</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <a href="#top" className={'btnStyle'} onClick={()=>this.props.logoutSession()}><Icon name='angle right' /> Logout</a>
                </List.Content>
              </List.Item>
            </List>
          </Menu>
    );
  }
}

export default withRouter(Hamburger)
