import React, {Component} from 'react'
import KooodosLogo from '../../components/Images/KooodosLogo'
import API from '../../components/Api';
import { Message } from 'semantic-ui-react'
import OtpInput from "react-otp-input";
import './Auth.css';

export default class SignUpPhoneVerification extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.location.state.email)
    this.state = {
      otpFailed: false,
      formLoading: false,
      desc: {
        header: '',
        content: ''
      },
      email: this.props.location.state.email,
      phone: this.props.location.state.phone,
      otp: '',
      numInputs: 5,
      separator: '',
      isDisabled: false,
      hasErrored: false,
      isInputNum: true
    }
  }


  handleOtpChange = otp => {
    this.setState({ otp });

    let otp_length = String(otp).length

    console.log("otp.length: ", otp_length)
    if (otp_length === 5) {
      this.setState({ isDisabled: true });
      this.verifyOTP(otp)
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearOtp = () => {
    this.setState({ otp: '' });
  };

  handleCheck = e => {
    const { name } = e.target;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };


  verifyOTP = (otp) => {

    this.setState({formLoading: true });

    API.patch("/auth/signup/?email=" + this.state.email,
    {
      "otp": otp
    })
    .then (response => {

      console.log("Signup step: OTP", response.data);

      this.props.history.push({
        pathname: '/sign-up-name',
        state: {
          email: this.state.email
        }
      });
    })
    .catch(error => {
        console.log("otp error", error);
        this.setState({
          isDisabled: false,
          hasErrored: true
        });

        this.clearOtp()
    });

  }


  render() {

    const { otp, numInputs, separator, isDisabled, hasErrored, isInputNum } = this.state;

    return (
      <div className="screen-center">
        <KooodosLogo />
        <h1>Enter the code from SMS</h1>
          <OtpInput
              inputStyle="otp"
              numInputs={numInputs}
              isDisabled={isDisabled}
              hasErrored={hasErrored}
              errorStyle="error"
              onChange={this.handleOtpChange}
              separator={<span>{separator}</span>}
              isInputNum={isInputNum}
              shouldAutoFocus={true}
              value={otp}
          />

        {this.state.hasErrored ?
            <Message negative>
              { "OTP you entered is incorrect." }
            </Message>
          :
            null
          }

      </div>
    )
  }
}
