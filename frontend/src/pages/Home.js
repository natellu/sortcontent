import React, { useContext } from "react"
import { ContextRedditData } from "../context/redditContext"

const client_id = process.env.REACT_APP_CLIENTID
const redirecturl = process.env.REACT_APP_REDIRECTURL
const link =
    "https://www.reddit.com/api/v1/authorize?client_id=" +
    client_id +
    "&response_type=code&state=RANDOM_STRING&redirect_uri=" +
    redirecturl +
    "&duration=temporary&scope=identity history save"

const Home = () => {
    let { state, dispatch } = useContext(ContextRedditData)
    return (
        <div>
            Please login with <a href={link}>Reddit</a>
        </div>
    )
}

export default Home
