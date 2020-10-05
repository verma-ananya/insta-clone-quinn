import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navigation/index';
import Footer from './components/Footer/index';
import ImageCalendar from './components/ImageCalendar/index';
import Home from './components/Home';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  transition: {
    duration: 3,
  },
}

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Switch>
          <Route
            path= {process.env.PUBLIC_URL + "/calendar"}
          >
            <motion.div className="calendar"
              initial="initial"
              animate="in"
              transition="transition"
              variants={pageVariants}
            >
              <NavBar/>
              <div className="content-area">
                <ImageCalendar/>
              </div>
              <Footer/>
            </motion.div>
          </Route>

          <Route
            path={process.env.PUBLIC_URL + "/"}
          >
            <motion.div className="home"
              initial="initial"
              animate="in"
              transition="transition"
              variants={pageVariants}
            >
              <NavBar/>
                <div className="content-area">
                  <Home />
                </div>
              <Footer/>
            </motion.div>
          </Route>
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
