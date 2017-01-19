import headerTemplate from './templates/header.html!text';
import $ from 'jquery';

class Header {

    constructor (options) {
        $(options.node).html(headerTemplate);
    }

}

export default Header;
