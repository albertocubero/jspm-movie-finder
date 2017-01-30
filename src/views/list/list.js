import Card from './card';
import $ from 'jquery';
import popularTemplate from './templates/popular.hbs!';
import searchTemplate from './templates/search.hbs!';

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

    get template() {
        return popularTemplate;
    }

}

class Results extends List {

    constructor (options) {
        super(options);

        const $query = $(this.$el.find('[data-role="search-query"]').get(0));
        $query.html(options.query);
    }

    get template() {
        return searchTemplate;
    }

}

export {
    PopularMovies,
    Results
}
