import popularHeaderTemplate from './templates/header/popular.hbs!';
import searchHeaderTemplate from './templates/header/search.hbs!';
import layoutTemplate from './templates/layout.hbs!';
import List from 'src/views/list/list';

class Layout {

    constructor(options) {
        this.$el = $(options.node).html(this.template());
        this.$header = $(this.$el.find('[data-role="header"]').get(0));
        this.$loading = $(this.$el.find('[data-role="loading"]').get(0)).hide();
        this.$noResults = $(this.$el.find('[data-role="no-results"]').get(0)).hide();

        this.listView = new List({
            node: this.$el.find('[data-role="results-container"]').get(0)
        });

        this.$header.html(this.headerTemplate());
    }

    performingRequest() {
        this.resetList();
        this.hideNoResultMessage();
        this.showLoading();
    }

    requestFinished(movies) {
        this.hideLoading();
        if (movies && movies.length) {
            this.hideNoResultMessage();
            this.renderMovies(movies);
        } else {
            this.showNoResultMessage();
        }
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

    get template() {
        return layoutTemplate;
    }

    get headerTemplate() {
        return () => '';
    }

    // Abstract Method
    renderHeader() {
        return () => '';
    }

}

class PopularLayout extends Layout {

    constructor (options) {
        super(options);
    }

    get headerTemplate() {
        return popularHeaderTemplate;
    }

}

class SearchLayout extends Layout {

    constructor (options) {
        super(options);
    }

    renderHeader (query) {
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
