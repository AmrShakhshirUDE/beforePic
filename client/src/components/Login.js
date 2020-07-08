import React, { Component } from 'react'
import Profile from './Profile'
import Footer from './Footer'
import axios from 'axios'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            result:'',
            errors:{}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
   

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    login = user => {
        return axios
            .post("users/login", {
                email: user.email,
                password: user.password
            })
            .then(response => {
                this.setState({
                    "result":response.data.msg
                })
                localStorage.setItem('usertoken', response.data.token)
                return response.data.token
                
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSubmit (e) {
        e.preventDefault()
         
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.login(user).then(res => {
            if (res) {
                this.props.history.push(`/profile`)
            }
            else 
                return this.state.result           
             //this.props.history.push(`/home`)

            
             
           
        })
    }




        /* this.login(user).then(res => {
            if (!res.error) {
                this.props.history.push(`/home`)
            }
            else {
                this.props.history.push(`/register`)
            }*/
                   
    

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                                Sign in
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

export default Login
