import React, { Component } from 'react';
import {Menu} from 'lucide-react'
import './Navbar.css';
import Searchbar from './Searchbar';
import Results from './Results';
import { Search } from 'lucide-react';

import {
  Link
}from 'react-router-dom';

export default class Navbar extends Component {
 
  // arg={ display:"none" }

  // constructor(){
  //   super();
  //   this.state={
  //     categ: "sports"
  //   }
  // }

//  trigger=()=>{
//    this.setState({categ:"sports"})
//    console.log(this.state.categ);                  //THIS WAS AN ATTEMPT TO TRANSFER DATA FROM ONE COMPONENT TO ANOTHER
//     this.props.parentCallback(this.state.categ);   //IT WAS SUCCESFUL BUT SCOPE OF OUR APP WAS DIFFERENT. Refer WA 'Drafts'
//  };

   constructor(){
    super();
    this.state={
      text : "",
      srctext:[]
    }
   }

   handleSearch=(event)=>{
      this.setState({
        text : event.target.value
      })

      this.search(this.state.text);
      
   }

   search = (searchText)=>{
  
    // let url=`https://newsapi.org/v2/top-headlines?q=${searchText}&apiKey=e4509d5d89db45dab1b3ee1e7cba6811&pageSize=100`;
    // let data = await fetch(url);              
    // let parsedData = await data.json(); 
    // console.log(searchText);
    // console.log(parsedData);
    this.props.searchText(searchText);
   }

  //  constructor(){
  //   super();
  //   this.state={
  //     srctext:[]
  //   }
  //  }

  render() {
       

    return (
<>   
    
    <nav id='navbar' >
        <ul>
            <Link to="/" id="Logo"><h2>Daily News</h2></Link>
            <Link className='navlinks'  to="/"><li>Home</li><div className="status"></div> </Link>
            <li className='navlinks' id='categories' ><Link to="/">Categories<div className="status"></div></Link> 
                                        {/* Change made here ^^ (before was : to='/categories') */}
        
            <div  className="cat">
          <ul>
            <Link to="/business"id='first'><li className="category">Business</li></Link>
            <Link to="/sports"><li className="category">Sports</li></Link>
            <Link to="/entertainment"><li className="category">Entertainment</li></Link>
            <Link to="/technology"><li className="category">Technology</li></Link>
            <Link to="/science"><li className="category">Science</li></Link>
          </ul>
          </div>
          </li>

                
            <Link className='navlinks' to="/past-news"><li>Past News</li><div className="status"></div></Link>
            <li className="navlinks" id='searchBar' >
            <div className="search-div">
              <Searchbar searchText={this.search}  SearchName={(result)=>{ this.setState({srctext:result}); this.props.srcRes(result); }} />
              <Link to="/search" id='search-btn'><button  ><Search size={20} /></button></Link>
            </div>
            <Results  results={this.state.srctext} /></li>
             <li><button className='menu' id="icon" > <Menu /></button> <br /> <div  className='menu' id="drop"></div> </li>

        </ul>

    </nav>
  
    
</>
    
    )
  }
}
