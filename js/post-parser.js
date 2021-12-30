"use strict";
$("document").ready(function () {
    $.getJSON("json/posts.json", function (json) {
        loadPosts(json);
    });
});
function loadPosts(json) {
    let $posts = $('#posts');
    for (let i in json.posts) {
        let $post = $('<div></div>').addClass('block');
        $posts.append($post);
        let title = '<h2>' + json.posts[i].data.title + '</h2>';
        let name = '<h5 class="author">' + json.posts[i].data.uname + '</h5>';
        let date = '<h5 class="date">' + json.posts[i].data.date + '</h5>';
        let text = '<h3>' + json.posts[i].data.text + '</h3>';
        let $comments = $('<div></div>').addClass('comments');
        let login = '<div class="' + json.posts[i].allowed + '"></div>';
        $post.append(title, name, date, '<hr>', text, $comments, login, '<br>');
        for (let j in json.posts[i].comments) {
            let $message = $('<div></div>').addClass('messagebox');
            $comments.append($message);
            let icon = '<div class="uicon ' + json.posts[i].comments[j].uicon + '"></div>';
            let head = '<div class="post-head"><br></div>';
            let name = '<div class="post-name">' + json.posts[i].comments[j].uname + '</div>';
            let text = '<div class="post-text">' + json.posts[i].comments[j].text + '</div>';
            $message.append(icon, head, name, text);
        }
    }
    let $parLog = $('.post-login-parent').children().clone(true, true);
    $('.post-login').html($parLog.html());
    let $parRes = $('.post-restrict-parent').children().clone(true, true);
    $('.post-restrict').html($parRes.html());
}
