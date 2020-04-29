// FlipClock language
var flipClock_language = 'Romanian';
var button_pleaseWait_text = "Te rugam să aștepți...";

$(document).ready(function() {
    var clock;
    var clock1;
    // Grab the current date
    var currentDate = new Date();
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth();
    var yyyy = currentDate.getFullYear();
    // Set some date in the future. In this case, it's always Jan 1
    var futureDate  = new Date(yyyy, mm, dd, 24);
    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    // Instantiate a coutdown FlipClock
    clock = $('#vip').FlipClock(diff, {
        //clockFace: 'DailyCounter',
        countdown: true,
        language: flipClock_language
    });
    clock1 = $('#vip__top').FlipClock(diff, {
        //clockFace: 'DailyCounter',
        countdown: true,
        language: flipClock_language
    });
    $(window).scroll(function() {
        $( ".arw" ).fadeOut();
    });
    $('.scrollPage').click(function() {
        var elementClicked = $(this).attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination+10}, 800);
        removeHash();
        return false;
    });
    $('.scrollToForm').click(function() {
        var elementClicked = $("#order");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination+10}, 800);
        removeHash();
        return false;
    });

    function removeHash() {
        // Remove the # from the hash, as different browsers may or may not include it
        var hash = location.hash.replace('#','');

        if(hash != ''){
            // Clear the hash in the URL
            location.hash = '';
        }
    };


    setInterval(function(){
        if($('.btn_animate').hasClass('jello')) {
            $('.btn_animate').removeClass('jello')
        }
        else{
            $('.btn_animate').addClass('jello')
        }
    },1500);

});


$('.main-carousel').flickity({
    adaptiveHeight: true,
    wrapAround: true,
    cellSelector: '.carousel-cell',
    pageDots: false,
    imagesLoaded: true
});
$('.quotes-carousel').flickity({
    cellAlign: 'left',
    wrapAround: true,
    freeScroll: false,
    prevNextButtons: false,
    draggable: true,
    pageDots: false,
    autoPlay: 3500,
    pauseAutoPlayOnHover: false
});
$('.gallery-carousel').flickity({
    adaptiveHeight: true,
    freeScroll: true,
    wrapAround: true,
    cellSelector: '.gallery-cell',
    pageDots: false,
    imagesLoaded: true
});
$('.orologio-carousel').flickity({
    adaptiveHeight: false,
    freeScroll: false,
    wrapAround: true,
    cellSelector: '.gallery-cell',
    pageDots: false,
    prevNextButtons: false,
    imagesLoaded: true,
    autoPlay: 2000
});

/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */
document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    });

function labnolThumb(id) {
    var thumb = '<img src="img/img-video.jpg">',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}

$('#povzetje-radio, #braintree-radio').click(function() {
    if ($(this).attr('id') === 'braintree-radio') {
        $('#braintree-container').show();
        $('#placilo').attr('value', 'braintree');
    }
    else {
        $('#braintree-container').hide();
        $('#placilo').attr('value', 'cod');
    }
});

$(document).ready(function() {
    $('#order_form').submit(function(){
        var isOk = true;
        $('#order_form input').not('#order_form input[name="payment_method_nonce"]').each(function () {
            if (!$(this)[0].validity.valid) {
                isOk = false;
            }
        });

        $('#order_form select').each(function () {
            if (!$(this)[0].validity.valid) {
                isOk = false;
            }
        });

        if (isOk) {

            if ($('#placilo').attr('value') === 'cod') {
                var form = document.getElementById('order_form');
                HTMLFormElement.prototype.submit.call(form); //Force submit

                // Allow only one submit, then disable the button
                $("#submit1").addClass('btn-disabled').attr('value', button_pleaseWait_text).attr('disabled', 'disabled');
            }
        }
        else {
            // Valiation errors, try to submit to show them
            //$('#order_form').submit();
        }
    });
});

$('.layout section.inner .item-img, .layout section.inner .btn1').click(function(){
    var selected_product = $(this).attr('data-variation');
    $('select[name=variation]').val(selected_product);
    $('select[name=variation]').trigger('change');
    var image_src = $('div[data-variation='+selected_product+']').css('background-image').replace(/(url\(|\)|"|')/g, '');
    formSlika.each(function () {
        $(this).attr('src', image_src)
    });
});

var formSlika = $('.slika-narocilnica');
$('select[name=variation]').change(function() {
    var selected_product = $(this).val();
    var image_src = $('div[data-variation='+selected_product+']').css('background-image').replace(/(url\(|\)|"|')/g, '');
    formSlika.each(function () {
        $(this).attr('src', image_src)
    });
});

$(document).ready(function() {
    $('.fancybox-tos').fancybox();
});

$('#order_form').validate({
    ignore: '#order_form input[name="payment_method_nonce"]',
    wrapper: "div",
    rules: {
        post_number: {
        required: true,
        digits: true
        },
        state: {
        required: true,
        
        },
        city: {
        required: true,
        },
        email: {
        required: true,
        email: true
        }
    }
});