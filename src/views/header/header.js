import Emitter from 'weakee'
import headerTemplate from './templates/header.hbs!'
import $ from 'jquery'

class Header extends Emitter {

    constructor(options) {
        super();

        this.$el = $(options.node).html(this.template());
        this.$search = $(this.$el.find('[data-role="search"]').get(0));

        this.initSearch();
    }

    initSearch() {
        this.$search.search({
            minCharacters: 3,
            searchFullText: false,
            apiSettings: {
                url: '//gd.geobytes.com/AutoCompleteCity?callback=?&template=<geobytes%20city>,%20<geobytes%20country>&q={query}',
                onResponse: (CitiesResponse) => {
                    let response = { results: [] };
                    let items = Object.keys(CitiesResponse).map((k) => CitiesResponse[k])
                    items.forEach((item, index) => {
                        response.results.push({
                            title: item
                        });
                    });
                    return response;
                }
            },
            onSelect: (result, response) => {
                this.emit('search:city');
            }
        });
    }

    get template() {
        return headerTemplate;
    }

}

export default Header;
