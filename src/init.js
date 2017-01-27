// Global Imports JS
import 'jquery.easing'; // TODO: remove it and JSPM uninstall
import 'semantic-ui/semantic.js';

// Views Imports
import Header from './views/header/header';
import List from './views/list/list';
import Service from './services/movies';

const service = new Service();

const headerView = new Header({
    node: document.querySelector('[data-role="header"]')
});

const listView = new List({
    node: document.querySelector('[data-role="list"]')
});

headerView.on('search:movie', (movie) => {
    service.fetch(movie)
        .then((movies) => listView.render(movies));
})
