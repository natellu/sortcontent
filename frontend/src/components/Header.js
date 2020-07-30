import React, { useContext } from "react"
import { ContextRedditData } from "../context/redditContext"
import { RESET } from "../context/actionsTypes"
import { Link } from "react-router-dom"

import Settings from "./Settings"
const Header = () => {
    const { state, dispatch } = useContext(ContextRedditData)

    return (
        <div className="header">
            <span className="header__user">
                {state.userName ? (
                    <span>
                        <h3>logged in as: {state.userName}</h3>
                        <Link to="/home">
                            <button
                                onClick={() => {
                                    dispatch({ type: RESET })
                                }}
                            >
                                Logout
                            </button>
                        </Link>
                    </span>
                ) : (
                    <div></div>
                )}
            </span>
            <Settings className="header__settings" />
        </div>
    )
}

export default Header
