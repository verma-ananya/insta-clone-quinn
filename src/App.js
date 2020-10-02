import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navigation/index';
import Post from './components/Post/index';
import Footer from './components/Footer/index';
import Calendar from './components/Calendar/index';

function App() {
  return (
    <div>
        {/* <NavBar/>
        <div>
          <Post />
          <Post />
        </div>
        <Footer/> */}
        <Calendar/>
    </div>
  );
}

export default App;
