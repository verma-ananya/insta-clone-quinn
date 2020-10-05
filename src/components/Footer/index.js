import React, { Component } from 'react';
import "./footer.css";
import {Link} from "react-router-dom";

class Footer extends Component {
    render() { 
        return ( 
            <div className="footer navbar-fixed-bottom">
                <div className="container">
                    <div className="row">
                        <div className="home col-6">
                            <Link to={process.env.PUBLIC_URL + "/"}>
                                <i className="material-icons">home</i>
                            </Link>
                        </div>
                        <div className="calendar col-6">
                            <Link to={process.env.PUBLIC_URL + "/calendar"}>
                                <i className="material-icons">date_range</i>         
                            </Link>                   
                        </div>
                    </div>
                </div>
          </div>
         );
    }
}
 
export default Footer;