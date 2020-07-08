import React, { Component } from 'react'
import {  Input } from 'reactstrap';
import Footer from './Footer';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { UrlContext } from '../contexts/urlContext';




export default class Post extends Component {
    constructor() {
        super()
        this.state = {
            email:'',
            title: '',
            content: '',
            category:'',
            file:'null',
            'serverUrl': UrlContext._currentValue
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleDropdownChange=this.handleDropdownChange.bind(this)
    }
    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            email: decoded.identity.email
        })
    }
    handleDropdownChange(e){
        this.setState({category:e.target.value})
    }


    handleFile = (e) => {
        //let handlefile = e.target.files[0];
        let file =e.target.files[0]
        this.setState({file:file})


    }
    getAllPost = () => {
        axios.get(this.state.serverUrl +'users/posts')
        .then((response) => {
          const data = response.data;
          this.setState({posts:data})
          console.log('Data has been received!');
        })
        .catch(()=>{
          alert('Error retrieving data!!');
      });
    }
    getMyPost = () => {
        axios({
            url: this.state.serverUrl +'get_post/${this.state.email}',
            method: 'GET',
            headers:{
                authorization:'usertoken'
            }
        }).then((response) => {
            const data = response.data;
            this.setState({posts:data})
            console.log('Data has been received!');
          })
          .catch(()=>{
            alert('Error retrieving data!!');
        });
    }

    handleUpload(e){
        console.log(this.state,"The state --- $$$$")
        let file = this.state.file
        let title = this.state.title
        let content = this.state.content
        let category = this.state.category
        let email = this.state.email
        let formdata = new FormData()

        formdata.append('file',file)
        formdata.append('title',title)
        formdata.append('content',content)
        formdata.append('category',category)
        formdata.append('email',email)

   axios({
            url: this.state.serverUrl +'users/post',
            method: 'POST',
            headers:{
                authorization:'usertoken'
            },
            data:formdata
              
        }).then(response => {
            this.getAllPost()
            this.props.history.push('/allpost')
            console.log("Added new post!")
        })


    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit (e) {
        e.preventDefault()
     
        
    }
  



    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-8 mt-5 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">New Post</h1>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="title"
                                className="form-control"
                                name="title"
                                placeholder="Title of your post"
                                value={this.state.title}
                                onChange={this.onChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <Input type="select" name="category" id="category" onChange={this.handleDropdownChange}>
                            <option value="Advance Web Technology"></option>
                            <option value="Advance Web Technology">Advance Web Technology</option>
                            <option value="Peer to Peer">Peer to Peer</option>
                            <option value="Internet of Things">Internet of Things</option>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content </label>
                            <input type="content"
                                className="form-control" style={{height:"120px"}}
                                name="content"
                                placeholder="Content.."
                                value={this.state.content}
                                onChange={this.onChange} />
                        </div>
                        
                      <div className="">
                          <label> Select File</label>
                          <input className="mb-2 "type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                          </div>
                        
                        <p className="text-info">
                            Supported Formats: JPG-PNG-PDF-Zip
                        </p>

                        <button type="submit" onClick={(e)=>this.handleUpload(e)} className="btn btn-lg btn-dark btn-block">
                            Post
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
        )
    }
}
