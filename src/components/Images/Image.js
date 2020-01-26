import React, {Component} from 'react'

class ImageWithLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: "loading" };
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
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
export default ImageWithLoading;
