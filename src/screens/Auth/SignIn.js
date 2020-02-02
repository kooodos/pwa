import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import { Button, Form, Message } from 'semantic-ui-react'
import API from '../../components/Api';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginFailed: false,
      formLoading: false,
      userToken: null,
      desc: {
        header: '',
        content: ''
      },
      email: this.props.location.state.email,
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({password: event.target.value });
  }

  handleSubmit(event) {

    this.setState({formLoading: true });

    API.post("/auth/signin",
    {
      "email": this.state.email,
      "passsword": this.state.password
    })
    .then (response => {

      this.setState({ userToken: response.data.sessionToken })

      console.log("logging in...", this.state.userToken);

      localStorage.setItem('sessionToken', this.state.userToken);

      this.props.handleLogin();

      this.props.history.push({
        pathname: '/',
        state: {
          userToken: this.state.userToken
        }
      });

    })
    .catch(error => {
        console.log("login error", error);
        this.setState({ formLoading: false, loginFailed: true, desc: { header: 'Error', content: 'Error desc'} })
    });


  }

  render() {

    return (

        <div>
          <h1>Welcome back!</h1>
            <Form
              size='huge'
              key='huge'
              onSubmit={this.handleSubmit}
              >
              <Form.Field
                type='password'
                control='input'
                onChange={this.handleChange}
              />
            <Button type='submit' className={this.state.formLoading ? 'loading' : ''}>GO</Button>
            </Form>
            {this.state.loginFailed ?
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

export default withRouter(SignIn)
