import React, { Component } from 'react'

export class NewsItem extends Component {
 
 


  render() {
    
    let {title,description,imageUrl,newsUrl,Author,date,source}=this.props;
    return (
      <div className='my-3'>
      <div className="card" style={{width: "100%"}}>

      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
       {source}
      </span>

  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>

    <p className="card-text"><small className="text-body-secondary">By {Author} on {(new Date(date)).toGMTString()}</small></p>
    <a href={newsUrl} target='blank' className="btn btn-sn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
