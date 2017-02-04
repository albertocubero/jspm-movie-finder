import cardTemplate from './templates/card.hbs!';
import $ from 'jquery';

const UI = {
    selector: {
        rate: '[data-role="rate"]'
    }
}

class Card {

    constructor(options) {
        this.$el = $('<div>');
    }

    render(movie) {
        this.$el = this.$el.html(this.template(movie));
        this.$el.find(UI.selector.rate).rating({
            maxRating: 5
        });

        return this.$el.html();
    }

    get template() {
        return cardTemplate;
    }

}

export default Card;
