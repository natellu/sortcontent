import React from "react"
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap"

class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: props.name,
      searchvalue: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.resetClick = this.resetClick.bind(this)
    this.updateContent = this.updateContent.bind(this)
  }
  

  onClick(){
    sessionStorage.clear()
  }

  updateContent(){
    sessionStorage.removeItem("character")
  }

  handleChange(event){
    this.setState({searchvalue: event.target.value})
  }

  resetClick(){
    console.log("clicked")
    this.setState({searchvalue: ""}, () => {
      this.props.onSearchSubmit(this.state.searchvalue)  
    })
  }

    render(){
      return(
        <Col md={12} className="head">
          <Row>
            <Col md={2}>
            Logged in as: {this.state.username}     
            </Col>
            <Col md={1}>
              <a href={process.env.REACT_APP_REDIRECTURL}><Button variant="outline-secondary" size="sm" onClick={this.onClick}>Logout</Button></a>  
            </Col>
            <Col md={1}>
            <a href={process.env.REACT_APP_REDIRECTURL}><Button variant="outline-info" size="sm" onClick={this.updateContent}>Update</Button></a>  
            </Col>
            <Col md={2}></Col>

            <Col md={6}>
              <InputGroup className="mb-3">
                 
                <FormControl
                  placeholder="Search for Subreddit and Title (for now) "
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  onChange={this.handleChange}
                  value={this.state.searchvalue}
                />
                <InputGroup.Append>
                 <Button variant="outline-secondary" type="button" onClick={() => this.props.onSearchSubmit(this.state.searchvalue)}>Search</Button>
                 <Button variant="outline-secondary" type="button" onClick={this.resetClick}>Clear</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        
          
        </Col>
      )
    }
    

    

    
}

export default Header