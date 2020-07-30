import React from "react"
import { Badge } from "react-bootstrap"

function PleaseHold(props){



    return(
        <div className="middle">
            <div className="wait">
                <h1>loading <Badge>{props.seconds}</Badge> seconds </h1>
                <p>this can take a few seconds to fetch all your saved content</p>
            </div>
        </div>
    )
}

export default PleaseHold
