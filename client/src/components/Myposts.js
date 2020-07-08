import React, { Component, useEffect } from 'react';
import {Container, Row, Col} from "reactstrap";
import Footer from './Footer';
import { Button, Form,FormGroup,  Input} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import like from '../assets/images/like.png';
import dislike from '../assets/images/dislike.png';
import download from '../assets/images/download.png';
import {Modal, ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import { UrlContext } from '../contexts/urlContext';
import moment from 'moment';




export default  class AllPosts extends Component {
  constructor() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    super()
    this.state = {
        'email':decoded.identity.email,
        //'newemail':[],
        'username':decoded.identity.username,
        'title':'',
        'content':'',
        'category':'',
        'image':'images/Propic1.png',
        'file':'',
         posts:[],
         'msg':'',
         'show':true,
         modalIsOpen:false,
         'serverUrl': UrlContext._currentValue,
         id:null,
         Open:false

    }
    this.updatePost = this.updatePost.bind(this)
    
}

    componentDidMount () {
     
        this.getMyPost()
        
    }

    getMyPost = (e) => {
        axios.post(this.state.serverUrl +'get_post', {            
                email:this.state.email
            },{
            headers:{
                authorization:'usertoken'
            },
            
        }).then((response) => {
            console.log(response);
            this.setState({posts:response.data})
            console.log('Data has been received!');
            this.getAllPost()

          })
          .catch((error)=>{
           // alert('Error retrieving data!!');
           console.log('No Data')
           console.log(error.response);
           console.log('State',this.state);
           
        });
    }
  
    toggleModal(posts){
      this.setState({
      modalIsOpen:!this.state.modalIsOpen,
      id: posts._id,
      title: posts.title,
      content: posts.content,
      category: posts.category,
     // file: posts.file
    })
    }
    toggleModal1(posts){
      this.setState({
      Open:!this.state.Open,
      id: posts._id,
      file: posts.file
    })
    }
    handleFile = (e) => {
      let file =e.target.files[0]
      this.setState({file:file})
  }
  updateFile(e){
    let file = this.state.file
    let id = e.$oid
    let formdata = new FormData()
    formdata.append('file',file)
    formdata.append('id',id)
  
    axios({
            url: this.state.serverUrl + 'updatefile',
            method: 'POST',
            headers:{
                authorization:'usertoken'
            },
            data:formdata
              
        }).then(response => {
            this.getMyPost()
             window.location='/mypost'

        })
}
   


    updatePost=(e)=>{
      //let file = this.state.file
      let title = this.state.title
      let content = this.state.content
      let category = this.state.category
      let id = e.$oid
      let formdata = new FormData()
     // formdata.append('file',file)
      formdata.append('id',id)
      formdata.append('category',category)
      formdata.append('title',title)
      formdata.append('content',content)


      axios({
       url: this.state.serverUrl + 'updatepost', 
        method: 'POST',
        headers: {
          authorization:'usertoken'
        },
        data: formdata
      }).then((response) => {
    
        console.log("updated new post!")

      this.getMyPost()
      //window.location = '/mypost';

     });  
    }
    
    deletePost = (e) => {
      axios({
        url: this.state.serverUrl +'deletepost', 
        method: 'DELETE',
        data:{
          "id": e.$oid
        } 
      }).then((response) => {
        this.setState({        
          'msg': response.data.msg
      })
      this.getMyPost()
      });        
    } 

    getFile(e) {
      console.log(e)
      console.log('hallo download')
      console.log(e.file)
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

   


    displayMyPost = (posts) =>{
        if(!posts.length) return null;

        return posts.map((posts,index)=>(
            <Container>


            <Row> 
                <Col md={{ span: 3, offset: 2 }}   sm="12">
              <div className=" jumbotron mt-5" style={{"width":"70%"}}>
              <div className="row">
                <div className="col-sm-3">
                  <img src={this.state.image} style={{"width": "50px","height":"auto"}}/>
                </div>
    
                <div className="col-sm-8">
          <a className="mt-2 ml-2" href="/profile">{posts.username}</a>
          <small className="text-muted mx-3">{moment(posts.date).format("DD/MMM/YYYY ")}</small>
         

        <Button className="mx-2" outline color="info" size="sm" onClick={()=>this.toggleModal(posts)}>Update</Button>
        <Button outline color="danger" size="sm" onClick={()=>this.deletePost(posts._id)} >Delete Post</Button>
                </div>
                
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-7">
                  <h2 className="text-left ml-3">{posts.title}</h2>
                </div>
                <div className="col-sm-1 ">
                    <h6 className="ml-3" style={{"color": "darkgrey"}}>
                      {posts.like.length}
                    </h6>
                  </div>
                <div className="col-sm-1">
                  <img src={like} className="like" title="like"/>
                </div>
                <div className="col-sm-1">
                  <img src={dislike} className="dislike" title="dislike"/>
                </div>
                <div className="col-sm-1 mx-2">
                    <h6 style={{"color": "darkgrey"}}>
                      {posts.dislike.length}
                    </h6>
                  </div>
              </div>
              <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} ><span className="font-weight-bold">Category:</span> {posts.category}</p>
              <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} >{posts.content}</p>
  
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
                    <Button className="mx-2" outline color="info" size="sm" onClick={()=>this.toggleModal1(posts)}>Update file</Button>
            
                </div>
              
  
            {/* comment box */}
  
              <div className="row postBox mx-0 ">
  

{posts.comments.map((value, index) => {
  return(
    <React.Fragment>
      <div className="row">
          <div className="col-sm-8">
            <a className="mt-2 ml-2 small" href="/profile">{posts.comments[index]['username']}</a>
            <small className="text-muted mx-3">date</small>
          </div>
      </div>
      <div className="row col-sm-12" >
        <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} > {posts.comments[index]['comment']}</p>
        <div className="divider"></div>
      </div>
    </React.Fragment>
  );
})}
               
           
  
   
  </div>
  </div>
  
                  
       </Col>
       </Row>
       </Container>

        ));
    }


    
    render () {
        
      //const requiredItem = this.state.requiredItem;
      //let modalData = this.state.posts[requiredItem];
      
            return (

               
                <div>
                    <div className="blog mt-5 mx-auto">
                       <h2 className="mx-auto offset-lg-5 ml-3"> Here are your posts: </h2>
                       <div className="mx-auto font-weight-bold">{this.state.msg}</div>
                        {this.displayMyPost(this.state.posts)}
                    </div>
                    <Modal isOpen={this.state.modalIsOpen} id={this.state.id} title={this.state.title} content={this.state.content} category={this.state.category} file={this.state.file}>
                      <ModalHeader toggle={this.toggleModal.bind(this)}>
                        Update your post
                      </ModalHeader>
                      <ModalBody>
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
            <label htmlFor="title">Title</label>
                            <input type="title"
                                className="form-control"
                                name="title"
                                placeholder={this.state.title}
                                value={this.state.title}
                                onChange={e => {this.setState({'title': e.target.value})}}/>
                        </div>
                        <div className="form-group">
        <label htmlFor="category">Category</label>
                            <Input type="select" name="category" id="category" placeholder={this.state.category} onChange={e => {this.setState({'category': e.target.value})}}>
                            <option value="Advance Web Technology"></option>
                            <option value="Advance Web Technology">Advance Web Technology</option>
                            <option value="Peer to Peer">Peer to Peer</option>
                            <option value="Internet of Things">Internet of Things</option>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content"> Content</label>
                            <input type="content"
                                className="form-control" style={{height:"120px"}}
                                name="content"
                                placeholder={this.state.content}
                                value={this.state.content}
                                onChange={e => {this.setState({'content': e.target.value})}} />
                        </div>
                       
                    

                        <button type="submit" onClick={(e)=>this.updatePost(this.state.id)} className="btn btn-lg btn-dark btn-block">
                            Update
                        </button>
                        <button type="submit" onClick={this.toggleModal.bind(this)} className="btn btn-lg btn-dark btn-block">
                            Cancel
                        </button>
                    </form>                     
                    </ModalBody>
                     
                      
                    </Modal>

                    <Modal isOpen={this.state.Open} id={this.state.id} >
                      <ModalHeader toggle={this.toggleModal1.bind(this)}>
                        Update your file
                      </ModalHeader>
                      <ModalBody>
                      
               
                      <div className="my-3">
                          <label> Select File</label>
                          
                          <input className="mb-2 "type="file" 
 name="file" onChange={(e)=>this.handleFile(e)} />
                          </div>                   
                        <button type="submit" onClick={()=>this.updateFile(this.state.id)}  className="btn btn-lg btn-dark btn-block">
                            Update
                        </button>
                        <button type="submit" onClick={this.toggleModal1.bind(this)} className="btn btn-lg btn-dark btn-block">
                            Cancel
                        </button>
                    </ModalBody>
                    </Modal>

                
                </div>
            
            )
        }
            
    }
