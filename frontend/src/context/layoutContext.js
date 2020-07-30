import React from "react"
export const CARDS = "CARDS"
export const LIST = "LIST"
export const IMAGE = "IMAGE"

const LayoutContext = React.createContext(["", () => {}])
export default LayoutContext
