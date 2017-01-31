import Header from 'src/views/header/header';
import Layout from 'src/views/layout/layout';
import { PopularMovies, Results } from 'src/views/list/list';
import { PopularService, SearchService } from 'src/services/movies';

class App {

    static start() {

        // services
        this.popularService = new PopularService();
        this.searchService = new SearchService();

        // Header view
        const headerView = new Header({
            node: document.querySelector('[data-role="header"]')
        });
        headerView.on('search:movie', (query) => {
            this.fetchSearchMovies(query)
        });

        // Layout view
        this.layoutView = new Layout({
            node: document.querySelector('[data-role="list"]')
        });

        // Fetch Initial Movies
        this.fetchPopularMovies();
    }

    static fetchPopularMovies () {
        this.layoutView.showPopularHeader();
        this.fetch(this.popularService)
    }

    static fetchSearchMovies (query) {
        this.layoutView.showSearchHeader(query);
        this.fetch(this.searchService, query)
    }

    static fetch(service, query) {
        this.layoutView.resetList();
        this.layoutView.showLoading();
        service.fetch(query)
            .then((movies) => {
                this.layoutView.hideLoading();
                this.layoutView.renderList(movies);
            });
    }

}

export default App;
