import React, {Component} from 'react'
import { Card, Icon, Image, Divider, Header, Label, Button, Dimmer } from 'semantic-ui-react'
import './MyKooodos.css'

export default class MyKooodosShareConfirmation extends Component {


  state = { active: true }

  handleOpen = () => this.setState({ active: true })
  handleClose() {
    this.setState({ active: false });
  }

  render() {

    const { active } = this.state

    return (
          <div>
            <Dimmer active={active} onClickOutside={this.handleClose} page>
              <Divider horizontal>
                <Header as='h4'>
                  <Label color="grey" pointing="below">
                    <Icon name={ this.props.details.product.category.icon }></Icon>
                    { this.props.details.product.title }
                  </Label>
                </Header>
              </Divider>

              <Card>
                <Image src={ this.props.details.share.image } wrapped ui={false} />
                <Card.Content className="dark_color">
                    {this.props.share.msg_text}
                </Card.Content>

                <Card.Content extra>
                      <Label className="mr-1">Share with:</Label> 
                      { this.props.share.email }
                </Card.Content>

                <Card.Content extra>
                  <Button.Group>
                    <Button onClick={() => this.props.showShareConfirmation(false)} color='grey' className="mr-1">LET ME EDIT</Button>
                    <Button onClick={() => this.props.handleShareSubmit(this.props.details.id, this.props.share)} color='pink'>SHARE NOW</Button>
                  </Button.Group>
              </Card.Content>
              </Card>
            </Dimmer>
          </div>
    )
  }
}
