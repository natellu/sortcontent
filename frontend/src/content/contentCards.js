import React from "react"

import contentCardsStyles from "./contentCards.module.scss"

const ContentCards = ({
    title,
    media,
    subreddit,
    unsave,
    id,
    permalink,
    date
}) => {
    const displayTitle = (titleLength) => {
        return (
            <h2 className={contentCardsStyles.content__title}>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://reddit.com" + permalink}
                >
                    {title.substring(0, titleLength)}
                </a>
            </h2>
        )
    }
    return (
        <div className={contentCardsStyles.content}>
            {media === "" ? (
                displayTitle(title.length)
            ) : (
                <div className={contentCardsStyles.content__body}>{
                    media
                    }</div>
            )}

            {media === "" ? null : displayTitle(100)}
            <div className={contentCardsStyles.content__description}>
                <p className={contentCardsStyles.content__date}>
                    {date.getDate() +
                        "." +
                        date.getMonth() +
                        "." +
                        date.getFullYear()}
                </p>
                <p className={contentCardsStyles.content__subreddit}>
                    {subreddit}
                </p>
            </div>

            <button
                className={contentCardsStyles.content__button}
                onClick={() => unsave(id)}
            >
                unsave
            </button>
        </div>
    )
}

export default ContentCards
