
var products = {
    'white': {
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Solution:

$(function(){
    function update_params() {
        search_params.color = $('#color .option-button.selected').attr('id')
        search_params.quality = $('#quality .option-button.selected').attr('id')
        search_params.quantity = parseInt($('#quantity').val())
        search_params.style = $('#style').val()
        console.log(search_params)
        update_order_details()
    }
    function update_order_details() {
        $('.refresh-loader').show()
        var qualityId = '#' + search_params.quality
        var colorId = '#' + search_params.color
        var styleSelected = "#style option[value=" + search_params.style + "]"
        $('#result-color').html($(colorId).text())
        $('#result-quality').html($(qualityId).text())
        $('#result-quantity').html(search_params.quantity)
        $('#result-style').html($(styleSelected).text())
        $('#total-price').html(calculate_price())
        $('#photo-product').attr('src', 'img/' + products[search_params.color][search_params.style].photo)
        setTimeout(function() {
            $('.refresh-loader').hide()
        },500)
    }
    function calculate_price() {
        var unitPrice = products[search_params.color][search_params.style].unit_price
        if (search_params.quality === 'q190') {
            unitPrice *= 1.12
        }
        var total = unitPrice * search_params.quantity
        if(search_params.quantity >= 1000) {
            total *= 0.8
        } else if(search_params.quantity >= 500) {
            total *= 0.88
        } else if(search_params.quantity >= 100) {
            total *= 0.95
        }
        console.log('UnitPrice::' + unitPrice)
        console.log('Total::' + total)
        return total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }
    // update_params()
    $('#quantity').change(function() {
        update_params()
    })
    $('#style').change(function() {
        update_params()
    })
    $('.option-button').click(function() {
        var clickedParent = $(this).parent().attr('id')
        var childSelector = '#' + clickedParent + ' .option-button'
        $(childSelector).removeClass('selected')
        $(this).addClass('selected')
        update_params()
    })
    // *********************** bind() demo ******************************
/*     var pokemon = {
        firstname: 'Pika',
        lastname: 'Chu ',
        getPokeName: function() {
            var fullname = this.firstname + ' ' + this.lastname;
            return fullname;
        }
    };
    console.log(pokemon.getPokeName())
    var pokemonName = function() {
        console.log(this.getPokeName() + 'I choose you!');
    };
    
    var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now
    
    logPokemon(); // 'Pika Chu I choose you!'
    console.log(typeof(logPokemon)) */

    // *************************** callback demo *****************************

/*     function get_user(callbackFunction) {
        const user = {
            name: "RISHAB"
        }
        setTimeout(function() {
            callbackFunction(user)
        }, 1000)
    }
    function greet_user(user) {
        console.log('Hi' + user.name + ' How are you doing!')
    }

    get_user(greet_user)
    function good_bye(user) {
        console.log('Goodbye ' + user.name)
    }
    get_user(good_bye)

    get_user(function(user) {
        console.log('Hey ' + user.name + ' this is another way of calling callback function')
    }) */

    // ******************************** Error Handling ***********************************


/*     function get_user2() {
        const user = {
            name: ""
        }
        setTimeout(function() {
            return user;
        }, 1000)
    }
    function greet_user2(user) {
        console.log('Hi' + user.name + ' How are you doing!')
    }

    try {
        const user = get_user2()
        if (!user.name) {
            throw 'Name is invalid or empty'
        }
        greet_user2(user)
    } catch(err) {
        console.log('Error occured::' + err)
        console.log('Hi Guest User How are you doing!')
    } finally {
    console.log('============================Finally error is handeled==========================')
    } */

    // ************************************ Slider ********************************************


/*     var bestSellerSlider = {
        products: ['P1', 'P2', 'P3'],
        interval: 3000,
        infinite: false,

        getProducts() {
            console.log(this.products)
        }
    }; */

/*     var startDate = new Date().getTime()
    for(let i = 0; i < 100000; i++) {
        console.log(i);
    }
    var endDate = new Date().getTime()
    console.log("Start Time: " + startDate);
    console.log("End Time: " + endDate); */

    // ***************************  AJAX **********************

/*     var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        console.log(this.readyState);
        if(this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            var responseObject = JSON.parse(this.responseText)
            // console.log(responseObject)
            var question = responseObject.results[0].question;
            console.log('Question:: ' + question)
            var answers = responseObject.results[0].incorrect_answers;
            answers.push(responseObject.results[0].correct_answer)
            console.log('Answers:: ', answers)
           
        }
        // console.log(this.responseText);
    }

    xhttp.open("GET", 'https://opentdb.com/api.php?amount=1')

    xhttp.send() */

    // *********************** AJAX with JQuery ********************

/*     $.ajax({
        url: 'https://opentdb.com/api.php?amount=1',
        type: 'GET',
        dataType: 'json'
    }).done(function(response) {
        presentQuestion(response);
    }).fail(function() {
        console.log('Error occured');
    });

    function presentQuestion(responseObject) {
        var question = responseObject.results[0].question;
        console.log('Question:: ' + question)
        var answers = responseObject.results[0].incorrect_answers;
        answers.push(responseObject.results[0].correct_answer)
        console.log('Answers:: ', answers)
    } */

    $.ajax({
        url: 'https://restcountries.eu/rest/v2/all',
        method: 'GET',
        dataType: 'json'
    }).done(function(response) {
        populateCountriesList(response)
        if(localStorage.selectedCountry) {
            $('#countryDropDown').val(localStorage.selectedCountry);
        }
    }).fail(function() {
        console.log('Request failed')
    });

    function populateCountriesList(countryList) {
        // console.log(countryList);
        countryList.forEach(country => {
            var newCountry = document.createElement('option')
            newCountry.innerHTML = country.name;
            newCountry.value = country.alpha3Code;
            document.getElementById('countryDropDown').appendChild(newCountry);
        });
    }

    $("#countries").change(function() {
        // console.log( $('#countryDropDown').val())
        window.localStorage.setItem('selectedCountry', $('#countryDropDown').val());
    });

 });
