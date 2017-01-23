import cardTemplate from './templates/card.hbs!';
import $ from 'jquery';

class Card {

    constructor (options) {
        this.$el = $('<div>').html(this.template());
    }

    get template() {
        return cardTemplate;
    }

    render () {
        return this.$el.html();
    }

}

export default Card;
