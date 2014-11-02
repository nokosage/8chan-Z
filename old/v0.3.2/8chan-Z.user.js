// ==UserScript==
// @name        8chan Z
// @namespace   nokosage
// @description Attempts to improve/overhaul the 8chan experience.
// @author      nokosage
// @license     MIT; https://github.com/nokosage/8chan-Z/blob/master/LICENSE
// @include     *://*8chan.co/*
// @run-at      document-start
// @version     0.3.2
// @grant       none
// @updateURL   https://raw.githubusercontent.com/nokosage/8chan-Z/master/8chan-Z.meta.js
// @downloadURL https://raw.githubusercontent.com/nokosage/8chan-Z/master/8chan-Z.user.js
// ==/UserScript==

/**
 * 8chan Z v0.3.2
 * https://github.com/nokosage/8chan-Z/
 *
 * Developers:
 * nokosage
 *
 * Contributers:
 * https://github.com/nokosage/8chan-Z/graphs/contributors
 */

'use strict';

(function() {
  var d, db, h, $, $$;
  d = document;
  db = document.body;
  h = (d.querySelector('head')) ? d.querySelector('head') : db;

  $ = function(s, p) {
    if (!p || p == null) {
      p = d;
    }
    return p.querySelector(s);
  };

  $$ = function(s, p) {
    if (!p || p == null) {
      p = d;
    }
    return p.querySelectorAll(s);
  };

  $.elm = function (t, a, s) {
    var e = d.createElement(t);
    if (a) {
      for (var key in a) {
        e.setAttribute(key, a[key]);
      }
    }
    if (s) {
      s.appendChild(e);
    }
    return e;
  };

  $.getVal = function(k, v) {
    if (typeof (Storage) !== 'undefined') {
      if (v == null) {
        if (localStorage.getItem('' + g.NAMESPACE + k) != null) {
          return localStorage.getItem('' + g.NAMESPACE + k);
        } else {
          return 'undefined';
        }
      } else {
        if (localStorage.getItem('' + g.NAMESPACE + k) != null) {
          return localStorage.getItem('' + g.NAMESPACE + k);
        } else {
          return v;
        }
      }
    } else {
      return 'storage unavailable';
    }
  };

  $.setVal = function(k, v) {
    if (typeof (Storage) !== 'undefined') {
      if (v == null) {
        return 'undefined';
      } else {
        return localStorage.setItem('' + g.NAMESPACE + k, v);
      }
    } else {
      return 'storage unavailable';
    }
  };

  $.delVal = function(k) {
    return localStorage.removeItem('' + g.NAMESPACE + k);
  };

  $.htm = function(s, v) {
    if (v == null) {
      return s.innerHTML;
    } else {
      s.innerHTML = v;
    }
    return s;
  };

  $.text = function(s, v) {
    if (v == null) {
      return s.textContent;
    } else {
      s.textContent = v;
    }
    return s;
  };

  $$.htm = function(s, v, n) {
    if (v == null) {
      return s.innerHTML;
    } else {
      if (!n || n == null) {
        for (var i = 0; i < s.length; i++) {
          s[i].innerHTML = v;
        }
      } else {
        s[n].innerHTML = v;
      }
    }
    return s;
  };

  $.val = function(s, v) {
    if (v == null) {
      return s.value;
    } else {
      s.value = v;
    }
    return s;
  };

  $.att = function(s, a, v) {
    if (!v || v == null || v == false) {
      if (v == false) {
        return s.removeAttribute(a);
      } else {
        return s.getAttribute(a);
      }
    } else {
      s.setAttribute(a, v);
      return s;
    }
  };

  $$.att = function(s, a, v, n) {
    if (!v || v == null) {
      if (!n && n != 0 || n == null && n != 0) {
        var x = [
        ];
        for (var i = 0; i < $$(s) .length; i++) {
          x.push(s[i].getAttribute(a));
        }
        return x;
      } else {
        return s[n].getAttribute(a);
      }
    } else {
      if (!n || n == null) {
        for (var i = 0; i < $$(s) .length; i++) {
          s[i].setAttribute(a, v);
        }
      } else {
        s[n].setAttribute(a, v);
      }
      return s;
    }
  };

  $.css = function(s) {
    var e = d.createElement('style');
    e.type = 'text/css';
    if (e.styleSheet) {
      e.styleSheet.cssText = s;
    } else {
      e.appendChild(d.createTextNode(s));
    }
    $('head').appendChild(e);
    return e;
  };

  $.event = function(t, i, s) {
    if (i == null) {
      i = {
      };
    }
    if (s == null) {
      s = d;
    }
    return s.dispatchEvent(new CustomEvent(t, i));
  };

  $.exists = function(s) {
    if (s.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  $.set = function(v, d) {
    if (d == null) {
      return (v) ? v : false;
    }
    return (v) ? v : d;
  };

  $.each = function(a, c, e) {
    for (var i = 0; i < a.length; i++) {
      c(a[i], i);
      if (i == (a.length) - 1) {
        if (e && e != null) {
          return e(a[i], i);
        } else {
          return a;
        }
      }
    }
  };

  $.time = function(t, c, l) {
    if (c == false) {
      return clearInterval(t);
    } else {
      if (l == true) {
        return setInterval(function () {
          c();
        }, t);
      } else {
        return setTimeout(function () {
          c();
        }, t);
      }
    }
  };

  $.extend = function(object, properties) {
    var value;
    for (var key in properties) {
      value = properties[key];
      object[key] = value;
    }
  };

  $.xhr = (function() {
    var last_modified = {};
    return function(info, properties) {
      var type, url, modified_when, input, headers;
      type = $.set(info.type);
      url = $.set(info.url);
      modified_when = $.set(info.modified_when);
      input = $.set(info.input);
      headers = $.set(info.headers);
      if (input != null && input) {
        if (type == 'POST') {
          var xd = new FormData();
          for (var key in input) {
            xd.append(key, input[key]);
          }
        } else {
          xd = '?';
          for (var key in input) {
            xd += key + '=' + input[key] + '&';
          }
          xd = xd.substring(0, (xd.length - 1));
          url += xd;
        }
      }
      var xhr = new XMLHttpRequest();
      xhr.open(type, url, true);
      if (modified_when) {
        if (url in last_modified) {
          xhr.setRequestHeader('If-Modified-Since', last_modified[url]);
        }
        $.on(xhr, 'load', function() {
          return last_modified[url] = xhr.getResponseHeader('Last-Modified');
        });
      }
      if (headers != null && headers) {
        for (var key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      $.extend(xhr, properties);
      if (type == 'POST' && input != null && input) {
        xhr.send(xd);
      } else {
        xhr.send();
      }
      return xhr;
    };
  })();

  $.JSON = function(s) {
    if (typeof s == 'string') {
      return JSON.parse(s);
    } else {
      return JSON.stringify(s);
    }
  };

  $.after = function(n, s) {
    return s.parentNode.insertBefore(n, s.nextSibling);
  };

  $.before = function(n, s) {
    return s.parentNode.insertBefore(n, s);
  };

  $.addClass = function(el, className) {
    return el.classList.add(className);
  };

  $.removeClass = function(el, className) {
    return el.classList.remove(className);
  };

  $.hasClass = function(el, className) {
    return el.classList.contains(className);
  };

  $.tn = function(text) {
    return d.createTextNode(text);
  };

  $.add = function(parent, children) {
    return parent.appendChild($.nodes(children));
  };

  $.nodes = function(nodes) {
    var frag, node, _i, _len;
    if (!(nodes instanceof Array)) {
      return nodes;
    }
    frag = d.createDocumentFragment();
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      frag.appendChild(node);
    }
    return frag;
  };

  $.on = function(el, type, handler, bind) {
    if (bind == null) {
          return el.addEventListener(type, handler, false);
    }
    return el.addEventListener(type, handler.bind(bind), false);
  };

  $.off = function(el, type, handler) {
    return el.removeEventListener(type, handler, false);
  };

  $.ready = function(fc) {
    var cb;
    if (d.readyState !== 'loading') {
      fc();
      return ;
    }
    cb = function () {
      $.off(d, 'DOMContentLoaded', cb);
      return fc();
    };
    return $.on(d, 'DOMContentLoaded', cb);
  };

  $.JSON = function(s) {
    if (typeof s == 'string') {
      return JSON.parse(s);
    } else {
      return JSON.stringify(s);
    }
  };

  $.destroy = function(s) {
    return s.parentNode.removeChild(s);
  };

  $.split = function(s, c, n) {
    if (n != null)
      return s.split(c)[n];
    else
      return s.split(c);
  };

  $.substr = function(s, n, k) {
    s = s.toString();
    if (k == null) {
      return s.substring(n);
    }
    return s.substring(n, k);
  };

  $.pad = function(s, p) {
    var len;
    s = s.toString();
    if (p == null) {
      p = '00';
    }
    return $.substr(p, 0, p.length - s.length) + s;
  };

  $.date = function(t, modified) {
    var a, m, d, month, date, year, day, date, hour, minute, second;
    a = new Date(t * 1000);
    m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    month = a.getMonth();
    date = a.getDate();
    year = a.getFullYear();
    day = a.getDay();
    hour = $.pad(a.getHours());
    minute = $.pad(a.getMinutes());
    second = $.pad(a.getSeconds());
    if (modified === true) {
      return a.toGMTString();
    }
    return (month + 1) + '/' + date + '/' + $.substr(year, 2) + '(' + d[day] + ')' + hour + ':' + minute + ':' + second;
  };

  $.bytes = function(s) {
    var k, sizes, i;
    if (s == 0) return '0 Byte';
    k = 1000;
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    i = Math.floor(Math.log(s) / Math.log(k));
    return (s / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  };

  var Config = {

  };

  var Info = {
    NAMESPACE: '8chan-Z.',
    VERSION: '0.3.2',
    PROTOCOL: location.protocol,
    HOST: '8chan.co',
    view: 'none',
    board: false,
    threads: []
  };

  var CSS = {
    Main: function() {
      Main.css = $.css('\
#top_menu {\
  box-shadow: 0 -15px 6px 15px rgba(0, 0, 0, 0.5);\
  left: 0;\
  line-height: 1.6;\
  margin: -1px 0 0 -5px;\
  padding: 0 5px;\
  position: fixed;\
  top: 0;\
  width: 100%;\
  z-index: 100;\
}\
.navButtons {\
  display: inline-block;\
  left: calc(50% - 30px);\
  margin: 0 5px;\
  position: absolute;\
  text-align: center;\
}\
.navButtons > a {\
  margin: 0 2px;\
}\
.fa {\
  font-family: fontAwesome !important;\
  font-size: 14px;\
}\
.stylechanger {\
    float: right;\
    font-weight: bold;\
}\
.postContainer {\
    position: relative;\
}\
.post-button {\
  float: left;\
  margin: 4px 0 0 -4px;\
  position: absolute;\
  top: 0;\
  text-decoration: none;\
}\
.stub {\
  margin-bottom: -7px;\
  margin-left: 18px;\
  margin-top: -7px;\
}\
.hide {\
  display: none !important;\
}\
div.post.reply {\
  margin-left: 10px;\
}\
.classNum a, .menu-button {\
  margin: 0 !important;\
  text-decoration: none;\
}\
.menu-button:before {\
  content: "";\
}\
div.post div.file .fileThumb {\
  float: left;\
  margin: 3px 20px 5px;\
}\
.reply > .file > .fileText {\
  margin: 0 20px;\
}\
.classNum a, .postContainer > a {\
  color: inherit !important;\
}'    );
    }
  };

  var Settings = {
    styles: {
      'Yotsuba': '/stylesheets/yotsuba.css',
      'Yotsuba-B': '/stylesheets/yotsuba_b.css',
      'Tomorrow': '/stylesheets/tomorrow.css',
      'Photon': '/stylesheets/photon.css',
      'Dark': '/stylesheets/dark.css'
    },
    title: false,
    style: false,
    init: function() {
      var _ref;
      Settings.style = (_ref = $('#stylesheet')) ? _ref : $.elm('link', {
        id: 'stylesheet',
        href: '/stylesheets/yotsuba.css',
        type: 'text/css',
        rel: 'styleshet'
      }, h);
      Settings.title = (_ref = $('title', h)) ? _ref : false;
      Menu.init();
    },
    setStyle: function() {
      Settings.style.href = Menu.styleSelector.value;
    }
  }

  var Menu = {
    button: false,
    styleChanger: false,
    top_menu: false,
    bottom_menu: false,
    styleSelector: false,
    navButtons: false,
    init: function() {
      var _ref;
      //Top Menu
      Menu.top_menu = (_ref = $('div.boardlist')) ? _ref : false;
      $.addClass($.att(Menu.top_menu, 'id', 'top_menu'), 'pages');
      Menu.navButtons = $.elm('span', {
        class: 'navButtons'
      }, Menu.top_menu);
      $.elm('a', {
        href: '#top',
        class: 'fa fa-arrow-up'
      }, Menu.navButtons);
      $.elm('a', {
        href: '#bottom',
        class: 'fa fa-arrow-down'
      }, Menu.navButtons);
      $.after($.elm('br'), Menu.top_menu);
      $.after($.elm('div', {
        id: 'top',
        class: 'anchor'
      }), Menu.top_menu);
      //Bottom Menu
      Menu.bottom_menu = (_ref = $('div.boardlist.bottom')) ? $.att(_ref, 'id', 'bottom_menu') : false;
      Menu.styleChanger = $.elm('span', {
        class: 'stylechanger'
      }, Menu.bottom_menu);
      $.add(Menu.styleChanger, $.tn('Style: '));
      Menu.styleSelector = $.elm('select', {
        id: 'styleSelector'
      }, Menu.styleChanger);
      for (var key in Settings.styles) {
        $.text($.elm('option', {
          value: Settings.styles[key]
        }, Menu.styleSelector), key);
      }
      $.before($.elm('div', {
        id: 'bottom',
        class: 'anchor'
      }, Menu.bottom_menu), Menu.bottom_menu.childNodes[0]);
      $.on(Menu.styleSelector, 'click', Settings.setStyle);
      //Settings menu
      Menu.button = $.before($.elm('a', {
        id: '#8chanZMenuButton',
        class: 'fa fa-bars',
        href: 'javascript:;'
      }, Menu.navButtons), $('[href="#bottom"]', Menu.navButtons));
      $.before($.tn(' / '), Menu.button);
      $.after($.tn(' / '), Menu.button);
      $.time(3000, function() {
        Menu.navButtons.style.left = 'calc(50% - ' + ((_ref = window.getComputedStyle(Menu.navButtons)) ? (parseInt(_ref.width) + parseInt(_ref.marginLeft) + parseInt(_ref.marginRight)) / 2 : 0) + 'px)';
      });
    }
  };

  var Cleaner = {
    init: function() {
      Cleaner.overrideFunctions();
      Cleaner.rebuildHead();
    },
    rebuildHead: function() {
      $.destroy($('head'));
      $.each($$('script'), $.destroy);
      var _html = '<meta charset="utf-8">' +
                  '<link rel="stylesheet" media="screen" href="/stylesheets/style.css">' +
                  '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
                  '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">' +
                  '<meta name="robots" content="noindex">' +
                  '<link rel="stylesheet" type="text/css" id="stylesheet" href="/stylesheets/tomorrow.css">' +
                  '<link rel="stylesheet" media="screen" href="/stylesheets/font-awesome/css/font-awesome.min.css">' +
                  '<link rel="stylesheet" href="/static/flags/flags.css">' +
                  '<link rel="stylesheet" type="text/css" href="/js/katex/katex.min.css">' +
                  '<script type="text/javascript">var configRoot="/";var inMod = false;var modRoot="/"+(inMod ? "mod.php?/" : "");</script>' +
                  '<title>/b/ - Random</title>';
      h = $.htm($.elm('head', null, document.documentElement), _html);
    },
    destroyThreads: function(threads) {
      var _i, _ref;
      for (_i = 0; _i < threads.length; _i++)
        if (_ref = $('#thread_'+threads[_i]))
          $.destroy(_ref);
    },
    overrideFunctions: function() {
      window.rememberStuff = function(){};
      window.ready = function(){};
      window.onready = function(){};
      window.init = function(){};
    }
  };

  var Threads = {
    sync: {},
    init: function() {
      Threads.run();
    },
    run: function() {
      var _i;
      for (_i = 0; _i < Info.threads.length; _i++)
        Threads.xhrThread(Info.threads[_i]);
    },
    updateThread: function(thread) {
      var _i, _thd, _ref,
          _new = false,
          _new_posts = [];
      if (!Z.Threads[thread])
        Z.Threads[thread] = new Thread(thread);
      _thd = Z.Threads[thread];
      for (_i = 0; _i < Object.keys(Threads.sync).length; _i++) {
        _ref = Threads.sync[_i];
        if (!_thd.Posts[_ref.no]) {
          _new = true;
          _thd.Posts[_ref.no] = new Post(_ref);
          _new_posts.push(_ref.no);
        }
      }
      if (_new) {
        $.event(Info.NAMESPACE + 'NewPosts', {
          posts: _new_posts
        });
      }
      Z.Threads[thread].last_modified = Threads.sync[0].last_modified;
      $.event(Info.NAMESPACE + 'ThreadUpdated');
    },
    xhrThread: function(thread) {
      $.xhr({
        type: 'GET',
        url: Info.PROTOCOL + '//' + Info.HOST + '/' + Info.board + '/res/' + thread + '.json',
        modified_when: true,
        headers: {
          'Best-Thread': '/b/read'
        }
      }, {
        onload: function(c) {
          var _i, r;
          c = (c) ? c.target : {
            responseText: "{'posts':{}}"
          };
          if (c.statusText === "Not Modified") {
            return;
          }
          r = $.JSON(c.responseText)['posts'];
          for (_i = 0; _i < r.length; _i++) {
            Threads.sync[_i] = r[_i];
          }
          Threads.updateThread(thread);
        }
      });
    }
  };

  var Auto_Loader = {
    timeout: 10,
    run: function() {
      Threads.run();
    }
  };

  var Timer = {
    time: 1,
    timer: false,
    init: function() {
      Timer.timer = $.time(1000, Timer.run, true);
    },
    run: function(t) {
      if (Timer.time == null) {
        Timer.time = 0;
      }

      Timer.check(Auto_Loader.timeout, Auto_Loader.run);

      Timer.time++;
    },
    check: function(t, fc) {
      return (Timer.time % t === 0) ? fc() : false;
    }
  };

  var Main = {
    init: function() {
      Main.setBoard();
      if (Info.view === 'frontpage') {
        Main.frontpage();
      }
      if (Info.view === 'index') {
        Main.board();
      }
      if (Info.view === 'catalog') {
        Main.catalog();
      }
      if (Info.view === 'res' || Info.view === 'thread') {
        Main.thread();
      }
    },
    ready: function() {
      Settings.init();
      Main.setThreads();
      Cleaner.destroyThreads(Info.threads);
      Threads.init();
      CSS.Main();
      Reply.init();
      Timer.init();
      $.event(Info.NAMESPACE + 'Ready');
      console.log(Info.NAMESPACE + Info.VERSION + ": Initialization Complete.");
    },
    frontpage: function() {
      console.warn(Info.NAMESPACE + Info.VERSION + ": Frontpage not implemented yet.");
    },
    catalog: function() {
      console.warn(Info.NAMESPACE + Info.VERSION + ": Catalog not implemented yet.");
    },
    board: function() {
      console.log(Info.NAMESPACE + Info.VERSION + ": Initializing View: Board");
      //Cleaner.init();
      //$.ready(Main.ready);
    },
    thread: function() {
      console.log(Info.NAMESPACE + Info.VERSION + ": Initializing View: Thread");
      Cleaner.init();
      $.time(100, Main.ready);
    },
    setBoard: function() {
      var path, _ref;
      path = $.split(location.pathname, '/');
      Info.board = (_ref = path[1]) ? _ref : false;
      Info.view = (_ref = $.split(path[2], '.')[0]) === 'thread' || _ref === 'catalog' || _ref === 'res' ? _ref : (Info.board) ? 'index' : 'frontpage';
      Info.view = (_ref = $.split($.split(location.pathname, '.')[1], '#')[0]) !== 'html' ? 'none' : Info.view;
    },
    setThreads: function() {
      if ($('[data-board="'+Info.board+'"]')) {
        $.each($$('[data-board="'+Info.board+'"]'), function(el) {
          Info.threads.push($.split(el.id, 'thread_')[1]);
        });
      } else {
        return console.error(Info.NAMESPACE + Info.VERSION + ": No threads found.");
      }
    }
  };

  var Reply = {
    form: false,
    init: function() {
      Reply.form = new Post_Form();
    }
  };

  var Post_Form = (function() {
    Post_Form.prototype.toString = function() {
      return this.ID;
    };
    function Post_Form() {
      var root, tbody, _ref;
      this.ID = 'Form';

      root = $('[name="post"]');
      tbody = $('tbody', root);
      this.nodes = {
        root: root,
        name: (_ref = $('[name="name"]', root)) ? _ref.parentNode.parentNode : $.before($.htm($.elm('tr'),
          '<th>Name<input type="hidden" value="" name="firstname"></th>' +
          '<td><input type="text" autocomplete="off" maxlength="35" size="25" name="name"></td>'
        ), tbody.childNodes[0])
      };
    }

    return Post_Form;

  })();

  var Thread = (function() {
    Thread.prototype.toString = function() {
      return this.ID;
    };

    function Thread(no) {
      var root;
      this.ID = no;
      this.Posts = {};
      this.last_modified = 0;

      root = $.after($.elm('div', {
        id: 'thread_' + this.ID,
        class: 'thread'
      }), $('[name="board"]', $('[name="postcontrols"]')));

      this.nodes = {
        root: root,
        end: $.elm('hr', {
          id: 'thread_' + this.ID + '_end'
        }, root)
      };
    }

    return Thread;

  })();

  var Post = (function() {
    Post.prototype.toString = function() {
      return this.ID;
    };
    Post.prototype.hide = function() {
      var root, post, stub, btnShow, btnHide;
      root = this.nodes.root;
      post = this.nodes.post;
      btnHide = this.nodes.btnHide;
      stub = $.before($.elm('div', {
        id: 's' + this.ID,
        class: 'stub',
      }, root), post);
      stub.info = $.htm($.elm('p', {
        class: 'intro'
      }, stub), $.htm(post.info));
      btnShow = $.elm('a', {
        id: 'p' + this.ID,
        class: 'show-button post-button fa fa-plus-square-o',
        href: 'javascript:;'
      }, root);
      $.on(btnShow, 'click', this.show, this);
      $.addClass(post, 'hide');
      $.addClass(btnHide, 'hide');
      this.stub = true;
      this.nodes.stub = stub;
      this.nodes.btnShow = btnShow;
    };
    Post.prototype.show = function() {
      var post, stub, btnShow, btnHide;
      post = this.nodes.post;
      stub = this.nodes.stub;
      btnHide = this.nodes.btnHide;
      btnShow = this.nodes.btnShow;
      $.destroy(stub);
      $.destroy(btnShow);
      $.removeClass(post, 'hide');
      $.removeClass(btnHide, 'hide');
      this.stub = false;
      this.nodes.stub = false;
      this.nodes.buttonShow = false;
    };
    Post.prototype.set = function(type, str, txt) {
      var set, user;
      user = this.user;
      switch (txt) {
        case 'txt':
        case 'text':
          set = $.text;
          break;
        case 'htm':
        case 'html':
          set = $.htm;
          break;
        default:
          set = $.text;
      }
      switch (type) {
        case 'com':
        case 'comment':
          return set(user.com, str);
        case 'name':
          return set(user.name, str);
        case 'sub':
        case 'subject':
          return set(user.subject, str);
        case 'email':
          return set(user.email, str);
        case 'trip':
        case 'tripcode':
          return set(user.trip, str);
        default:
          return;
      }
    };
    Post.prototype.get = function(type, txt) {
      var get, user;
      user = this.user;
      switch (txt) {
        case 'txt':
        case 'text':
          get = $.text;
          break;
        case 'htm':
        case 'html':
          get = $.htm;
          break;
        default:
          get = $.text;
      }
      switch (type) {
        case 'com':
        case 'comment':
          return get(user.com);
        case 'name':
          return get(user.name);
        case 'sub':
        case 'subject':
          return get(user.subject);
        case 'email':
          return get(user.email);
        case 'trip':
        case 'tripcode':
          return get(user.trip);
        default:
          return;
      }
    };
    Post.prototype.createBacklinks = function() {
      var links, no, _ref;
      links = $$('a', this.user.com);
      for (var _i = 0; _i < links.length; _i++) {
        no = (_ref = $.split($.text(links[_i]), '>>')[1]) ? _ref : false;
        if (no && (_ref = Z.Threads[this.thread].Posts[no])) {
          _ref.createBacklink(this.thread, this.ID);
        }
      }
    };
    Post.prototype.createBacklink = function(thread, no) {
      var backlink;
      if (this.backlinks[no]) {
        return;
      }
      backlink = $.text($.elm('a', {
        class: 'backlink',
        href: '/' + Info.board + '/res/' + thread + '.html#p' + no
      }, this.nodes.post.info.backlinkContainer), '>>' + no);
      this.backlinks[no] = backlink;
      return backlink;
    };
    Post.prototype.destroyBacklinks = function() {
      var links, no, _ref;
      links = $$('a', this.user.com);
      for (var _i = 0; _i < links.length; _i++) {
        no = (_ref = $.split($.text(links[_i]), '>>')[1]) ? _ref : false;
        if (no && (_ref = Z.Threads[this.thread].Posts[no])) {
          _ref.destroyBacklink(this.ID);
        }
      }
    };
    Post.prototype.destroyBacklink = function(no) {
      var _ref;
      if (_ref = this.backlinks[no]) {
        $.destroy(_ref);
      }
    };

    function Post(data) {
      var _thread, _thread_end, root, btnHide, stub, post, user, tn_s;
      this.ID = data.no;
      this.thread = (data.resto) ? data.resto : data.no;
      this.isReply = (data.resto) ? true : false;
      this.stub = false;
      this.data = data;
      this.backlinks = {};

      _thread = $('#thread_' + this.thread);
      _thread_end = $('#thread_' + this.thread + '_end');
      root = $.before($.elm('div', {
        id: 'p' + this.ID,
        class: (this.isReply) ? 'postContainer replyContainer' : 'postContainer opContainer'
      }, _thread), _thread_end);

      btnHide = $.elm('a', {
        id: this.ID,
        class: 'hide-button post-button fa fa-minus-square-o',
        href: 'javascript:;'
      }, root);
      $.on(btnHide, 'click', this.hide, this);

      post = $.elm('div', {
        id: 'reply_' + this.ID,
        class: (this.isReply) ? 'post reply' : 'post op'
      }, root);
      post.info = $.elm('p', {
        class: 'postInfo intro'
      }, post);
      post.info.del = $.elm('input', {
        type: 'checkbox',
        value: 'delete',
        name: this.ID
      }, post.info);
      $.after($.tn(' '), post.info.del);
      post.info.subject = $.htm($.elm('span', {
        class: 'subject'
      }, post.info), $.set(data.sub, ''));
      $.after($.tn(' '), post.info.subject);
      post.info.nameBlock = $.elm('span', {
        class: 'nameBlock'
      }, post.info);
      post.info.nameBlock.email = $.elm('a', {
        class: 'email',
        href: 'mailto:' + $.set(data.email, '')
      }, post.info.nameBlock);
      post.info.nameBlock.name = $.htm($.elm('span', {
        class: 'name'
      }, (data.email) ? post.info.nameBlock.email : post.info.nameBlock), $.set(data.name, ''));
      post.info.nameBlock.trip = $.htm($.elm('span', {
        class: 'trip'
      }, (data.email) ? post.info.nameBlock.email : post.info.nameBlock), $.set(data.trip, ''));
      if (data.capcode) {
        post.info.nameBlock.capcode = $.htm($.elm('span', {
          class: 'capcode'
        }, post.info.nameBlock), '## ' + data.capcode);
        $.before($.tn(' '), post.info.nameBlock.capcode);
      }
      if (data.country) {
        data.country = data.country.toLowerCase();
        post.info.nameBlock.country = $.elm('img', {
          class: 'flag flag-' + data.country,
          title: data.country_name,
          alt: data.country_name,
          style: 'width: 16px; height: 11px;',
          src: '/static/flags/' + data.country + '.png'
        }, post.info.nameBlock);
        $.before($.tn(' '), post.info.nameBlock.country);
      }
      //@TODO Poster ID goes here
      post.info.dateTime = $.text($.elm('time', {
        class: 'dateTime',
        'data-utc': data.time
      }, post.info), $.date(data.time));
      $.before($.tn(' '), post.info.dateTime);
      $.after($.tn(' '), post.info.dateTime);
      post.info.postNum = $.elm('span', {
        class: 'classNum'
      }, post.info);
      post.info.postNum.anchor = $.text($.elm('a', {
        title: 'Link to this post',
        href: '/' + Info.board + '/res/' + this.thread + '.html#p' + this.ID
      }, post.info.postNum), 'No.');
      post.info.postNum.replyTo = $.text($.elm('a', {
        title: 'Reply to this post',
        href: '/' + Info.board + '/res/' + this.thread + '.html#q' + this.ID
      }, post.info.postNum), this.ID);
      post.info.menuBtn = $.text($.elm('a', {
        class: 'menu-button fa',
        href: 'javascript:;'
      }, post.info), '');
      $.before($.tn(' '), post.info.menuBtn);
      post.info.backlinkContainer = $.elm('span', {
        class: 'backlink-container'
      }, post.info);
      //@TODO: Support for more files
      if (data.ext) {
        post.file = $.elm('div', {
          class: 'file'
        }, post);
        if (!this.isReply)
          $.before(post.file, post.info);
        post.file.fileText = $.elm('div', {
          class: 'fileText'
        }, post.file);
        post.file.fileInfo = $.elm('span', {
          class: 'file-info'
        }, post.file.fileText);
        post.file.fileInfo.fileLink = $.text($.elm('a', {
          target: '_blank',
          href: Info.PROTOCOL + '//' + Info.HOST + '/' + Info.board + '/src/' + data.tim + data.ext
        }, post.file.fileInfo), data.filename + data.ext);
        $.after($.tn(' (' + $.bytes(data.fsize) + ((data.ext !== '.swf') ? ', ' + data.w + 'x' + data.h : '') + ') '), post.file.fileInfo.fileLink);
        //@TODO Sauce goes here
        post.file.fileThumb = $.elm('a', {
          class: 'fileThumb',
          target: '_blank',
          href: Info.PROTOCOL + '//' + Info.HOST + '/' + Info.board + '/src/' + data.tim + data.ext
        }, post.file);
        if (this.isReply && (data.tn_w > 125 || data.tn_h > 125)) {
          tn_s = (data.tn_w > data.tn_h) ? 'max-width: 125px; height: auto;' : ((data.tn_h > data.tn_w) ? 'width: auto; max-height: 125px;' : 'max-width: 125px; max-height: 125px;');
        } else {
          tn_s = 'width: ' + data.tn_w + 'px; height: ' + data.tn_h + 'px;';
        }
        post.file.fileThumb.img = $.elm('img', {
          style: tn_s + ' float: left;',
          'data-md5': data.md5,
          alt: $.bytes(data.fsize),
          src: (data.ext === '.swf') ? '/static/file.png' : Info.PROTOCOL + '//' + Info.HOST + '/' + Info.board + '/thumb/' + ((data.ext !== '.webm') ? data.tim + data.ext : data.tim + '.jpg')
        }, post.file.fileThumb);
      }
      post.com = $.htm($.elm('blockquote', {
        class: 'postMessage'
      }, post), $.set(data.com, ''));

      this.user = {
        subject: $.set(post.info.subject),
        email: $.set(post.info.nameBlock.email),
        name: $.set(post.info.nameBlock.name),
        trip: $.set(post.info.nameBlock.trip),
        com: $.set(post.com)
      };
      this.file = (data.ext) ? {
        md5: data.md5,
        tim: data.tim,
        ext: data.ext,
        filename: data.filename,
        size: data.fsize,
        img: post.file.fileThumb.img,
        text: post.file.fileText
      } : false;
      this.timestamp = data.time;
      this.nodes = {
        root: root,
        btnHide: btnHide,
        btnShow: false,
        post: post,
        stub: false
      };

      this.createBacklinks();
    }

    return Post;

  })();

  var _8chanZ = (function() {
    _8chanZ.prototype.toString = function() {
      return this.Info.NAME + this.Info.VERSION;
    };
    _8chanZ.prototype.makeGlobal = function() {
      window.Z = this;
    }

    function _8chanZ() {
      this.Info = Info;
      this.Settings = Settings;
      this.Threads = {};

      this.makeGlobal();
    }

    return _8chanZ;

  })();

  console.log(Info.NAMESPACE + Info.VERSION + ": Initializing...");

  var Z = new _8chanZ();

  $.time(250, Main.init());

}).call(this);