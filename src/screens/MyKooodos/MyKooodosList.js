import React, {Component} from 'react'
import { Message } from 'semantic-ui-react'
import './MyKooodos.css'
import MyKooodosListLoading from './MyKooodosListLoading'
import MyKooodosItem from './MyKooodosItem'

export default class MyKooodosList extends Component {

  render() {

    const kooodos = this.props.kooodos.map((item) =>
        <MyKooodosItem key={item.id} index={item.id} details={item} handleShareSubmit={this.props.handleShareSubmit} />
    )

    return (
      this.props.loading ?
        <MyKooodosListLoading />
        :
        <div>
          { this.props.kooodos.length ?
            <div className={ 'kooodos-list' }>{ kooodos }</div>
          :
            <Message color="pink" className="mt-2">You don't Kooodos. It's time to purchase & share one :) </Message>
          }
        </div>
    )
  }
}
