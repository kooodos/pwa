import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import './Splash.css'

export default class Splash extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({ loading: false });
    }.bind(this), 3500)
  }

  render() {

    return (
      <div id="custom-overlay">
        <div className="flb">
          <Container>
            <Grid className="p-m-small">
              <Grid.Row className="p-m-small">
                <img src="/images/logo/kooodos_white.png" className="img-splash" alt="logo" />
              </Grid.Row>
              <Grid.Row centered className="p-m-small">
                <span className="mission">spread positive emotions.</span>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </div>
    )
  }
}
