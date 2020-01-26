import React, {Component} from 'react'
import { Placeholder } from 'semantic-ui-react'


export default class PaymentLoading extends Component {

  render() {

    return (
      <div>
        <div className={ 'credit-card-list' }>
          <Placeholder className="card credit-card-loader">
            <Placeholder.Image />
          </Placeholder>
          <Placeholder className="card credit-card-loader">
            <Placeholder.Image />
          </Placeholder>
        </div>
      </div>

    )
  }
}
