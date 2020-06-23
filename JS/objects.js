const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = '')=>{

    const movieList = document.getElementById('movie-list')

    if(movies.length === 0){
        movieList.classList.remove('visible');
        return;
    }else{
        movieList.classList.add('visible');
    }
    
    movieList.innerHTML = ` 
        <div class= "movie-element__info">
            <h2>${title}</h2>  
        </div>
    `;
    
    const filteredMovies = !filter 
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));
  
    filteredMovies.forEach((movie)=>{
        const movieEl =document.createElement('li');
        let {getoFormatedTitle} = movie;
        let text = getoFormatedTitle.call(movie) + " - "
        for(const key in movie.info){
            if(key !== 'title' && key !== "_title"){
                text = text + `${key}: ${movie.info[key]}`
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    })  
}

const addMovieHandler = ()=>{
        const title = document.getElementById('title').value;
        const extraName = document.getElementById('extra-name').value;
        const extraValue = document.getElementById('extra-value').value;
     
        if(
            extraName.trim() === '' ||
            extraValue.trim() === ''
        ){
            return;
        }

        const newMovie = {
        info: {
            set title(val){
                if(val.trim() === ''){
                    this._title = "DEFAULT"
                }
                this._title =  val;
            },
            get title(){
                return  this._title
            },
            [extraName]: extraValue,          
        },
        id: Math.random(),
        getoFormatedTitle(){
            return  this.info.title.toUpperCase(); 
        }
    }   

        newMovie.info.title =  title;
        console.log(newMovie.info.title);

        movies.push(newMovie);
        renderMovies();   
}



const searchMovieHandler = ()=>{
const filterTerm = document.getElementById('filter-title').value;
renderMovies(filterTerm);

}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);