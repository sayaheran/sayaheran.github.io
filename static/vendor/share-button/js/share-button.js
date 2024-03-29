! function(t, e) {
    "use strict";
    var a = function(t) {
            this.elem = t
        },
        s = {
            menu: '<div class="share-menu"><div class="share-shadow"></div><div class="share-closed"></div><div class="share-text"><div class="title">Share</div><p class="share-title"></p><p class="share-url"></p><div class="share-list"><a class="share-fb" data-sharer="facebook"><span class="icon"></span><span class="text">Facebook</span></a><a class="share-t" data-sharer="twitter"><span class="icon"></span><span class="text">Twitter</span></a><a class="share-reddit" data-sharer="reddit"><span class="icon"></span><span class="text">Reddit</span></a><a class="share-whatsapp" data-sharer="whatsapp"><span class="icon"></span><span class="text">WhatsApp</span></a><a class="share-vk" data-sharer="vk"><span class="icon"></span><span class="text">Vkontakte</span></a><a class="share-gmail" data-sharer="gmail"><span class="icon"></span><span class="text">Gmail</span></a><a class="share-googlebookmark" data-sharer="googlebookmark"><span class="icon"></span><span class="text">Google Bookmark</span></a><a class="share-e" data-sharer="email"><span class="icon"></span><span class="text">Email App</span></a><a class="share-adfty" data-sharer="adfty"><span class="icon"></span><span class="text">Adfty</span></a><a class="share-linkedin" data-sharer="linkedin"><span class="icon"></span><span class="text">LinkedIn</span></a><a class="share-print" data-sharer="print"><span class="icon"></span><span class="text">Print</span></a><a class="share-pinterest" data-sharer="pinterest"><span class="icon"></span><span class="text">Pinterest</span></a><a class="share-messenger" data-sharer="messenger"><span class="icon"></span><span class="text">Messenger</span></a><a class="share-sinaweibo" data-sharer="sinaweibo"><span class="icon"></span><span class="text">Sina Weibo</span></a><a class="share-blogger" data-sharer="blogger"><span class="icon"></span><span class="text">Blogger</span></a><a class="share-100zakladok" data-sharer="_100zakladok"><span class="icon"></span><span class="text">100zakladok</span></a><a class="share-amazon" data-sharer="amazon"><span class="icon"></span><span class="text">Amazon</span></a><a class="share-telegram" data-sharer="telegram"><span class="icon"></span><span class="text">Telegram</span></a><a class="share-myspace" data-sharer="myspace"><span class="icon"></span><span class="text">Myspace</span></a><a class="share-line" data-sharer="line"><span class="icon"></span><span class="text">LINE</span></a><a class="share-viber" data-sharer="viber"><span class="icon"></span><span class="text">Viber</span></a><a class="share-odnoklassniki" data-sharer="odnoklassniki"><span class="icon"></span><span class="text">Odnoklassniki</span></a><a class="share-qrcode" data-sharer="qrcode"><span class="icon"></span><span class="text">QRCode</span></a></div></div></div>'
        };

    function r() {
        if (!r.once) {
            r.once = !0;
            var t = e.createElement("div");
            t.innerHTML = s.menu, e.body.appendChild(t.firstChild), e.querySelector(".share-title").innerText = l(), e.querySelector(".share-url").innerText = n(), e.querySelector(".share-menu").addEventListener("click", function(t) {
                r()
            }), i(".share-menu [data-sharer]")
        }
        e.querySelector(".share-menu").classList.toggle("show"), e.getElementsByTagName("html")[0].classList.toggle("share-noscroll"), e.getElementsByTagName("body")[0].classList.toggle("share-noscroll")
    }

    function i(t) {
        var s, r = e.querySelectorAll(t),
            i = r.length;
        for (s = 0; s < i; s++) r[s].addEventListener("click", function(t) {
            var e = t.currentTarget || t.srcElement;
            new a(e).share()
        })
    }

    function n() {
        var t, a = e.querySelector("link[rel='canonical']");
        return t = a ? a.getAttribute("href") : location.href, "object" == typeof addthis_share && addthis_share.url && (t = addthis_share.url), t
    }

    function l() {
        return e.title
    }

    function c() {
        var t = e.querySelector(".share-fixed"),
            a = e.querySelector(".share_button_toolbox");
        (t || a) && function() {
            i("[data-sharer]");
            for (var t = e.querySelectorAll(".share-more"), a = t.length, s = 0; s < a; s++) t[s].addEventListener("click", function(t) {
                r()
            });
            var n = e.querySelector(".share-mob");
            n && n.addEventListener("click", function(t) {
                n.classList.toggle("open")
            })
        }();
        var s = e.querySelectorAll(".share-hide"),
            n = s.length;
        setTimeout(function() {
            for (var t = 0; t < n; t++) s[t].classList.remove("share-hide")
        }, 1e3)
    }
    a.prototype = {
        constructor: a,
        getAttribute: function(t) {
            var a = this.elem.getAttribute("data-" + t);
            if (!a) switch (t) {
                case "url":
                    a = n();
                    break;
                case "title":
                    a = l();
                    break;
                case "image":
                    a = function() {
                        var t = e.querySelector("meta[property='og:image']");
                        if (t) return t.getAttribute("content");
                        return ""
                    }();
                    break;
                case "description":
                    a = function() {
                        var t = e.querySelector("meta[name='description']");
                        if (t) return t.getAttribute("content");
                        return ""
                    }()
            }
            return a
        },
        share: function() {
            var t = this.getAttribute("sharer").toLowerCase(),
                e = {
                    facebook: {
                        shareUrl: "https://www.facebook.com/sharer/sharer.php",
                        params: {
                            u: this.getAttribute("url")
                        }
                    },
                    twitter: {
                        shareUrl: "https://twitter.com/intent/tweet/",
                        params: {
                            text: this.getAttribute("title"),
                            url: this.getAttribute("url")
                        }
                    },
                    reddit: {
                        shareUrl: "https://www.reddit.com/submit",
                        params: {
                            url: this.getAttribute("url")
                        }
                    },
                    whatsapp: {
                        shareUrl: "https://api.whatsapp.com/send",
                        params: {
                            text: this.getAttribute("title") + " " + this.getAttribute("url")
                        }
                    },
                    vk: {
                        shareUrl: "http://vk.com/share.php",
                        params: {
                            url: this.getAttribute("url"),
                            title: this.getAttribute("title")
                        }
                    },
                    gmail: {
                        shareUrl: "https://mail.google.com/mail/",
                        params: {
                            view: "cm",
                            su: this.getAttribute("title"),
                            body: this.getAttribute("title") + "\n" + this.getAttribute("url")
                        }
                    },
                    googlebookmark: {
                        shareUrl: "https://www.google.com/bookmarks/mark",
                        params: {
                            op: "add",
                            bkmk: this.getAttribute("url"),
                            title: this.getAttribute("title"),
                            annotation: this.getAttribute("description")
                        }
                    },
                    email: {
                        shareUrl: "mailto:" + (this.getAttribute("to") || ""),
                        params: {
                            subject: this.getAttribute("title"),
                            body: this.getAttribute("title") + "\n" + this.getAttribute("url")
                        },
                        isLink: !0
                    },
                    adfty: {
                        shareUrl: "https://www.adfty.com/submit.php",
                        params: {
                            url: this.getAttribute("url"),
                            title: this.getAttribute("title"),
                            description: this.getAttribute("description")
                        }
                    },
                    linkedin: {
                        shareUrl: "https://www.linkedin.com/shareArticle",
                        params: {
                            mini: !0,
                            url: this.getAttribute("url"),
                            title: this.getAttribute("title"),
                            ro: !1,
                            summary: this.getAttribute("description")
                        }
                    },
                    print: {},
                    pinterest: {
                        shareUrl: "http://pinterest.com/pin/create/link/",
                        params: {
                            url: this.getAttribute("url"),
                            media: this.getAttribute("image"),
                            description: this.getAttribute("description")
                        }
                    },
                    messenger: {
                        shareUrl: "http://www.facebook.com/dialog/send",
                        params: {
                            link: this.getAttribute("url"),
                            app_id: 0x7fdcdfb46559,
                            redirect_uri: "https://www.messenger.com/"
                        }
                    },
                    sinaweibo: {
                        shareUrl: "https://service.weibo.com/share/share.php",
                        params: {
                            url: this.getAttribute("url"),
                            title: this.getAttribute("title"),
                            pic: this.getAttribute("image")
                        }
                    },
                    blogger: {
                        shareUrl: "https://www.blogger.com/blog_this.pyra",
                        params: {
                            t: this.getAttribute("description"),
                            u: this.getAttribute("url"),
                            n: this.getAttribute("title")
                        }
                    },
                    _100zakladok: {
                        shareUrl: "http://www.100zakladok.ru/save/",
                        params: {
                            bmurl: this.getAttribute("url"),
                            bmtitle: this.getAttribute("title")
                        }
                    },
                    amazon: {
                        shareUrl: "https://www.amazon.com/gp/wishlist/static-add",
                        params: {
                            u: this.getAttribute("url"),
                            t: this.getAttribute("title")
                        }
                    },
                    telegram: {
                        shareUrl: "https://telegram.me/share/url",
                        params: {
                            url: this.getAttribute("url"),
                            text: this.getAttribute("title")
                        }
                    },
                    myspace: {
                        shareUrl: "https://myspace.com/post",
                        params: {
                            url: this.getAttribute("url"),
                            t: this.getAttribute("title"),
                            c: this.getAttribute("description")
                        }
                    },
                    line: {
                        shareUrl: "https://lineit.line.me/share/ui",
                        params: {
                            url: this.getAttribute("url"),
                            text: this.getAttribute("title")
                        }
                    },
                    viber: {
                        shareUrl: "https://www.viber.com/",
                        params: {}
                    },
                    odnoklassniki: {
                        shareUrl: "https://connect.ok.ru/dk",
                        params: {
                            "st.cmd": "WidgetSharePreview",
                            "st.shareUrl": this.getAttribute("url"),
                            title: this.getAttribute("title")
                        }
                    },
                    qrcode: {
                        shareUrl: "https://awesome.top/tools/qrcode",
                        params: {
                            url: this.getAttribute("url")
                        },
                        open_url: !0
                    }
                }[t];
            return e && (e.width = this.getAttribute("width"), e.height = this.getAttribute("height")), void 0 !== e && this.go(e)
        },
        go: function(a) {
            if (!a.shareUrl) return t.focus(), t.print();
            var s, r = a.params || {},
                i = Object.keys(r),
                n = i.length > 0 ? "?" : "";
            for (s = 0; s < i.length; s++) "?" !== n && (n += "&"), r[i[s]] && (n += i[s] + "=" + encodeURIComponent(r[i[s]]));
            if (a.shareUrl += n, a.open_url) {
                var l = e.createEvent("MouseEvents");
                l.initEvent("click", !0, !0);
                var c = e.createElement("a");
                c.href = a.shareUrl, c.target = "_blank", c.dispatchEvent(l)
            } else if (a.isLink) t.location.href = a.shareUrl;
            else {
                var h = a.width || 600,
                    o = a.height || 480,
                    p = t.innerWidth / 2 - h / 2 + t.screenX,
                    u = "scrollbars=no, width=" + h + ", height=" + o + ", top=" + (t.innerHeight / 2 - o / 2 + t.screenY) + ", left=" + p,
                    d = t.open(a.shareUrl, "", u);
                t.focus && d.focus()
            }
        }
    }, "complete" === e.readyState || "loading" !== e.readyState ? c() : e.addEventListener("DOMContentLoaded", c), t.addEventListener("page:load", c)
}(window, document);