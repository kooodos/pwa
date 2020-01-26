import React from 'react'
import Cards from 'react-credit-cards';
import { Form, Button, Container } from 'semantic-ui-react'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils/CreditCardValidation';

import 'react-credit-cards/es/styles-compiled.css';

export default class CreditCardForm extends React.Component {


  state = {
    name: '',
    cvc: '',
    number: '',
    expiry: '',
    issuer: '',
    disableToSend: true
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };


  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };


  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });

    if (this.state.cvc && this.state.expiry && this.state.name && this.state.number ) {
      this.setState({ disableToSend: false });
    } else {
      this.setState({ disableToSend: true });
    }
  };

  render() {

    return (
      <div id="PaymentForm" className={ this.props.show }>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focused}
          name={this.state.name}
          number={this.state.number}
          callback={this.handleCallback}
        />
        <Container>
          <Form loading={this.props.isLoadingActions} size="small">
            <Form.Group unstackable widths={2} className="form-label">
              <Form.Input
                name='number'
                type="number"
                pattern="\d|{16,22}"
                required
                label='CREDIT CARD NUMBER'
                placeholder='Credit card number'
                width={10}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <Form.Input
                name='expiry'
                label='EXPIRY DATE'
                placeholder='MM/YY'
                width={6}
                maxLength={5}
                pattern="\d\d/\d\d"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </Form.Group>
            <Form.Group unstackable widths={2} className="form-label">
              <Form.Input
                name='name'
                label='CARD HOLDER NAME'
                placeholder='Name'
                width={10}
                required
                maxLength={17}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <Form.Input
                name='cvc'
                label='CVV'
                type='number'
                placeholder='CVV'
                width={6}
                pattern="\d{3,4}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </Form.Group>
            <input type="hidden" name="issuer" value={this.state.issuer} />
          </Form>

          <p></p>
          <Button compact size="small" loading={this.props.isLoadingActions} color="grey" onClick={()=> this.props.creditCardToggle("list")}>CANCEL</Button>
          <Button compact size="small" loading={this.props.isLoadingActions} disabled={this.state.disableToSend} onClick={()=> this.props.addCreditCard(this.state)} color="pink">ADD CREDIT CARD</Button>
        </Container>
      </div>
    );
  }
}
