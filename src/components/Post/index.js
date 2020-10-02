import React, { Component } from 'react';
import "./post.css";
import profile from '../../assets/imgs/profile.jpg';
import { Row } from 'react-bootstrap';

class Post extends Component {
    state = {  }
    render() { 
        return (
        <div className="container fluid">
        <article className="Post" ref="Post">
            <header>
                <div className="Post-user">
                    <div className="Post-user-avatar">
                        <img src={require('../../assets/imgs/profile.jpg')} alt="Chris" />
                    </div>
                    <div className="Post-username">
                        <span>Chris Evans</span>
                    </div>
                    <div className="Post-date">
                        <span>29th Sept</span>
                    </div>
                </div>
            </header>
            <div className="Post-image">
                <div className="Post-image-bg">
                    <img alt="Icon Living" src="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" />
                </div>
            </div>
            <div className="Post-caption">
                <strong>Chris Evans</strong> If you are referring to the microsoft community profile url, you can go to the link and sign in your microsoft account by clicking on the avatar icon on the upper right corner.
            </div>
      </article>
      </div> 
       );
    }
}
 
export default Post;