import listTemplate from './templates/list.hbs!';
import cardTemplate from './templates/card.hbs!';
import $ from 'jquery';

class List {

    constructor (options) {
        this.$el = $(options.node);
        this.$el.html(listTemplate());

        this.ui = {
            container: $(this.$el.find('[data-role="list-container"]').get(0))
        };

        for (var i = 0; i < 16; i++) {
            this.ui.container.append(cardTemplate());
        }
    }

}

export default List;
