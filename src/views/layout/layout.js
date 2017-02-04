import popularHeaderTemplate from './templates/header/popular.hbs!';
import searchHeaderTemplate from './templates/header/search.hbs!';
import layoutTemplate from './templates/layout.hbs!';
import List from 'src/views/list/list';

const UI = {
    selector: {
        header: '[data-role="header"]',
        loading: '[data-role="loading"]',
        noResults: '[data-role="no-results"]',
        list: '[data-role="list-container"]'
    }
}

class Layout {

    constructor(options) {
        this.$el = $(options.node).html(this.template());
        this.$header = $(this.$el.find(UI.selector.header).get(0));
        this.$loading = $(this.$el.find(UI.selector.loading).get(0));
        this.$noResults = $(this.$el.find(UI.selector.noResults).get(0));
        this.movies = [];

        this.listView = new List({
            node: this.$el.find(UI.selector.list).get(0)
        });

        // Initialize Layout
        this.$header.html(this.headerTemplate());
        this.$loading.hide()
        this.$noResults.hide()
    }

    performingRequest() {
        this.resetList();
        this.hideNoResultMessage();
        this.showLoading();
    }

    requestFinished(query, movies) {
        this.saveMovies(movies);
        this.hideLoading();
        this.updateHeader(query);
        if (movies && movies.length) {
            this.hideNoResultMessage();
            this.renderMovies(movies);
        } else {
            this.showNoResultMessage();
        }
    }

    restore() {
        this.hideLoading();
        this.hideNoResultMessage();
        this.renderMovies(this.getLastMovies());
    }

    saveMovies(movies) {
        this.movies = movies;
    }

    getLastMovies() {
        return this.movies;
    }

    renderMovies(movies) {
        this.listView.render(movies);
    }

    resetList() {
        this.listView.reset();
    }

    hideLoading() {
        this.$loading.hide();
    }

    showLoading() {
        this.$loading.show();
    }

    hideNoResultMessage() {
        this.$noResults.hide();
    }

    showNoResultMessage() {
        this.$noResults.show();
    }

    // Getters // Setters
    get template() {
        return layoutTemplate;
    }

    get headerTemplate() {
        return () => '';
    }

    // Abstract Method
    updateHeader() {
        return () => '';
    }

}

class PopularLayout extends Layout {

    constructor(options) {
        super(options);
    }

    get headerTemplate() {
        return popularHeaderTemplate;
    }

}

class SearchLayout extends Layout {

    constructor(options) {
        super(options);
    }

    updateHeader(query) {
        this.$header.find('[data-role="search-query"]').html(query);
    }

    get headerTemplate() {
        return searchHeaderTemplate;
    }

}

export {
    PopularLayout,
    SearchLayout
};
