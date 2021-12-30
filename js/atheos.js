let winIndex = [];

$(document).ready(function () {
    $('#infomenu').mouseenter(function (e) {
        if (winIndex.length == 0 || $('#docker').length) {
            return;
        }
        let $docker = $('<div id="docker"></div>');
        $('body').append($docker);
        for (let i = 0; i < winIndex.length; i++) {
            let $name = $('<div class="dock-names">' + winIndex[i].name + '</div>');
            $docker.append($name);
            $name.click(function (e) {
                focusWindow(i);
            });
        }
        $('#docker').mouseleave(function (e) {
            $('#docker').remove();
        });
    });
    
    // initialise icons
    addIcon('about.html', 'about', 'C:/ユーザー/al1-ce/about.inf', 'dIcon-About', 'About', 0); // example for me for future
});


//---------functions------------
function loadWallpaper() {
    let wallpaper = getCookie("background");
    if (wallpaper == "" || wallpaper == null) {
        wallpaper = "1";
        setCookie("background", wallpaper, 365);
    }
    let url = 'url("images/backgrounds/ocback' + wallpaper + '.gif")';
    $('#page').css('background-image', url);
}
// <div class="dLink"><button class="button" ondblclick="deployWindow('knowledge.html', 'knowledge', 'attr://knowledge.io/')">
    // <div class="dIcon dIcon-Know"></div>
    // Know
// </button></div>
function addIcon(page, id, address , icon, text, row) {
    console.log("not yet implemented");
}


// <div class="dLink"><button class="button" ondblclick="window.open('mailto:alice_beyond@list.ru', '_blank')">
    // <div class="dIcon dIcon-Mail">
        // <img src="images/oc-img/link.png" >
    // </div>
    // Mail
// </button></div>
function addIconLink(link, icon, text, row) {
    console.log("not yet implemented");
}

//------------------windows mechanic----------------
function deployWindow(url, name, link) {
    for (let i = 0; i < winIndex.length; i++) {
        if (winIndex[i].name == name) {
            focusWindow(i);
            return;
        }
    }
    new AWindow(url, name, link);
    windowCounter();
}
function closeWindow(id) {
    $('#win-id-' + id).remove();
    winIndex.splice(id, 1);
    sortWindows();
    windowCounter();
}
function maximizeWindow(id) {
    //let url = $('#win-id-' + id).find('.win-frame').attr('src');
    //window.open(url, '_blank');
    let win = $('#win-id-' + id);
    let pos = win.offset();
    let size = {w: win.width(), h: win.height()};
    let type = (pos.left < 2 && pos.top < 2 && size.w > $(window).width() - 12 && size.h > $(window).height() - 12)? false : true; //false - minimize, true - maximize
    if (type == true) {
        win.attr({
            'data-pos-x': pos.left,
            'data-pos-y': pos.top,
            'data-size-w': size.w,
            'data-size-h': size.h
        });
    }
    setTimeout(__maxWindow, 1000 / 60, win, type);
}
function __maxWindow(win, type) {
    let pos = win.offset();
    let size = {w: win.width(), h: win.height()};
    let oleft = win.attr('data-pos-x');
    let otop = win.attr('data-pos-y');
    let ow = win.attr('data-size-w');
    let oh = win.attr('data-size-h');

    let lerpPos = type ? {top: 0, left: 0} : {top: otop, left: oleft};
    let lerpSize = type ? {w: $(window).width() - 9, h: $(window).height() - 9} : {w: ow, h: oh};
    
    let newPos = {
        top: lerp(pos.top, lerpPos.top, 0.2),
        left: lerp(pos.left, lerpPos.left, 0.2)
    }
    let newSize = {
        w: lerp(size.w, lerpSize.w, 0.2),
        h: lerp(size.h, lerpSize.h, 0.2)
    }
    win.offset(newPos);
    win.width(newSize.w);
    win.height(newSize.h);
    if (type == true) {
        if (newPos.left < 1 && newPos.top < 1 && newSize.w > $(window).width() - 12 && newSize.h > $(window).height() - 12) return;
    } else {
        if (newPos.left > oleft - 1 && newPos.top > otop - 1 && newSize.w < ow + 1 && newSize.h < oh + 1) return;
    }
    console.log('timeout')
    setTimeout(__maxWindow, 1000 / 60, win, type);
}
function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
function minimizeWindow(id) {
    $('#win-id-' + id).css('display', 'none');
}
function updateWindow(id) {
    $('#win-frame-id-' + id).attr( 'src', function ( i, val ) { return val; });
}
function sortWindows() {
    for (let i = 0; i < winIndex.length; i++) {
        if (winIndex[i].id !== i) {
            winIndex[i].setId(winIndex[i].id, i);
        }
    }
}
function focusWindow(id) {
    $('#win-id-' + id).css('display', 'inline-block');
    let actIndex = parseInt($('#win-id-' + id).css('z-index'));
    for (let i = 0; i < winIndex.length; i++) {
        if (i == id) {
            continue;
        }
        let $window = $('#win-id-' + winIndex[i].id);
        let newIndex = parseInt($window.css('z-index'));
        if (actIndex < newIndex) {
            $window.css('z-index', newIndex - 1);
        }
    }
    $('#win-id-' + id).css('z-index', '50');
}
function windowCounter() {
    $('#infomenu').html('Win: ' + winIndex.length);
}
//----------------------windows--------------------------------
class AWindow {
    constructor(url, name, link) {
        this.url = url;
        this.name = name;
        this.link = link;
        this.id = winIndex.length;
        winIndex.push(this);
        this.create();
    }
    create() {
        let $window = $('<div class="window" id="win-id-' + this.id + '"></div>');
        $window.draggable();
        $('#page').append($window);
        $window.css({
            position: 'absolute',
            top: 16 + (winIndex.length * 2) + '%',
            left: 23 + (winIndex.length * 2) + '%'
        });
        let frameId = this.url.includes('?')? `&id=${this.id}`: `?id=${this.id}`;
        $window.append(`<div class="win-bar"> 
				<button class="win-close button" onclick="closeWindow(${this.id})"></button>
				<button class="win-full button"  onclick="maximizeWindow(${this.id})"></button>
				<button class="win-min button"  onclick="minimizeWindow(${this.id})"></button>
				<button class="win-upd button"  onclick="updateWindow(${this.id})"></button>
				<div class="win-text">${this.link}</div>
			</div>
			<div class="win-content">
				<iframe class="win-frame" id="win-frame-id-${this.id}" src="${this.url}${frameId}"></iframe>
			</div>
			<div class="resizer"></div>`);
        this.setListeners();
        this.makeResizable();
        focusWindow(this.id);
    }
    setListeners() {
        let $window = $('#win-id-' + this.id);
        let id = this.id;
        //set click event for window
        $window.on('mousedown', function (e) {
            focusWindow(id);
        });
        //set click event for iframe (tricky)
        let $iframe = $window.find('.win-frame');
        $iframe.iframeTracker(false);
        $iframe.iframeTracker(function () {
            focusWindow(id);
        });
    }
    setId(id, newId) {
        this.id = newId;
        let $window = $('#win-id-' + id);
        $window.attr('id', 'win-id-' + this.id);
        $window.find('.win-close').attr('onclick', 'closeWindow(' + this.id + ')');
        $window.find('.win-full').attr('onclick', 'maximizeWindow(' + this.id + ')');
        $window.find('.win-min').attr('onclick', 'minimizeWindow(' + this.id + ')');
        this.setListeners();
    }
    makeResizable() {
        const minWidth = 500;
        const minHeight = 200;
        let $window = $('#win-id-' + this.id);
        $window.attr({
            'data-pos-x': $window.offset().left,
            'data-pos-y': $window.offset().top,
            'data-size-w': $window.width(),
            'data-size-h': $window.height()
        });
        let $list = $window.find('.resizer');
        $list.on('mousedown', function () {
            $window.draggable('disable');
            $(this).css({
                width: 600,
                height: 600,
                right: -300,
                bottom: -300
            });
            $(this).on('mousemove', function (e) {
                let offset = $(this).offset();
                let x = e.pageX - offset.left;
                let y = e.pageY - offset.top;
                let $par = $(this).parent();
                let newWidth = $par.width() + (x - 300);
                let newHeight = $par.height() + (y - 300);
                if (newWidth >= minWidth) {
                    $par.width(newWidth);
                }
                if (newHeight >= minHeight) {
                    $par.height(newHeight);
                }
            });
        }).on('mouseup', function () {
            $(this).off('mousemove');
            $window.draggable('enable');
            $(this).css({
                width: 10,
                height: 10,
                right: -5,
                bottom: -5
            });
        });
    }
}
