import React, {Component} from 'react'
import { Tab, Menu, Label } from 'semantic-ui-react'
import API from '../../components/Api';
import Dimmers from '../../components/Dimmers'
import MyKooodosList from './MyKooodosList'
import './MyKooodos.css'

export default class MyKooodos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      kooodos_new: [],
      kooodos_shared: []
    }

    this.fetchKooodos=this.fetchKooodos.bind(this);
  }

  componentDidMount() {

    this.fetchKooodos("kooodos_new");
  }

  fetchKooodos(type) {

    this.setState({ loading: true })

    API.get("/my_kooodos/?type=" + type).then (response => {
      console.log("my_kooodos", response.data);

      this.setState({
        loading: false,
        [type]: response.data
      })

    }).catch(error => {
        console.log("orders error", error);
    })
  }

  handleShareSubmit(id, share) {
    console.log("kooodos id:", id);
    console.log("share details:", share);
  }


  render() {

    const dimmers = {
      "icon": {
        "color": "pink",
        "shape": "heart"
      },
      "header": "Wow! You have kooodos!",
      "text": "Thank you for your purchase. The next step is shape the message and share the treat!"
    }

    const panes =
    [
      {
        menuItem: (
          <Menu.Item key='new' onClick={()=> this.fetchKooodos("kooodos_new")}>
            NEW<Label color="pink">15</Label>
          </Menu.Item>
        ),
        render: () => <MyKooodosList kooodos={this.state.kooodos_new} loading={this.state.loading} handleShareSubmit={this.handleShareSubmit} />
      },
      {
        menuItem: (
          <Menu.Item key='shared' onClick={()=> this.fetchKooodos("kooodos_shared")}>
            SHARED
          </Menu.Item>
        ),
        render: () => <MyKooodosList kooodos={this.state.kooodos_shared} loading={this.state.loading} />
      }
    ]

    return (
      <div>
        <Dimmers dimmers={dimmers} />
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>

    )
  }
}
