import React, { Component } from 'react';
import "./footer.css";

class Footer extends Component {
    render() { 
        return ( 
            <div className="footer">
                <div className="container">
                    {/* <i class="fa fa-home" aria-hidden="true"></i> */}
                    <div className="row">
                        <div className="home col-6">
                            <i class="material-icons">home</i>
                        </div>
                        <div className="calendar col-6">
                            <i class="material-icons">date_range</i>                            
                        </div>
                    </div>
                </div>
          </div>
         );
    }
}
 
export default Footer;