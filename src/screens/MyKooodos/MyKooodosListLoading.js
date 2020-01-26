import React, {Component} from 'react'
import { Card, Placeholder } from 'semantic-ui-react'
import './MyKooodos.css'

export default class MyKooodosListLoading extends Component {
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
      <div className={ 'kooodos-list' }>
          {rows}
      </div>
    )
  }
}
