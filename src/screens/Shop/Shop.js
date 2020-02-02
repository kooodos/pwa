import React, {Component} from 'react'
import { Card, Icon, Image, Button, Grid, Placeholder, Header } from 'semantic-ui-react'
import API from '../../components/Api';
import './Shop.css';


export default class Shop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      orders: [],
      isBasketLoading: true,
      isLoading: true,
      basket: ''
    }

    this.addBasket=this.addBasket.bind(this);

  }

  componentDidMount() {

    this.setState({ isBasketLoading: true })

    API.get("/products").then (response => {
      console.log("products", response.data);
      this.setState({
        products: response.data,
        isLoading: false
      })

      API.get("/orders").then (response => {
        console.log("order", response.data);

        this.setState({
          orders: response.data.order_items,
          basket: this.getBasket(response.data.order_details)
        })

        this.setState({ isBasketLoading: false })

      })
      .catch(error => {
          console.log("login error", error);
      });

    })
    .catch(error => {
        console.log("login error", error);

    });
  }

  getBasket(order_details) {
    let basket = order_details.currency + " " + order_details.total
    return basket
  }

  addBasket(product_id, go) {

    this.setState({ isBasketLoading: true })

    console.log("adding to basket product: ", product_id)

    API.post("/orders/?product_id=" + product_id + "&operation=add").then (response => {
      console.log("new order", response.data);
      this.setState({
        orders: response.data.order_items,
        basket: this.getBasket(response.data.order_details)
      })

      console.log("basket: ", this.getBasket(response.data.order_details))
      this.setState({ isBasketLoading: false })

      if (go > 0) {
        console.log("go to checkout")

        this.props.history.push({
          pathname: '/checkout'
        });
      }
    })
    .catch(error => {
        console.log("adding to basket error", error);
    });

  }

  render() {

    return (
      <div>
        <Header size='medium' className={'header-title'} textAlign='left' color='grey'>Pick a gift</Header>
        { this.state.isLoading ?
          <ProductLoading /> :
          <ProductList isBasketLoading={this.state.isBasketLoading} products={this.state.products} orders={this.state.orders} addBasket={this.addBasket} />
        }
      </div>
    )
  }
}

class CardButton extends Component {

  render() {

    let count = 0

    for (var i = 0; i < this.props.orders.length; i++) {
      if (this.props.orders[i].product_id ===  this.props.product_id) {
        count = this.props.orders[i].count
      }
    };

    console.log("btn loading", this.props.isBasketLoading)

    return (
      <Card.Content extra>
        <Grid columns={3} verticalAlign='middle'>
          <Grid.Column textAlign={'left'}>
            {this.props.price}
          </Grid.Column>

          <Grid.Column textAlign={'right'} onClick={this.addBasket} >
            <Button loading={this.props.isBasketLoading} product_id={this.props.product_id} animated='vertical' onClick={()=>this.props.addBasket(this.props.product_id, 0)}>
              <Button.Content hidden>
                  <span>{ count }</span>
              </Button.Content>
              <Button.Content visible>
                <Icon name='plus' />
              </Button.Content>
            </Button>
          </Grid.Column>
          <Grid.Column textAlign={'right'}>
            <Button loading={this.props.isBasketLoading} product_id={this.props.product_id} color='pink' animated='vertical' onClick={()=>this.props.addBasket(this.props.product_id, 1)}>
              <Button.Content hidden>BUY</Button.Content>
              <Button.Content visible>
                <Icon name='shop' />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
    )
  }
}


class CardBody extends Component {
  render() {
    return (

      <Card.Content textAlign={'left'}>
        <Card.Header>{this.props.title}</Card.Header>
        <Card.Meta>{this.props.category}</Card.Meta>
        <Card.Description>
          {this.props.text}
        </Card.Description>
      </Card.Content>

    )
  }
}

class ProductList extends Component {

  render() {

    const products_list = this.props.products.map((item) =>
        <Item key={item.id} index={item.id} details={item} orders={this.props.orders} addBasket={this.props.addBasket} isBasketLoading={this.props.isBasketLoading} />
    )

    return (
      <div className={ 'product-list' }>
        { products_list }
      </div>
    )
  }
}


class Item extends Component {
  render() {
    return (
      <Card color='pink' id={this.props.details.id}>
        <Image src={this.props.details.image} wrapped ui={false} />
        <CardBody category={this.props.details.category} title={this.props.details.title} text={this.props.details.text}/>
        <CardButton orders={this.props.orders} product_id={this.props.details.id} price={this.props.details.price} addBasket={this.props.addBasket} isBasketLoading={this.props.isBasketLoading} />
      </Card>
    )
  }
}


class ProductLoading extends Component {
  render() {
    let rows = [];
    for (let i=0; i<8; i++) {
      rows.push(
        <Card key={i}>
          <Placeholder>
            <Placeholder.Image className={'img-card'} style={{ height: 200 }} />
          </Placeholder>
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='very short' />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='very long' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
              <Placeholder.Paragraph>
              </Placeholder.Paragraph>
            </Placeholder>
          </Card.Content>
        </Card>
      )
    }
    return (
      <div className={ 'product-list' }>
          {rows}
      </div>
    )
  }
}
