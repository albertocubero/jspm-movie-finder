var fs = require('fs-extra');
var jspm = require('jspm');
var colors = require('colors/safe');

var build = 'build.js';
var index = {
    src: 'index.html',
    prod: 'prod.html'
};

console.log('');
console.log( colors.underline("Creating \""+index.prod+"\"") );

fs.copy(index.src, index.prod, function(err) {
    if (err) return console.error(err)

    console.log( colors.green(">>") + " OK" );
    console.log('');
    console.log( colors.underline("Replacing paths") );

    fs.readFile(index.prod, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/<!-- @build.js -->/g, '<script src="' + build + '"></script>');

        fs.writeFile(index.prod, result, 'utf8', function(err) {
            if (err) return console.log(err);

            console.log( colors.green(">>") + " OK" );
            console.log('');
            console.log( colors.underline("Creating bundle.js") );

            jspm.setPackagePath('.');
            jspm.bundle('src/init', 'build.js', {
                injectConfig: true,
                minify: true
            }).then(function() {
            console.log( colors.green(">>") + " OK");
            console.log('');
            });

        });
    });

});
