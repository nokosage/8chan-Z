// ==UserScript==
// @name        8chan Z
// @namespace   nokosage
// @description Attempts to improve/overhaul the 8chan experience.
// @author      nokosage
// @license     MIT; https://github.com/nokosage/8chan-Z/blob/master/LICENSE
// @include     *://*8chan.co/*
// @run-at      document-start
// @version     0.1.0
// @grant       none
// @updateURL   https://raw.githubusercontent.com/nokosage/8chan-Z/master/8chan-Z.meta.js
// @downloadURL https://raw.githubusercontent.com/nokosage/8chan-Z/master/8chan-Z.user.js
// ==/UserScript==

/*
  8chan Z v0.1.0
  some.website.i.have.not.made

  Developers:
  nokosage

  Contributers:
  https://github.com/nokosage/8chan-Z/graphs/contributors
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
  
  $.xhr = function(t, u, i, c, p) {
    if (i != null) {
      if (t == 'POST') {
        var xd = new FormData();
        for (key in i) {
          xd.append(key, i[key]);
        }
      } else {
        xd = '?';
        for (key in i) {
          xd += key + '=' + i[key] + '&';
        }
        xd = xd.substring(0, (xd.length - 1));
        u += xd;
      }
    }
    var x = new XMLHttpRequest();
    x.open(t, u, true);
    if (p != null) {
      for (key in p) {
        x.setRequestHeader(key, p[key]);
      }
    }
    x.onreadystatechange = function () {
      if (x.readyState == 4) {
        return c(x);
      }
    }
    if (t == 'POST' && i != null) {
      x.send(xd);
    } else {
      x.send();
    }
  };
  
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
  
  $.date = function(t) {
    var a, m, d, month, date, year, day, date, hour, minute, second;
    a = new Date(t * 1000);
    m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    month = a.getMonth() + 1;
    date = a.getDate();
    year = $.substr(a.getFullYear(), 2);
    day = a.getDay();
    hour = $.pad(a.getHours());
    minute = $.pad(a.getMinutes());
    second = $.pad(a.getSeconds());
    return month + '/' + date + '/' + year + '(' + d[day] + ')' + hour + ':' + minute + ':' + second;
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
    VERSION: '0.1.0',
    PROTOCOL: location.protocol,
    HOST: '8chan.co',
    view: 'none',
    board: false,
    threads: []
  };
  
  var CSS = {
    Main: function() {
      Main.css = $.css('\
.fa {\
  font-family: fontAwesome;\
  font-size: 14px;\
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
.hide-button:before {\
  content: "";\
}\
.stub {\
  margin-bottom: -7px;\
  margin-left: 18px;\
  margin-top: -7px;\
}\
.show-button:before {\
  content: "";\
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
                  '<link rel="stylesheet" type="text/css" id="stylesheet" href="/stylesheets/yotsuba.css">' +
                  '<link rel="stylesheet" media="screen" href="/stylesheets/font-awesome/css/font-awesome.min.css">' +
                  '<link rel="stylesheet" href="/static/flags/flags.css">' +
                  '<link rel="stylesheet" type="text/css" href="/js/katex/katex.min.css">' +
                  '<script type="text/javascript">var configRoot="/";var inMod = false;var modRoot="/"+(inMod ? "mod.php?/" : "");</script>' +
                  '<title>/b/ - Random</title>';
      $.htm($.elm('head', null, document.documentElement), _html);
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
    threads: {},
    init: function() {
      Threads.run();
    },
    run: function() {
      var _i;
      for (_i = 0; _i < Info.threads.length; _i++)
        Sync.xhrThread(Info.threads[_i]);
    },
    updateThread: function(thread) {
      var _i, _thd, _ref, _new = false, _new_posts = [];
      if (!Threads.threads[thread])
        Threads.threads[thread] = new Thread(thread);
      _thd = Threads.threads[thread];
      for (_i = 0; _i < Object.keys(Sync.sync).length; _i++) {
        _ref = Sync.sync[_i];
        if (!_thd.posts[_ref.no]) {
          _new = true;
          _thd.posts[_ref.no] = new Post(_ref);
          _new_posts.push(_ref.no);
        }
      }
      //console.log(Threads.threads);
      if (_new) 
        $.event('8chanXThreadNewPosts', {
          posts: _new_posts
        });
      $.event('8chanXThreadUpdated');
    }
  };
  
  var Sync = {
    sync: {},
    init: function() {
      
    },
    xhrThread: function(thread) {
      $.xhr('GET', Info.PROTOCOL + '//' + Info.HOST + '/' + Info.board + '/res/' + thread + '.json', null, function(c) {
        var _i, r;
        r = $.JSON(c.responseText)["posts"];
        for (_i = 0; _i < r.length; _i++)
          Sync.sync[_i] = r[_i];
        Threads.updateThread(thread);
      });
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
      if (Timer.check(10)) 
        Threads.run();
      //console.log(Timer.time);
      Timer.time++;
    },
    check: function(t) {
      return (Timer.time % t === 0);
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
      return console.log(Info.NAMESPACE + Info.VERSION + ": Initialization Complete.");
    },
    ready: function() {
      Reply.init();
      Main.setThreads();
      Cleaner.destroyThreads(Info.threads);
      Threads.init();
      CSS.Main();
      Timer.init();
    },
    frontpage: function() {
      console.warn(Info.NAMESPACE + Info.VERSION + ": Frontpage not implemented yet.");
    },
    catalog: function() {
      console.warn(Info.NAMESPACE + Info.VERSION + ": Catalog not implemented yet.");
    },
    board: function() {
      console.log(Info.NAMESPACE + Info.VERSION + ": Initializing View: Board");
      Cleaner.init();
      $.ready(Main.ready);
    },
    thread: function() {
      console.log(Info.NAMESPACE + Info.VERSION + ": Initializing View: Thread");
      Cleaner.init();
      $.time(50, Main.ready);
      window.Threads = Threads.threads;
    },
    setBoard: function() {
      var path, _ref;
      path = $.split(location.pathname, '/'); 
      Info.board = (_ref = path[1]) ? _ref : false;
      Info.view = (_ref = $.split(path[2], '.', 0)) === 'thread' || _ref === 'catalog' || _ref === 'res' ? _ref : (Info.board) ? 'index' : 'frontpage';
      Info.view = (_ref = $.split(location.pathname, '.', 1)) !== 'html' ? 'none' : Info.view; 
    },
    setThreads: function() {
      if ($('[data-board="'+Info.board+'"]')) {
        $.each($$('[data-board="'+Info.board+'"]'), function(el) {
          Info.threads.push($.split(el.id, 'thread_', 1));
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
        //<input id="no_country" type="checkbox" name="no_country">
        //<label for="no_country">Don't show my flag</label>                                                                                 
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
      this.posts = {};
      
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
        class: 'show-button post-button fa',
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
    
    function Post(data) {
      var _thread, _thread_end, root, btnHide, stub, post, user, tn_s;
      this.ID = data.no;
      this.thread = (data.resto) ? data.resto : data.no;
      this.isReply = (data.resto) ? true : false;
      this.stub = false;
      
      _thread = $('#thread_' + this.thread);
      _thread_end = $('#thread_' + this.thread + '_end');
      root = $.before($.elm('div', {
        id: 'p' + this.ID,
        class: (this.isReply) ? 'postContainer replyContainer' : 'postContainer opContainer'
      }, _thread), _thread_end);
      
      btnHide = $.elm('a', {
        id: this.ID,
        class: 'hide-button post-button fa',
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
      if (data.sub) {
        post.info.subject = $.htm($.elm('span', {
          class: 'subject'
        }, post.info), data.sub);
        $.after($.tn(' '), post.info.subject);
      }
      post.info.nameBlock = $.elm('span', {
        class: 'nameBlock'
      }, post.info);
      if (data.email) {
        post.info.nameBlock.email = $.elm('a', {
          class: 'email',
          href: 'mailto:' + data.email
        }, post.info.nameBlock);
      }
      if (data.name) {
        post.info.nameBlock.name = $.htm($.elm('span', {
          class: 'name'
        }, (data.email) ? post.info.nameBlock.email : post.info.nameBlock), data.name);
      }
      if (data.trip) {
        post.info.nameBlock.trip = $.htm($.elm('span', {
          class: 'trip'
        }, (data.email) ? post.info.nameBlock.email : post.info.nameBlock), data.trip);
      }
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
        com: $.set(data.com)
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
    }
    
    return Post;
    
  })();
  
  Main.init();

}).call(this);