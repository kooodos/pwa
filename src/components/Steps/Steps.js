import React, { Component } from 'react'
import { Divider, Label } from 'semantic-ui-react'
import './Steps.css'

export default class Steps extends Component {

  render() {

    return (
      <Divider horizontal>
        <Label.Group circular>
          <Label className="white-bg" pointing="below">Phone</Label>
          <Label>2</Label>
          <Label>3</Label>
          <Label>4</Label>
          <Label>5</Label>
        </Label.Group>
      </Divider>
    )
  }
}
