import React, { Component } from 'react';
import "./post.css";
import {formatDate, beautifyDate} from '../../utils/utils';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  nextImage = () => {
    const { 
      currentImageIndex,
    } = this.state;

    const {
      postImages
    } = this.props;

    const imageCount = postImages.length;
    const isLastImage = ((currentImageIndex+1)===imageCount);

    if(isLastImage) {
      return;
    }

    this.setState(prevState => {
      return {
        currentImageIndex: prevState.currentImageIndex + 1,
      };
    });
  }

  previousImage = () => {
    const { 
      currentImageIndex,
    } = this.state;

    const isFirstImage = (currentImageIndex===0);

    if(isFirstImage) {
      return;
    }

    this.setState(prevState => {
      return {
        currentImageIndex: prevState.currentImageIndex - 1,
      };
    });
  }

  render() { 
    const {
      userImage,
      userName,
      postDate,
      postImages,
      caption,
      location,
    } = this.props;

    const {
      currentImageIndex,
    } = this.state;

    const imageCount = postImages.length;
    const showPreviousArrow = (currentImageIndex != 0);
    const showNextArrow = (currentImageIndex != (imageCount - 1));
    
    return (
      <div className="container fluid">
        <article className="Post" ref="Post">
          <header>
            <div className="Post-user row">
              <div className="Post-user-avatar pad-0">
                <img src={userImage} alt={userName} />
              </div>
              <div className="header col-3 pad-0">
                <div className="Post-username">
                  <span>{userName}</span>
                </div>
                <div className="Post-location">
                  <span>{location}</span>
                </div>
              </div>
              <div className="Post-date">
                <span>{beautifyDate(formatDate(postDate,10))}</span>
              </div>
            </div>
          </header>
          <div className="Post-image container-fluid pad-0">
            <div className="row pad-0 modal-row">
              <div className="pad-0 col-1">
                <Link> <i className={"material-icons arrow" + (showPreviousArrow ? "" : " hidden")} onClick={this.previousImage}> navigate_before </i> </Link>
              </div>
              <div className="Post-image-bg pad-4 col-10">
                <img alt={userName+"'s Post"} src={postImages && postImages[currentImageIndex]["ImageUrl"]} />
              </div>
              <div className="pad-0 col-1">
                <Link> <i className={"material-icons arrow" + (showNextArrow ? "" : " hidden")} onClick={this.nextImage}> navigate_next </i> </Link>
              </div>
            </div>
          </div>
          <div className="Post-caption">
            <strong> {userName} </strong> 
            <span> {caption} </span>
          </div>
        </article>
      </div> 
    );
  }
}
 
Post.defaultProps = {
    userImage: "",
    userName: "Username",
    postDate: "PostDate",
    postImages: [],
    caption: "Caption",
}

export default Post;