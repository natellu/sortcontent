import React, { useContext } from "react"
import { ContextRedditData } from "../context/redditContext"

const Search = () => {
    const { state, dispatch } = useContext(ContextRedditData)
    return (
        <div>
            <h2>Search</h2>
        </div>
    )
}

export default Search
