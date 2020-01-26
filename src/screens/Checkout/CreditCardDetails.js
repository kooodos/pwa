import React from 'react';
import Cards from 'react-credit-cards';
import { Button, Icon } from 'semantic-ui-react'
import 'react-credit-cards/es/styles-compiled.css';

export default class CreditCardDetails extends React.Component {

  render() {
    return (
      <div className="card" style={{ width: "400px"}}>
        <Cards
          cvc='XXX'
          expiry={this.props.card_data.expiry_date}
          focused=''
          name={this.props.card_data.name}
          number={this.props.card_data.credit_card}
        />

      <Button compact basic size="tiny" onClick={()=> this.props.removeCreditCard(this.props.card_data.payment_id)} color="red" className="remove-card">
          <Button.Content>
            <Icon name='trash' /> REMOVE
          </Button.Content>
        </Button>
      </div>
    );
  }
}
