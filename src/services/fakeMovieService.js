import  {genres} from "./fakeGenreServices";


const movies = [
    {
        _id:'46567467hdghjfbfhbj222',
        title:"Terminator",
        genre:{_id:'et6436467cd',name:'Action'},
        numberInStock:7,
        dailyRentalRate:3.5,
    },
    {
        _id:'hdf7575he',
        title:"Die Hard",
        genre:{_id:'46567467hdghjfbfhbj222',name:'Action'},
        numberInStock:5,
        dailyRentalRate:2.5
    },
    {
        _id:'5hfjfg6755dbgvb',
        title:"Get out",
        genre:{_id:'3647467hdghjfbfhbj222',name:'Comedy'},
        numberInStock:8,
        dailyRentalRate:3.5
    },
    {
        _id:'3544hfhdk48',
        title:"Trip to Italy",
        genre:{_id:'2fh2367hdghjfbfhbj222',name:'Thriller'},
        numberInStock:7,
        dailyRentalRate:3.5
    },
    {
        _id:'5hf675nfh5',
        title:"Airplane",
        genre:{_id:'3647467hdghjfbfhbj222',name:'Comedy'},
        numberInStock:3,
        dailyRentalRate:1.5
    },
    {
        _id:'463gdsgr74',
        title:"Wedding Crashers",
        genre:{_id:'3647467hdghjfbfhbj222',name:'Comedy'},
        numberInStock:7,
        dailyRentalRate:3.5
    },
    {
        _id:'5hfdgd474gvb',
        title:"Gone Girl",
        genre:{_id:'2fh4657hbfchhbj222',name:'Horror'},
        numberInStock:7,
        dailyRentalRate:4.5
    },
    {
        _id:'ey2535dbgvb',
        title:"The Sixth Sense",
        genre:{_id:'2fh2367hdghjfbfhbj222',name:'Thriller'},
        numberInStock:7,
        dailyRentalRate:3
    },
    {
        _id:'5hfrhrgvb',
        title:"The Avengers",
        genre:{_id:'46567467hdghjfbfhbj222',name:'Action'},
        numberInStock:7,
        dailyRentalRate:3.5
    },
    {
        _id:'5hfgfdhjd76984vb',
        title:"Man vs Bee",
        genre:{_id:'3647467hdghjfbfhbj222',name:'Comedy'},
        numberInStock:7,
        dailyRentalRate:5
    },
];

export function getMovies(){
    return movies;
}

export function saveMovie(movie){
    let genreAPI = [...genres];
    let movieInDb = movies.find(m => m._id===movie._id) || {};
    movieInDb.title=movie.title.toString();
    movieInDb.genre=genreAPI.find(g => g._id === movie.genreId);
    movieInDb.numberInStock=movie.numberInStock;
    movieInDb.dailyRentalRate=movie.dailyRentalRate;

    if(!movieInDb._id){
        movieInDb._id = Date.now().toString();
        movies.push(movieInDb);
    }

    return movieInDb;

}

export function getMovie(id){
    return movies.find(m => m._id === id);

}
export function deleteMovie(id) {
    let movieInDb = movies.find(m => m._id === id);
    movies.splice(movies.indexOf(movieInDb), 1);
    return movieInDb;
  }
