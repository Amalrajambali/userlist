// import './App.css';
import * as React from 'react';
import HomePage from '../../../pages/HomePage';
import UserPage from '../../../pages/UserPage'
import Header from './Header';
import { HashRouter as Router,Routes,Route } from 'react-router-dom';
import SingleUser from './SingleUser';

function App() {
  return (
    <div className="App" >
      <Router>
        <Header/>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/adduser" element={<UserPage/>}/>
        <Route path="/user/:id" element={<SingleUser/>}/>
       </Routes>
       </Router>
    </div>
  );
}

export default App;
