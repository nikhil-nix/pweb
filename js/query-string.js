"use strict";
function getUrlVars() {
    let href = window.location.href;
    let vars = {};
    let hashes = href.slice(href.indexOf('?') + 1).split('#')[0].split('&');
    for (let i in hashes) {
        let hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}
