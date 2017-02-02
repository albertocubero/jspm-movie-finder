import popularHeaderTemplate from './templates/header/popular.hbs!';
import searchHeaderTemplate from './templates/header/search.hbs!';
import layoutTemplate from './templates/layout.hbs!';
import List from 'src/views/list/list';

class Layout {

    constructor (options) {
        this.$el = $(options.node).html(this.template());
        this.$header = $(this.$el.find('[data-role="header"]').get(0));
        this.$loading = $(this.$el.find('[data-role="loading"]').get(0)).hide();
        this.$noResults = $(this.$el.find('[data-role="no-results"]').get(0));

        this.list = new List({
            node: this.$el.find('[data-role="results-container"]').get(0)
        });

        this.$loading.hide();
        this.$noResults.hide();
    }

    showPopularHeader () {
        this.$header.html(popularHeaderTemplate());
    }

    showSearchHeader (query) {
        this.$header.html(searchHeaderTemplate());
        this.$header.find('[data-role="search-query"]').html(query);
    }

    performingRequest () {
        this.resetList();
        this.hideNoResultMessage();
        this.showLoading();
    }

    requestFinished (movies) {
        this.hideLoading();
        if(movies && movies.length) {
            this.hideNoResultMessage();
            this.renderMovies(movies);
        } else {
            this.showNoResultMessage();
        }
    }

    renderMovies (movies) {
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

    hideNoResultMessage () {
        this.$noResults.hide();
    }

    showNoResultMessage () {
        this.$noResults.show();
    }

    get template () {
        return layoutTemplate;
    }

}

export default Layout;
