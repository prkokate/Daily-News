
import './App.css';
import Navbar from './components/Navbar';

import React, { Component } from 'react'
// import Newsitem from './components/Newsitem';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


export default class App extends Component {

    // b="";
//     constructor(){
//       super();
//       this.state={
//         categ:"general"                        //THIS WAS AN ATTEMPT TO TRANSFER DATA FROM ONE COMPONENT TO ANOTHER
//     }                                          //IT WAS SUCCESFUL BUT SCOPE OF OUR APP WAS DIFFERENT. Refer WA 'Drafts'

  
//     handleCallback=(childCategory)=>{
//       this.setState({categ:childCategory})
//       console.log(this.state.categ)
//      //this.componentDidMount();
//  }

state={progress:0, searchResult:[],srctext:""}

setProgress=(progr)=>{
  this.setState({progress:progr});
}

setSrcRes=(res)=>{
  this.setState({searchResult:res});
  console.log(this.state.searchResult);
}

setsrctext=(txt)=>{
  this.setState({srctext:txt});
}


 
    pagesize=15;
    
    render() {
      
    
      return (
        <Router>
        <div  className='App' >
        <Navbar searchText={this.setsrctext} srcRes={this.setSrcRes}  id="navbar" />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <br /><br /><br /><br /><br /><br />
        
        
        
          <Routes>
    {/***VERY IMP : Give UNIQUE "key" to every element to for RE-MOUNT of every element. If not, New page won't be loaded */}
            <Route exact path='/' element={<News search={0} setProgress={this.setProgress} key="general" categ="general" country='in' PageSize={this.pagesize}/>}/>
            <Route exact path='/business' element={<News search={0} setProgress={this.setProgress} key="business" categ="business" country='in' PageSize={this.pagesize}/>}/>
            <Route exact path='/sports' element={<News search={0} setProgress={this.setProgress} key="sports" categ="sports" country='in' PageSize={this.pagesize}/>}/>
            <Route exact path='/entertainment' element={<News search={0} setProgress={this.setProgress} key="entertainment" categ="entertainment" country='in' PageSize={this.pagesize}/>}/>
            <Route exact path='/technology' element={<News search={0} setProgress={this.setProgress} key="technology" categ="technology" country='in' PageSize={this.pagesize}/>}/>
            <Route exact path='/science' element={<News search={0} setProgress={this.setProgress} key="science" categ="science" country='in' PageSize={this.pagesize}/>}/>
            <Route exact path='/search' element={<News  q={this.state.searchResult} search={1} setProgress={this.setProgress} key="search" categ={this.state.srctext} />} />
          </Routes>
        <br /><br /><br /><br /><br />
        
      </div>
        </Router>
        
        
        
    )
  }
}

