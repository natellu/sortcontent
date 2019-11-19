import React from "react"
import { Button, Card } from "react-bootstrap"

function SavedContent(props){

    let displayWhat
    if(props.item.post_hint === "image"){
      displayWhat = <Card.Img variant="top" src={props.item.url} />
    }else if(props.item.thumbnail !== "default" && props.item.thumbnail !== "self"){
      displayWhat = <Card.Img variant="top" src={props.item.thumbnail} />
    }

    return(
      <Card className="col-md-3">
         {displayWhat}
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Subtitle> <a href={"https://reddit.com" + props.item.permalink}>{props.item.permalink}</a></Card.Subtitle>

          <Card.Text>
           Subreddit: {props.item.subreddit_name_prefixed}
          </Card.Text>
          <Button variant="danger" type="button" onClick={() => props.onClickChange(props.item.id)}>unsave</Button>
        </Card.Body>
        {/*  {props.item.post_hint === "image" ? <img src={props.item.url} alt="img" /> : ""} */}
      </Card>
    )

    

    
}


export default SavedContent