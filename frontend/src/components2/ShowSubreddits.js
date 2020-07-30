import React from 'react'
import { Button, Card } from 'react-bootstrap'

function ShowSubreddits(props){
    return(
        <Card className="col-md-3">
            <Card.Body>
                <Card.Title>
                    {props.item}
                </Card.Title>
                <Button variant="secondary" onClick={() => props.onSearchSubmit(props.item)}>show</Button>
            </Card.Body>
        </Card>
    )
}

export default ShowSubreddits