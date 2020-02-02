import React, {Component} from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import API from '../../components/Api';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

export default class SignUpPhone extends Component {


  constructor(props) {
    super(props);
    console.log(this.props.location.state.email)
    this.state = {
      phoneFailed: false,
      formLoading: false,
      desc: {
        header: '',
        content: ''
      },
      email: this.props.location.state.email,
      phone: '+971'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    let isValid = isValidPhoneNumber(this.state.phone)
    console.log('phone valid: ', isValid);

    if (isValid === true) {

      this.setState({formLoading: true });

      API.patch("/auth/signup/?email=" + this.state.email,
      {
        "phone": this.state.phone
      })
      .then (response => {

        console.log("Signup step: Phone", response.data);

        this.props.history.push({
          pathname: '/sign-up-phone-verification',
          state: {
            email: this.state.email
          }
        });
      })
      .catch(error => {
          console.log("login error", error);
          this.setState({ formLoading: false, phoneFailed: true, desc: { header: 'Error', content: 'Error desc'} })
      });

    } else {
      this.setState({ formLoading: false, phoneFailed: true, desc: { header: 'Invalid phone number', content: 'Please verify enetred phone number.'} })
    }

    event.preventDefault();

  }


  render() {

    return (
      <div>
        <h1>SignUp</h1>
          <Form size='huge' key='huge' onSubmit={this.handleSubmit}>
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="AE"
              value={ this.state.phone }
              onChange={ phone => this.setState({ phone }) }
            />
          <Button type='submit'>GO</Button>
          </Form>
          {this.state.phoneFailed ?
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
