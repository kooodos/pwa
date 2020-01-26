import React, { Component } from 'react'
import { Button, Dimmer, Header, Icon } from 'semantic-ui-react'

export default class Dimmers extends Component {

  state = { active: true }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  render() {
    const { active } = this.state

    return (
      <div>
        <Dimmer active={active} onClickOutside={this.handleClose} page>
          <Header as='h2' icon inverted>
            <Icon name={this.props.dimmers.icon.shape} color={this.props.dimmers.icon.color} />
            {this.props.dimmers.header}
            <Header.Subheader style={{ padding: 10 }}>{this.props.dimmers.text}</Header.Subheader>
          </Header>
          <Button compact size="small" onClick={this.handleClose}>CLOSE</Button>
        </Dimmer>
      </div>
    )
  }
}
