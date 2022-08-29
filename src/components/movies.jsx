
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import _ from 'lodash';
import MoviesTable from './moviesTable';
import ListGroup from './common/listgroup';
import  '.././app.css';
import { getMovies } from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreServices';
import Pagination from './common/pagination';
import {paginate} from '../utilities/paginate';
import MovieButton from './common/newMovieButton';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movie extends Component {
    state = {
           movies:[],
           genres:[],
           currentPage :1,
           pageSize:4,
           searchQuery:'',
           selectedGenre:null,
           sortColumn:{path:'title',order:'asc'}
    };
    componentDidMount(){
        const genres = [{name:'All Genres'},...getGenres()];
        this.setState({movies : getMovies(),genres});
    }

    handlePageChange = page => {
        this.setState({currentPage:page})
    };

    handleDelete = movie => {
      const movies = this.state.movies.filter(m => m._id !==movie._id);
      this.setState({movies});
    };

    handleGenreSelect = genre => {
      this.setState({selectedGenre:genre,searchQuery:'',currentPage:1})
    };
    handleSearch = query => {
       this.setState({searchQuery:query,selectedGenre:null,currentPage:1});
    };
    handleSort = sortColumn => {
      this.setState({sortColumn})
    };

    handleLike = movie =>{
        const movies =[...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] ={...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    };
    getPagedData = () => {
        const{pageSize,currentPage,selectedGenre,sortColumn,searchQuery,movies : allMovies} = this.state
        let filtered = allMovies;
        if(searchQuery)
        filtered = allMovies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if(selectedGenre && selectedGenre._id)
        filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies = paginate(sorted,currentPage,pageSize);
        return {totalCount:filtered.length,data:movies};
    }
    render() { 
        const {totalCount,data:movies} = this.getPagedData();
        const{pageSize,currentPage,sortColumn} = this.state
        const {length : movieCount} = this.state.movies;
        if( movieCount  === 0)
        return <p>There are no movies in the database.</p>
        return (
            <div className='row'>
               <div className='col-3'>
                  <ListGroup
                   items = {this.state.genres}
                   selectedItem ={this.state.selectedGenre} 
                   onItemSelect = {this.handleGenreSelect}
                  />
               </div>
               <div className='col'>
                <Link to="/movies/new">  
                  <MovieButton/>
                </Link>
               <p className='movieText'>Showing { totalCount } movies in the database.</p>
            <SearchBox value={this.searchQuery} onChange={this.handleSearch}/>
            <MoviesTable
              movies = {movies}
              sortColumn = {sortColumn}
              onLike = {this.handleLike}
              onDelete = {this.handleDelete}
              onSort = {this.handleSort}
            />
            <Pagination 
             itemsCount = {totalCount}
             pageSize = {pageSize}
             currentPage = {currentPage}
             onPageChange = {this.handlePageChange}
            />
               </div>
            </div>

        )
    }
}
 
export default Movie;