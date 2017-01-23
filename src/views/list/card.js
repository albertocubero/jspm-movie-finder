import cardTemplate from './templates/card.hbs!';
import $ from 'jquery';

class Card {

    constructor (options) {
        this.$el = $('<div>').html(this.template());
    }

    render () {
        return this.$el.html();
    }

    get template() {
        return cardTemplate;
    }

}

export default Card;
