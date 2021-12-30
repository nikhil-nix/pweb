function getCurrentTheme() {
    let theme = getCookie("theme"); // 1 - new, 0 - old
    if (theme == "" || theme == null) {
        theme = "0";
        setCookie("theme", theme, 365);
    }

    if (theme == "1") {
        $('head').append('<link rel="stylesheet" type="text/css" href="/css/theme-new.css">');
    } else {
        $('head').append('<link rel="stylesheet" type="text/css" href="/css/theme-old.css">');
    }

    return theme;
}