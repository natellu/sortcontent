import React from "react"
import queryString from 'query-string'
import ShowSavedContent from './ShowSavedContent'
import IfNotLoggedIn from './IfNotLoggedIn'
import axios from "axios"


let redirecturl = process.env.REACT_APP_REDIRECTURL
let apiurl = process.env.REACT_APP_APIURL

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            url: "",
            access_token: "",
        }
    }

    componentDidMount(){
        if(this.state.access_token === ""){
            this.setState({url: this.props.search}, () => {
                let query = queryString.parse(this.state.url)


                const sendaccess = {
                    redirecturl: redirecturl,
                    code: query.code
                }
                var self = this
                if(query.code !== undefined){
                    axios.post(apiurl+"/api/getaccesstoken", sendaccess,  {"Content-Type": "application/json"})
                    .then(function (response){
                        self.setState({
                            access_token: response.data.accessToken
                        }, () => {
                            sessionStorage.setItem("accessToken", response.data.accessToken)
                        })
                    })
                }
                
            })
        }
    }

     render(){
        let displayed
        if(this.state.access_token === ""){
            displayed = <IfNotLoggedIn />
        }else{
            displayed = <ShowSavedContent token={this.state.access_token} />
        }
    
        return(
            <div>
              {displayed}
            </div>
        )
    }
}

export default Login