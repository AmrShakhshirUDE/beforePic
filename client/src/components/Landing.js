import React, { Component } from 'react'
import Slider from './SlideShow'
import Footer from './Footer'
import { Row,Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';

import { Link } from 'react-router-dom'





export default class Landing extends Component {
    render() {
        return (
            <div className="container-fluid px-0 wx-0">

                <Slider/> 

                
                <Row className="justify-content-md-center mt-5 ">
                    <div className="col-sm-3">
                        <Card style={{'border': 'none','background-color': 'whitesmoke'}}>
                            <CardImg top style={{'width': '25%', 'margin':'0 auto'}} width="100%" src={require ('../assets/images/aboutus.png')} alt="aboutus" />
                            <CardBody>
                            <CardTitle className={ 'text-center'}style={{color:'#01061c', fontWeight: "bold"}}>About us</CardTitle>
                            <CardText>This with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                            <CardText>
                                <small className="text-muted">FlaskPro Group</small>
                            </CardText>
                            </CardBody>
                        </Card>
                    </div>  
                    <div className="col-sm-3">
                        <Card style={{'border': 'none','background-color': 'whitesmoke'}}>
                            <CardImg top style={{'width': '25%', 'margin':'0 auto'}} width="100%" src={require ('../assets/images/members.png')} alt="members" />
                            <CardBody>
                            <CardTitle className={ 'text-center'} style={{color:'#01061c', fontWeight: "bold"}}>Members</CardTitle>
                            <CardText className={ 'text-center'}>
                                Baohui Deng
                                <br></br>
                                <small><a href={'https://github.com/tannazvhd'}style={{color:'#E67E22'}}>github</a></small>
                                <br></br>
                                Tannaz Vahidi
                                <br></br>
                                <small><a href={'https://github.com/tannazvhd'}style={{color:'#E67E22'}}>github</a></small>
                                <br></br>
                                Amr Shakhshir
                                <br></br>
                                <small><a href={'https://github.com/tannazvhd'}style={{color:'#E67E22'}}>github</a></small>
                            </CardText>
                            <CardText>
                                <small className="text-muted"></small>
                            </CardText>
                            </CardBody>
                        </Card>
                    </div>  
                    <div className="col-sm-3">
                        <Card style={{'border': 'none','background-color': 'whitesmoke'}}>
                            <CardImg top style={{'width': '25%', 'margin':'0 auto'}} width="100%" src={require ('../assets/images/goal.png')} alt="goals" />
                            <CardBody>
                            <CardTitle  className={ 'text-center'} style={{color:'#01061c', fontWeight: "bold"}}>Goals</CardTitle>
                            <CardText>This  with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                            <CardText>
                                <small className="text-muted"></small>
                            </CardText>
                            </CardBody>
                        </Card>
                    </div>         
                </Row>  
                <br></br>
                <Footer />
            </div>
        )
    }
}
