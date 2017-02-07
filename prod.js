var fs = require('fs-extra');
var jspm = require('jspm');

var index = {
    src: 'index.html',
    prod: 'prod.html'
};
var build = 'build.js';

fs.copy(index.src, index.prod, function(err) {
    if (err) return console.error(err)

    fs.readFile(index.prod, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/<!-- @build.js -->/g, '<script src="'+build+'"></script>');

        fs.writeFile(index.prod, result, 'utf8', function(err) {
            if (err) return console.log(err);

            jspm.setPackagePath('.');
            jspm.bundle('src/init', 'build.js', {
                injectConfig: true
            }).then(function() {});

        });
    });

});
