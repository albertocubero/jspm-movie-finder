import listTemplate from './templates/list.html!text';
import $ from 'jquery';

class List {

    constructor (options) {
        this.$el = $(options.node);
        this.$el.html(listTemplate);




    }

}

export default List;
