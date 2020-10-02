import React, { Component } from 'react';
import "./navbar.css";

class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="Nav">
                <div className="Nav-menus">
                    <div className="Nav-brand">
                        <a className="Nav-brand-logo" href="/">
                        Quinn Feed
                        </a>
                    </div>
                </div>
            </nav> 
         );
    }
}
 
export default NavBar;