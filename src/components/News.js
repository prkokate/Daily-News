import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import './Newsitem.css'
require("dotenv").config();



export default class News extends Component {

    articles=[];
    // Initialize article as an array , As it will be used as a Data Array
    
    constructor(props){
      super(props);
      this.state={
        articles : this.articles,        // The state defines the data members oof the class and can be accessed by this.state.Member_name
        loading : true,                 //this.state.Member_name gives the Memer in its current state
        PageSize:9,                     //**** data members can be CHANGED ONLY BY "setState({....})" funtion! ******
        page:1,
        totalResults:0
      }
    document.title=`Daily News-${(this.props.categ).toUpperCase()}`

    }
    

    // ******* Mounts i.e. Fetches News data from API and brings it to our website backend into the "articles" data member ************//
    async componentDidMount(){
      this.props.setProgress(10);
      
      
       //various queries defined by the news api, such as 'category','country' ,'page'(defines the page from where data is taken)
      //the 'pageSize' defines how many data points(here news headlines) will be present on one page
      //the 'apikey' is YOUR UNIQUE key
      this.setState({loading:true});
      if(this.props.search===0){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categ}&apiKey=${process.env.API_KEY}&page=${this.state.page}&pageSize=${this.props.PageSize}`;
        let data = await fetch(url);               //Async + Await : ** We need to wait until complete data is fetched and 
        this.props.setProgress(50);
         let parsedData = await data.json(); 
        //  this.props.setProgress(100);       //                ** Need to wait until all data is converted to json
         this.setState({
          articles:parsedData.articles,             //Class Data member 'articles' assigned completely processed json data
          total:parsedData.totalResults-this.props.PageSize,
          loading:false,
          totalResults:parsedData.totalResults
        });
        }
      else if(this.props.search===1){
      this.setState({
        articles : this.props.q,
        totalResults:this.props.q.length,
        loading :false
      })
    }
    this.props.setProgress(100);
     
    //   let data = await fetch(url);               //Async + Await : ** We need to wait until complete data is fetched and 
    //  this.props.setProgress(50);
    //   let parsedData = await data.json();        //                ** Need to wait until all data is converted to json
    //   this.props.setProgress(100);
      // this.setState({
      //   articles:parsedData.articles,             //Class Data member 'articles' assigned completely processed json data
      //   total:parsedData.totalResults-this.props.PageSize,
      //   loading:false,
      //   totalResults:parsedData.totalResults
      // });
    }
    

    //Fetch json data from previous page
    // HandlePrev= async ()=>{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categ}&apiKey=e4509d5d89db45dab1b3ee1e7cba6811&page=${this.state.page-1}&pageSize=${this.props.PageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   //'data' is fetched and in the form of RAW STRING
    //   let parsedData = await data.json();
    //   //data.json() converts 'data' from string into JSON FROMAT(class like format)
    //   this.setState({
    //     articles:parsedData.articles,
    //     //**** 'articles' is a key to an array defined in the fetched api data(refer sampleOutput.json file for reference)//
    //     page : this.state.page-1,
    //     total : this.state.total+this.props.PageSize,
    //     loading:false
    //   });
      
    // }


    // //Fetch data from next page from api
    // HandleNext= async ()=>{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categ}&apiKey=e4509d5d89db45dab1b3ee1e7cba6811&page=${this.state.page+1}&pageSize=${this.props.PageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    
    //   // ********** data members can be CHANGED ONLY BY "this.setState({....})" funtion! ************* //
    //   this.setState({
    //     articles:parsedData.articles,
    //     page : this.state.page+1,
    //     total : this.state.total-this.props.PageSize,
    //     loading:false
    //   });
      
    // }
    fetchmoreData=async()=>{
      // this.setState({page:this.state.page+1});
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categ}&apiKey=e4509d5d89db45dab1b3ee1e7cba6811&page=${this.state.page+1}&pageSize=${this.props.PageSize}`;
      this.setState({page:this.state.page+1});
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles:this.state.articles.concat(parsedData.articles),             //Class Data member 'articles' assigned completely processed json data
        total:parsedData.totalResults-this.props.PageSize,
        loading:false,
        totalResults:parsedData.totalResults
      });
    
      
    }

    searcHeadline="Showing results for '";
    Headline=" HEADLINES FOR TODAY";
    heading="";

  render() {
    return (
      <>
     
      <center><h1>{this.props.search===0?this.props.categ.toUpperCase().concat(this.Headline):this.searcHeadline.concat(this.props.categ,"'")}</h1></center>
      <br /><br /><br /><br />
       {/* && is a ternary operator. Works just much like in c++. used inside {}. Here, if(loading==true) : render Spinner(or loader) */}
        {/* {this.state.loading && <center><Spinner/></center>} */}

  <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchmoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={ <center><Spinner/></center> }
        >

        <div className="row" >

        {/* if(loading==true) : don't render articles , i.e. if(!loading) */}
        {this.state.articles.map((element)=>{
           
        // .map function is used to iterate through each element of the json array 'articles'

          return <div className="col-md-4" key={element.url} >
{/* ternary if-else is used here: if (element.title!=null) : display first 43 characters of it, else : display ""(empty string) */}
             <Newsitem  title={element.title?element.title.slice(0,43):""} desc={element.description?element.description.slice(0,88):""} source={element.source.name?element.source.name:"Unknown"}  publishDate={new Date(element.publishedAt).toGMTString()}  imageurl={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="} newsurl={element.url} />
              </div>
          })}

</div>


</InfiniteScroll>
          {/* <br /><br /><br />
          <div  className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} onClick={this.HandlePrev} className="btn btn-dark">&larr; Previous</button>
            {/* &larr is inbuilt icon for left arrow */}
            {/* <button disabled={this.state.total<1} onClick={this.HandleNext} className="btn btn-dark">Next &rarr;</button>
            {/* this.state.total is coded to decrement when next is clicked */}
          {/* </div>  */}
       
      
        
      </>
    )
  }
}
