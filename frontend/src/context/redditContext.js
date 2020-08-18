import React from "react"
import axios from "axios"

import {
    ADDACCESSTOKEN,
    ADDREDDITUSERNAME,
    ADDREDDITDATA,
    RESET,
    DELETEONE
} from "./actionsTypes"

const apiurl = process.env.REACT_APP_APIURL

let ContextRedditData = React.createContext()

let initialState = {
    userName: "",
    accessToken: "",
    savedContent: [],
    filteredContent: []
}

let reducer = (state, action) => {
    switch (action.type) {
        case RESET:
            sessionStorage.clear()
            return initialState
        case ADDACCESSTOKEN:
            state = {
                ...state,
                accessToken: action.payload
            }
            sessionStorage.setItem(
                "accessToken",
                JSON.stringify(state.accessToken)
            )
            return state
        case ADDREDDITUSERNAME:
            state = {
                ...state,
                userName: action.payload
            }
            sessionStorage.setItem("userName", JSON.stringify(state.userName))
            return state
        case ADDREDDITDATA:
            state = {
                ...state,
                savedContent: action.payload
            }
            sessionStorage.setItem(
                "savedContent",
                JSON.stringify(state.savedContent)
            )
            return state
        case DELETEONE:
            const sendid = {
                accessToken: state.accessToken,
                id: action.payload
            }
            axios.post(apiurl + "/reddit/unsaveContent", sendid, {
                "Content-Type": "application/json"
            })

            for (let i = 0; i < state.savedContent.length; i++) {
                if (state.savedContent[i].id === action.payload) {
                    state.savedContent.splice(i, 1)
                }
            }
            sessionStorage.setItem(
                "savedContent",
                JSON.stringify(state.savedContent)
            )
            return { ...state }
    }
}

function ContextRedditProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState)
    let value = { state, dispatch }

    if (sessionStorage.getItem("accessToken") && !state.accessToken) {
        dispatch({
            type: ADDACCESSTOKEN,
            payload: JSON.parse(sessionStorage.getItem("accessToken"))
        })
        dispatch({
            type: ADDREDDITDATA,
            payload: JSON.parse(sessionStorage.getItem("savedContent"))
        })
        dispatch({
            type: ADDREDDITUSERNAME,
            payload: JSON.parse(sessionStorage.getItem("userName"))
        })
    }

    return (
        <ContextRedditData.Provider value={value}>
            {props.children}
        </ContextRedditData.Provider>
    )
}

let ContextRedditConsumer = ContextRedditData.Consumer

export { ContextRedditData, ContextRedditProvider, ContextRedditConsumer }
