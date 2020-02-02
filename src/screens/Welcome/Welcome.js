import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'
import Auth from '../Auth'
import SliderWelcome from '../../components/SliderWelcome'
import './Welcome.css'

export default class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: localStorage.getItem('sessionToken'),
      welcome: true
    }

    this.toggleWelcome = this.toggleWelcome.bind(this);
  }

  toggleWelcome() {
    this.setState({ welcome: false })
    console.log("toggle")
  }

  render() {

    return (
      <div>
        { this.state.welcome ?
          <div>
            <img src="/images/logo/kooodos.png" className="logo" alt="logo" />
            <SliderWelcome />
            <Button fluid size="huge" onClick={ this.toggleWelcome }>ENTER</Button>
          </div>
          :
          <Auth />
        }
      </div>
    )
  }
}
