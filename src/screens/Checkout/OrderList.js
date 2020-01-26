import React, {Component} from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'

export default class OrderList extends Component {


  render() {
    const basket = this.props.basket
    const order_list = this.props.orders.map((item, i) =>
      <Table.Row key={i+1}>
        <Table.Cell>{i+1}</Table.Cell>
        <Table.Cell>{item.product_name}</Table.Cell>
        <Table.Cell>{item.count}</Table.Cell>
        <Table.Cell className='hideOnMobile'><small>{basket.currency}</small> {item.product_total}</Table.Cell>
        <Table.Cell className='hideOnMobile'>{item.discount.level} {item.discount.type}</Table.Cell>
        <Table.Cell><small>{basket.currency}</small> {item.discount.total_after_discount}</Table.Cell>
        <Table.Cell>
          <a href="#order" onClick={()=>this.props.changeOrder(item.product_id, "add")}><Icon color="pink" name="plus square outline" /></a>
          <a href="#order" onClick={()=>this.props.changeOrder(item.product_id, "remove")}><Icon color="grey" name="minus square outline" /></a>
        </Table.Cell>
      </Table.Row>

    )

    return (
      <div>
        <Table color='pink' unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Product name</Table.HeaderCell>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell className='hideOnMobile'>Original Price</Table.HeaderCell>
                <Table.HeaderCell className='hideOnMobile'>Discount</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              { order_list }

            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell className='hideOnMobile' />
                <Table.HeaderCell className='hideOnMobile' />
                <Table.HeaderCell><strong><small>{basket.currency}</small> {basket.total_after_discount}</strong></Table.HeaderCell>
                <Table.HeaderCell><Button color="pink" compact disabled={ this.props.payment_method_id ? false : true } size="small" loading={this.props.isLoadingActions} onClick={()=> this.props.payOrder()}>PAY</Button></Table.HeaderCell>
            </Table.Row>
            </Table.Footer>
          </Table>

      </div>
    )
  }

}
