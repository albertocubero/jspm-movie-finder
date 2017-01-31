import popularHeaderTemplate from './templates/header/popular.hbs!';
import searchHeaderTemplate from './templates/header/search.hbs!';
import layoutTemplate from './templates/layout.hbs!';
import List from 'src/views/list/list';

class Layout {

    constructor (options) {
        this.$el = $(options.node).html(this.template());
        this.$loading = $(this.$el.find('[data-role="loading"]').get(0));
        this.$header = $(this.$el.find('[data-role="header"]').get(0));

        this.list = new List({
            node: this.$el.find('[data-role="results-container"]').get(0)
        });
    }

    showPopularHeader () {
        this.$header.html(popularHeaderTemplate());
    }

    showSearchHeader (query) {
        this.$header.html(searchHeaderTemplate());
        this.$header.find('[data-role="search-query"]').html(query);
    }

    renderList (movies) {
        this.list.render(movies);
    }

    resetList () {
        this.list.reset();
    }

    hideLoading () {
        this.$loading.hide();
    }

    showLoading () {
        this.$loading.show();
    }

    get template () {
        return layoutTemplate;
    }

}

export default Layout;
