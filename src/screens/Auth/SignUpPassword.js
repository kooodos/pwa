import React, {Component} from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import KooodosLogo from '../../components/Images/KooodosLogo'
import API from '../../components/Api';

export default class SignUpPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weakClass: '',
      btnDisabled: true,
      formLoading: '',
      email: this.props.location.state.email,
      password: '',
      testLength: 'error',
      testUpper: 'error'
    }

    console.log(this.state);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let temp_password = event.target.value

    if (temp_password.length > 7) {
      this.setState({ testLength: 'success' });
    } else {
      this.setState({ testLength: 'error' });
    }

    if (temp_password !== temp_password.toLowerCase()) {
      this.setState({ testUpper: 'success' });
    } else {
      this.setState({ testUpper: 'error' });
    }

    if (temp_password.length > 7 && temp_password !== temp_password.toLowerCase()) {
      console.log("password is ok")
      this.setState({
        password: temp_password,
        weakClass: 'success',
        btnDisabled: false
      });
    } else {

      this.setState({
        password: temp_password,
        weakClass: 'error'
      });

    }
  }

  handleSubmit(event) {

    this.setState({formLoading: true });

    API.patch("/auth/signup/?email=" + this.state.email,
    {
      "passsword": this.state.password
    })
    .then (response => {

      console.log("Signup step: password", response.data);

      API.post("/auth/signin",
      {
        "email": this.state.email,
        "passsword": this.state.password
      }).then (response => {
        console.log("SignIn", response.data.sessionToken);

        localStorage.setItem('sessionToken', response.data.sessionToken);

        this.props.handleLogin();

        this.props.history.push({
          pathname: '/'
        });

      }).catch(error => {
          console.log("SignIn error", error);
      })


    })
    .catch(error => {
        console.log("login error", error);
        this.setState({ formLoading: false, loginFailed: true, desc: { header: 'Error', content: 'Error desc'} })
    });

    event.preventDefault();

  }

  render() {

    return (

      <div className="screen-center">
        <KooodosLogo />
        <h1>Your secure password</h1>
          <Form
            size='huge'
            key='huge'
            onSubmit={this.handleSubmit}
            className={this.state.formLoading ? 'loading' : ''}
            >
            <Form.Field
              type='password'
              className={this.state.weakClass}
              control='input'
              onChange={this.handleChange}
            />

          <Button
            disabled = {this.state.btnDisabled}
            type='submit'>
            GO
          </Button>
          </Form>

          <Message className={this.state.weakClass}>
            <p>We take security very seriously, please make sure your password is: </p>
            <p className={this.state.testLength}>at least 8 characters long</p>
            <p className={this.state.testUpper}>has at least one letter in uppercase</p>
          </Message>
      </div>

    )
  }
}
