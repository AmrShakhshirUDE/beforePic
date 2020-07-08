import React, { Component } from 'react'
import Footer from './Footer'
import axios from 'axios'
import { UrlContext } from '../contexts/urlContext';


class Register extends Component {
        constructor() {
        super()
        this.state = {
            username:'',
            email: '',
            password: '',
            result:'',
            'serverUrl': UrlContext._currentValue
        }


        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

 
        axios({
            url: this.state.serverUrl +'users/register',
            method: 'POST',
            data:{
              "username":this.state.username,
              "email": this.state.email,
              "password": this.state.password
            }
        }).then(response => {
            this.setState({
                "result":response.data.msg
            })
            if (response.data.success) {
                window.setTimeout(function(){

                    window.location = '/login';
            
                }, 6000);
                window.location = '/login';
            }
            console.log("Registered")
            //this.props.history.push(`/login`)

        })
                
      
    }

    
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={this.state.username}
                                    onChange={this.onChange} />
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-dark btn-block">
                                Register
                            </button>
                            <div className="text-danger mt-2"> {this.state.result}</div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Register
