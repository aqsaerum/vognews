import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps ={
        cat: 'general',
        pageSize: 6,
        country:'us'
    }
    static propTypes  ={
        cat: PropTypes.string,
        pageSize: PropTypes.number,
        country:PropTypes.string,
    }
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){ 
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.cat}&country=${this.props.country}&apiKey=66157ed73ed040279457bdfef36baa1a&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false})
    }

     handlePrevClick = async ()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.cat}&country=${this.props.country}&apiKey=66157ed73ed040279457bdfef36baa1a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }
    
     handleNextClick = async ()=>{
        console.log("Next"); 
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

        
            let url = `https://newsapi.org/v2/top-headlines?category=${this.props.cat}&country=${this.props.country}&apiKey=66157ed73ed040279457bdfef36baa1a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true})
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);  
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
    }
    }

    render() { 
        return (
            <div className="container my-3">
                <h1 className="text-center ">Vōg - Entertainment Headlines</h1>
                {this.state.loading && <Spinner/>}
                            <div className="row"> 
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div> 
                })} 
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News