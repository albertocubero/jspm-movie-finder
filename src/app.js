import Header from './views/header/header';
import { PopularMovies, Results } from './views/list/list';

class App {

    static start () {

        this.headerView = new Header({
            node: document.querySelector('[data-role="header"]')
        });
        this.popularMovies = new PopularMovies({
            node: document.querySelector('[data-role="list"]')
        });

        this.headerView.on('search:movie', (query) => {
            const results = new Results({
                node: document.querySelector('[data-role="list"]'),
                query: query
            });
        });
    }

}

export default App;
