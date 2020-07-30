import React from "react"
import { Button } from "react-bootstrap"

function IfNotLoggedIn(){
    const client_id = process.env.REACT_APP_CLIENTID
    const redirecturl = process.env.REACT_APP_REDIRECTURL
    const link = "https://www.reddit.com/api/v1/authorize?client_id="+client_id+ "&response_type=code&state=RANDOM_STRING&redirect_uri="+redirecturl+"&duration=temporary&scope=identity history save"
    return(
        <div className="middle">
            <div className="signin">
                <h1>Please login with</h1>
                <a href={link}><Button variant="outline-success" size="lg" >Reddit</Button></a> 
            </div>
        </div>
    )
}

export default IfNotLoggedIn 