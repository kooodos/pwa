import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import KooodosLogo from '../../components/Images/KooodosLogo'
import API from '../../components/Api';

export default class SignUpName extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weakClass: '',
      btnDisabled: true,
      formLoading: false,
      email: this.props.location.state.email,
      user_name: ''
    }

    console.log(this.state)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.value.length > 3) {
      this.setState({
        user_name: event.target.value,
        btnDisabled: false
      });
    } else {
      this.setState({
        btnDisabled: true
      });
    }
  }

  handleSubmit(event) {

    this.setState({formLoading: true });

    API.patch("/auth/signup/?email=" + this.state.email,
    {
      "name": this.state.user_name
    })
    .then (response => {

      console.log("Signup step: name", response.data);

      this.props.history.push({
        pathname: '/sign-up-password',
        state: {
          email: this.state.email
        }
      });
    })
    .catch(error => {
        console.log("login error", error);
        this.setState({ formLoading: false, desc: { header: 'Error', content: 'Error desc'} })
    });

    event.preventDefault();

  }

  render() {

    return (

      <div className="screen-center">
        <KooodosLogo />
        <h1>Your name</h1>
          <Form
            size='huge'
            key='huge'
            onSubmit={this.handleSubmit}
            >
            <Form.Field
              type='text'
              control='input'
              onChange={this.handleChange}
            />

          <Button
            disabled = {this.state.btnDisabled}
            className={this.state.formLoading ? 'loading' : ''} 
            type='submit'>
            GO
          </Button>
          </Form>

      </div>

    )
  }
}
