import React, { PureComponent } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import 'react-calendar/dist/Calendar.css';
import request from '../../utils/request.js';
import { isEmpty, isNil, formatDate, postSortCompare, beautifyDate } from '../../utils/utils';
import moment from 'moment';
import ModalView from '../ModalView';

const POSTS_API = 'https://quinncareapi.azurewebsites.net/api/assignment/posts';

const findFirstPost = (sortedPosts, timeInSeconds) => {
  if(isNil(sortedPosts) || isEmpty(sortedPosts) || timeInSeconds<0) return -1;

  const n = sortedPosts.length;
  var l = 0;
  var r = n-1;
  
  while(l<=r) {
    var mid = parseInt(String((l+r)/2));
    
    if(sortedPosts[mid].timeInSeconds < timeInSeconds) l = mid + 1;
    else if(sortedPosts[mid].timeInSeconds > timeInSeconds) r = mid - 1;
    else return mid;
  }

  return -1;
}

class ImageCalendar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      calDate: new Date(),
      isShowingImageModal: false,
      currentExpandedPostIndex: null,
      currentExpandedImageIndex: null,
      apiError: false,
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
          data[index]["imageCount"] = post.Images.length;
        });
        const sortedPosts = data.sort(postSortCompare);
        const sortedPostImages = [];
        sortedPosts.forEach((post, index) => {
          post.Images.forEach(image => {
            sortedPostImages.push({
              postIndex: index,
              imageUrl: image["ImageUrl"]
            });
          });
        });
        this.setState({
          posts: sortedPosts,
          images: sortedPostImages,
        });
      })
      .catch(error => {
        this.setState({
          apiError: true,
        });
      });
  }

  nextExpandedImage = () => {
    const { 
      posts,
      currentExpandedPostIndex,
      currentExpandedImageIndex
    } = this.state;

    const totalPostCount = posts.length;
    const currentPostImageCount = posts[currentExpandedPostIndex].imageCount;
    const isCurrentPostOver = ((currentExpandedImageIndex+1)===currentPostImageCount);

    if(isCurrentPostOver && (currentExpandedPostIndex===(totalPostCount-1))) {
      alert("No more posts available!");
      return;
    }

    this.setState(prevState => {
      return {
        ...prevState,
        currentExpandedPostIndex: isCurrentPostOver 
                                    ? prevState.currentExpandedPostIndex + 1
                                    : prevState.currentExpandedPostIndex,
        currentExpandedImageIndex: isCurrentPostOver
                                    ? 0
                                    : prevState.currentExpandedImageIndex + 1,
      };
    });
  }

  previousExpandedImage = () => {
    const { 
      currentExpandedPostIndex,
      currentExpandedImageIndex
    } = this.state;

    const isCurrentPostOver = (currentExpandedImageIndex===0);

    if(isCurrentPostOver && (currentExpandedPostIndex===0)) {
      alert("No more posts available!");
      return;
    }

    this.setState(prevState => {
      return {
        ...prevState,
        currentExpandedPostIndex: isCurrentPostOver 
                                    ? prevState.currentExpandedPostIndex - 1
                                    : prevState.currentExpandedPostIndex,
        currentExpandedImageIndex: isCurrentPostOver
                                    ? 0
                                    : prevState.currentExpandedImageIndex - 1,
      };
    });
  }
 
  renderExpandedImageModal = () => {
    const { 
      posts,
      currentExpandedPostIndex,
      currentExpandedImageIndex
    } = this.state;

    const totalPostCount = posts.length;
    const currentPost = posts[currentExpandedPostIndex];
    const currentPostImageCount = currentPost.Images.length;

    const isFirstPost = (currentExpandedPostIndex===0);
    const isFirstImage = (isFirstPost && (currentExpandedImageIndex===0));

    const isLastPost = (currentExpandedPostIndex===(totalPostCount-1));
    const isLastImage = (isLastPost && (currentExpandedImageIndex===(currentPostImageCount-1)));

    const currentImageUrl = currentPost.Images[currentExpandedImageIndex]["ImageUrl"];

    return (
      <ModalView
        header={
          <div className="header-user row">
            <div className="Post-user-avatar pad-0">
              <img src={currentPost.profilePictureUrl} alt={currentPost.UserId} />
            </div>
            <div className="header col-8">
              <div className="header-username">
                <span>{currentPost.UserId}</span>
              </div>
              <div className="Post-date">
                <span>{formatDate(currentPost.CreatedOnTimestamp, 10)}</span>
              </div>
            </div>
          </div>
        }
        size={"lg"}
        footer={
          <div className="Post-caption">
            <strong> {currentPost.UserId} </strong> 
            <span> {currentPost.description} </span>
          </div>
        }
        onClose={this.resetAction}
        onNext={this.nextExpandedImage}
        onPrevious={this.previousExpandedImage}
        showNextArrow={!isLastImage}
        showPreviousArrow={!isFirstImage}
      >
        <img className="modal-img" src={currentImageUrl}/>
      </ModalView>
    );
  }

  showExpandedImageModal = (currentExpandedPostIndex) => {
    this.setState({
      isShowingImageModal: true,
      currentExpandedPostIndex,
      currentExpandedImageIndex: 0
    });
  }

  resetAction = () => {
    this.setState({
      isShowingImageModal: false,
      currentExpandedPostIndex: null,
      currentExpandedImageIndex: null
    });
  }

  onChange = (calDate) => {
    this.setState({
      calDate: calDate,
    });
  }

  renderDateTileContent = ({ date, view }) => {
    const { posts } = this.state;
    if(isNil(posts) || isEmpty(posts)) return null;
    const tileDate = formatDate(date.toISOString(), 10);
    const tileTimeInSeconds = moment(tileDate, 'YYYY-MM-DD').unix();
    const firstPostIndex = findFirstPost(posts, tileTimeInSeconds);
    
    if ((firstPostIndex === -1) && (view === 'month')) return (
      <div className="date-image">
        <img src={"https://www.vhv.rs/dpng/d/102-1021069_empty-open-box-png-transparent-png.png"}/>
      </div>
    );
    const firstPost = posts[firstPostIndex];

    return (view === 'month')
              ? (
                  <div className="date-image">
                    <img 
                      src={firstPost.Images[0]["ImageUrl"]} 
                      alt={firstPost.UserId} 
                      key={tileDate}
                      onClick={() => {
                        this.showExpandedImageModal(firstPostIndex);
                      }}
                    />
                  </div>
                )
              : null;
  }

  render() {
    const {
      calDate,
      isShowingImageModal,
      apiError
    } = this.state;

    return (
      <React.Fragment>
        {apiError && 
          <div className="box container">
            <span className="message">Couldn't reach the servers!</span>
          </div>
        }
        {isShowingImageModal && this.renderExpandedImageModal()}
        <div className="result-calendar">
          <Calendar
            onChange={this.onChange}
            value={calDate}
            tileContent={this.renderDateTileContent}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ImageCalendar;
