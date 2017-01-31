const API_KEY = '0c9ce45a9defc82ba751660f32ad1642';
const POPULAR_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY;
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query={movie}';

class MoviesService {

    success(response) {
        return response.json()
            .then((data) => {
                return data.results.filter((movie) => {
                    return movie.poster_path !== null;
                });
            })
            .then((data) => {
                return data.map((movie) => {
                    movie.vote_average_rounded = Math.ceil(movie.vote_average / 2);
                    movie.release_year = movie.release_date.split('-')[0];
                    return movie;
                });
            });
    }

    error(error) {
        console.log('REQUEST ERROR!', error);
    }

}

class PopularService extends MoviesService {

    fetch(movie) {
        return fetch(this.url).then(this.success, this.error);
    }

    get url() {
        return POPULAR_URL;
    }

}

class SearchService extends MoviesService {

    fetch(movie) {
        return fetch(this.url.replace('{movie}', movie)).then(this.success, this.error);
    }

    get url() {
        return SEARCH_URL;
    }

}

export {
    PopularService,
    SearchService
};
