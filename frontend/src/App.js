import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import LayoutContext from "./context/layoutContext"
import LoginWithReddit from "./pages/Login"
import Home from "./pages/Home"
import ShowContent from "./pages/ShowContent"
import Header from "./components/Header"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.scss"

require("dotenv").config()

const App = () => {
    const layoutHook = useState("CARDS")
    return (
        <LayoutContext.Provider value={layoutHook}>
            <Router>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={LoginWithReddit} />
                <Route path="/content" component={ShowContent} />
            </Router>
        </LayoutContext.Provider>
    )
}

export default App
