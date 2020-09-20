import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ContextRedditData } from "../context/redditContext"
import { DELETEONE } from "../context/actionsTypes"
import Content from "../components/Content"

import LayoutContext, { CARDS, LIST, IMAGE } from "../context/layoutContext"
import Search from "../components/Search"
import ShowContentStyle from "./ShowContent.module.scss"

const ShowContent = () => {
    const { state, dispatch } = useContext(ContextRedditData)

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
        dispatch({ type: DELETEONE, payload: id })
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
            <Search />
            {console.log(state.savedContent)}
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
