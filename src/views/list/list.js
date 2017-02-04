import $ from 'jquery';
import listTemplate from './templates/list.hbs!';
import Card from './card';

const UI = {
    selector: {
        container: '[data-role="movies-container"]'
    }
}

class List {

    constructor (options) {
        this.$el = $(options.node).html(this.template());
        this.$container = $(this.$el.find(UI.selector.container).get(0));
    }

    render(movies) {
        this.reset();

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
