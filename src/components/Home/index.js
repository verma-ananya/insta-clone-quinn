import React, { Component } from 'react';
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
        alert("API call failed!");
        console.log(error);
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
    return (
      <React.Fragment>
        {this.renderPosts()}
      </React.Fragment>
    );
  }
}
 
export default Home;
