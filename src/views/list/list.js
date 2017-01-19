import listTemplate from './templates/list.html!text';
import $ from 'jquery';

class List {

    constructor (options) {
        $(options.node).html(listTemplate);
    }

}

export default List;
