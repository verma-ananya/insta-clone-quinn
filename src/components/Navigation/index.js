import React, { Component } from 'react';
import "./navbar.css";
import {Link} from "react-router-dom";

class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="Nav">
                <div className="Nav-menus">
                    <div className="Nav-brand">
                        <Link className="Nav-brand-logo" to={process.env.PUBLIC_URL + "/"}>
                            Quinn Feed
                        </Link>
                    </div>
                </div>
            </nav> 
         );
    }
}
 
export default NavBar;