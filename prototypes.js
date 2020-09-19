var msg = "";

(function () {
    Element.prototype.attr = function (a, v) {
        this.setAttribute(a, v);
        return this;
    };
    window.cEl = function (t) {
        return document.createElement(t);
    };
    Element.prototype.tEl = function (t) {
        this.appendChild(document.createTextNode(t));
        return this
    };
    Element.prototype.append = function (s) {
        if (s.constructor !== Array) {
            this.appendChild(s);
        } else {
            for (var i = 0; i < s.length; i += 1) {
                this.appendChild(s[i]);
            }
        }
        return this
    }
    Element.prototype.wr = function (s) {
        this.wrapper = s;
        return this
    };
    Element.prototype.listener = function (ev, fn, status) {
        this.addEventListener(ev, fn, status)
        return this
    }
}());

function twoFiguresDate(q) {
    var s = q.toString();
    if (s.length) {
        if (s.length > 1) {
            return s
        } else {
            return "0" + s
        }
    }
}

function convertArrayToObject(s) {
    if (!s) {
        return {}
    }
    var ret = {};
    var l = s.length;
    var i = 0;
    for (; i < l;) {
        ret[s[i]] = {};
        i = i + 1;
    }
    return ret;
}

function convertObjectToArray(s) {
    if (!s) {
        return []
    }
    if (s.constructor == Object) {
        var a = [];
        a.push(s);
        return a
    } else if (s.constructor == String) {
        var a = [];
        a.push(s);
        return a
    }

    return Array.apply(this, s);
}

(function () {
    var oldOpen = XMLHttpRequest.prototype.open;
    window.openHTTPs = 0;
    XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
        window.openHTTPs++;
        this.addEventListener("readystatechange", function () {
            if (this.readyState == 4) {
                window.openHTTPs--;
            }
        }, false);
        oldOpen.call(this, method, url, async, user, pass);
    }
})();

function closePopUpMessageContent() {
    document.body.removeChild(document.getElementById("blackBackground"));
    //var url = window.location.pathname;
    //var filename = url.substring( url.lastIndexOf( '/' ) + 1 );
    //if (filename == "biletat.aspx" &&msg == "Please input correct number")
    //{
    //    console.log("abc");
    //    location.href = "biletat.aspx?action=deposit";
    //}
}

function popUpGenerator(message, okcanc, lngm, bileta_id) {
    msg = message;
    var innerPopUpCont = cEl("div").attr("id", "innerPopUpCont");

    var blackBackground = cEl("div").attr("id", "blackBackground").append(
            cEl("div").attr("id", "innerWrapperPopUp").append(
                innerPopUpCont.append([
                    cEl("p").attr("class", "messageTitle").append([
                        cEl("span").attr("class", "titlePopUpMessage").tEl(lngm),
                        cEl("span").attr("id", "closeButtonPopUpMessage").attr("class", "closeSign").listener("click", closePopUpMessageContent, false).tEl("X")
                    ]),
                    cEl("p").attr("class", "popUpMessageContent").attr("id", "messageContentPopUp").tEl(message)
                ])
            )
        );

    var okcancCont = cEl("p").attr("class", "messagePopUpOkCanc").append([
        cEl("span").attr("id", "popUpOKIcon").attr("class", "popUpOKIcon").tEl("OK").listener("click", closePopUpMessageContent, false),
        //cEl("span").attr("id", "popUpCancelIcon").attr("class", "popUpCancelIcon"),
    ]);
    if (arguments.callee.caller.name == "showCanceledTickets") {
        okcancCont.wrapper = {};
        okcancCont.wrapper.ID = bileta_id;
        okcancCont.listener("click", sendUpdateRead, true);
    }
    document.body.focus();
    document.body.addEventListener("keydown", treatEnterCancelKeys, false);

    if (okcanc) {
        innerPopUpCont.append(okcancCont);
    }
    if (!document.getElementById("blackBackground"))
        document.body.insertBefore(blackBackground, document.body.firstChild)
}



function popUpGenerator4games(e) {
    var url = e.currentTarget.getAttribute("href");
    e.preventDefault();

    msg = "";
    var innerPopUpCont = cEl("div").attr("id", "innerPopUpCont");

    var blackBackground = cEl("div").attr("id", "blackBackground").append(
            cEl("div").attr("id", "innerWrapperPopUp").append(
                innerPopUpCont.append([
                    cEl("p").attr("class", "messageTitle").append([
                        cEl("span").attr("class", "titlePopUpMessage").tEl("Choose game mode"),
                        cEl("span").attr("id", "closeButtonPopUpMessage").attr("class", "closeSign").listener("click", closePopUpMessageContent, false).tEl("X")
                    ]),
                    cEl("p").attr("class", "popUpMessageContent").attr("id", "messageContentPopUp").tEl(msg)
                ])
            )
        );

    var okcancCont = cEl("p").attr("class", "messagePopUpOkCanc").attr("style", "margin-bottom: 20px;").append([
        cEl("span").attr("id", "popUpOKIcon").attr("style", "margin-left: 60px;padding: 10px;display:inline-block").attr("class", "popUpOKIcon").tEl("Demo Mode").listener("click", function () {
            url += "&type=demo";
            console.log(url);
            closePopUpMessageContent();
            location.href = url;
            //window.open(url, 'Snopzer', 'left=20,top=20,width=1000,height=1000,toolbar=1,resizable=0');
            return false;
        }, false),
        cEl("span").attr("id", "popUpOKIcon1").attr("style", "margin-left: 60px;padding: 10px;display:inline-block").attr("class", "popUpOKIcon").tEl("Credit Mode").listener("click", function () {
            url += "&type=credit";
            console.log(url);
            closePopUpMessageContent();
            location.href = url;
            //window.open(url, 'Snopzer', 'left=20,top=20,width=1000,height=1000,toolbar=1,resizable=0');
            return false;
        }, false),
        //cEl("span").attr("id", "popUpCancelIcon").attr("class", "popUpCancelIcon"),
    ]);
    //if (arguments.callee.caller.name == "showCanceledTickets") {
    //    okcancCont.wrapper = {};
    //    okcancCont.wrapper.ID = bileta_id;
    //    okcancCont.listener("click", sendUpdateRead, true);
    //}
    document.body.focus();
    document.body.addEventListener("keydown", treatEnterCancelKeys, false);

    if (1 == 1) {
        innerPopUpCont.append(okcancCont);
    }
    document.body.insertBefore(blackBackground, document.body.firstChild)
}

function launchDemo(a, b) {
    if (a == '1')
        b += "&type=demo";
    else
        b += "&type=credit";
    console.log(b);
}
function treatEnterCancelKeys(e) {
    console.log([e.keyCode]);
    if (e.keyCode == 13 || e.keyCode == 27) {
        closePopUpMessageContent();
    }
}

function getMinute(s) {
    if (s === -1) {
        return "Half Time"
    }
    else if (s === -1) {
        return "Full Time"
    }

    var min = Math.floor(s / 60);

    var sec = s % 60;

    var decMin = min > 9 && min || "0" + min;
    var decSec = sec > 9 && sec || "0" + sec;

    return decMin + ":" + decSec;
}