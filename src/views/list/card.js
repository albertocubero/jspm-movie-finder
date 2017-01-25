import cardTemplate from './templates/card.hbs!';
import $ from 'jquery';

class Card {

    constructor (options) {
        this.$el = $('<div>').html(this.template());
    }

    render (movie) {
        this.$el = $('<div>').html(this.template(movie));
        return this.$el.html();
    }

    get template() {
        return cardTemplate;
    }

}

export default Card;
