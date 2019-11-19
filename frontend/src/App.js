import React from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import ShowSavedContent from './components/ShowSavedContent'
import Login from './components/Login'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

require('dotenv').config();

const Child = ({ match, location }) => (
  <div>
    <Login search={location.search} />
  </div>
)
  
  class App extends React.Component {  
    render(){
      let ifTokenInStorage = ""
      if(sessionStorage.getItem("accessToken") != null){
        ifTokenInStorage = <ShowSavedContent token={sessionStorage.getItem("accessToken")} />
      }else{
        ifTokenInStorage = <Router><Route path="/index" component={Child} /> <Redirect path="/" to="/index" /></Router>
      }

      return (
        <div>
            {ifTokenInStorage}
        </div>
      );
      }
  }
  
  
  




export default App;