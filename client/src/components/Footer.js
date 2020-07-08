import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (

            <div className="container-fluid border-top border-secondary my-5 ">
                <footer className="page-footer font-small  ">

                    <div className="footer-copyright text-center  py-3">© 2020 Copyright:
                        <a href="" style={{color: '#E67E22'}}> FlaskPro Group</a>
                    </div>

                </footer>
            </div>

        )
    }
}
