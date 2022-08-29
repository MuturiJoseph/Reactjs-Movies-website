import React from "react";
import Form from "./common/form";
import Joi from 'joi-browser';
import { getGenres } from "../services/fakeGenreServices";
import { getMovies,getMovie,saveMovie } from './../services/fakeMovieService';
class MovieForm extends Form {
    state = {
        data : {
          title:'',
          genreId:'',
          numberInStock:'',
          dailyRentalRate:''
        },
        genres:[],
        errors :{}
      };
    schema = {
        _id:Joi.string(),
        title:Joi.string().required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().required().min(0).max(100),
        dailyRentalRate:Joi.number().required().min(0).max(100)
     };

    componentDidMount(){
      //this is where we make ajax calls to get data from server
      const genres = getGenres();
      this.setState({genres});
      //here we check if the new movie exists or not in list of movies

      const movieId = this.props.match.params.id;
      if(movieId === 'new') return;
      //if the new movie is not found,,redirect the user to notfound page
      const movie = getMovie(movieId);
      if(!movie) return this.props.history.replace("/not-found");
      //after this we update the state with a viewModel method
      this.setState({data:this.mapToViewModel(movie)});
    }
    mapToViewModel(movie){
      return {
        _id:movie._id,
        title:movie.title,
        genreId:movie.genre._id,
        numberInStock:movie.numberInStock,
        dailyRentalRate:movie.dailyRentalRate
      }; 
    }

    doSubmit = () => {
      //here we call the save method to save the move in fakemovieS
      saveMovie(this.state.data);

      this.props.history.push("/movies");
    }
    render() { 
        return (
            <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
             {this.renderInput('title','Title')}
             {this.renderSelect('genreId','Genre',this.state.genres)}
             {this.renderInput('numberInStock','Number in Stock')}
             {this.renderInput('dailyRentalRate','Rate')}
             {this.renderButton('Save')}
            </form>
        </div>
        );
    }
}
export default MovieForm;