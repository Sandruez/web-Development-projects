import React, {useEffect} from 'react'
import NewsItem from './NewsItem'
import SpinnerLoad from './spinnerLoad';
import PropTypes  from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';


const News=(props)=>{

const [articles,setarticles]=useState([]);
const [loading,setloading]=useState(false);
const [totaleResults,settotaleResults]=useState(0);
const [page,setpage]=useState(1);

const  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//the following function if for fetching data from an UPI;
 const UpdateNews=async()=>{
  props.setprogress(0);
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cat}&page=${page}&apiKey=${props.ApiKey}&pageSize=${props.pageSize}`;
  setloading(true);
  let data=await fetch(url);
  let parsedData= await data.json();
  setpage(page);
  setarticles(parsedData.articles);
  setloading(false);
  settotaleResults(parsedData.totalResults)
   props.setprogress(100);
    }


    useEffect(()=>{
      UpdateNews();
    },[]);
        
  
     const fetchMoreData = async() => {
       
       const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cat}&page=${page+1}&ApiKey=${props.ApiKey}&pageSize=${props.pageSize}`;
       setloading(true );
       setpage(page+1);
      let data= await fetch(url);
      let parsedData= await data.json();
      setarticles(articles.concat(parsedData.articles));
      settotaleResults(parsedData.totalResults);
       setloading(false);
    };
  

 
    return (
       <>
        <h2 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey-Top {capitalizeFirstLetter(props.cat)} Headlines</h2>
        {/*{this.state.loading && <SpinnerLoad/>}*/}
       
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totaleResults}
          loader={<SpinnerLoad/>}
        >
          <div className="container">

        <div className="row"  > 
          { articles.map((element)=>{
            return    <div className="col-md-3 " key={element.url}>
        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage}  newsUrl={element.url}
        Author={element.author===null?element.author="Unknown":element.author} date={element.publishedAt}
        source={element.source.name}  />
          </div>
        })}
         </div>
        </div>

          </InfiniteScroll>
          {//<div className="container d-flex justify-content-between">
          //<button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.HandlePrevClick}>&larr;Preview</button>
          //<button disabled={this.state.page>Math.ceil((this.state.totaleResult/props.pageSize))-1} type="button" className="btn btn-dark " onClick={this.HandleNextClick}>Next&rarr;</button>
          //</div>
            }
      </>
    )
  
}
News.defaultProps = {
  country:'in',
  pageSize:8,
  cat:'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  cat: PropTypes.string
  
}

export default News
