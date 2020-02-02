import React, {Component} from 'react'
import './MyKooodos.css'

export default class KooodosInspirationsList extends Component {

  render() {

    const inspiration_list = this.props.inspirations.map((item) =>
      <div key={item.id} className="card-inspiration" onClick={()=> this.props.useInspiration(item.text)}>
        <span className="card-inspiration-content">
          {item.text}
        </span>
      </div>
    )

    return (
      <div className={ 'kooodos-list inspirations' }>
          {inspiration_list}
      </div>


    )
  }
}
