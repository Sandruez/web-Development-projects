import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SpinnerLoad from './spinnerLoad';
import PropTypes  from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:8,
    cat:'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    cat: PropTypes.string
    
  }
  
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//this is constructor
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      totaleResult:0,
      page:1,
    }
    document.title=`${this.capitalizeFirstLetter(this.props.cat)} - NewMonkey`;
    
}

//the following function if for fetching data from an UPI;
async UpdateNews(){

  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&page=${this.state.page}&apiKey=${this.props.ApiKey}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true });
  let data=await fetch(url);
  let parsedData= await data.json();
  this.setState({
    page:this.state.page,
    articles:parsedData.articles,
    loading:false,
    totalResults:parsedData.totalResults
     });
     
    }

     async componentDidMount(){
      this.props.setprogress(0);
     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&page=${this.state.page}&apiKey=${this.props.ApiKey}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true});
     let data=await fetch(url);
     let parsedData= await data.json();
     this.setState({
       articles:parsedData.articles,
       totaleResults:parsedData.totalResults,
       loading:false
     })
     this.props.setprogress(100);
    //this.setState({page:this.state.page});
    // this.UpdateNews();
     }
      
  
     HandlePrevClick= async()=>{
      // console.log("previes");
      //let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&page=${this.state.page-1}&apiKey=2746efea66414718b52b287eaaf891b3&pageSize=${this.props.pageSize}`;
      //this.setState({loading:true });
      //let data=await fetch(url);
      //let parsedData= await data.json();
      //this.setState({
      //  page:this.state.page-1,
      //  articles:parsedData.articles,
      //  loading:false)
      this.setState({page:this.state.page-1});
      

    }

  
    
       HandleNextClick=async ()=>{
        // console.log("Next");
      //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&page=${this.state.page+1}&apiKey=2746efea66414718b52b287eaaf891b3&pageSize=${this.props.pageSize}`;
      //  this.setState({loading:true});
      //let data=await fetch(url);
      //let parsedData= await data.json();
      //this.setState({
      //  page:this.state.page+1,
      //  articles:parsedData.articles,
      //  loading:false
      //})
    this.setState({page:this.state.page+1});
      this.UpdateNews();}
       

     fetchMoreData = async() => {
       
       const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&page=${this.state.page+1}&ApiKey=${this.props.ApiKey}&pageSize=${this.props.pageSize}`;
       this.setState({page:this.state.page+1});
      this.setState({loading:true });
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading:false,
         
     }) 
    };
  

  render() {
    return (
       <>
        <h2 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey-Top {this.capitalizeFirstLetter(this.props.cat)} Headlines</h2>
        {/*{this.state.loading && <SpinnerLoad/>}*/}
       
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totaleResults}
          loader={<SpinnerLoad/>}
        >
          <div className="container">

        <div className="row"  > 
          { this.state.articles.map((element)=>{
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
          //<button disabled={this.state.page>Math.ceil((this.state.totaleResult/this.props.pageSize))-1} type="button" className="btn btn-dark " onClick={this.HandleNextClick}>Next&rarr;</button>
          //</div>
            }
      </>
    )
  }
}

export default News
