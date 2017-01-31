import $ from 'jquery';
import { PopularService, SearchService } from '../../services/movies';
import popularTemplate from './templates/popular.hbs!';
import searchTemplate from './templates/search.hbs!';
import Card from './card';

class List {

    constructor(options) {
        this.$el = $(options.node).html(this.template());
        this.$container = $(this.$el.find('[data-role="list-container"]').get(0));
    }

    render(movies) {
        this.$container.html('');

        movies.forEach((movie) => {
            let card = new Card();
            this.$container.append(card.render(movie));
        });
    }

    get template() {
        return () => '';
    }

}

class PopularMovies extends List {

    constructor (options) {
        super(options);

        this.fetch();
    }

    fetch () {
        const service = new PopularService();
        service.fetch()
            .then((movies) => this.render(movies));
    }

    get template() {
        return popularTemplate;
    }

}

class Results extends List {

    constructor (options) {
        super(options);

        this.renderQuery(options.query);
        this.fetch(options.query);
    }

    renderQuery (query) {
        const $query = $(this.$el.find('[data-role="search-query"]').get(0));
        $query.html(query);
    }

    fetch (query) {
        const service = new SearchService();
        service.fetch(query)
            .then((movies) => this.render(movies));
    }

    get template() {
        return searchTemplate;
    }

}

export {
    PopularMovies,
    Results
}
