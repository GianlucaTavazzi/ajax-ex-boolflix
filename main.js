var template_html = $('#templatetab').html();
var template_function = Handlebars.compile(template_html);

$('button').click(function () {
    ricerca();
})

$('.search input').keypress(function(e) {
    if(e.which == 13) {
        ricerca();
    }
});

function ricerca() {
    if ($('.search input').val()) {
        $('.tab').remove();
        var testo_input = $('.search input').val();
        console.log(testo_input);

        chiamata_film(testo_input);
        chiamata_serie(testo_input);
    }
}

function chiamata_film(testo_input) {
    $.ajax({
        'url' : 'https://api.themoviedb.org/3/search/movie',
        'method' : 'GET',
        'data' : {
            'api_key' : '80490079278f06801f23a7ddbbfe0815',
            'query' : testo_input,
            'language' : 'it',
        },
        'success' : function (risposta) {
            var dati = risposta.results;
            console.log(dati);
            for (var i = 0; i < dati.length; i++) {
                var film_corrente = dati[i];

                var tab = {
                    'tipologia' : 'Film',
                    'primoparametro' : film_corrente.title,
                    'secondoparametro' : film_corrente.original_title,
                    'terzoparametro' : flags(film_corrente),
                    'quartoparametro' : stars(film_corrente)
                }

                var tab_finale = template_function(tab);
                $('.conteiner').append(tab_finale);

                $('.search input').val('')
            }
        },
        'error' : function () {
            console.log('Errore');
        }
    })
}

function chiamata_serie(testo_input) {
    $.ajax({
        'url' : 'https://api.themoviedb.org/3/search/tv',
        'method' : 'GET',
        'data' : {
            'api_key' : '80490079278f06801f23a7ddbbfe0815',
            'query' : testo_input,
            'language' : 'it',
        },
        'success' : function (risposta) {
            var dati = risposta.results;
            console.log(dati);
            for (var i = 0; i < dati.length; i++) {
                var serie_corrente = dati[i];

                var tab = {
                    'tipologia' : 'Serie TV',
                    'primoparametro' : serie_corrente.name,
                    'secondoparametro' : serie_corrente.original_name,
                    'terzoparametro' : flags(serie_corrente),
                    'quartoparametro' : stars(serie_corrente)
                }

                var tab_finale = template_function(tab);
                $('.conteiner').append(tab_finale);

                $('.search input').val('')
            }
        },
        'error' : function () {
            console.log('Errore');
        }
    })
}

function stars(variabile) {

    var voto_decimi= variabile.vote_average;

    var voto_approssimato = Math.round(voto_decimi/2);

    var stelle = "";
    var stelle_vuote = "";

    for (var i = 0; i < voto_approssimato; i++) {
        stelle += "<i class='fas fa-star'></i>";
    }

    for (var i = 0; i < (5 - voto_approssimato); i++) {
        stelle_vuote += "<i class='far fa-star'></i>";
    }

    return stelle + stelle_vuote;
}

function flags(variabile) {
    var bandiera_film = variabile.original_language;
    var myflags = ["en", "es", "de", "fr", "it"];
    if (myflags.includes(bandiera_film)) {
        return '<img src="' + bandiera_film + '.png" alt="' + bandiera_film + '">'
    } else {
        return bandiera_film;
    }
}
