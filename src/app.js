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
    PopularServiceFactory,
    SearchServiceFactory
} from 'src/services/movies';

let popularService, searchService, layoutView, searchLayoutView, headerView;

class App {

    static start() {
        // services
        popularService = PopularServiceFactory();
        searchService = SearchServiceFactory();

        // views
        headerView = createHeader();
        layoutView = createPopularLayout();

        // Fetch Initial Movies
        fetchPopularMovies();
    }

}

function createHeader() {
    let view = new Header({
        node: document.querySelector('[data-role="header"]')
    });
    view.on('search:movie', (query) => {
        fetchSearchMovies(query)
    });

    return view;
}

function createPopularLayout() {
    return new PopularLayout({
        node: document.querySelector('[data-role="list"]')
    });
}

function createSearchLayout() {
    if (!searchLayoutView) {
        searchLayoutView = new SearchLayout({
            node: document.querySelector('[data-role="list"]')
        });
    }

    return searchLayoutView;
}

function fetchPopularMovies() {
    fetch(popularService)
}

function fetchSearchMovies(query) {
    layoutView = createSearchLayout();
    fetch(searchService, query)
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
