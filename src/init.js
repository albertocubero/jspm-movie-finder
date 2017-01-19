// Global Imports
import 'semantic-ui/semantic.css!';

// Views Imports
import Header from './views/header/header';
import List from './views/list/list';

var headerView = new Header({
    node: document.querySelector('[data-role="header"]')
});

var listView = new List({
    node: document.querySelector('[data-role="list"]')
});
