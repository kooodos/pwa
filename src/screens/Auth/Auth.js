import React, {Component} from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { withRouter} from 'react-router-dom'
import KooodosLogo from '../../components/Images/KooodosLogo'
import './Auth.css'

import API from '../../components/Api'

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: '',
      formLoading: false,
      emailErr: false,
      btnDisabled: true,
      msgErrStatus: false,
      desc: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    var string = event.target.value

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(string)) {
      this.setState({emailErr: false, btnDisabled: false})
      this.setState({email: string });
    } else {
      this.setState({emailErr: true, btnDisabled: true});
    }
  }

  handleSubmit(event) {

    this.setState({ formLoading: true })

    API.get("/auth/check_account_by_email/?email=" + this.state.email)
    .then (response => {
      console.log("Auth", response.data);

      this.setState({ formLoading: false })

      if (response.data.accountExists === true && response.data.isActive === true) {
        this.props.history.push({
          pathname: '/sign-in',
          state: { email: this.state.email }
        });
      } else {

        API.post("/auth/signup/?email=" + this.state.email).then (response => {

          console.log("Signup step: Create User", response.data);
          this.props.history.push({
            pathname: '/sign-up-phone',
            state: { email: this.state.email }
          });

        }).catch(error => {
            console.log("User creation error", error);
        });
      };

    })
    .catch(error => {
        console.log("login error", error);
        this.setState({ msgErrStatus: true, desc: {header: 'Error', content: 'Error desc'} })
    });

    event.preventDefault();
  }

  render() {

    return (
      <div className="screen-center">
        <KooodosLogo />
        <h1>Enter your e-mail</h1>
        <Form size='huge' key='huge' onSubmit={this.handleSubmit}>
          <Form.Field
            className={this.state.emailErr ? 'error' : ''}
            control='input'
            placeholder='Email'
            onChange={this.handleChange}
          />

        <Button disabled={this.state.btnDisabled} className={this.state.formLoading ? 'loading' : ''} type='submit'>GO</Button>
        </Form>
        {this.state.msgErrStatus ?
          <Message negative>
            {this.state.desc.content}
          </Message>
        :
          null
        }
      </div>

    )
  }
}

export default withRouter(Auth);
