import React, {Component} from 'react'
import CreditCardDetails from './CreditCardDetails'
import './Checkout.css'

export default class PaymentMethods extends Component {

  render() {

    const css = "credit-card-list " + this.props.show

    console.log("css", css)

    const cards = this.props.payment_methods.map((item, i) =>

      <CreditCardDetails key={i} card_data={item} removeCreditCard={this.props.removeCreditCard}  />

    )

    return (
      <div>
        <div className={ css } >
          {cards}
        </div>
      </div>
    )
  }
}
