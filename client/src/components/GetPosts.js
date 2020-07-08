import React, { Component } from 'react'
import axios from 'axios'
import like from '../assets/images/like.png';
import dislike from '../assets/images/dislike.png';
import download from '../assets/images/download.png';
import jwt_decode from 'jwt-decode';
import {Container, Row, Col} from "reactstrap";
import {  Button, FormGroup, Form, Input } from 'reactstrap';
import Footer from './Footer'
import moment from 'moment';
import 'moment-timezone';
import { UrlContext } from '../contexts/urlContext';




export default class GetPosts extends Component {

  constructor() {
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
      super()
      this.state = {
         'email':decoded.identity.email,
         'username':decoded.identity.username,
         'comment':'',
         'comments':[],
         //'title':'',
         //'content':'',
         //'category':'',
         'image':'images/Propic1.png',
        // 'file':'',
         //'created':'',
          files:'',
          posts:[],
          'like':'',
          'dislike':'',
          'idLikedPost':'',
          'idDislikedPost':'',
          'serverUrl': UrlContext._currentValue,
          'displaymsg':'',
      
      }
      this.getFile=this.getFile.bind(this)
      this.addComment = this.addComment.bind(this)
      this.onChange = this.onChange.bind(this)
      this.getComments = this.getComments.bind(this)
  }
 

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
}

plusLike = (e) => {
    axios({
      url: this.state.serverUrl + 'plusLike', 
      method: 'POST',
      data:{
        "username":this.state.username,
        "email": this.state.email,
        "id": e.$oid 
      } 
    }).then((response) => {
        console.log(response.data);
        if (response.data.displaymsg){
          // alert(response.data.displaymsg)
          this.setState({ 
            displaymsg : response.data.displaymsg
          })
        }        
        this.getAllPost();
    });        
  } 

  plusDisLike = (e) => {
      axios({
        url: this.state.serverUrl +'plusDislike', 
        method: 'POST',
        data:{
          "username":this.state.username,
          "email": this.state.email,
          "id": e.$oid 
        } 
      }).then((response) => {
          console.log(response.data);
          
          if (response.data.displaymsg){
            // alert(response.data.displaymsg)
            this.setState({ 
              displaymsg : response.data.displaymsg
            })
          }   
          
          this.getAllPost();
      });
  } 
    
        componentDidMount = ()=>{
       
          console.log(this.state.files)
          this.getAllPost();
          this.getComments()
        }
      
    
     


        addComment = (e) =>{
          console.log('add comment')
          

          axios({
            url: this.state.serverUrl +'addcomment',
            method: 'POST',
            data:{
              "username":this.state.username,
              "email": this.state.email,
              "comment": this.state.comment,
              "id": e.$oid //here should get the post id field
            }
        }).then(response => {
          const data = response.data;
          this.getAllPost();
          this.setState({comments:data})
            console.log("add new comments")
            this.getComments(e.$oid)

        })
        }


        getComments = (e) => {
          axios({
            url: this.state.serverUrl +'getcomments',
            method: 'POST',
            data:{
              "id": e//e.$oid //here should get the post id field
            }
        }).then(response => {
          const data = response.data;
          this.setState({comments:data})
            console.log("get all comments")
        })
      }

        getAllPost = () => {
            axios.get(this.state.serverUrl +'users/posts')
            .then((response) => {
              const data = response.data;
              this.setState({
                posts:data 
              })
              console.log('Data has been received!');
            })
            .catch(()=>{
              alert('Error retrieving data!!');
          });
        }


        getFile(e) {
          const fName =e.file
          const urlFile =this.state.serverUrl +'file/'+fName
          console.log(urlFile)
          axios({
            url: urlFile, //your url
            method: 'Get',
            responseType: 'blob',
            data:{
              "file":  fName
            } // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download',fName); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
      }





      displayBlogPost = (posts)=> {

        if(!posts.length) return <h6>There is not any Post yet</h6>;
        return posts.map((posts) => (

          <Col md={{ span: 3, offset: 1 }}   sm="12">
             
              <div className="jumbotron mt-5 " style={{"width":"70%"}}  >
             
                <div className="row">
                  <div className="col-sm-3 mt-0">
                    <img src={this.state.image} style={{"width": "60px","height":"auto","margin-top":"-10px"}}/>
                  </div>

                  <div className="col-sm-7 d-flex">
                    <a className=" " href="/profile" style={{color:'#E67E22'}} >{posts.username}</a>
                    <small className="text-muted mx-3">{moment(posts.date.$date).format("DD/MMM/YYYY")}</small>

                    
                  <div className="col-sm-1 mr-2">
                    <h6 className="ml-3" style={{"color": "darkgrey"}}>
                      {posts.like.length}
                    </h6>
                  </div>
                  <div className="col-sm-1 mx-1">
                    <img src={like} className="like" title="like" onClick={()=>this.plusLike(posts._id)}/>
                  </div>
                  <div className="col-sm-1 mx-1">
                    <img src={dislike} className="dislike" title="dislike" onClick={()=>this.plusDisLike(posts._id)}/>
                  </div>
                  <div className="col-sm-1 ml-2">
                    <h6 style={{"color": "darkgrey"}}>
                      {posts.dislike.length}
                    </h6>
                  </div>

               
                </div>

                </div>
                <br></br>
                  <small style={{color:'#E67E22'}}>{this.state.displaymsg}</small>

                <hr />
                    <h5 className="text-left font-weight-bold mt-2" style={{color:'#E67E22'}}>{posts.title}</h5>
                <p className=" text-left " style={{"word-wrap": "break-word"}} ><span className="font-weight-bold" style={{color:'#E67E22'}}>Category:</span> {posts.category}</p>
                <p className=" text-left " style={{"word-wrap": "break-word"}} style={{color:'#01061c'}} >{posts.content}</p>

              
                <div className="row my-4 justify-content-start">
                <div className="col-sm-1">
                    <img src={download} className="downloadImg" 
                    onClick={this.getFile.bind(this,posts)} 
                    title="download"/>
                  </div>
                  <div className="col-sm-3">
                    <p className="text-nowrap" style={{"width": "6rem"}}>
                      {posts.file}
                    </p>
                  </div>
                </div>

                <div className="row postBox mx-0 ">

                {posts.comments.map((value, index) => {
                  return(
                    <React.Fragment>
                      <div className="row" >
                          <div className="col-sm-8" >
                            <a className="mt-2 ml-2 small" href="#" style={{color:'#E67E22'}}>{posts.comments[index]['username']}</a>
                            <small className="text-muted mx-3">{moment(posts.comments[index].date.$date).format("DD/MMM/YYYY")}</small>
                          </div>
                      </div>
                      <div className="row col-sm-12" >
                        <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} > {posts.comments[index]['comment']}</p>
                        <div className="divider"></div>
                      </div>
                    </React.Fragment>
                  );
                })}

                  <div className="row col-sm-12 py-2 mx-0" >
                    <Form inline>
                      <FormGroup>
                        <Input type="textarea" name="text" id={posts._id} placeholder='new comment' onChange={e=>{this.setState({comment:e.target.value, displaymsg : ''})}}/>
                      </FormGroup>
                      <Button className="ml-1" color="secondary" onClick={()=>this.addComment(posts._id)}   size="sm">send</Button>
                    </Form>
                  </div>
                  
                </div>

            </div>
         </Col>

            ));
    }
       
  



    render() {
        console.log('State',this.state);
   

        return (
             <Container onClick={e=>{this.setState({ displaymsg : ''})}}>
                <Row className="mt-5 float-right ">
                <div class="card" style={{"width": "18rem"}}>
              <img class="card-img-top" src={'images/img4.jpg'} alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Our side bar</h5>
                <p class="card-text">Flaskpro presents Materialand.</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Sharing Materials</li>
                <li class="list-group-item">Advance Web</li>
                <li class="list-group-item">Responsive Design</li>
              </ul>
              <div className="card-body">
                <a href="#" className="card-link ">About us</a>
                <a href="#" className="card-link "> University Department</a>
              </div>
            </div>
              </Row>
                <Row className="blog mt-5">
                  {this.displayBlogPost(this.state.posts)}

                </Row>
             
                <Footer />

             </Container>


                
                
                    

        )
    }
}
