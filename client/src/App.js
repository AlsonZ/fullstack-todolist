import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import List from './list/list.js';
import Menu from './menu/menu.js';
import Login from './entry/login.js';
import Register from './entry/register.js';
import {UserProvider} from './entry/userContext.js';
import {ListProvider} from './list/listContext.js';
import './App.css';

function App() {
  return (
    <div className="lazyLoad-background">
      <div className="mid-res-background">
        <div className="high-res-background">
          <div className="body">
            <Router>
              <UserProvider>
                <ListProvider>
                  <Menu/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/" component={List}/>
                </ListProvider>
              </UserProvider>
              <Route exact path="/register" component={Register}/>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
