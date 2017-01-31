// Global Imports JS
import 'jquery.easing'; // TODO: remove it and JSPM uninstall
import 'semantic-ui/semantic';

// Views Imports
import Header from './views/header/header';
import { PopularMovies, Results } from './views/list/list';

// Views Instances
const headerView = new Header({
    node: document.querySelector('[data-role="header"]')
});
const popularMovies = new PopularMovies({
    node: document.querySelector('[data-role="list"]')
});

// Search Event Handler
headerView.on('search:movie', (query) => {
    const results = new Results({
        node: document.querySelector('[data-role="list"]'),
        query: query
    });
})
