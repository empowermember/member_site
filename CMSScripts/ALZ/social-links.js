window.socialLinks = window.socialLinks || {};
window.socialLinks.print = function() {
    window.print();
}

window.socialLinks.bookmark = function (e) {
    if('WebkitAppearance' in document.documentElement.style){ // webkit - safari/chrome
        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
        e.preventDefault();
    }
    else if (window.external) { // IE Favorite
        window.external.AddFavorite(location.href, document.title);
    }
}

window.socialLinks.twitter = function (caller) {
    var url = $(caller).attr('href');
    var title = $(caller).attr('data-title');
    window.socialLinks.popupCenter("https://twitter.com/intent/tweet?text=" + title + "&url=" + url, "", 1000, 700);
}

window.socialLinks.googlePlus = function (caller) {
    var url = $(caller).attr('href');
    window.socialLinks.popupCenter("https://plus.google.com/share?url=" + url, "", 1000, 700);
}


window.socialLinks.facebook = function(caller) {
    var url = $(caller).attr('href');
    window.socialLinks.popupCenter("https://www.facebook.com/sharer/sharer.php?u=" + url, "", 1000, 700);
}

window.socialLinks.pinterest = function (caller) {
    var url = $(caller).attr('href');
    var title = $(caller).attr('data-title');
    var image = $(caller).attr('data-image');
    PinUtils.pinOne({
        'url': url,
        'media': image,
        'description': title
    });
}

window.socialLinks.popupCenter = function(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}