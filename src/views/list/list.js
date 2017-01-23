import listTemplate from './templates/list.hbs!';
import Card from './card';
import $ from 'jquery';

class List {

    constructor (options) {
        const $el = $(options.node).html(this.template());
        const $container = $($el.find('[data-role="list-container"]').get(0));

        renderCards($container);
    }

    get template() {
        return listTemplate;
    }

}

const renderCards = ($container) => {
    for (var i = 0; i < 16; i++) {
        let card = new Card();
        $container.append(card.render());
    }
}

export default List;
