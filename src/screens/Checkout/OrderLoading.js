import React, {Component} from 'react'
import { Table, Placeholder } from 'semantic-ui-react'


export default class OrderLoading extends Component {


  render() {
    let rows = [];
    for (let i=0; i<2; i++) {
      rows.push(
        <Table.Row key={i}>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
        </Table.Row>
      )
    }
    return (
      <div>
        <Table color='pink' unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              { rows }
            </Table.Body>
          </Table>
      </div>
    )
  }
}
