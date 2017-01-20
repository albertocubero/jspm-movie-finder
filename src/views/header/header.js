import headerTemplate from './templates/header.hbs!';
import $ from 'jquery';

class Header {

    constructor (options) {
        this.$el = $(options.node);
        this.$el.html(headerTemplate());

        this.ui = {
            search: $(this.$el.find('[data-role="search"]').get(0))
        };

        this.ui.search.search({
            minCharacters : 3,
            searchFullText: false,
            apiSettings   : {
              url: '//gd.geobytes.com/AutoCompleteCity?callback=?&q={query}',
              onResponse: function(CitiesResponse) {
                let response = {
                    results : []
                };
                let items = Object.keys(CitiesResponse).map((k) => CitiesResponse[k])
                items.forEach(function(item, index) {
                    response.results.push({
                        title: item
                    });
                });
                return response;
              }
          },
            onSelect: function(result, response) {
               alert(result.title);
           }
        });
    }

}

export default Header;
