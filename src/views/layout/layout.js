import popularHeaderTemplate from './templates/header/popular.hbs!';
import searchHeaderTemplate from './templates/header/search.hbs!';
import layoutTemplate from './templates/layout.hbs!';
import List from 'src/views/list/list';

let listView, $header, $loading, $noResults;

class Layout {

    constructor(options) {
        this.$el = $(options.node).html(this.template());
        $header = $(this.$el.find('[data-role="header"]').get(0));
        $loading = $(this.$el.find('[data-role="loading"]').get(0)).hide();
        $noResults = $(this.$el.find('[data-role="no-results"]').get(0)).hide();

        listView = new List({
            node: this.$el.find('[data-role="results-container"]').get(0)
        });
    }

    showPopularHeader() {
        $header.html(popularHeaderTemplate());
    }

    showSearchHeader(query) {
        $header.html(searchHeaderTemplate());
        $header.find('[data-role="search-query"]').html(query);
    }

    performingRequest() {
        resetList();
        hideNoResultMessage();
        showLoading();
    }

    requestFinished(movies) {
        hideLoading();
        if (movies && movies.length) {
            hideNoResultMessage();
            renderMovies(movies);
        } else {
            showNoResultMessage();
        }
    }

    get template() {
        return layoutTemplate;
    }

}

function renderMovies(movies) {
    listView.render(movies);
}

function resetList() {
    listView.reset();
}

function hideLoading() {
    $loading.hide();
}

function showLoading() {
    $loading.show();
}

function hideNoResultMessage() {
    $noResults.hide();
}

function showNoResultMessage() {
    $noResults.show();
}

export default Layout;
