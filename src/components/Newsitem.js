import React, { Component } from 'react'
import './Newsitem.css'


export default class Newsitem extends Component {
  render() {
      let {title,desc,imageurl,newsurl,PageSize,source,publishDate} = this.props;
    //  Props are defined here
    //But They can also be used directly without declaring them first!
    return (



 <div className="content" style={{width: "18rem"}}>
 <span className="badge">{source}</span>
  <img style={{objectFit:"cover",height:"15rem"}} src={imageurl} className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{desc}...</p>
    <p className="card-text"><small className="text-body-secondary">{publishDate}</small></p>
    <a rel='noreferrer' href={newsurl} target='_blank' className="dark"><button>Read more</button></a>
</div>

      </div>
    )
  }
}
