$(document).ready(function () {
    var signUpButton = $(":button, :submit").filter(function () {
        return $(this).data('recaptchabutton');
    });
    signUpButton.hide();
});

var correctCaptcha = function (response) {
    var recaptcha = $('#g-recaptcha-response').val(response);

    if (recaptcha === "") {
        event.preventDefault();
    }
    else {
        var signUpButton = $(":button, :submit").filter(function () {
            return $(this).data('recaptchabutton');
        });
        signUpButton.css("display", "inline-block");
    }
};

var expiredCaptcha = function () {
        var signUpButton = $(":button, :submit").filter(function () {
            return $(this).data('recaptchabutton');
        });
        signUpButton.hide();
};

// Change the recaptcha styling based on available width
$(window).resize(function () {
    var recaptcha_mob = $('.g-recaptcha').parent().width();

    $('.g-recaptcha').removeClass("gcaptcha_mob1");
    $('.g-recaptcha').removeClass("gcaptcha_mob2");
    if (recaptcha_mob < 151) {
        $('.g-recaptcha').addClass("gcaptcha_mob1");
    }
    else if (recaptcha_mob < 304) {
        $('.g-recaptcha').addClass("gcaptcha_mob2");
    }
}).resize();