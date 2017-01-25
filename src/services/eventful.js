var url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=fcc3e3e91b7cc38185ef902ca797ee11';

fetch(url)
.then(function(response) {
    console.log(response);
    response.json().then((data) => {
        console.log(data);
    });
    console.log('OK!');

}, function (error) {
    console.log(arguments);
    console.log('ERROR!', error);
});
