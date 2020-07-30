import React from "react"

import SavedContent from "./SavedContent"
import { Container, Row } from "react-bootstrap"
import axios from "axios"

import Header from "./Header"
import PleaseHold from "./PleaseHold"
import ShowSubreddits from "./ShowSubreddits"

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
            username: "",
            subreddits: [],
            showsub: false,
            subbuttontext: "sort for subreddits"
        }
        this.onClickChange = this.onClickChange.bind(this)
        this.tick = this.tick.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.checkInSubreddit = this.checkInSubreddit.bind(this)
        this.checkInTitle = this.checkInTitle.bind(this)
        this.onSubredditSort = this.onSubredditSort.bind(this)
        this.onShowSubreddit = this.onShowSubreddit.bind(this)
    }

    tick() {
        this.setState((prevState) => ({
            seconds: prevState.seconds + 1
        }))
    }

    //unsave
    onClickChange(id) {
        const sendid = {
            accessToken: this.state.access_token,
            savedid: id
        }
        axios.post(apiurl + "/reddit/unsaveContent", sendid, {
            "Content-Type": "application/json"
        })

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
        sessionStorage.setItem(
            "character",
            JSON.stringify(this.state.originalcharacter)
        )
    }

    componentDidMount() {
        this.setState((prevState) => {
            return { loading: true }
        })

        const sendaccess = {
            accessToken: this.state.access_token
        }
        const self = this

        if (sessionStorage.getItem("character") === null) {
            axios
                .post(apiurl + "/reddit/getSavedContent", sendaccess, {
                    "Content-Type": "application/json"
                })
                .then(function (response) {
                    console.log(response)
                    self.setState((prevState) => {
                        return {
                            loading: false,
                            character: response.data.savedContent,
                            originalcharacter: response.data.savedContent
                        }
                    })
                    sessionStorage.setItem(
                        "character",
                        JSON.stringify(response.data.character)
                    )
                })
        } else {
            self.setState((prevState) => {
                return {
                    loading: false,
                    character: JSON.parse(sessionStorage.getItem("character")),
                    originalcharacter: JSON.parse(
                        sessionStorage.getItem("character")
                    )
                }
            })
        }

        axios
            .post(apiurl + "/api/user", sendaccess, {
                "Content-Type": "application/json"
            })
            .then(function (response) {
                self.setState({ username: response.data.name })
            })

        this.interval = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    checkInSubreddit(searchvalue) {
        let newcharacter = this.checkInTitle(searchvalue)
        for (var i = 0; i < this.state.character.length; i++) {
            let subreddit = this.state.character[
                i
            ].subreddit_name_prefixed.toUpperCase()
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
            this.setState(
                {
                    character: this.state.originalcharacter
                },
                () => {
                    newcharacter = newcharacter.concat(
                        this.checkInSubreddit(searchvalue)
                    )
                    this.setState({ character: newcharacter })
                }
            )
        }
    }

    onShowSubreddit(subreddit) {
        let newcharacter = []
        console.log("clicked: ", subreddit)
        newcharacter = newcharacter.concat(this.checkInSubreddit(subreddit))
        this.setState({
            character: newcharacter,
            showsub: false
        })
    }

    onSubredditSort() {
        let subreddits = []
        this.setState({ character: this.state.originalcharacter }, () => {
            if (!this.state.showsub) {
                for (var i = 0; i < this.state.character.length; i++) {
                    if (
                        this.state.character[i].subreddit_name_prefixed !==
                        undefined
                    ) {
                        if (
                            !subreddits.includes(
                                this.state.character[i].subreddit_name_prefixed
                            )
                        ) {
                            subreddits.push(
                                this.state.character[i].subreddit_name_prefixed
                            )
                        }
                    }
                }
                this.setState({
                    subreddits: subreddits,
                    showsub: true,
                    subbuttontext: "show all"
                })
            } else {
                this.setState({
                    showsub: false,
                    subbuttontext: "sort for subreddits"
                })
            }
        })
    }

    render() {
        let SavedContents = this.state.character.map((item) => (
            <SavedContent
                key={item.id}
                item={item}
                onClickChange={this.onClickChange}
            />
        ))
        let SavedSubreddits = this.state.subreddits.map((item) => (
            <ShowSubreddits
                key={item}
                item={item}
                onSearchSubmit={this.onShowSubreddit}
            />
        ))
        let show = ""
        if (this.state.showsub) {
            show = SavedSubreddits
        } else {
            show = SavedContents
        }
        return (
            <Container>
                <Row>
                    {this.state.loading ? (
                        ""
                    ) : (
                        <Header
                            buttontext={this.state.subbuttontext}
                            name={this.state.username}
                            onSearchSubmit={this.onSearchSubmit}
                            onSubredditSort={this.onSubredditSort}
                            numberofsaves={this.state.originalcharacter.length}
                        />
                    )}
                    {this.state.loading ? (
                        <PleaseHold seconds={this.state.seconds} />
                    ) : (
                        show
                    )}
                </Row>
            </Container>
        )
    }
}

export default ShowSavedContent
