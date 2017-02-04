import Header from 'src/views/header/header';
import {
    PopularLayout,
    SearchLayout
} from 'src/views/layout/layout';
import {
    PopularMovies,
    Results
} from 'src/views/list/list';
import {
    PopularService,
    SearchService
} from 'src/services/movies';

let popularService, searchService, layoutView, searchLayoutView, headerView;

class App {

    static start() {
        // services
        popularService = new PopularService();
        searchService = new SearchService();
        searchService.fetch = new Proxy(searchService.fetch, {
            apply: (target, receiver, args) => {
                const query = args[0];
                if (query.length >= 3) {
                    return Reflect.apply(target, receiver, args);
                } else {
                    var p = new Promise(function(resolve, reject) {
                        reject();
                    })
                    return p;
                }
            }
        });

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

function fetchPopularMovies() {
    fetch(popularService)
}

function fetchSearchMovies(query) {
    layoutView = createSearchLayout();
    fetch(searchService, query)
}

function createSearchLayout() {
    if (!searchLayoutView) {
        searchLayoutView = new SearchLayout({
            node: document.querySelector('[data-role="list"]')
        });
    }

    return searchLayoutView;
}

function fetch(service, query) {
    layoutView.performingRequest();
    service.fetch(query)
        .then((movies) => {
            layoutView.requestFinished(query, movies);
        }, () => {
            layoutView.restore();
        });
}

export default App;
