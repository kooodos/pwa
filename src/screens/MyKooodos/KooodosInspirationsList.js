import React, {Component} from 'react'
import { Placeholder, Card } from 'semantic-ui-react'
import './MyKooodos.css'

export default class KooodosInspirationsList extends Component {

  constructor(props) {
    super(props);

  }


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
