import React, { useEffect } from "react"

/*
    --dark-theme-color-primary: #282c34;
    --dark-theme-color-background: #fff;

    --light-theme-color-primary: #fff;
    --light-theme-color-background: #282c34;

    --red-theme-color-primary: #eb0028;
    --red-theme-color-background: #fff;

*/

const hexToRGB = (hex) => {
    let aRgbHex = hex.match(/.{1,2}/g)
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ]
    return aRgb
}

const themes = {
    light: {
        "--color-primary": hexToRGB("282c34"),
        "--color-secondary": hexToRGB("282c34"),
        "--color-background": hexToRGB("ffffff")
    },
    dark: {
        "--color-primary": hexToRGB("ffffff"),
        "--color-secondary": hexToRGB("ffffff"),
        "--color-background": hexToRGB("282c34")
    },
    red: {
        "--color-primary": hexToRGB("eb0028"),
        "--color-secondary": hexToRGB("282c34"),
        "--color-background": hexToRGB("ffffff")
    }
}

const useTheme = (selectedTheme) => {
    useEffect(() => {
        const theme = themes[selectedTheme] || themes.light
        Object.keys(theme).forEach((key) => {
            const value = theme[key]
            document.documentElement.style.setProperty(key, value)
        })
    }, [selectedTheme])
}

export default useTheme
