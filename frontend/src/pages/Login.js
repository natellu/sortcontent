import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import queryString from "query-string"

import { ContextRedditData } from "../context/redditContext"
import {
    ADDACCESSTOKEN,
    ADDREDDITUSERNAME,
    ADDREDDITDATA
} from "../context/actionsTypes"

const redirecturl = process.env.REACT_APP_REDIRECTURL
const apiurl = process.env.REACT_APP_APIURL

const Login = (props) => {
    const { state, dispatch } = useContext(ContextRedditData)
    const [redditAccessToken, setRedditAccessToken] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(true)
    const [doingNext, setDoingNext] = useState("parsing url strings")
    useEffect(() => {
        if (!redditAccessToken) {
            return
        }
        setDoingNext("loading first batch of content")
        axios
            .post(
                apiurl + "/reddit/getSavedContent",
                { accessToken: redditAccessToken },
                {
                    "Content-Type": "application/json"
                }
            )
            .then((res) => {
                setDoingNext("preparing content for displaying")               
                
                dispatch({
                    type: ADDREDDITUSERNAME,
                    payload: res.data.redditName
                })
                dispatch({
                    type: ADDREDDITDATA,
                    payload: res.data.savedContent
                })

                setTimeout(() => {
                    return props.history.push(`/content`)
                }, 1000)
            })
    }, [redditAccessToken])

    useEffect(() => {
        if (randomString === "RANDOM_STRING" && code && !redditAccessToken) {
            setDoingNext("fetching reddit access token")
            axios
                .post(
                    apiurl + "/reddit/getRedditAccessToken",
                    { redirecturl, code },
                    { "Content-Type": "application/json" }
                )
                .then((res) => {
                    if (res.data.reditAccessToken && res.status === 200) {
                        dispatch({
                            type: ADDACCESSTOKEN,
                            payload: res.data.reditAccessToken
                        })

                        setRedditAccessToken(res.data.reditAccessToken)
                    } else {
                        setLoginSuccess(false)
                    }
                })
                .catch((error) => {
                    setLoginSuccess(false)
                    console.log(error)
                })
        } else {
            setLoginSuccess(false)
        }
    }, [])

    const code = queryString.parse(props.location.search).code
    const randomString = queryString.parse(props.location.search).state

    return (
        <div>
            {loginSuccess ? (
                <div>
                    <h1>Login succesfully</h1>
                    <p>{doingNext}</p>
                </div>
            ) : (
                <div>
                    <h1>Sorry something went wrong</h1>
                    <p>Please try again</p>
                    <Link to="/home">back to login</Link>
                </div>
            )}
        </div>
    )
}

export default Login
