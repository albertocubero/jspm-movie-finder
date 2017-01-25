const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=fcc3e3e91b7cc38185ef902ca797ee11';

class MoviesService {

    fetch () {
        return fetch(url).then(this.success, this.error);
    }

    success (response) {
        return response.json().then((data) => {
            return data.results.map((movie) => {
                movie.vote_average_rounded = Math.ceil(movie.vote_average/2);
                movie.release_year = movie.release_date.split('-')[0];
                return movie;
            })
        });
    }

    error (error) {
        console.log('ERROR!', error);
    }

}

export default MoviesService;
