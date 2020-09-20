const snoowrap = require("snoowrap")
const base64 = require("base-64")
const fetch = require("node-fetch")
const { conversationStates } = require("snoowrap/dist/objects/ModmailConversation")

require("dotenv").config()

exports.getRedditAccessToken = (req, res) => {
    const redditClientId = process.env.REDDIT_CLIENTID
    const redditClientSecret = process.env.REDDIT_CLIENTSECRET
    const redirectUrl = req.body.redirecturl
    const code = req.body.code
    const callApi =
        "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" +
        code +
        "&redirect_uri=" +
        redirectUrl
    fetch(callApi, {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                base64.encode(redditClientId + ":" + redditClientSecret)
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (
                typeof data.access_token !== "undefined" ||
                data.access_token !== null
            ) {
                res.json({ reditAccessToken: data.access_token })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "error1 " + err })
        })
}

exports.getSavedContent = (req, res) => {
    let savedContent = []
    let username = ""
    const ruser = new snoowrap({
        userAgent:
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        clientId: "D7XYbNRJTMNkVA" || process.env.REDDIT_CLIENTID,
        clientSecret:
            "xgdZaMjz1RizS07l5hGsoYeVlXs" || process.env.REDDIT_CLIENTSECRET,
        accessToken: req.body.accessToken
    })

    ruser.getMe().then((data) => {
        username = data.name
    })

    ruser
        .getMe()
        .getSavedContent()
        .fetchAll()
        .then((data) => {
            let newData = []
            data.forEach(element => {
                let title = ""
                if(!element.title){
                    title="test"
                }else{
                    title=element.title
                }
                let d = {
                    title: title,
                    id: element.id,
                    body_html: element.body_html,
                    created_utc: element.created_utc,
                    permalink: element.permalink,
                    subreddit: JSON.stringify(element.subreddit),
                    post_hint: element.post_hint,
                    is_video: element.is_video,
                    thumbnail: element.thumbnail,
                    url: element.url,
                    over_18: element.over_18,
                    domain: element.domain,
                    secure_media_embed: element.secure_media_embed,
                    secure_media: element.secure_media,
                    selftext: element.selftext
                }
                newData.push(d)
            })
            
            savedContent = newData
            console.log(savedContent)
        })
        .then(() => {
            res.json({ redditName: username, savedContent: savedContent })
        }) 
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err,
                test: "test" + process.env.REDDIT_CLIENTSECRET
            })
        })
}

exports.unsaveContent = (req, res) => {
    const ruser = new snoowrap({
        userAgent:
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        clientId: process.env.REDDIT_CLIENTID,
        clientSecret: process.env.REDDIT_CLIENTSECRET,
        accessToken: req.body.accessToken
    })

    ruser
        .getSubmission(req.body.id)
        .unsave()
        .then(() => {
            res.status(200).json({ success: "successfully unsaved" })
        })
        .catch((err) => {
            res.status(500).json({ error: err.code })
        })
}
