// https://restcountries.eu/rest/v2/name/{name}?fullText=true

function fetch(name){
    let URL = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

    $.ajax({
        url : URL,
        type : "GET",
        dataType : "json",
        success : function (responseJSON) {
            displayResults(responseJSON);
        },
        error : function (e) {
            return Error (e);
        }

    });
}

function displayResults(responseJSON){
    $('.js-search-results').append(`
        <h2>${responseJSON[0].name}</h2>
        <h3>${responseJSON[0].capital}</h3>
        <img src="${responseJSON[0].flag}">
        <span>Population: ${responseJSON[0].population}, </span>
        <span>Region: ${responseJSON[0].region}, </span>
        <span>Timezones: ${responseJSON[0].timezones}, </span>
        <span>Borders: ${responseJSON[0].borders}, </span>
    `);
}

function listenButton(){
    $('.js-search-form').on('submit', function (e) {
        e.preventDefault();
        if ($('.js-query').val() != ""){
            let name = $('.js-query').val(); 
            $('.js-search-results').empty();
            fetch(name);
        }

    });

}

function init(){
    listenButton();
}

init();