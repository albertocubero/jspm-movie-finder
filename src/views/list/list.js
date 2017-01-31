import $ from 'jquery';
import listTemplate from './templates/list.hbs!';
import Card from './card';

class List {

    constructor (options) {
        this.$el = $(options.node).html(this.template());
        this.$container = $(this.$el.find('[data-role="movies-container"]').get(0));
    }

    render(movies) {
        this.$container.html('');

        movies.forEach((movie) => {
            let card = new Card();
            this.$container.append(card.render(movie));
        });
    }

    reset () {
        this.$container.html('');
    }

    get template() {
        return listTemplate;
    }

}

export default List;
