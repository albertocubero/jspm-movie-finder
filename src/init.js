// Global Imports JS
import 'jquery.easing';
import 'semantic-ui/semantic.js';

// Views Imports
import Header from './views/header/header';
import List from './views/list/list';

var headerView = new Header({
    node: document.querySelector('[data-role="header"]')
});

var listView = new List({
    node: document.querySelector('[data-role="list"]')
});
