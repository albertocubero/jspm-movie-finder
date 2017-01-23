import listTemplate from './templates/list.hbs!';
import Card from './card';
import $ from 'jquery';

class List {

    constructor (options) {
        this.$el = $(options.node).html(this.template());
        const $container = $(this.$el.find('[data-role="list-container"]').get(0));

        for (var i = 0; i < 16; i++) {
            let card = new Card();
            $container.append(card.render());
        }
    }

    get template() {
        return listTemplate;
    }

}

export default List;
