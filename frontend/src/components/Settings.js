import React, { useState, useContext } from "react"

import LayoutContext, { CARDS, LIST, IMAGE } from "../context/layoutContext"
import useTheme from "./ThemePicker"

import settingsStyle from "./Settings.module.scss"

const Settings = () => {
    const [showSetting, setShowSetting] = useState({ display: "none" })
    const [theme, setTheme] = useState("light")
    const [layout, setLayout] = useContext(LayoutContext)
    useTheme(theme)

    const onSettingsClick = () => {
        if (showSetting.display === "none") {
            setShowSetting({ display: "flex" })
        } else {
            setShowSetting({ display: "none" })
        }
    }

    return (
        <div className={settingsStyle.settings}>
            <h2
                className={settingsStyle.settings__open}
                onClick={onSettingsClick}
            >
                Settings
            </h2>
            <div
                className={settingsStyle.settings__overlay}
                style={showSetting}
            >
                <div className={settingsStyle.settings__theme}>
                    <span onClick={() => setTheme("red")}>Red/White</span>
                    <span onClick={() => setTheme("dark")}>Black/White</span>
                    <span onClick={() => setTheme("light")}>White/Black</span>
                </div>
                <div className={settingsStyle.settings__layout}>
                    <span
                        onClick={() => {
                            setLayout(CARDS)
                        }}
                    >
                        Grid
                    </span>
                    <span
                        onClick={() => {
                            setLayout(LIST)
                        }}
                    >
                        List
                    </span>
                    <span
                        onClick={() => {
                            setLayout(IMAGE)
                        }}
                    >
                        Images
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Settings
