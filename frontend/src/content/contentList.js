import React from "react"

import contentListStyles from "./contentList.module.scss"

const ContentList = ({
    title,
    media,
    subreddit,
    unsave,
    id,
    permalink,
    date
}) => {
    return (
        <div className={contentListStyles.content}>
            <div className={contentListStyles.content__media}>
                {media ? media : <div></div>}
            </div>
            <div className={contentListStyles.content__metadata}>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://reddit.com" + permalink}
                >
                    <h1 className={contentListStyles.content__title}>
                        {title}
                    </h1>
                </a>
                <span>
                    {date.getDate() +
                        "." +
                        date.getMonth() +
                        "." +
                        date.getFullYear()}
                </span>
                <span className="contentlist__subreddit"> {subreddit}</span>
            </div>

            <button
                className={contentListStyles.content__button}
                onClick={() => unsave(id)}
            >
                unsave
            </button>
        </div>
    )
}

export default ContentList
