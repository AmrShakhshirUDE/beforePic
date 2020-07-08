import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import {Modal, ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import axios from 'axios';


export default class ProfileNormal extends Component{
    constructor(props) {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        super(props)
        this.state = {
            'username':decoded.identity.username,
            'email': decoded.identity.email,
            image:'images/Propic1.png',
            secondimage:'',
            Open:false,
            msg:'',
            file:'null',


        }
    }
    

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            email: decoded.identity.email
        })
    }

  

  
      handleFile = (e) => {
        let file =e.target.files[0]
        this.setState({file:file})
    }
    imageUpload(){
        let email = this.state.email
        let  file = this.state.file
        let formdata = new FormData()

        formdata.append('file',file)
        formdata.append('email',email)
        axios({
            url: 'http://localhost:3000/profileUpload',
            method: 'POST',
            headers:{
                authorization:'usertoken'
            },
            data:formdata
              
        }).then(response => {
    
            console.log('halllo')
           
            //getAllPost()
        })
     


    }
    handleImagePreview(previewEvent) {
        this.setState({
            file: URL.createObjectURL(previewEvent.target.files[0])
        })
    }

 


    render() {
        return (
            <div>
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">PROFILE</h1>
                </div>
                
                <div className="font-weight-bold text-success">{this.state.msg}</div>

                <div className="col-sm-8 mx-auto">
                    <img src={this.state.image} style={{ width:'15%',height:'auto', border:'solid 1px lightgrey'}} title={this.state.username}/> 
                </div>  
                

                <div className="">
                    
                          <input className="mb-2 "type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                          </div>
                        
                          <button onClick={this.imageUpload()}>upload</button>




                 {/* <input style={{display:'none'}} type='file' onChange={(e)=>this.handleFile(e)} ref={fileInput =>this.fileInput = fileInput}/>
                <button onClick={()=>this.fileInput.click()}>Choose pictures</button><br/> */}
               <br></br>
                <table className="table col-md-6 mx-auto">
                    <tbody>
                      <tr>
                        <td>Username</td>
                        <td onChange={this.change}>{this.state.username} </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td onChange={this.change}>{this.state.email} </td>
                      </tr>
                      <tr>
                          <td></td>
                          <td>
                            <Button className="btn btn-dark" size="lg" onClick={this.props.clickMe}>update</Button>
                          </td>
                        </tr>
                        </tbody>
                  </table>
                

                
            </div>
        )
    }

}
