import React, {Component, Fragment} from 'react'
import { Image, Placeholder } from 'semantic-ui-react'

export default class KooodosLogo extends Component {

  state = { imageStatus: false }

  handleImageLoaded() {
    this.setState({ imageStatus: true });
  }

  render() {
    const { imageStatus } = this.state

    return (
      <Fragment>
        {imageStatus ? null : (
          <Placeholder>
            <Placeholder.Image rectangular />
          </Placeholder>
        )}
        <Image
          style={this.state.imageStatus ? {} : {display: 'none'}}
          src='/images/logo/kooodos.png'
          //size='huge' wrapped
          onLoad={this.handleImageLoaded.bind(this)}
        />
      </Fragment>
    )
  }
}
