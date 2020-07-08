import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { UrlContext } from '../contexts/urlContext';


export default class ProfileUpdate extends Component{

    


    constructor() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
            super()
            this.state = {
                'username':decoded.identity.username,
                'email': decoded.identity.email,
                'image':'images/Propic1.png',
                'password':'',
                'confirmpassword':'',
                'secondUsername':'',
                'msg':'',
                'serverUrl': UrlContext._currentValue

            }
        }


    UpdateProfile(){
        var name = this.state.secondUsername
        name===""? name=this.state.username:name=this.state.secondUsername
    
        axios({
            url: this.state.serverUrl +'users/update',
            method: 'POST',
            headers:{
                authorization:'usertoken'
            },
            data:{
                'username':name,
                'email':this.state.email,
                'password':this.state.password,
                'confirmpassword':this.state.confirmpassword
            }
              
        }).then(response => {

            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            console.log('New Username is:',this.state.secondUsername)

            this.setState({
                'username':this.state.secondUsername,
                'email':decoded.identity.email,
                'msg': response.data.msg
            })
            if (response.data.success ==='true') {
                localStorage.removeItem('usertoken')
                window.location = '/login';
            }

        })

    }



    render() {
        return (
            <div>
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">PROFILE</h1>
                </div>

                <div className="col-sm-8 mx-auto">
                    <img src={this.state.image} style={{ width:'15%',height:'auto', border:'solid 1px lightgrey'}} title={this.state.username}/> 
                </div>  
                <br></br>  

                <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>
                                <Input type="username" name="username" id="username" placeholder={this.state.username} onChange={e => {this.setState({'secondUsername': e.target.value})}} />
                            </td>                            </tr>
                            <tr>
                            <td>Email</td>
                                <td>{this.state.email}</td>
                           
                            </tr>
                            <tr>
                            <td>Password</td>
                            <td>
                                <Input type="password" name="newPassword" id="newPassword" placeholder="new password" onChange={e => {this.setState({'password': e.target.value})}}/></td>
                            </tr>
                            <tr>
                            <td>Confirm Password</td>
                            <td>
                                <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" onChange={e => {this.setState({'confirmpassword':e.target.value})}} /></td>
                            </tr>
                            <tr>
                            <td></td>
                            <td>
                               {/* <Button outline color="secondary" size="sm" onClick={this.props.clickMe}>update</Button>*/}
                                <Button outline color="secondary" size="sm" onClick={()=>this.UpdateProfile()} >update</Button>

                            </td>
                            </tr>
                            <p>{this.state.msg}</p>
                        

                        </tbody>
                    </table>
                  </div>
        )
    }
}
