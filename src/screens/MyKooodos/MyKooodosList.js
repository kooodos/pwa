import React, {Component} from 'react'
import { Tab, Item } from 'semantic-ui-react'
import './MyKooodos.css'
import MyKooodosListLoading from './MyKooodosListLoading'
import MyKooodosItem from './MyKooodosItem'

export default class MyKooodosList extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    const kooodos = this.props.kooodos.map((item) =>
        <MyKooodosItem key={item.id} index={item.id} details={item} handleShareSubmit={this.props.handleShareSubmit} />
    )

    return (
      this.props.loading ?
        <MyKooodosListLoading />
        :
        <div className={ 'kooodos-list' }>
          { kooodos }
        </div>


    )
  }
}
