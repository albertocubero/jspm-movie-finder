import listTemplate from './templates/list.hbs!';
import Card from './card';
import $ from 'jquery';

class List {

    constructor (options) {
        this.$el = $(options.node).html(this.template());
        this.$container = $(this.$el.find('[data-role="list-container"]').get(0));
    }

    render (movies) {
        this.$container.html();

        movies.forEach((movie) => {
            let card = new Card();
            this.$container.append(card.render());
        });
    }

    get template () {
        return listTemplate;
    }

}



export default List;
