!(function () {
  function uuidv1() {
    function t() {
      return e ? 15 & e[n++] : (16 * Math.random()) | 0;
    }
    var e = null,
      n = 0,
      r = ww.crypto || ww.msCrypto;
    r && r.getRandomValues && (e = r.getRandomValues(new Uint8Array(31)));
    for (
      var o, i = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", a = "", c = 0;
      c < i.length;
      c++
    )
      (o = i[c]),
        "x" === o
          ? (a += t().toString(16))
          : "y" === o
          ? ((o = (3 & t()) | 8), (a += o.toString(16)))
          : (a += o);
    return a;
  }
  const ud = undefined,
    wn = window.location,
    nr = navigator,
    ww = window,
    dt = document,
    ln = location,
    pe = performance;
  const _ns = "rumv",
    _am = "ttfb_metric_",
    _ua = nr.userAgent,
    _js = dt.currentScript || {
      dataset: {},
    },
    _nav = pe.getEntriesByType("navigation")[0];
  var _dnt = nr.doNotTrack || ww.doNotTrack || undefined,
    _data = {
      session: {},
      request: {},
      events: [],
    },
    _required = {
      device_type: ["desktop", "tablet", "mobile"],
    },
    _storage = ww[_ns].storage || {},
    _metrics = {
      type: "metric",
      data: {},
    },
    _beacon = {
      domain_tag: "2F7D77C9C7",
      domain_string: wn.hostname,
      url_string: wn.pathname,
      url_uuid: uuidv1(),
    },
    _config = {
      ablock: {},
      pageloaded: false,
      endpoint: `https://www.hostedhooks.com/api/v1/apps/21e04a79-d5a5-4e42-8aab-610ac280557e/messages`,
      timer: {
        obj: null,
        ms: 100,
      },
      bf: {},
      errors: {},
      data: {
        cq: {},
        qs: wn.search,
        bot: 0,
        start: 0,
        auto: 1,
        consent: 1,
        webvitals: 1,
      },
    };
  _dnt =
    typeof _dnt == "undefined"
      ? -1
      : _dnt && !["no", "unspecified"].includes(_dnt)
      ? 1
      : 0;
  _config.data.dnt = !0 && _dnt === 1;
  _config.page = _storage.page || {};

  function shouldTrack(type) {
    if (_config.data.dnt) {
      return false;
    }
    if (!_config.data.webvitals) {
      return type == "webvitals" ? 1 : 0;
    }
    if (1 && _storage.urls.absolute && !_config.page?.track) {
      _config.page = urlRegexp(_storage.urls, _beacon.url_string);
      debugger;
      _storage.regex = urlRegexp.toString();
    }
    debugger;
    if (!_config.page) {
      _config.page = {};
    }
    set("webvitals", _config.page.track || 0, "config");
    var response =
      type == "webvitals"
        ? _config.data.webvitals
        : 0 || _config.data.webvitals;
    return response;
  }

  function startSession() {
    debugger;
    if (!_storage.urls) {
      debugger;
      _storage.samplingrate = 100;
      _storage.urls = {
        absolute: {
          "/": {
            type: "home.homepage",
          },
        },
        match: [],
      };
    }
    if (
      _beacon.domain_string.indexOf("rum-nextjs-project.vercel.app") < 0 ||
      !shouldTrack()
    ) {
      toStorage();
      return 0;
    }
    _storage.session_id =
      _beacon.session_id =
      _data.request.session_id =
        _storage.session_id || uuidv1();
    if (_storage.submitted) {
      _beacon.session_id = _storage.session_id;
      return 1;
    }
    _data.session = {
      type: "session",
      data: {
        id: _storage.session_id,
        platformid: 0,
      },
    };
    var prefers = {};
    if (_config.data.consent || _config.data.consent_device || false) {
      var dpr = ww.devicePixelRatio || 0;
      prefers["browser_darkmode"] = ww.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      prefers["browser_reducedmotion"] = ww.matchMedia(
        "(prefers-reduced-motion)"
      ).matches;
      prefers["browser_savedata"] = nr.connection
        ? nr.connection.saveData
          ? 1
          : 0
        : -1;
      set("device_dpr", dpr ? Math.round(dpr / 0.5) * 0.5 : null, "session");
      set(
        "device_memory",
        nr.deviceMemory ? nr.deviceMemory * 1024 : null,
        "session"
      );
      set(
        "device_processors",
        nr.hardwareConcurrency ? nr.hardwareConcurrency : null,
        "session"
      );
      set(_am + "touchpoints", nr.maxTouchPoints, "session");
    }
    for (k in prefers) {
      set(
        k,
        prefers[k] !== -1
          ? prefers[k]
            ? "enabled"
            : "disabled"
          : "unsupported",
        "session"
      );
    }
    return 1;
  }

  function urlRegexp(urls, path) {
    var result = urls.absolute[path] || {
        type: false,
      },
      doc = document;
    if (result.type) {
      result.track = 1;
    } else {
      for (const sub in urls.match) {
        var url = urls.match[sub];
        if (
          (!url.regexp && doc.querySelector(sub)) ||
          (url.regexp && path.match(sub))
        ) {
          result = url;
          result.track = 1;
          break;
        }
      }
    }
    if (result.samplingrate) {
      if (result.samplingrate < 0) {
        result.track = 0;
        return result;
      }
      var random = Math.floor(Math.random() * 100) + 1;
      if (random >= result.samplingrate) {
        result.track = 0;
      }
    }
    return result;
  }

  function collectTransferSize(pageload) {
    let startEnd = {
      start: -1,
      end: -1,
    };
    let data = {
      map: {
        prefix: "fcp",
        data: {
          renderblocking: {},
        },
      },
      ms: {
        prefix: "fcp",
        divide: 1,
        data: {
          sumrenderblocking: 0,
          renderblocking: 0,
          secondparties: 0,
          thirdparties: 0,
        },
      },
      kb: {
        divide: 1024,
        data: {
          total: 0,
          html: _nav.transferSize,
        },
      },
    };
    let cdnRegexp1 = "";
    let cdnRegexp2 = "";
    let trackType = {
      link: {
        ext: ".css",
        type: "css",
      },
      script: {
        ext: ".js",
        type: "script",
      },
      img: {
        type: "img",
      },
    };
    var resourceEntries = pe.getEntriesByType("resource");
    for (let i = 0; i < resourceEntries.length; i++) {
      let entry = resourceEntries[i];
      let tt = trackType[entry.initiatorType];
      let kbType = tt ? tt.type : "";
      if (entry.duration > 0 && entry.responseEnd < pageload) {
        if (entry.initiatorType in trackType) {
          if (!tt?.ext || entry.name.indexOf(tt.ext) > 0) {
            if (!(kbType in data.kb.data)) {
              data.kb.data[kbType] = 0;
            }
            data.kb.data[kbType] += entry.transferSize;
          }
        }
        data.kb.data.total += entry.transferSize;
      }
    }
    data.ms.data.renderblocking = startEnd.end - startEnd.start;
    if (!0) {
      delete data.ms;
    }
    for (var cat in data) {
      for (var key in data[cat].data) {
        var prefix =
          ((key.indexOf("parties") > 0 ? null : data[cat].prefix) ||
            "pageload") +
          "_metric_" +
          cat +
          key;
        if (data[cat].divide) {
          set(prefix, Math.round(data[cat].data[key] / data[cat].divide));
        } else {
          set(
            prefix,
            cat != "map"
              ? data[cat].data[key]
              : Object.keys(data[cat].data[key])
                  .map(function (k) {
                    return data[cat].data[key][k] + " " + k;
                  })
                  .join(" + ") || "none"
          );
        }
      }
    }
  }

  function cb(func, arg) {
    (typeof func === "function" && func(arg)) ||
      (typeof func === "string" && ww[func](arg));
  }

  function get(key, callback) {
    if (key in _config.bf && _config.bf[key].val) {
      return _config.bf[key];
    }
    return key ? null : _config.bf;
  }

  function set(key, value, table, force) {
    if (key.indexOf("cls_metric") === 0) {
      key = key.replace("cls_", "clsfloat_");
    }
    if (key in _required && !_required[key].includes(value)) {
      _storage.urls = {};
      _config.data.webvitals = 0;
    }
    var table = ["session", "config", "metric"].includes(table)
      ? table
      : "request";
    _config.bf[key] = {
      val: value,
      table: table,
    };
    if (table == "metric") {
      return (_metrics.data[key] = value);
    }
    if (table == "config") {
      return (_config.data[key] = value);
    }
    if (!_data[table].data) {
      return;
    }
    if (!(key in _data[table].data) || force) {
      return (_data[table].data[key] = value);
    }
    return;
  }

  function getPvt() {
    var cs = 0;
    if (_config.data.consent || _config.data.consent_storage || false) {
      cs = 1;
      if (sessionStorage.getItem(_ns) !== null) {
        return "successive";
      }
      var ls = localStorage.getItem(_ns);
      if (ls !== null) {
        return "returning";
      }
    }
    if (!cs && _js.src) {
      var cur = pe.getEntriesByName(_js.src)[0];
      if (cur.transferSize == 0) {
        return _nav.domainLookupEnd == _nav.domainLookupStart
          ? "successive"
          : "returning";
      }
    }
    return "unique";
  }

  function pagehit() {
    var navCon = nr.connection || {};
    var tmpData = {
      id: (_beacon.request_id = uuidv1()),
      request_method: wn.search.length > 1 ? "query string" : "get",
      get_params: "none",
      visibilitystate: dt.visibilityState || "unknown",
      pageviewtype: getPvt(),
      downlink_kbps: parseInt(navCon.downlink || -1),
      effective_type: navCon.effectiveType || "unknown",
      template_type: _config.page.type || "unknown",
      pageview_count: _storage.pageviews || 0,
      viewport: (ww.visualViewport
        ? [~~visualViewport.width, ~~visualViewport.height]
        : [~~dt.documentElement.clientWidth, ~~dt.documentElement.clientHeight]
      ).join("x"),
    };
    for (const k in tmpData) {
      if (!(k in _data.request.data)) {
        set(k, tmpData[k]);
      }
    }
    var requestData = {};
    for (const k in requestData) {
      var elm = dt.querySelector(
          requestData[k].selector || 'meta[name="' + _ns + ":" + k + '"]'
        ),
        value = elm ? elm.getAttribute(requestData[k].attr || "content") : null;
      if (value !== null) {
        set(k, value.toLowerCase());
      }
    }
    var cc = 0;
    if (!cc) {
      submitData();
    }
  }

  function loopQueue() {
    for (var d in _js.dataset) {
      _config.data[d.replace(/[\W_]+/g, "-")] = _js.dataset[d];
    }
    if (typeof handle == "function") {
      var queue = ww[_ns].q || [];
      for (var q = 0; q < queue.length; q++) {
        handle.apply(this, queue[q]);
      }
    }
  }
  _data.request = {
    type: "request",
    data: {},
  };
  if (startSession()) {
    loopQueue();
    if (_config.data.auto) {
      pagehit();
    }
  }
  async function submitData() {
    var isUnique = !_storage.submitted;
    var logMsg = "";
    var random = Math.floor(Math.random() * 100) + 1;
    if (
      isUnique &&
      _storage.samplingrate < 100 &&
      random >= _storage.samplingrate
    ) {
      _storage.urls = {};
    }
    if (typeof nr.getBattery == "function") {
      await nr.getBattery().then((battery) => {
        set("battery_level", Math.round((battery.level * 100) / 10) * 10);
      });
    }
    if (isUnique) {
      var device_type = "desktop";
      if (nr.userAgentData) {
        var ua = nr.userAgentData;
        if (ua.brands.length) {
          var browser = {
            brand: "",
          };
          for (var i = 0; i < ua.brands.length; i++) {
            if (
              ua.brands[i].brand.indexOf("Brand") < 0 &&
              ua.brands[i].brand.length > browser.brand.length
            ) {
              browser = ua.brands[i];
            }
          }
          set("browser_brand", browser.brand, "session");
          set("browser_version", parseInt(browser.version), "session");
        }
        var props = [
          "architecture",
          "bitness",
          "model",
          "platform",
          "platformVersion",
        ];
        await ua.getHighEntropyValues(props).then((ua) => {
          device_type = ua.mobile ? "mobile" : "desktop";
          for (var i = 0; i < props.length; i++) {
            if (props[i] in ua && ua[props[i]]) {
              set("device_" + snakeCase(props[i]), ua[props[i]], "session");
            }
          }
        });
      }
      if (device_type != "mobile") {
        device_type = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/.test(
          _ua.toLowerCase()
        )
          ? "tablet"
          : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
              _ua
            )
          ? "mobile"
          : "desktop";
      }
      set("device_type", device_type, "session");
      var match = _ua.match(/\w*(bot|crawl|spider|Lighthouse)\w*/gi);
      set(
        "bot_name",
        match && !/(cubot)/i.test(_ua) ? match[0] : "none",
        "session"
      );
      if (_data.session.data.bot_name != "none") {
        set("is_bot", 1, "config");
      }
      var browser = getBrowser(_ua),
        props = [
          "browser_inapp",
          "browser_brand",
          "browser_version",
          "device_platform",
        ];
      for (var i = 0; i < browser.length; i++) {
        if (i in props) {
          set(props[i], browser[i], "session");
        }
      }
    }
    toStorage();
    if (!shouldTrack()) {
      return;
    }
    var params = null;
    if (_config.data.qs.length > 1) {
      params = new URLSearchParams(_config.data.qs);
      var get = [];
      for (var key of params.keys()) {
        get.push(key);
      }
      get.sort();
      set("get_params", get.join("&"), null, 1);
    }
    construct();
  }

  function snakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }

  function copy(obj, append) {
    return Object.assign({}, obj, append);
  }

  function toStorage() {
    if (!_config.data.consent && !_config.data.consent_storage) {
      return;
    }

    if (_config.data.dnt) {
      _storage.urls = {};
    }

    var clone = copy(_storage);
    sessionStorage.setItem(_ns, JSON.stringify(clone));

    if (localStorage.getItem(_ns) === null) {
      localStorage.setItem(_ns, new Date().getTime());
    }
  }

  function getBrowser(ua) {
    if (_config.data.consent == 0 || _config.data.consent_useragent == 0) {
      return [];
    }
    var wv =
        ua.toLowerCase().indexOf("; wv") > 0 ||
        (/iphone|ipod|ipad/i.test(ua) && !/safari/i.test(ua) && !nr.standalone)
          ? "yes"
          : "no",
      pf = "unknown";
    var platforms = {
      "like Mac": "iOS",
      Android: "Android",
      Linux: "Linux",
      Mac: "macOS",
      Win: "Windows",
    };
    for (var find in platforms) {
      if (platforms.hasOwnProperty(find) && ua.indexOf(find) != -1) {
        pf = platforms[find];
        break;
      }
    }
    var tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return [wv, "IE", tem[1] || "", pf];
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bEdg\/(\d+)/);
      if (tem != null) {
        return [wv, "Microsoft Edge", tem[1], pf];
      }
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        return [wv, "Opera", tem[1], pf];
      }
      M[1] = "Google " + M[1];
    }
    M = M[2] ? [M[1], M[2]] : [nr.appName, nr.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    return [wv, M[0], M[1], pf];
  }

  function bfcache() {
    set("start", pe.now(), "config");
    set("navigationtype", "back_forward_cache", "request", 1);
    loopQueue();
    pagehit();
  }

  function submitRum(metric) {
    _config.data.callback && cb(_config.data.callback, metric);
    var navType = (metric.navigationType || "navigate").replace(/-/g, "_");
    if (
      !_config.bf.navigationtype ||
      _config.bf.navigationtype.val != navType
    ) {
      set("navigationtype", navType);
      debugger;
      if (navType == "back_forward_cache") {
        bfcache();
      }
      debugger;
      // bfcache();
    }

    if (!shouldTrack("webvitals")) {
      return;
    }
    var metricName = null;
    if (metric && metric.name) {
      var metricName = metric.name.toLowerCase();
      if (metricName === "cls") {
        set(metricName + "float", metric.value, "metric");
      } else {
        set(metricName, Math.round(metric.value), "metric");
      }
      var elm,
        prefix = metricName + "_metric_",
        attr = metric.attribution,
        props = {
          eventTime: "eventtiming",
          largestShiftTime: "eventtiming",
          loadState: "loadstate",
          eventType: "eventtype",
        };
      switch (metric.name) {
        case "FCP":
          var fp = pe.getEntriesByName("first-paint")[0];
          if (fp) {
            set(
              prefix + "firstpaint",
              Math.round(
                _config.bf.navigationtype.val == "back_forward_cache"
                  ? metric.value
                  : fp.startTime
              )
            );
          }
          set(prefix + "ttfbdelta", Math.round(attr.firstByteToFCP));
          break;
        case "CLS":
          elm = attr.largestShiftTarget;
          break;
        case "FID":
        case "INP":
          elm = attr.eventTarget;
          break;
        case "LCP":
          elm = attr.element;
          var elmType = attr.lcpEntry
            ? attr.lcpEntry.element.tagName
                .toLowerCase()
                .replace("img", "image")
            : "unknown";
          if (attr?.url) {
            if (elmType != "image") {
              elmType += "+image";
            }
            var priority = [
                attr.lcpEntry.element.getAttribute("fetchpriority"),
              ],
              url = new URL(attr.url),
              lnk = dt.querySelector(
                'link[href*="' + url.pathname.substr(1) + '"]'
              );
            if (lnk) {
              priority.push(
                [lnk.getAttribute("rel"), lnk.getAttribute("as")].join("#")
              );
            }
            set(prefix + "priority", priority.join(", ") || "none");
            var matches = {
              lazy: attr.lcpEntry.element.outerHTML.match(
                /\w*(-)?(lazy)(-)?\w*/gi
              ),
              type: attr.lcpEntry.url.match(/\.([^\./\?\#]{3,4})($|\?|\#)/),
            };
            set(prefix + "lazy", matches.lazy ? matches.lazy[0] : "none");
            set(
              prefix + "filetype",
              matches.type ? matches.type[1] : "unknown"
            );
            set(
              prefix + "cached",
              attr.lcpResourceEntry.transferSize > 0 ? "no" : "yes"
            );
            if (
              attr.lcpResourceEntry.transferSize > 0 ||
              attr.url.indexOf(ln.hostname) > -1
            ) {
              set(
                prefix + "filesize",
                Math.round(attr.lcpResourceEntry.transferSize / 1024)
              );
            }
            if (attr.timeToFirstByte) {
              set(prefix + "resourcettfb", Math.round(attr.timeToFirstByte));
              set(prefix + "loaddelay", Math.round(attr.resourceLoadDelay));
              set(prefix + "loadtime", Math.round(attr.resourceLoadTime));
              set(prefix + "renderdelay", Math.round(attr.elementRenderDelay));
            }
          }
          set(prefix + "elmtype", elmType);
          break;
        case "TTFB":
          var ttfb = {
            waitingtime: attr.waitingTime,
            dnstime: attr.dnsTime,
            connectiontime: attr.connectionTime,
            requesttime: attr.requestTime,
          };
          if (nr.connection) {
            ttfb.rtt = nr.connection.rtt;
          }
          if (_nav.secureConnectionStart > 0) {
            ttfb.tlstime = _nav.connectEnd - _nav.secureConnectionStart;
            if (ttfb.tlstime > attr.connectionTime) {
              ttfb.tlstime = attr.connectionTime;
            }
          }
          for (const k in ttfb) {
            set(prefix + k, Math.round(ttfb[k]));
          }
          break;
      }
      if (elm) {
        set(prefix + "elm", elm.replace(/[0-9]+/g, "0"));
      }
      for (const k in props) {
        if (k in attr) {
          var isTime = props[k].indexOf("timing") >= 0;
          set(prefix + props[k], isTime ? Math.round(attr[k]) : attr[k]);
        }
      }
    }
    if (_nav.loadEventEnd > 0 && !_config.bf.pageload) {
      collectTransferSize(_nav.loadEventEnd);
      set("pageload", Math.round(_nav.loadEventEnd), "metric");
      set(
        "dom_content_loaded",
        Math.round(_nav.domContentLoadedEventStart),
        "metric"
      );
    }
    throttleSend();
  }

  async function send(obj) {
    debugger;
    const value = { data: obj };
    value["version"] = "4.0";
    value["event_type"] = "metric.event";
    var body = JSON.stringify(value);
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer g22x2mQnHMPDRJ99hdjeD9pm",
    };
    // (nr.sendBeacon && nr.sendBeacon(_config.endpoint, body)) ||
    const data = await fetch(_config.endpoint, {
      body: body,
      method: "POST",
      headers: headers,
      keepalive: true,
    });
    console.log(data);
  }

  function construct(callback) {
    var tables = ["session", "request"],
      beacon = copy(_beacon, {
        inserts: [],
      });
    if (_storage.submitted) {
      tables.shift();
    }
    for (var i = 0; i < tables.length; i++) {
      var key = tables[i];
      _data[key].data = deleteEmpty(_data[key].data);
      if (Object.keys(_data[key].data).length > 0) {
        beacon.inserts.push(_data[key]);
      }
    }
    if (Object.keys(_metrics.data).length > 0) {
      beacon.inserts.push(_metrics);
    }
    send(beacon);
    _data.request.data = {
      id: _beacon.request_id,
    };
    _data.session.data = {
      id: _beacon.session_id,
    };
    if (!_storage.submitted) {
      _storage.submitted = _beacon.session_id;
      toStorage();
    }
    _metrics.data = {};
    _config.data.callback && cb(_config.data.callback);
  }

  function throttleSend(evnt, callback) {
    if (evnt) {
      evnt.id = uuidv1();
      (evnt.when = Math.round(
        ((evnt.when || pe.now()) - _config.data.start) / 1000
      )),
        _data.events.push(evnt);
    }
    // if (!_storage.submitted) {
    //   return false;
    // }

    if (Object.keys(_metrics.data).length == 0 && _data.events.length == 0) {
      return false;
    }
    if (_metrics.data.pageload) {
      _config.pageloaded = true;
    }
    if (callback) {
      return construct(callback);
    }
    _config.timer.obj && clearTimeout(_config.timer.obj);
    _config.timer.obj = setTimeout(function () {
      construct(callback);
    }, _config.timer.ms);
  }

  function deleteEmpty(object) {
    var result = {};
    for (var key in object) {
      if (!object.hasOwnProperty(key) || object[key] === null) {
        continue;
      }
      result[key] = object[key];
    }
    return result;
  }

  var webVitals = (function (e) {
    "use strict";
    var t,
      n,
      r,
      i,
      a,
      o = function () {
        return ww.performance && pe.getEntriesByType && _nav;
      },
      u = function (e) {
        if ("loading" === dt.readyState) return "loading";
        var t = o();
        if (t) {
          if (e < t.domInteractive) return "loading";
          if (
            0 === t.domContentLoadedEventStart ||
            e < t.domContentLoadedEventStart
          )
            return "dom-interactive";
          if (0 === t.domComplete || e < t.domComplete)
            return "dom-content-loaded";
        }
        return "complete";
      },
      c = function (e) {
        var t = e.nodeName;
        return 1 === e.nodeType
          ? t.toLowerCase()
          : t.toUpperCase().replace(/^#/, "");
      },
      s = function (e, t) {
        var n = "";
        try {
          for (; e && 9 !== e.nodeType; ) {
            var r = e,
              i = r.id
                ? "#" + r.id
                : c(r) +
                  (r.className && r.className.length
                    ? "." + r.className.replace(/\s+/g, ".")
                    : "");
            if (n.length + i.length > (t || 100) - 1) return n || i;
            if (((n = n ? i + ">" + n : i), r.id)) break;
            e = r.parentNode;
          }
        } catch (e) {}
        return n;
      },
      f = -1,
      d = function () {
        return f;
      },
      l = function (e) {
        addEventListener(
          "pageshow",
          function (t) {
            t.persisted && ((f = t.timeStamp), e(t));
          },
          !0
        );
      },
      m = function () {
        var e = o();
        return (e && e.activationStart) || 0;
      },
      v = function (e, t) {
        var n = o(),
          r = "navigate";
        return (
          d() >= 0
            ? (r = "back_forward_cache")
            : n &&
              (r =
                dt.prerendering || m() > 0
                  ? "prerender"
                  : n.type.replace(/_/g, "-")),
          {
            name: e,
            value: void 0 === t ? -1 : t,
            rating: "good",
            delta: 0,
            entries: [],
            id: "v3-"
              .concat(Date.now(), "-")
              .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
            navigationType: r,
          }
        );
      },
      p = function (e, t, n) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            var r = new PerformanceObserver(function (e) {
              t(e.getEntries());
            });
            return (
              r.observe(
                Object.assign(
                  {
                    type: e,
                    buffered: !0,
                  },
                  n || {}
                )
              ),
              r
            );
          }
        } catch (e) {}
      },
      h = function (e, t) {
        var n = function n(r) {
          ("pagehide" !== r.type && "hidden" !== dt.visibilityState) ||
            (e(r),
            t &&
              (removeEventListener("visibilitychange", n, !0),
              removeEventListener("pagehide", n, !0)));
        };
        addEventListener("visibilitychange", n, !0),
          addEventListener("pagehide", n, !0);
      },
      g = function (e, t, n, r) {
        var i, a;
        return function (o) {
          t.value >= 0 &&
            (o || r) &&
            ((a = t.value - (i || 0)) || void 0 === i) &&
            ((i = t.value),
            (t.delta = a),
            (t.rating = (function (e, t) {
              return e > t[1]
                ? "poor"
                : e > t[0]
                ? "needs-improvement"
                : "good";
            })(t.value, n)),
            e(t));
        };
      },
      T = -1,
      y = function () {
        return "hidden" !== dt.visibilityState || dt.prerendering ? 1 / 0 : 0;
      },
      E = function () {
        h(function (e) {
          var t = e.timeStamp;
          T = t;
        }, !0);
      },
      S = function () {
        return (
          T < 0 &&
            ((T = y()),
            E(),
            l(function () {
              setTimeout(function () {
                (T = y()), E();
              }, 0);
            })),
          {
            get firstHiddenTime() {
              return T;
            },
          }
        );
      },
      C = function (e, t) {
        t = t || {};
        var n,
          r = [1800, 3e3],
          i = S(),
          a = v("FCP"),
          o = function (e) {
            e.forEach(function (e) {
              "first-contentful-paint" === e.name &&
                (c && c.disconnect(),
                e.startTime < i.firstHiddenTime &&
                  ((a.value = e.startTime - m()), a.entries.push(e), n(!0)));
            });
          },
          u =
            ww.performance &&
            window.performance.getEntriesByName &&
            window.performance.getEntriesByName("first-contentful-paint")[0],
          c = u ? null : p("paint", o);
        (u || c) &&
          ((n = g(e, a, r, t.reportAllChanges)),
          u && o([u]),
          l(function (i) {
            (a = v("FCP")),
              (n = g(e, a, r, t.reportAllChanges)),
              requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                  (a.value = pe.now() - i.timeStamp), n(!0);
                });
              });
          }));
      },
      b = !1,
      w = -1,
      L = {
        passive: !0,
        capture: !0,
      },
      F = new Date(),
      M = function (e, i) {
        t || ((t = i), (n = e), (r = new Date()), I(removeEventListener), A());
      },
      A = function () {
        if (n >= 0 && n < r - F) {
          var e = {
            entryType: "first-input",
            name: t.type,
            target: t.target,
            cancelable: t.cancelable,
            startTime: t.timeStamp,
            processingStart: t.timeStamp + n,
          };
          i.forEach(function (t) {
            t(e);
          }),
            (i = []);
        }
      },
      B = function (e) {
        if (e.cancelable) {
          var t = (e.timeStamp > 1e12 ? new Date() : pe.now()) - e.timeStamp;
          "pointerdown" == e.type
            ? (function (e, t) {
                var n = function () {
                    M(e, t), i();
                  },
                  r = function () {
                    i();
                  },
                  i = function () {
                    removeEventListener("pointerup", n, L),
                      removeEventListener("pointercancel", r, L);
                  };
                addEventListener("pointerup", n, L),
                  addEventListener("pointercancel", r, L);
              })(t, e)
            : M(t, e);
        }
      },
      I = function (e) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (
          t
        ) {
          return e(t, B, L);
        });
      },
      P = function (e, r) {
        r = r || {};
        var a,
          o = [100, 300],
          u = S(),
          c = v("FID"),
          s = function (e) {
            e.startTime < u.firstHiddenTime &&
              ((c.value = e.processingStart - e.startTime),
              c.entries.push(e),
              a(!0));
          },
          f = function (e) {
            e.forEach(s);
          },
          d = p("first-input", f);
        (a = g(e, c, o, r.reportAllChanges)),
          d &&
            h(function () {
              f(d.takeRecords()), d.disconnect();
            }, !0),
          d &&
            l(function () {
              var u;
              (c = v("FID")),
                (a = g(e, c, o, r.reportAllChanges)),
                (i = []),
                (n = -1),
                (t = null),
                I(addEventListener),
                (u = s),
                i.push(u),
                A();
            });
      },
      x = 0,
      D = 1 / 0,
      k = 0,
      N = function (e) {
        e.forEach(function (e) {
          e.interactionId &&
            ((D = Math.min(D, e.interactionId)),
            (k = Math.max(k, e.interactionId)),
            (x = k ? (k - D) / 7 + 1 : 0));
        });
      },
      q = function () {
        return a ? x : pe.interactionCount || 0;
      },
      R = function () {
        "interactionCount" in performance ||
          a ||
          (a = p("event", N, {
            type: "event",
            buffered: !0,
            durationThreshold: 0,
          }));
      },
      H = 0,
      O = function () {
        return q() - H;
      },
      _ = [],
      j = {},
      V = function (e) {
        var t = _[_.length - 1],
          n = j[e.interactionId];
        if (n || _.length < 10 || e.duration > t.latency) {
          if (n)
            n.entries.push(e), (n.latency = Math.max(n.latency, e.duration));
          else {
            var r = {
              id: e.interactionId,
              latency: e.duration,
              entries: [e],
            };
            (j[r.id] = r), _.push(r);
          }
          _.sort(function (e, t) {
            return t.latency - e.latency;
          }),
            _.splice(10).forEach(function (e) {
              delete j[e.id];
            });
        }
      },
      U = function (e, t) {
        t = t || {};
        var n = [200, 500];
        R();
        var r,
          i = v("INP"),
          a = function (e) {
            e.forEach(function (e) {
              (e.interactionId && V(e), "first-input" === e.entryType) &&
                !_.some(function (t) {
                  return t.entries.some(function (t) {
                    return (
                      e.duration === t.duration && e.startTime === t.startTime
                    );
                  });
                }) &&
                V(e);
            });
            var t,
              n = ((t = Math.min(_.length - 1, Math.floor(O() / 50))), _[t]);
            n &&
              n.latency !== i.value &&
              ((i.value = n.latency), (i.entries = n.entries), r());
          },
          o = p("event", a, {
            durationThreshold: t.durationThreshold || 40,
          });
        (r = g(e, i, n, t.reportAllChanges)),
          o &&
            (o.observe({
              type: "first-input",
              buffered: !0,
            }),
            h(function () {
              a(o.takeRecords()),
                i.value < 0 && O() > 0 && ((i.value = 0), (i.entries = [])),
                r(!0);
            }),
            l(function () {
              (_ = []),
                (H = q()),
                (i = v("INP")),
                (r = g(e, i, n, t.reportAllChanges));
            }));
      },
      z = {},
      G = function e(t) {
        dt.prerendering
          ? addEventListener(
              "prerenderingchange",
              function () {
                return e(t);
              },
              !0
            )
          : "complete" !== dt.readyState
          ? addEventListener(
              "load",
              function () {
                return e(t);
              },
              !0
            )
          : setTimeout(t, 0);
      },
      J = function (e, t) {
        t = t || {};
        var n = [800, 1800],
          r = v("TTFB"),
          i = g(e, r, n, t.reportAllChanges);
        G(function () {
          var a = o();
          if (a) {
            if (
              ((r.value = Math.max(a.responseStart - m(), 0)),
              r.value < 0 || r.value > pe.now())
            )
              return;
            (r.entries = [a]),
              i(!0),
              l(function () {
                (r = v("TTFB", 0)), (i = g(e, r, n, t.reportAllChanges))(!0);
              });
          }
        });
      };
    return (
      (e.onCLS = function (e, t) {
        !(function (e, t) {
          t = t || {};
          var n = [0.1, 0.25];
          b ||
            (C(function (e) {
              w = e.value;
            }),
            (b = !0));
          var r,
            i = function (t) {
              w > -1 && e(t);
            },
            a = v("CLS", 0),
            o = 0,
            u = [],
            c = function (e) {
              e.forEach(function (e) {
                if (!e.hadRecentInput) {
                  var t = u[0],
                    n = u[u.length - 1];
                  o &&
                  e.startTime - n.startTime < 1e3 &&
                  e.startTime - t.startTime < 5e3
                    ? ((o += e.value), u.push(e))
                    : ((o = e.value), (u = [e])),
                    o > a.value && ((a.value = o), (a.entries = u), r());
                }
              });
            },
            s = p("layout-shift", c);
          s &&
            ((r = g(i, a, n, t.reportAllChanges)),
            h(function () {
              c(s.takeRecords()), r(!0);
            }),
            l(function () {
              (o = 0),
                (w = -1),
                (a = v("CLS", 0)),
                (r = g(i, a, n, t.reportAllChanges));
            }));
        })(function (t) {
          !(function (e) {
            if (e.entries.length) {
              var t = e.entries.reduce(function (e, t) {
                return e && e.value > t.value ? e : t;
              });
              if (t && t.sources && t.sources.length) {
                var n =
                  (r = t.sources).find(function (e) {
                    return e.node && 1 === e.node.nodeType;
                  }) || r[0];
                if (n)
                  return void (e.attribution = {
                    largestShiftTarget: s(n.node),
                    largestShiftTime: t.startTime,
                    largestShiftValue: t.value,
                    largestShiftSource: n,
                    largestShiftEntry: t,
                    loadState: u(t.startTime),
                  });
              }
            }
            var r;
            e.attribution = {};
          })(t),
            e(t);
        }, t);
      }),
      (e.onFCP = function (e, t) {
        C(function (t) {
          !(function (e) {
            if (e.entries.length) {
              var t = o(),
                n = e.entries[e.entries.length - 1];
              if (t) {
                var r = t.activationStart || 0,
                  i = Math.max(0, t.responseStart - r);
                return void (e.attribution = {
                  timeToFirstByte: i,
                  firstByteToFCP: e.value - i,
                  loadState: u(e.entries[0].startTime),
                  navigationEntry: t,
                  fcpEntry: n,
                });
              }
            }
            e.attribution = {
              timeToFirstByte: 0,
              firstByteToFCP: e.value,
              loadState: u(d()),
            };
          })(t),
            e(t);
        }, t);
      }),
      (e.onFID = function (e, t) {
        P(function (t) {
          !(function (e) {
            var t = e.entries[0];
            e.attribution = {
              eventTarget: s(t.target),
              eventType: t.name,
              eventTime: t.startTime,
              eventEntry: t,
              loadState: u(t.startTime),
            };
          })(t),
            e(t);
        }, t);
      }),
      (e.onINP = function (e, t) {
        U(function (t) {
          !(function (e) {
            if (e.entries.length) {
              var t = e.entries.sort(function (e, t) {
                return (
                  t.duration - e.duration ||
                  t.processingEnd -
                    t.processingStart -
                    (e.processingEnd - e.processingStart)
                );
              })[0];
              e.attribution = {
                eventTarget: s(t.target),
                eventType: t.name,
                eventTime: t.startTime,
                eventEntry: t,
                loadState: u(t.startTime),
              };
            } else e.attribution = {};
          })(t),
            e(t);
        }, t);
      }),
      (e.onLCP = function (e, t) {
        !(function (e, t) {
          t = t || {};
          var n,
            r = [2500, 4e3],
            i = S(),
            a = v("LCP"),
            o = function (e) {
              var t = e[e.length - 1];
              if (t) {
                var r = t.startTime - m();
                r < i.firstHiddenTime &&
                  ((a.value = r), (a.entries = [t]), n());
              }
            },
            u = p("largest-contentful-paint", o);
          if (u) {
            n = g(e, a, r, t.reportAllChanges);
            var c = function () {
              z[a.id] ||
                (o(u.takeRecords()), u.disconnect(), (z[a.id] = !0), n(!0));
            };
            ["keydown", "click"].forEach(function (e) {
              addEventListener(e, c, {
                once: !0,
                capture: !0,
              });
            }),
              h(c, !0),
              l(function (i) {
                (a = v("LCP")),
                  (n = g(e, a, r, t.reportAllChanges)),
                  requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                      (a.value = pe.now() - i.timeStamp), (z[a.id] = !0), n(!0);
                    });
                  });
              });
          }
        })(function (t) {
          !(function (e) {
            if (e.entries.length) {
              var t = o();
              if (t) {
                var n = t.activationStart || 0,
                  r = e.entries[e.entries.length - 1],
                  i =
                    r.url &&
                    pe.getEntriesByType("resource").filter(function (e) {
                      return e.name === r.url;
                    })[0],
                  a = Math.max(0, t.responseStart - n),
                  u = Math.max(a, i ? (i.requestStart || i.startTime) - n : 0),
                  c = Math.max(u, i ? i.responseEnd - n : 0),
                  f = Math.max(c, r ? r.startTime - n : 0),
                  d = {
                    element: s(r.element),
                    timeToFirstByte: a,
                    resourceLoadDelay: u - a,
                    resourceLoadTime: c - u,
                    elementRenderDelay: f - c,
                    navigationEntry: t,
                    lcpEntry: r,
                  };
                return (
                  r.url && (d.url = r.url),
                  i && (d.lcpResourceEntry = i),
                  void (e.attribution = d)
                );
              }
            }
            e.attribution = {
              timeToFirstByte: 0,
              resourceLoadDelay: 0,
              resourceLoadTime: 0,
              elementRenderDelay: e.value,
            };
          })(t),
            e(t);
        }, t);
      }),
      (e.onTTFB = function (e, t) {
        J(function (t) {
          !(function (e) {
            if (e.entries.length) {
              var t = e.entries[0],
                n = t.activationStart || 0,
                r = Math.max(t.domainLookupStart - n, 0),
                i = Math.max(t.connectStart - n, 0),
                a = Math.max(t.requestStart - n, 0);
              e.attribution = {
                waitingTime: r,
                dnsTime: i - r,
                connectionTime: a - i,
                requestTime: e.value - a,
                navigationEntry: t,
              };
            } else
              e.attribution = {
                waitingTime: 0,
                dnsTime: 0,
                connectionTime: 0,
                requestTime: 0,
              };
          })(t),
            e(t);
        }, t);
      }),
      Object.defineProperty(e, "__esModule", {
        value: !0,
      }),
      e
    );
  })({});
  webVitals.onCLS(submitRum);
  webVitals.onFID(submitRum);
  webVitals.onTTFB(submitRum);
  webVitals.onFCP(submitRum);
  webVitals.onINP(submitRum);
  webVitals.onLCP(submitRum);
})();
