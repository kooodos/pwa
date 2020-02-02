import React, {Component} from 'react'
import { Button, Header } from 'semantic-ui-react'
import API from '../../components/Api';
import API_PG from '../../components/Api/PaymentGatewayAPI';
import OrderLoading from './OrderLoading'
import OrderList from './OrderList'
import PaymentLoading from './PaymentLoading'
import PaymentMethods from './PaymentMethods'
import CreditCardForm from './CreditCardForm'
import './Checkout.css'


export default class Checkout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingOrder: true,
      isLoadingPayment: true,
      isLoadingActions: false,
      addCreditCard: 'hide',
      listCreditCard: 'show',
      payment_method_id: null,
      orders: [],
      payment_methods: []
    }

    this.changeOrder=this.changeOrder.bind(this);
    this.removeCreditCard=this.removeCreditCard.bind(this);
    this.creditCardToggle=this.creditCardToggle.bind(this);
    this.addCreditCard=this.addCreditCard.bind(this);
    this.payOrder=this.payOrder.bind(this);
  }

  componentDidMount() {

    API.get("/orders").then (response => {
      console.log("order", response.data);
      this.setState({
        orders: response.data
      })

      this.setState({ isLoadingOrder: false })

    }).catch(error => {
        console.log("orders error", error);
    })


    API.get("/payment_methods").then (response => {
      console.log("payments_methods", response.data);
      this.setState({
        payment_methods: response.data,
        payment_method_id: response.data[0] ? response.data[0].payment_id : null
      })

      this.setState({ isLoadingPayment: false })

    }).catch(error => {
        console.log("payment_method error", error);
    })
  }

  changeOrder(product_id, operation) {

    this.setState({ isLoadingOrder: true })

    API.post("/orders/?product_id=" + product_id + "&operation=" + operation).then (response => {
      console.log("new order", response.data);
      this.setState({
        orders: response.data
    })

    this.setState({ isLoadingOrder: false })

    }).catch(error => {
      console.log("login error", error);
    });
  }


  removeCreditCard(payment_id) {

    this.setState({ isLoadingPayment: true })

    API.delete("/payment_methods?payment_id=" + payment_id).then (response => {
      console.log("payments_methods", response.data);
      this.setState({
        payment_methods: response.data,
        payment_method_id: response.data[0] ? response.data[0].payment_id : null
      })

      this.setState({ isLoadingPayment: false })

    }).catch(error => {
        console.log("Removing payment_method error", error);
    })

  }

  creditCardToggle(operation) {
    if (operation === "add") {
      console.log("creditCardToggle: show add")
      this.setState({
        addCreditCard: 'show',
        listCreditCard: 'hide'
      });
    } else {
      console.log("creditCardToggle: show list")
      this.setState({
        addCreditCard: 'hide',
        listCreditCard: 'show'
      });
    }
  }


  addCreditCard(card_details) {

    this.setState({ isLoadingActions: true })

    console.log("adding credit card", card_details)

    const expiry = this.getExpiryDate(card_details.expiry)

    console.log("expiry", expiry)

    API_PG.post("/tokens",
    {
      "type": "card",
    	"number": card_details.number,
    	"expiry_month": expiry[0],
    	"expiry_year": expiry[1],
    	"name": card_details.name,
    	"cvv": card_details.cvv
    })
    .then (response => {

      console.log("PG tokenization", response.data);

      this.setState({
        isLoadingActions: false
       })

       this.addPaymentMethod(response.data)

    })
    .catch(error => {
        console.log("addig credict card error", error);
        this.setState({ isLoadingActions: false })
    });

  }


  addPaymentMethod(card_details) {
    // send to 3DS

    this.creditCardToggle("list")

    this.setState({ isLoadingPayment: true })

    API.post("/payment_methods").then (response => {
        console.log("payments_methods", response.data[0].payment_id);
        this.setState({
          payment_methods: response.data,
          payment_method_id: response.data[0] ? response.data[0].payment_id : null,
          isLoadingPayment: false
        })

    }).catch(error => {
        console.log("payment_method error", error);
    })
  }


  payOrder() {

    this.setState({ isLoadingActions: true })

    API.post("/pay").then (response => {
        console.log("pay", response.data);
        this.setState({ isLoadingActions: false })

        this.props.history.push({
          pathname: '/my_kooodos'
        });

    }).catch(error => {
        console.log("payment_method error", error);
        this.setState({ isLoadingActions: false })
    })

  }

  getExpiryDate(expiry) {

    let new_expiry = []
    let month = 0
    let year = 0
    const current_date = new Date();
    const current_year = current_date.getFullYear();
    const current_year_two = (current_year.toString()).slice(0, 2);
    month = Number(expiry.slice(0, 2));
    const expiry_year = current_year_two + '' + expiry.slice(3,5)
    year = Number(expiry_year);

    console.log("year", year);
    console.log("month", month);

    new_expiry.push(month, year)

    return new_expiry;
  }


  render() {
    return (
      <div>
        <Header size='medium' className={'header-title'} textAlign='left' color='grey'>Your order</Header>
        { this.state.isLoadingOrder ?
          <OrderLoading /> :
          <OrderList orders={this.state.orders.order_items} basket={this.state.orders.order_details} changeOrder={this.changeOrder} payOrder={this.payOrder} payment_method_id={this.state.payment_method_id} isLoadingActions={this.state.isLoadingActions} />
        }
        <Header size='medium' className='header-title' textAlign='left' color='grey'>
          Payment methods
          {this.state.addCreditCard === 'hide' ?
            <Button basic size="small" color='grey' floated='right' onClick={()=> this.creditCardToggle("add")}>
              Add credit card
            </Button> : null
          }
        </Header>
        { this.state.isLoadingPayment ?
          <PaymentLoading /> :
            <div>
              <CreditCardForm show={this.state.addCreditCard} addCreditCard={this.addCreditCard} creditCardToggle={this.creditCardToggle} isLoadingActions={this.state.isLoadingActions} />
              <PaymentMethods show={this.state.listCreditCard} payment_methods={this.state.payment_methods} removeCreditCard={this.removeCreditCard} />
            </div>
      }
      </div>
    )
  }
}
