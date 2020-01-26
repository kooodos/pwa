import _ from 'lodash'
import React, {Component} from 'react'
import { Card, Icon, Image, Divider, Header, Label, Input, Form, Button, Search } from 'semantic-ui-react'
import API from '../../components/Api';
import KooodosInspirationsList from './KooodosInspirationsList'
import './MyKooodos.css'

export default class MyKooodosItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inspiration_search: '',
      inspiration_on: false,
      inspiration_result: [],
      inspiration_loading: false,
      share: {
        email: '',
        msg_text: ''
      },
      email_verified: false,
      email_list: [],
      email_results: [],
      send_loading: false,
      send_disabled: true
    }


    this.handleOnChangeInspiration=this.handleOnChangeInspiration.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.useInspiration=this.useInspiration.bind(this);
    this.setEmail=this.setEmail.bind(this);
  }

  componentDidMount() {

    API.get("/receivers").then (response => {
      console.log("Users receivers", response.data);

      this.setState({ email_list: response.data });

    }).catch(error => {
        console.log("receivers error", error);
    })

  }


  handleOnChange(event) {

      const { share } = { ...this.state };
      const currentState = share;
      const { name, value } = event.target;

      currentState[name] = value;

      this.setState({ share: currentState }, () => { this.checkForm()});

      if (event.target.name === "email" && event.target.value.length > 2) {

        // search results will be pushed here
        let matches = [];

        // looping throuth posts to fing the word
        const email_list = this.state.email_list

        email_list.forEach((email) => {
            if (email["email"].includes(event.target.value)) matches.push(email);
        });

        this.setState({ email_results: matches })

        console.log("search_result", matches)
      }
  }

  setEmail(email) {

    const { share } = { ...this.state };
    const currentState = share;

    currentState["email"] = email;

    this.setState({ share: currentState }, () => { this.checkForm()});

    this.setState({ email_results: [] })

  }


  checkForm() {

    const validEmail = this.checkEmail(this.state.share.email)

    if (this.state.share.msg_text && validEmail) {
      this.setState({ send_disabled: false })
    } else {
      this.setState({ send_disabled: true })
    }
  }

  checkEmail(email) {

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      this.setState ({ email_verified: true })
      return true;
    } else {
      this.setState ({ email_verified: false })
      return false;
    }
  }

  handleOnChangeInspiration(event) {
    console.log("inspiration", event.target.value)

    this.setState({ inspiration_search: event.target.value });

    setTimeout(() => {
      const inspiration = this.state.inspiration_search

      if (inspiration.length > 2) {
        console.log("inspiration length > 2 => ", inspiration.length)

        this.setState({ inspiration_loading: true })

        API.get("/kooodos_inspirations/?search=" + inspiration).then (response => {
          console.log("kooodos_inspirations", response.data);

          this.setState({
            inspiration_result: response.data,
            inspiration_loading: false,
            inspiration_on: true
          })

        }).catch(error => {
            console.log("inspirations error", error);
        })

      }
    }, 500);

    event.preventDefault();

  }

  useInspiration(txt) {

    console.log("useInspiration", txt)

    this.setState({
      inspiration_on: false,
      share: {
        msg_text: txt
      },
      inspiration_search: ''
    })

    this.checkForm();
  }

  render() {

    const emails = this.state.email_results.map((item) => <Label as='a' className="email_tags" size="small" onClick={() => this.setEmail(item.email)} key={item.id}>{item.email}</Label> );

    console.log("list of emails", emails)

    return (
          <div>
            <Divider horizontal>
              <Header as='h4'>
                <Label color="grey" pointing="below">
                  <Icon name={ this.props.details.product.category.icon }></Icon>
                  { this.props.details.product.title }
                </Label>
              </Header>
            </Divider>

            <Card>
              <Image src={ this.props.details.share.image } wrapped ui={false} />
              <Card.Content>
                  <Form>
                    <Form.Field inline>
                      <Input className="search-inspiration" value={this.state.inspiration_search} fluid loading={this.state.inspiration_loading} placeholder='Need inspiration? Start typing..' onChange={this.handleOnChangeInspiration} />
                    </Form.Field>
                  </Form>
                  { this.state.inspiration_on ?
                    <KooodosInspirationsList inspirations={this.state.inspiration_result} loading={this.state.inspiration_loading} useInspiration={this.useInspiration} />
                  :
                    <Form>
                      <Form.TextArea className="msg_text" value={this.state.share.msg_text} name="msg_text" onChange={(event) => this.handleOnChange(event)} placeholder='Say something.. This is the place for your message attached to the gift..'>

                      </Form.TextArea>
                    </Form>
                  }
              </Card.Content>

              <Card.Content extra>
                <Form>
                  <Form.Field inline>
                    <Label>Share with:</Label>

                    <Input loading={this.state.send_loading} onChange={(event) => this.handleOnChange(event)} name="email" value={ this.state.share.email } placeholder='enter email' autoComplete="off" />
                    <div className="email_list">
                      {emails}
                    </div>

                  </Form.Field>
                </Form>
              </Card.Content>

              <Card.Content extra>
                <Button disabled={this.state.send_disabled} loading={this.state.send_loading} onClick={() => this.props.handleShareSubmit(this.props.details.id, this.state.share)} fluid color='pink'>SHARE</Button>
              </Card.Content>
            </Card>
          </div>
    )
  }
}
