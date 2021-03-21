
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
    update_params()
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
 });
