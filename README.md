# sortcontent
look through saved content from reddit

livedemo: https://sortsavedcontent.herokuapp.com
(first time loading this site is really slow due to heroku free plan limitations)

npm install in frontend and backend<br>
create .env file containing:<br>
backend:<br>
  REACT_APP_CLIENTID="your reddit api id"<br>
  REACT_APP_CLIENTSECRET="your reddit api secret"<br>
  
frontend:<br>
  REACT_APP_APIURL="url to your backend"<br>
  REACT_APP_REDIRECTURL="redirect url specified in reddit api"<br>
  
