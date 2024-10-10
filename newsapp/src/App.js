
import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News  from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
    //ApiKey=process.env.REACT_APP_NEWS_API;
    ApiKey='2746efea66414718b52b287eaaf891b3';
  state={
    process:0
  }
  setprogress=(process)=>{
    this.setState({process:process});
  }

  render() {
    return (
      <div  >
      <div style={{backgroundImage:' linear-gradient(to right, #00b09b, #96c93d)'}} >
        <Router>
      <NavBar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.process}
        height={3}
       
      />
      <Switch>
        <Route exact path='/'><News setprogress={this.setprogress} ApiKey={this.ApiKey} key="general/"  pageSize={8} country='us' cat='general'   /></Route>
        <Route exact path='/entertainment'><News setprogress={this.setprogress} key="entertainment/" pageSize={8} country='us' cat='entertainment' ApiKey={this.ApiKey} /></Route>
        <Route exact path='/business'><News setprogress={this.setprogress} key="business/" pageSize={8} country='us' cat='business' ApiKey={this.ApiKey} /></Route>
        <Route exact path='/health'><News setprogress={this.setprogress} key="health/" pageSize={8} country='us' cat='health' ApiKey={this.ApiKey} /></Route>
        <Route exact path='/science'><News setprogress={this.setprogress} key="science/" pageSize={8} country='us' cat='science' ApiKey={this.ApiKey} /></Route>
        <Route exact path='/sports'><News setprogress={this.setprogress} key="sports/"  pageSize={8} country='us' cat='sports' ApiKey={this.ApiKey} /></Route>
        <Route exact path='/technology'><News setprogress={this.setprogress} key="technology/"  pageSize={8} country='us' cat='technology' ApiKey={this.ApiKey} /></Route>
      </Switch>
      </Router>
      
      </div>
      </div>
    )
  }
}
