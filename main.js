var template_html = $('#templatetab').html();
var template_function = Handlebars.compile(template_html);

$('button').click(function () {
    if ($('.search input').val()) {
        $('.tab').remove();
        var testo_input = $('.search input').val();
        console.log(testo_input);
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
                        'primoparametro' : film_corrente.title,
                        'secondoparametro' : film_corrente.original_title,
                        'terzoparametro' : film_corrente.original_language,
                        'quartoparametro' : film_corrente.vote_average,
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
})
