import React, { useContext } from "react"
import LayoutContext, { CARDS, LIST, IMAGE } from "../context/layoutContext"

import ContentCards from "../content/contentCards"
import ContentList from "../content/contentList"
import ContentImage from "../content/contentImage"
const Content = ({
    props: {
        title,
        id,
        body_html,
        created_utc,
        permalink,
        subreddit,
        post_hint,
        is_video,
        thumbnail,
        url,
        over_18,
        domain,
        secure_media_embed,
        secure_media,
        selftext
    },
    unsave
}) => {
    const [layout, setLayout] = useContext(LayoutContext)
    const date = new Date(created_utc * 1000)

    let media = ""

    if (is_video) {
        if (domain === "v.redd.it") {
            media = (
                <div>
                    <video preload="auto" controls>
                        <source
                            src={secure_media.reddit_video.fallback_url}
                            type="video/webm"
                        ></source>
                    </video>
                </div>
            )
        }
    } else if (post_hint === "image") {
        media = <img src={url} />
    } else if (post_hint === "link" && domain === "i.imgur.com") {
        media = (
            <div>
                <video preload="auto" controls>
                    <source
                        src={url.substring(0, url.length - 4) + "mp4"}
                        type="video/webm"
                    ></source>
                </video>
            </div>
        )
    } else if (post_hint === "rich:video" && domain === "redgifs.com") {
        media = (
            <div>
                <iframe
                    src={secure_media_embed.media_domain_url}
                    frameborder="0"
                    scrolling="no"
                    width="100%"
                    height="100%"
                    allowfullscreen
                ></iframe>
            </div>
        )
    } else if (post_hint === "link") {
        //media = <div>link</div>
    } else if (selftext) {
        //media = <div>selftext</div>
    } else if (thumbnail === "self") {
        //  media = <div>no thumbnail</div>
    } else {
        //media = <div>body</div>
    }

    if (layout === CARDS) {
        return (
            <ContentCards
                title={title}
                media={media}
                created_utc={created_utc}
                subreddit={subreddit}
                unsave={unsave}
                id={id}
                permalink={permalink}
                date={date}
            />
        )
    } else if (layout === LIST) {
        return (
            <ContentList
                title={title}
                media={media}
                subreddit={subreddit}
                unsave={unsave}
                id={id}
                permalink={permalink}
                date={date}
            />
        )
    } else if (layout === IMAGE) {
        return (
            <ContentImage
                title={title}
                media={media}
                subreddit={subreddit}
                unsave={unsave}
                id={id}
                permalink={permalink}
                date={date}
            />
        )
    }
    return <div></div>
}

export default Content
