import Emitter from 'weakee'
import headerTemplate from './templates/header.hbs!'
import $ from 'jquery'
import 'dennyferra/TypeWatch';

class Header extends Emitter {

    constructor(options) {
        super();

        this.$el = $(options.node).html(this.template());
        this.initSearchTipingDone();
    }

    initSearchTipingDone() {

        const callback = (value) => {
            this.emit('search:movie', value);
        };

        const options = {
            callback: callback,
            wait: 500,
            highlight: true,
            allowSubmit: false,
            captureLength: 2
        };

        $(this.$el.find('[data-role="search"]').get(0)).typeWatch(options);
    }

    get template() {
        return headerTemplate;
    }

}

export default Header;
