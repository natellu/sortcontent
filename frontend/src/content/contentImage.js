import React, { useState } from "react"
import contentImageStyle from "./contentImage.module.scss"

const ContentImage = ({ title, media, unsave, id, permalink }) => {
    const [showOverlay, setShowOverlay] = useState(false)

    const onImageClick = () => {
        setShowOverlay(!showOverlay)
    }
    if (media.type !== "img") {
        return <div></div>
    }
    return (
        <div
            className={contentImageStyle.content}
            onClick={() => onImageClick()}
        >
            <div className={contentImageStyle.content__media}>{media}</div>
            <div
                className={contentImageStyle.content__overlay}
                style={{ display: showOverlay ? "flex" : "none" }}
            >
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://reddit.com" + permalink}
                >
                    <h1>{title}</h1>
                </a>
                <button
                    className={contentImageStyle.content__button}
                    onClick={() => unsave(id)}
                >
                    unsave
                </button>
            </div>
        </div>
    )
}

export default ContentImage
