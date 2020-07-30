import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ContextRedditData } from "../context/redditContext"
import { DELETEONE } from "../context/actionsTypes"
import classnames from "classnames"
import Content from "../components/Content"
import axios from "axios"

import LayoutContext, { CARDS, LIST, IMAGE } from "../context/layoutContext"

import ShowContentStyle from "./ShowContent.module.scss"

const apiurl = process.env.REACT_APP_APIURL

const ShowContent = () => {
    const { state, dispatch } = useContext(ContextRedditData)
    const [forceRerender, setRerender] = useState(1)
    const [layout, setLayout] = useContext(LayoutContext)
    let styleContentContainer = ShowContentStyle.contentContainerCards
    if (layout === CARDS) {
        styleContentContainer = ShowContentStyle.contentContainerCards
    } else if (layout === LIST) {
        styleContentContainer = ShowContentStyle.contentContainerList
    } else if (layout === IMAGE) {
        styleContentContainer = ShowContentStyle.contentContainerImage
    }

    const unsave = (id) => {
        const sendid = {
            accessToken: state.accessToken,
            id
        }
        axios
            .post(apiurl + "/reddit/unsaveContent", sendid, {
                "Content-Type": "application/json"
            })
            .then((res) => {
                dispatch({ type: DELETEONE, payload: id })
                //reload state
                setRerender(forceRerender + 1)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (!state.accessToken) {
        return (
            <div>
                <h1>Sorry something went wrong</h1>
                <p>Please try again</p>
                <Link to="/home">back to login</Link>
            </div>
        )
    }
    return (
        <div>
            Content
            <div className={styleContentContainer}>
                {state.savedContent.map((content) => (
                    <Content
                        key={content.id}
                        props={content}
                        unsave={unsave}
                    ></Content>
                ))}
            </div>
        </div>
    )
}

export default ShowContent
