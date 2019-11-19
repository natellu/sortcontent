const express = require('express')
const snoowrap = require('snoowrap')
const bodyParser = require("body-parser");

const app = express()
const base64 = require('base-64')
const fetch = require('node-fetch');
require('dotenv').config()

global.fetch = fetch
global.Headers = fetch.Headers;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/api/getaccesstoken', (req, res) => {
  let username = process.env.REACT_APP_CLIENTID
  let password = process.env.REACT_APP_CLIENTSECRET
  let redirecturl = req.body.redirecturl
  let code = req.body.code
  let callapi = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code="+ code + "&redirect_uri="+redirecturl
  let headers = new Headers()
  headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password)) 

  fetch(callapi, {
    method: 'POST',
    headers: headers
    })
    .then(response => response.json())
    .then(data =>{ 
        if (typeof(data.access_token) !== 'undefined' || data.access_token != null) {
            res.json({accessToken: data.access_token});
        } else {
            console.log(data)
        }     
    })
}) 

app.post('/api/getsaved', (req, res) => {
    let character = []
    const ruser = new snoowrap({
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        clientId: process.env.REACT_APP_CLIENTID,
        clientSecret: process.env.REACT_APP_CLIENTSECRET,
        accessToken: req.body.accessToken
      }) 

    ruser.getMe().getSavedContent().fetchAll().then(data => {
       character = data   
      })
    .then(() => {
      let newcharacter= []
      for(var i = 0;i<character.length;i++){
        let  newchar = {
          id: character[i].id,
          permalink: character[i].permalink,
          post_hint: character[i].post_hint,
          url: character[i].url,
          thumbnail: character[i].thumbnail,
          title: character[i].title,
          subreddit_name_prefixed: character[i].subreddit_name_prefixed
        }

        newcharacter = newcharacter.concat(newchar)
      }
      res.json({character: newcharacter});
    })
})

app.post('/api/unsave', (req,res) => {
  const ruser = new snoowrap({
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    clientId: process.env.REACT_APP_CLIENTID,
    clientSecret: process.env.REACT_APP_CLIENTSECRET,
    accessToken: req.body.accessToken
  })

  ruser.getSubmission(req.body.savedid).unsave()
})

app.post('/api/user', (req, res) => {
  let character = []
  const ruser = new snoowrap({
      userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
      clientId: process.env.REACT_APP_CLIENTID,
      clientSecret: process.env.REACT_APP_CLIENTSECRET,
      accessToken: req.body.accessToken
    }) 

    ruser.getMe().then(data => {
      res.json({name: data.name})
    })
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server started on Port ', port))