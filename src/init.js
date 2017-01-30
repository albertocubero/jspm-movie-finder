// Global Imports JS
import 'jquery.easing'; // TODO: remove it and JSPM uninstall
import 'semantic-ui/semantic';

// Views Imports
import Header from './views/header/header';
import { PopularMovies, Results } from './views/list/list';
import { PopularService, SearchService } from './services/movies';

// Services Instances
const popularService = new PopularService();
const searchService = new SearchService();

// Views Instances
const headerView = new Header({
    node: document.querySelector('[data-role="header"]')
});
const popularMovies = new PopularMovies({
    node: document.querySelector('[data-role="list"]')
});

// Fetch Data
popularService.fetch()
    .then((movies) => popularMovies.render(movies));

headerView.on('search:movie', (query) => {
    const results = new Results({
        node: document.querySelector('[data-role="list"]'),
        query: query
    });

    searchService.fetch(query)
        .then((movies) => results.render(movies));
})
