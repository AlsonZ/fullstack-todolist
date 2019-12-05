import React from 'react';
import List from './list/list.js';
import Menu from './menu/menu.js';
import './App.css';

function App() {
  return (
    <div className="lazyLoad-background">
      <div className="mid-res-background">
        <div className="high-res-background">
          <div className="body">
            <Menu/>
            <List/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
