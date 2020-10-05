import React, { Component } from 'react';
import "./home.css";
import Post from '../Post/index';
import request from '../../utils/request.js';
import { formatDate, postSortCompare } from '../../utils/utils';
import moment from 'moment';

const POSTS_API = 'https://quinncareapi.azurewebsites.net/api/assignment/posts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      apiError: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    request.get(POSTS_API)
      .then(({data}) => {
        data.forEach((post, index) => {
          data[index]["timeInSeconds"] = moment(formatDate(post.CreatedOnTimestamp, 10), 'YYYY-MM-DD').unix();
        });
        this.setState({
          posts: data.sort(postSortCompare),
        });
      })
      .catch(error => {
        this.setState({
          apiError: true,
        });
      });
  }

  renderPosts = () => {
    const { posts } = this.state;
    return posts.map((post, index) => {
      return (<Post
        key={index}
        userImage={post.profilePictureUrl}
        userName={post.UserId}
        postDate={post.CreatedOnTimestamp}
        postImages={post.Images}
        caption={post.description}
        location={"Everywhere"}
      />);
    }).reverse();
  }

  render() { 
    const { apiError } = this.state;
    return (
      <React.Fragment>
        {apiError && 
          <div className="box container">
            <span className="message">Couldn't reach the servers!</span>
          </div>
        }
        {this.renderPosts()}
      </React.Fragment>
    );
  }
}
 
export default Home;
