import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import Navi from '../../components/Navi'
import Welcome from '../Welcome'
import About from '../About'
import Contact from '../Contact'
import Faq from '../Faq'
import SignIn from '../Auth/SignIn'
import SignUpPhone from '../Auth/SignUpPhone'
import SignUpOtp from '../Auth/SignUpOtp'
import SignUpPassword from '../Auth/SignUpPassword'
import Shop from '../Shop'
import Checkout from '../Checkout'
import MyKooodos from '../MyKooodos'
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.logoutSession=this.logoutSession.bind(this);
    this.handleLogin=this.handleLogin.bind(this);

    this.state = {
      userToken: localStorage.getItem("sessionToken")
    }
  }

  logoutSession() {
    localStorage.removeItem('sessionToken');
    this.setState({ userToken: null })
    console.log("sign-out", localStorage.getItem("sessionToken"));
  }

  handleLogin() {
    this.setState({ userToken: localStorage.getItem("sessionToken") })
    console.log("handleLogin", this.state.userToken)

  }


  render() {

    const userToken = this.state.userToken;

    console.log("Token on loading the main component...", userToken)

    return (
        <Router>
          <div className="App">
            { userToken ? <Navi logoutSession={this.logoutSession} /> : null }
            <Container>
              <Switch>
                { userToken ?
                  <Route path="/" exact component={Shop} /> :
                  <Route path="/" exact component={Welcome} />
                }
                <Route path="/about-us" component={About} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/faq" exact component={Faq} />
                <Route path="/sign-in" render={ props => <SignIn {...props} handleLogin={this.handleLogin} /> } />
                <Route path="/sign-up-phone" component={SignUpPhone} />
                <Route path="/sign-up-otp" component={SignUpOtp} />
                <Route path="/sign-up-password" render={ props => <SignUpPassword {...props} handleLogin={this.handleLogin} /> } />

                { userToken ? <Route path="/checkout" component={Checkout} /> : <Redirect to='/' /> }
                { userToken ? <Route path="/my_kooodos" component={MyKooodos} /> : <Redirect to='/' /> }
              </Switch>
            </Container>
          </div>
        </Router>
    );
  }
}

export default App;
