var fs = require('fs-extra');
var jspm = require('jspm');
var colors = require('colors/safe');

var bundle = 'bundle.js';
var index = {
    src: 'index.html',
    prod: 'prod.html'
};

copyIndex();

function copyIndex() {
    console.log('');
    console.log(colors.underline("Creating \"" + index.prod + "\""));

    fs.copy(index.src, index.prod, function(err) {
        if (err) return console.error(err)

        console.log(colors.green(">>") + " OK");
        console.log('');

        replacePaths();
    });
}

function replacePaths() {
    console.log(colors.underline("Replacing paths"));

    fs.readFile(index.prod, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/<!-- @bundle.js -->/g, '<script src="' + bundle + '"></script>');

        fs.writeFile(index.prod, result, 'utf8', function(err) {
            if (err) return console.log(err);

            console.log(colors.green(">>") + " OK");
            console.log('');

            createBundle();
        });
    });
}

function createBundle() {
    console.log(colors.underline("Creating \""+bundle+"\""));

    jspm.setPackagePath('.');
    jspm.bundle('src/init', 'bundle.js', {
        injectConfig: true,
        minify: true
    }).then(function() {
        console.log(colors.green(">>") + " OK");
        console.log('');
    }, function(err) {
        return console.log(err);
    });
}
