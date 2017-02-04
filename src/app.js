import Header from 'src/views/header/header';
import { PopularLayout, SearchLayout } from 'src/views/layout/layout';
import { PopularMovies, Results } from 'src/views/list/list';
import { PopularService, SearchService } from 'src/services/movies';

let popularService, searchService, layoutView, headerView;

class App {

    static start() {
        // services
        popularService = new PopularService();
        searchService = new SearchService();

        // Header view
        headerView = new Header({
            node: document.querySelector('[data-role="header"]')
        });
        headerView.on('search:movie', (query) => {
            fetchSearchMovies(query)
        });

        // Layout view
        layoutView = new PopularLayout({
            node: document.querySelector('[data-role="list"]')
        });

        // Fetch Initial Movies
        fetchPopularMovies();
    }

}

function fetchPopularMovies () {
    fetch(popularService)
}

function fetchSearchMovies (query) {
    layoutView = new SearchLayout({
        node: document.querySelector('[data-role="list"]')
    });

    layoutView.renderHeader(query);
    fetch(searchService, query)
}

function fetch(service, query) {
    layoutView.performingRequest();
    service.fetch(query)
        .then((movies) => {
            layoutView.requestFinished(movies);
        });
}

export default App;
