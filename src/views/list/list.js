import listTemplate from './templates/list.hbs!';
import Card from './card';
import $ from 'jquery';

class List {

    constructor(options) {
        const $el = $(options.node).html(this.template());
        this.$container = $($el.find('[data-role="list-container"]').get(0));
    }

    render(movies) {
        this.$container.html('');

        movies.forEach((movie) => {
            let card = new Card();
            this.$container.append(card.render(movie));
        });
    }

    get template() {
        return listTemplate;
    }

}



export default List;
