import React from "react"

function Contacts(props){
    console.log(props)
    return (
        <div>
            <img src="" alt={props.contact.imgurl} />
            <h3>{props.contact.name}</h3>
            <p>{props.contact.phone}</p>
            <p>{props.contact.mail}</p>
        </div>
    )
}

export default Contacts