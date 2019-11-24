import React from 'react'

import SavedContent from "./SavedContent"
import { Container, Row } from 'react-bootstrap'
import axios from "axios"

import Header from './Header'
import PleaseHold from './PleaseHold'

let apiurl = process.env.REACT_APP_APIURL

class ShowSavedContent extends React.Component {

  constructor(props) {
    super()
    this.state = {
      loading: false,
      character: [],
      originalcharacter: [],
      seconds: 0,
      access_token: props.token,
      username: ""
    }
    this.onClickChange = this.onClickChange.bind(this)
    this.tick = this.tick.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.checkInSubreddit = this.checkInSubreddit.bind(this)
    this.checkInTitle = this.checkInTitle.bind(this)
  }


  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }))
  }

  //unsave
  onClickChange(id) {
    const sendid = {
      accessToken: this.state.access_token,
      savedid: id
    }
    axios.post(apiurl + "/api/unsave", sendid, { "Content-Type": "application/json" })

    for (var i = 0; i < this.state.character.length; i++) {
      if (this.state.character[i].id === id) {
        this.state.character.splice(i, 1)
      }
    }
    for (i = 0; i < this.state.originalcharacter.length; i++) {
      if (this.state.originalcharacter[i].id === id) {
        this.state.originalcharacter.splice(i, 1)
      }
    }
    sessionStorage.setItem("character", JSON.stringify(this.state.originalcharacter))
  }

  componentDidMount() {

    this.setState(prevState => {
      return { loading: true }
    })

    const sendaccess = {
      accessToken: this.state.access_token
    }
    const self = this

    if (sessionStorage.getItem("character") === null) {
      axios.post(apiurl + "/api/getsaved", sendaccess, { "Content-Type": "application/json" })
        .then(function (response) {
          self.setState((prevState) => {
            return {
              loading: false,
              character: response.data.character,
              originalcharacter: response.data.character
            }
          })
          sessionStorage.setItem("character", JSON.stringify(response.data.character))
        })
    } else {
      self.setState((prevState) => {
        return {
          loading: false,
          character: JSON.parse(sessionStorage.getItem("character")),
          originalcharacter: JSON.parse(sessionStorage.getItem("character"))
        }
      })


    }


    axios.post(apiurl + "/api/user", sendaccess, { "Content-Type": "application/json" })
      .then(function (response) {
        self.setState({ username: response.data.name })
      })





    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkInSubreddit(searchvalue) {
    let newcharacter = this.checkInTitle(searchvalue)
    for (var i = 0; i < this.state.character.length; i++) {
      let subreddit = this.state.character[i].subreddit_name_prefixed.toUpperCase()
      if (subreddit.includes(searchvalue.toUpperCase())) {
        if (!newcharacter.includes(this.state.character[i])) {
          newcharacter = newcharacter.concat(this.state.character[i])
        }

      }
    }
    return newcharacter
  }

  checkInTitle(searchvalue) {
    let newcharacter = []
    for (var i = 0; i < this.state.character.length; i++) {
      if (this.state.character[i].title === undefined) {

      } else {
        let title = this.state.character[i].title.toUpperCase()

        if (title.includes(searchvalue.toUpperCase())) {
          newcharacter = newcharacter.concat(this.state.character[i])
        }
      }
    }
    return newcharacter
  }

  onSearchSubmit(searchvalue) {
    if (searchvalue === "") {
      this.setState({ character: this.state.originalcharacter })
    } else {
      let newcharacter = []
      this.setState({
        character: this.state.originalcharacter
      }, () => {
        newcharacter = newcharacter.concat(this.checkInSubreddit(searchvalue))
        this.setState({ character: newcharacter })
      })

    }


  }


  render() {
    let SavedContents = this.state.character.map(item => <SavedContent key={item.id} item={item} onClickChange={this.onClickChange} />)
    return (
      <Container>
        <Row>
          {this.state.loading ? "" : <Header name={this.state.username} onSearchSubmit={this.onSearchSubmit} />}
          {this.state.loading ? <PleaseHold seconds={this.state.seconds} /> : SavedContents}
        </Row>
      </Container>
    );
  }
}







export default ShowSavedContent;