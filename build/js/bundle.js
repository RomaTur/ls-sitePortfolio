/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (options) {
    options = {
        elemClass: options.elemClass || 'undefined',
        fn: options.fn || function () {},
        divider: options.divider || 2,
        loop: options.loop || false
        ////////////
    };var elemClass = options.elemClass,
        fn = options.fn,
        divider = options.divider,
        loop = options.loop,
        fnDone = false;

    var elem = document.querySelector('.' + elemClass);
    if (!elem) elem = document.querySelector('#' + elemClass);

    var checkDistance = function checkDistance(scrollTop, elem) {
        var offset = elem.offsetTop;
        var windowMargin = Math.ceil(window.innerHeight / divider);
        var topBorder = offset - scrollTop - windowMargin;
        var bottomEdge = elem.clientHeight + offset;
        var bottomBorder = scrollTop + windowMargin - bottomEdge;
        return {
            top: topBorder,
            bottom: bottomBorder
        };
    };
    var scrollFn = function scrollFn() {
        var scrollTop = window.scrollY;
        if (fnDone) {
            return 0;
        }
        console.log('in doFnElemVisible');
        if (checkDistance(scrollTop, elem).top <= 0 && checkDistance(scrollTop, elem).bottom <= 0) {

            fn();
            // (loop) ? fnDone = false : fnDone = true
            loop ? fnDone = false : fnDone = true;
        }
    };

    if (elem) {

        window.addEventListener('scroll', scrollFn);
    }
    /////////////
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//функция разрешения/запрета скролла//
var prevDef = function prevDef(event) {
    event.preventDefault();
};
module.exports = function (bool) {
    console.log('in isScroll.js');
    document.onmousewheel = document.onwheel = function () {
        return !bool ? false : true;
    };
    if (bool == false) {
        document.addEventListener('touchmove', prevDef, false);
    } else {
        document.removeEventListener('touchmove', prevDef, false);
    }
    document.addEventListener("MozMousePixelScroll", function () {
        return !bool ? false : true;
    }, false);
    document.onkeydown = function (e) {
        if (e.keyCode >= 33 && e.keyCode <= 40) {
            return !bool ? false : true;
        }
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (elemClass, buttonClass, fnActive, fn) {
    ////////////
    fn = fn || function () {
        console.log('empty fn in clickToggleClass');
    };
    fnActive = fnActive || function () {
        console.log('empty fnActive in clickToggleClass');
    };

    var elem = document.querySelector('.' + elemClass);
    var button = document.querySelector('.' + buttonClass);
    var containerToggle = function containerToggle() {
        elem.classList.toggle(elemClass + '--active');
        elem.classList.contains(elemClass + '--active') ? fnActive() : fn();
    };
    if (elem && button) {
        console.log('in clickToggleClass');
        button.addEventListener('click', containerToggle);
    }
    ///////////////
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false;

    // cache starting position
    start = location();

    // resolve target
    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

/* harmony default export */ __webpack_exports__["default"] = (singleton);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fullMenu = __webpack_require__(6);

var _fullMenu2 = _interopRequireDefault(_fullMenu);

var _maps = __webpack_require__(7);

var _maps2 = _interopRequireDefault(_maps);

var _flipLoginForm = __webpack_require__(9);

var _flipLoginForm2 = _interopRequireDefault(_flipLoginForm);

var _skillProgressInit = __webpack_require__(10);

var _skillProgressInit2 = _interopRequireDefault(_skillProgressInit);

var _blogSideBar = __webpack_require__(11);

var _blogSideBar2 = _interopRequireDefault(_blogSideBar);

var _svg4everybody = __webpack_require__(14);

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

var _blurForm = __webpack_require__(15);

var _blurForm2 = _interopRequireDefault(_blurForm);

var _parallaxMountains = __webpack_require__(16);

var _parallaxMountains2 = _interopRequireDefault(_parallaxMountains);

var _smothScrollClick = __webpack_require__(17);

var _smothScrollClick2 = _interopRequireDefault(_smothScrollClick);

var _animatePreloader = __webpack_require__(18);

var _animatePreloader2 = _interopRequireDefault(_animatePreloader);

var _admin = __webpack_require__(23);

var _admin2 = _interopRequireDefault(_admin);

var _slider = __webpack_require__(24);

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domready = function domready() {
    //DOM дерево загрузилось
    ///////
    console.log('entry start');

    (0, _svg4everybody2.default)(); //запуск скрипта чтобы все внешние подключения svg были кроссбраузерными

    (0, _animatePreloader2.default)();

    (0, _parallaxMountains2.default)(); //запуск скрипта инициализации паралакса

    (0, _flipLoginForm2.default)('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class

    (0, _smothScrollClick2.default)('header__arrow-img', 'content');
    (0, _smothScrollClick2.default)('footer__arrow', 'wrapper');

    (0, _fullMenu2.default)('hamburger', 'menu');

    (0, _blurForm2.default)();

    (0, _maps2.default)('map');
    (0, _skillProgressInit2.default)('skill', 'skill__bar', 'data-pct'); //классы без .
    (0, _slider2.default)();
    (0, _blogSideBar2.default)('article__list', 'article__list-circle');

    (0, _admin2.default)();
    ///////
    console.log('entry done');
};

//////////domready/////////////
if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    domready();
} else {
    document.addEventListener("DOMContentLoaded", domready);
}
/////////////////////////////

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _isScroll = __webpack_require__(1);

var _isScroll2 = _interopRequireDefault(_isScroll);

var _clickToggleClass = __webpack_require__(2);

var _clickToggleClass2 = _interopRequireDefault(_clickToggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (buttonClass, viewClass) {
    /////
    var view = document.querySelector('.' + viewClass);
    if (view) {
        console.log('in fullMenu');
        var scrollYes = function scrollYes() {
            (0, _isScroll2.default)(true);
        };
        var scrollNo = function scrollNo() {
            (0, _isScroll2.default)(false);
        };
        (0, _clickToggleClass2.default)(viewClass, buttonClass, scrollNo, scrollYes);
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import ymaps from 'ymaps'
var GoogleMapsLoader = __webpack_require__(8); // only for common js environments 

module.exports = function (mapSelector) {
  //////////
  var el = document.querySelector('#' + mapSelector);
  if (el) {
    console.log('in mapInit');
    var sarov = {
      lat: 54.931911,
      lng: 43.327683
    };
    var zoomVal = 15;

    var screenWidth = document.body.clientWidth;
    if (screenWidth <= 1024) zoomVal = 14;
    if (screenWidth <= 480) zoomVal = 13;

    GoogleMapsLoader.KEY = 'AIzaSyBESwPgs7bzboJ24WsUQpJC3zbaYxYbRn4';

    GoogleMapsLoader.load(function (google) {
      var map = new google.maps.Map(el, {
        zoom: zoomVal,
        center: sarov,
        mapTypeControl: false,
        disableDefaultUI: true,
        mapTypeId: 'satellite'
        //   styles: [
        //     {
        //         elementType: 'geometry',
        //         stylers: [{color: '#f5f5f5'}]
        //     },
        //     {
        //         elementType: 'labels.icon',
        //         stylers: [{visibility: 'off'}]
        //     },
        //     {
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#616161'}]
        //     },
        //     {
        //         elementType: 'labels.text.stroke',
        //         stylers: [{color: '#f5f5f5'}]
        //     },
        //     {
        //         featureType: 'administrative.land_parcel',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#bdbdbd'}]
        //     },
        //     {
        //         featureType: 'man_made',
        //         elementType: 'geometry.stroke',
        //         stylers: [{color: '#bdbdbd'}]
        //     },
        //     {
        //         featureType: 'poi',
        //         elementType: 'geometry',
        //         stylers: [{color: '#eeeeee'}]
        //     },
        //     {
        //         featureType: 'poi',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#757575'}]
        //     },
        //     {
        //         featureType: 'poi.park',
        //         elementType: 'geometry',
        //         stylers: [{color: '#e5e5e5'}]
        //     },
        //     {
        //         featureType: 'poi.park',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#9e9e9e'}]
        //     },
        //     {
        //         featureType: 'road',
        //         elementType: 'geometry',
        //         stylers: [{color: '#ffffff'}]
        //     },
        //     {
        //         featureType: 'road.arterial',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#757575'}]
        //     },
        //     {
        //         featureType: 'road.highway',
        //         elementType: 'geometry',
        //         stylers: [{color: '#dadada'}]
        //     },
        //     {
        //         featureType: 'road.highway',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#616161'}]
        //     },
        //     {
        //         featureType: 'road.local',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#9e9e9e'}]
        //     },
        //     {
        //         featureType: 'transit.line',
        //         elementType: 'geometry',
        //         stylers: [{color: '#e5e5e5'}]
        //     },
        //     {
        //         featureType: 'transit.station',
        //         elementType: 'geometry',
        //         stylers: [{color: '#eeeeee'}]
        //     },
        //     {
        //         featureType: 'water',
        //         elementType: 'geometry',
        //         stylers: [{color: '#00bfa5'}]
        //     },
        //     {
        //         featureType: 'water',
        //         elementType: 'labels.text.fill',
        //         stylers: [{color: '#9e9e9e'}]
        //     }
        // ]
      });
    });
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var googleVersion = '3.18';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var GoogleMapsLoader = {};


	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


	GoogleMapsLoader._googleMockApiObject = {};


	GoogleMapsLoader.load = function(fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};


	GoogleMapsLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};


	GoogleMapsLoader.isLoaded = function() {
		return google !== null;
	};


	GoogleMapsLoader.createUrl = function() {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		return url;
	};


	GoogleMapsLoader.release = function(fn) {
		var release = function() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	GoogleMapsLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	GoogleMapsLoader.makeMock = function() {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function() {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};


	return GoogleMapsLoader;

});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (loginButton, mainButton, flipContainer) {
    ///////////////
    var flip = document.querySelector('.' + flipContainer);
    var login = document.querySelector('.' + loginButton);
    var main = document.querySelector('.' + mainButton);
    if (flip && login && main) {
        console.log('in flipLoginForm');
        login.addEventListener('click', function () {
            flip.classList.add(flipContainer + '--active');
            login.style.opacity = '0';
            login.style.cursor = 'default';
        });
        main.addEventListener('click', function () {
            flip.classList.remove(flipContainer + '--active');
            login.style.opacity = '1';
            login.style.cursor = 'pointer';
        });
    }
    ////////////////////////
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _doFnElemVisible = __webpack_require__(0);

var _doFnElemVisible2 = _interopRequireDefault(_doFnElemVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } ////Анимация svg колец для элементов 'скилы'


module.exports = function (container, bar, attr) {
    //////////////
    var skill = [].concat(_toConsumableArray(document.querySelectorAll('.' + container))); //получение всех оберток где хранится data-pct
    var svgCircles = [].concat(_toConsumableArray(document.querySelectorAll('.' + bar))); //получение всех колец
    var percent = []; // массив значений взятых из html кода - которые туда были вставлены из админки через backend
    var currentCircle = void 0; //контейнер для отельного кольца
    //событие, которое присваивает значение кольцам
    var handleClick = function handleClick() {
        skill.forEach(function (item, i) {
            percent[i] = parseInt(item.getAttribute(attr)); //получили значение процентов и перевели в number
            currentCircle = item.getElementsByClassName(bar); //выбрали кольцо из текущей обертки
            currentCircle[0].style.strokeDashoffset = (100 - percent[i]) / 100 * Math.PI * 180; // присваивание текущему кольцу значения переведенному для спец свойства svg из процентов
        });
    };
    if (skill && svgCircles) {
        //обнуление значений во всех кольцах
        console.log('in skillProggressInit');
        svgCircles.forEach(function (i) {
            i.style.strokeDashoffset = Math.PI * 180;
        });
        // doFnElemVisible('skills', handleClick);
        (0, _doFnElemVisible2.default)({
            elemClass: 'skills',
            fn: handleClick
        });
    }
    ////////////////////
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _clickToggleClass = __webpack_require__(2);

var _clickToggleClass2 = _interopRequireDefault(_clickToggleClass);

var _doFnElemVisible = __webpack_require__(0);

var _doFnElemVisible2 = _interopRequireDefault(_doFnElemVisible);

var _jump = __webpack_require__(3);

var _jump2 = _interopRequireDefault(_jump);

var _moveSideBar = __webpack_require__(12);

var _moveSideBar2 = _interopRequireDefault(_moveSideBar);

var _activateSideBarLink = __webpack_require__(13);

var _activateSideBarLink2 = _interopRequireDefault(_activateSideBarLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sideBarClass, buttonClass) {
    ////////////
    var sideBar = document.querySelector('.' + sideBarClass);
    var button = document.querySelector('.' + buttonClass);
    var touchEvent = function touchEvent() {
        var initialPoint;
        var finalPoint;
        document.addEventListener('touchstart', function (event) {
            // event.preventDefault();
            event.stopPropagation();
            initialPoint = event.changedTouches[0];
        }, false);
        document.addEventListener('touchend', function (event) {
            // event.preventDefault();
            event.stopPropagation();
            finalPoint = event.changedTouches[0];
            var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX) {
                        /*СВАЙП ВЛЕВО*/
                        sideBar.classList.remove(sideBarClass + '--active');
                    } else {
                        /*СВАЙП ВПРАВО*/
                        sideBar.classList.add(sideBarClass + '--active');
                    }
                } else {
                    if (finalPoint.pageY < initialPoint.pageY) {
                        /*СВАЙП ВВЕРХ*/
                    } else {
                            /*СВАЙП ВНИЗ*/
                        }
                }
            }
        }, false);
    };

    var sideBarJumpFn = function sideBarJumpFn() {
        console.log('in sideBarJumpFn');
        sideBar.addEventListener('click', function (event) {
            var targetLink = event.target;
            // targetLink.children('.articles__item').classList.add('articles__item--active')
            var anchorNum = targetLink.getAttribute('href');
            if (anchorNum) {
                anchorNum = anchorNum.slice(1);
                var targetArticle = document.querySelector('#article' + anchorNum);
                if (targetArticle) {
                    var offsetArticle = void 0;
                    document.body.clientWidth >= 1025 ? offsetArticle = -50 : offsetArticle = -20;
                    (0, _jump2.default)('#article' + anchorNum, {
                        duration: 1000,
                        offset: offsetArticle,
                        callback: undefined,
                        easing: easeInOutQuad,
                        a11y: false
                    });
                    sideBar.classList.remove(sideBarClass + '--active');
                }
            }
        });
    };

    if (sideBar && button) {
        ////////////
        console.log('in blogSideBar');
        (0, _activateSideBarLink2.default)();
        var startLeftPos = window.getComputedStyle(button).left;
        button.style.left = -100 + 'px';

        var sideBarVisible = function sideBarVisible() {
            button.style.left = startLeftPos;
            touchEvent();
        };

        (0, _clickToggleClass2.default)(sideBarClass, buttonClass);
        sideBarJumpFn();

        (0, _activateSideBarLink2.default)();

        if (document.body.clientWidth <= 1024) (0, _doFnElemVisible2.default)({
            elemClass: 'articles',
            fn: sideBarVisible
        });else (0, _moveSideBar2.default)(sideBar);
        window.addEventListener('resize', function () {

            (0, _activateSideBarLink2.default)();

            if (document.body.clientWidth <= 1024) {
                button.style.left = -30 + 'px';
                sideBar.style.top = -5 + 'vh';

                touchEvent();
            } else (0, _moveSideBar2.default)(sideBar);
        });

        ////////////
    }

    var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    ////////////
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (sideBarElem) {
    ///////////////////
    console.log('in moveSideBar');
    var sideBarOffset = sideBarElem.offsetTop;
    var sideBarPos = window.getComputedStyle(sideBarElem).position;
    window.addEventListener('scroll', function () {
        var scrollTopDoc = window.scrollY + 100;
        var moveSideBarVal = scrollTopDoc - sideBarOffset;

        if (moveSideBarVal >= 0) {
            sideBarElem.style.position = 'fixed';
        } else {
            sideBarElem.style.position = 'static';
        }
    });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _doFnElemVisible = __webpack_require__(0);

var _doFnElemVisible2 = _interopRequireDefault(_doFnElemVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    ///////////
    console.log('in activateSideBarLink');
    var sideBarItems = document.querySelectorAll('.article__item');
    var articles = document.querySelectorAll('.article');
    var sideBarLinks = [];
    var offsetArticles = [];

    sideBarItems.forEach(function (sideBarLink) {
        sideBarLinks.push(sideBarLink);
    });
    // for(let i = 0; i < sideBarLinks.length; i++){
    //     console.log(sideBarLinks[i])
    // }
    articles.forEach(function (article) {
        offsetArticles.push(article.offsetTop);
    });

    var _loop = function _loop(i) {
        // console.log('в цикле')
        func = function func() {
            for (var j = 0; j < sideBarLinks.length; j++) {
                sideBarLinks[j].classList.remove('article__item--active');
            }
            sideBarLinks[i].classList.add('article__item--active');
            // console.log(i+1)
        };

        (0, _doFnElemVisible2.default)({
            elemClass: 'article' + (i + 1),
            fn: func,
            divider: 3,
            loop: true
        });
    };

    for (var i = 0; i < sideBarLinks.length; i++) {
        var func;

        _loop(i);
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(root, factory) {
     true ? // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return root.svg4everybody = factory();
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    ///////////////
    var fn = function () {
        return {
            set: function set() {
                var bgWidth = document.querySelector('.footer__bg-img').offsetWidth,
                    posLeft = -formContainer.offsetLeft,
                    posTop = -formContainer.offsetTop,
                    blurCSS = formBlur.style;
                blurCSS.backgroundSize = bgWidth - bgWidth * 0.0833 + 'px' + ' ' + 'auto';
                blurCSS.backgroundPosition = posLeft - posLeft * 0.109 + 'px' + ' ' + (posTop - posTop * 0.1178) + 'px';
            }
        };
    }();

    var formContainer = document.querySelector('.form');
    var formBlur = document.querySelector('.form__blur');
    if (formContainer && formBlur) {
        console.log('in blurForm');
        fn.set();
        window.onresize = function () {
            fn.set();
        };
    }
    //////////////
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    //////////////////
    var parallaxContainer = document.getElementById('parallax');
    if (parallaxContainer) {
        var _layers = parallaxContainer.children;
        window.addEventListener('mousemove', moveLayers);
    }
    var moveLayers = function moveLayers(event) {
        var initialX = window.innerWidth / 2 - event.pageX;
        var initialY = window.innerHeight / 2 - event.pageY;
        var i = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var layer = _step.value;

                var divider = i / 80,
                    positionX = initialX * divider,
                    positionY = initialY * divider,
                    bottomPosition = window.innerHeight / 2 * divider,
                    image = layer.firstElementChild;
                image.style.bottom = '-' + bottomPosition + 'px';
                if (event.pageY <= window.innerHeight) {
                    layer.style.transform = 'translate(' + positionX + 'px, ' + positionY + 'px)';
                }
                i++;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    /////////////////
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jump = __webpack_require__(3);

var _jump2 = _interopRequireDefault(_jump);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (buttonClass, toClass, offsetVal) {
    /////////////////
    var button = document.querySelector('.' + buttonClass);
    offsetVal = offsetVal || 0;
    if (button) {
        console.log('in smothScrollArrow');

        button.addEventListener('click', function () {
            (0, _jump2.default)('.' + toClass, {
                duration: 1000,
                offset: offsetVal,
                callback: undefined,
                easing: easeInOutQuad,
                a11y: false
            });
        });
    }
    var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timers = __webpack_require__(19);

var _isScroll = __webpack_require__(1);

var _isScroll2 = _interopRequireDefault(_isScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    console.log('in animatePreloader');

    var preloader = document.querySelector('.preloader');
    var preloaderSvg = document.querySelector('.preloader__svg');

    var circleOne = document.querySelector('.preloader__circle-one');
    var circleTwo = document.querySelector('.preloader__circle-two');
    var circleThree = document.querySelector('.preloader__circle-three');
    var preloaderText = document.querySelector('.preloader__text');
    var currentPercent = 0;

    var delayOfCircleOne = 30;
    var delayOfCircleTwo = 20;

    var animateInterval = void 0;

    var animatePreloader = function animatePreloader() {

        currentPercent += 5; // изменяется в зависимости от загрузки картинок

        if (currentPercent >= 100) {
            preloaderText.innerHTML = 100;
            currentPercent = 100;
            clearInterval(animateInterval);
            (0, _timers.setTimeout)(function () {
                preloaderSvg.style.opacity = 0;
                preloaderText.style.opacity = 0;
            }, 500);
            (0, _timers.setTimeout)(function () {
                preloader.style.opacity = 0;
                (0, _timers.setTimeout)(function () {
                    preloader.style.display = 'none';
                    (0, _isScroll2.default)(true);
                    console.log('exit preloader');
                }, 1500);
            }, 1000);
        }
        if (currentPercent > delayOfCircleOne) {
            circleOne.style.strokeDashoffset = 440 - 440 / 100 * (currentPercent * (delayOfCircleOne / 100 + 1) - delayOfCircleOne);
        }
        if (currentPercent > delayOfCircleTwo) {
            circleTwo.style.strokeDashoffset = 350 - 350 / 100 * (currentPercent * (delayOfCircleTwo / 100 + 1) - delayOfCircleTwo);
        }
        circleThree.style.strokeDashoffset = 260 - 260 / 100 * currentPercent;
        preloaderText.innerHTML = currentPercent;
    };

    if (preloaderSvg) {
        (0, _isScroll2.default)(false);
        animateInterval = setInterval(animatePreloader, 100);
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(20);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21), __webpack_require__(22)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {

    var nv = new Vue({
        el: '.app',
        data: {
            title: 'Hello Vue'
        }
    });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    var sliderBlock = document.querySelector('#slider');
    var currentSliderImg = document.querySelector('.work__current-img');

    var sliderInit = function sliderInit() {
        console.log('hi');
        var workNum = 0;
        var slider = new Vue({
            el: '#slider',
            data: {
                showCurrent: true,
                showNext: true,
                showPrevious: true,
                works: [{
                    title: 'Сайт школы онлайн образования',
                    tech: 'HTML, CSS, Javascript',
                    href: 'https://loftschool.com',
                    linkText: 'Посмотреть сайт',
                    img: 'img/work-1.png'
                }, {
                    title: 'Статичный сайт',
                    tech: 'HTML, CSS',
                    href: '#',
                    linkText: 'Заценить',
                    img: 'img/work-2.png'
                }, {
                    title: 'Лэндинг',
                    tech: 'HTML, CSS, Javascriptб jQuery',
                    href: '#',
                    linkText: 'Вкусить',
                    img: 'img/work-3.png'
                }, {
                    title: 'Сайт-визитка',
                    tech: 'HTML, CSS, Javascript',
                    href: '#',
                    linkText: 'Изумиться',
                    img: 'loremGif.gif'
                }],
                currentProject: {},
                previousProject: {},
                previousProject2: {},
                nextProject: {},
                nextProject2: {}
            },
            methods: {
                nextproject: function nextproject() {
                    var _this = this;

                    workNum < this.works.length - 1 ? workNum++ : workNum = 0;
                    var changeNext = new Promise(function (resolve, reject) {
                        resolve();
                    }).then(function () {
                        changeOthers(workNum, _this);
                    }).then(function () {
                        _this.showCurrent = !_this.showCurrent;
                        _this.showNext = !_this.showNext;
                        _this.showPrevious = !_this.showPrevious;
                    });
                },
                previousproject: function previousproject() {
                    var _this2 = this;

                    workNum > 0 ? workNum-- : workNum = this.works.length - 1;
                    var changePrevious = new Promise(function (resolve, reject) {
                        resolve();
                    }).then(function () {
                        changeOthers(workNum, _this2);
                    }).then(function () {
                        _this2.showCurrent = !_this2.showCurrent;
                        _this2.showNext = !_this2.showNext;
                        _this2.showPrevious = !_this2.showPrevious;
                    });
                },
                afterLeaveCurrent: function afterLeaveCurrent() {
                    this.showCurrent = !this.showCurrent;
                    changeCurrent(workNum, this);
                },
                afterLeaveNext: function afterLeaveNext() {
                    this.showNext = !this.showNext;
                },
                afterLeavePrevious: function afterLeavePrevious() {
                    this.showPrevious = !this.showPrevious;
                }

            }
        });

        /////////инициализация слайдов/////
        slider.currentProject = slider.works[workNum];
        slider.nextProject = slider.works[workNum + 1];
        slider.nextProject2 = slider.works[workNum + 2];
        slider.previousProject = slider.works[slider.works.length - 1];
        slider.previousProject2 = slider.works[slider.works.length - 2];
        //////функции по замене слайдов//////
        var changeCurrent = function changeCurrent(workNum, $this) {
            $this.currentProject = $this.works[workNum];
            workNum < $this.works.length - 1 ? $this.nextProject = $this.works[workNum + 1] : $this.nextProject = $this.works[0];
            workNum > 0 ? $this.previousProject = $this.works[workNum - 1] : $this.previousProject = $this.works[$this.works.length - 1];
        };
        var changeOthers = function changeOthers(workNum, $this) {
            workNum < $this.works.length - 1 ? $this.nextProject2 = $this.works[workNum + 1] : $this.nextProject2 = $this.works[0];
            workNum > 0 ? $this.previousProject2 = $this.works[workNum - 1] : $this.previousProject2 = $this.works[$this.works.length - 1];
        };
    };

    if (sliderBlock) {
        sliderInit();
    }
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGI1NTA2ZDU0NzFjOTNlMTZjNDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvZG9GbkVsZW1WaXNpYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2lzU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2NsaWNrVG9nZ2xlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2p1bXAuanMvZGlzdC9qdW1wLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2Z1bGxNZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL21hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dvb2dsZS1tYXBzL2xpYi9Hb29nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvZmxpcExvZ2luRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9za2lsbFByb2dyZXNzSW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ibG9nU2lkZUJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9tb3ZlU2lkZUJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9hY3RpdmF0ZVNpZGVCYXJMaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmc0ZXZlcnlib2R5L2Rpc3Qvc3ZnNGV2ZXJ5Ym9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ibHVyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9wYXJhbGxheE1vdW50YWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9zbW90aFNjcm9sbENsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2FuaW1hdGVQcmVsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2FkbWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL3NsaWRlci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImVsZW1DbGFzcyIsImZuIiwiZGl2aWRlciIsImxvb3AiLCJmbkRvbmUiLCJlbGVtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2hlY2tEaXN0YW5jZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsIm9mZnNldFRvcCIsIndpbmRvd01hcmdpbiIsIk1hdGgiLCJjZWlsIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJ0b3BCb3JkZXIiLCJib3R0b21FZGdlIiwiY2xpZW50SGVpZ2h0IiwiYm90dG9tQm9yZGVyIiwidG9wIiwiYm90dG9tIiwic2Nyb2xsRm4iLCJzY3JvbGxZIiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2RGVmIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImJvb2wiLCJvbm1vdXNld2hlZWwiLCJvbndoZWVsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9ua2V5ZG93biIsImUiLCJrZXlDb2RlIiwiYnV0dG9uQ2xhc3MiLCJmbkFjdGl2ZSIsImJ1dHRvbiIsImNvbnRhaW5lclRvZ2dsZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImNvbnRhaW5zIiwiZG9tcmVhZHkiLCJyZWFkeVN0YXRlIiwiZG9jdW1lbnRFbGVtZW50IiwiZG9TY3JvbGwiLCJ2aWV3Q2xhc3MiLCJ2aWV3Iiwic2Nyb2xsWWVzIiwic2Nyb2xsTm8iLCJHb29nbGVNYXBzTG9hZGVyIiwicmVxdWlyZSIsIm1hcFNlbGVjdG9yIiwiZWwiLCJzYXJvdiIsImxhdCIsImxuZyIsInpvb21WYWwiLCJzY3JlZW5XaWR0aCIsImJvZHkiLCJjbGllbnRXaWR0aCIsIktFWSIsImxvYWQiLCJnb29nbGUiLCJtYXAiLCJtYXBzIiwiTWFwIiwiem9vbSIsImNlbnRlciIsIm1hcFR5cGVDb250cm9sIiwiZGlzYWJsZURlZmF1bHRVSSIsIm1hcFR5cGVJZCIsImxvZ2luQnV0dG9uIiwibWFpbkJ1dHRvbiIsImZsaXBDb250YWluZXIiLCJmbGlwIiwibG9naW4iLCJtYWluIiwiYWRkIiwic3R5bGUiLCJvcGFjaXR5IiwiY3Vyc29yIiwicmVtb3ZlIiwiY29udGFpbmVyIiwiYmFyIiwiYXR0ciIsInNraWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInN2Z0NpcmNsZXMiLCJwZXJjZW50IiwiY3VycmVudENpcmNsZSIsImhhbmRsZUNsaWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwic3Ryb2tlRGFzaG9mZnNldCIsIlBJIiwic2lkZUJhckNsYXNzIiwic2lkZUJhciIsInRvdWNoRXZlbnQiLCJpbml0aWFsUG9pbnQiLCJmaW5hbFBvaW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2hhbmdlZFRvdWNoZXMiLCJ4QWJzIiwiYWJzIiwicGFnZVgiLCJ5QWJzIiwicGFnZVkiLCJzaWRlQmFySnVtcEZuIiwidGFyZ2V0TGluayIsInRhcmdldCIsImFuY2hvck51bSIsInNsaWNlIiwidGFyZ2V0QXJ0aWNsZSIsIm9mZnNldEFydGljbGUiLCJkdXJhdGlvbiIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiZWFzaW5nIiwiZWFzZUluT3V0UXVhZCIsImExMXkiLCJzdGFydExlZnRQb3MiLCJnZXRDb21wdXRlZFN0eWxlIiwibGVmdCIsInNpZGVCYXJWaXNpYmxlIiwidCIsImIiLCJjIiwiZCIsInNpZGVCYXJFbGVtIiwic2lkZUJhck9mZnNldCIsInNpZGVCYXJQb3MiLCJwb3NpdGlvbiIsInNjcm9sbFRvcERvYyIsIm1vdmVTaWRlQmFyVmFsIiwic2lkZUJhckl0ZW1zIiwiYXJ0aWNsZXMiLCJzaWRlQmFyTGlua3MiLCJvZmZzZXRBcnRpY2xlcyIsInB1c2giLCJzaWRlQmFyTGluayIsImFydGljbGUiLCJmdW5jIiwiaiIsImxlbmd0aCIsInNldCIsImJnV2lkdGgiLCJvZmZzZXRXaWR0aCIsInBvc0xlZnQiLCJmb3JtQ29udGFpbmVyIiwib2Zmc2V0TGVmdCIsInBvc1RvcCIsImJsdXJDU1MiLCJmb3JtQmx1ciIsImJhY2tncm91bmRTaXplIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwib25yZXNpemUiLCJwYXJhbGxheENvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwibGF5ZXJzIiwiY2hpbGRyZW4iLCJtb3ZlTGF5ZXJzIiwiaW5pdGlhbFgiLCJpbm5lcldpZHRoIiwiaW5pdGlhbFkiLCJsYXllciIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsImJvdHRvbVBvc2l0aW9uIiwiaW1hZ2UiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInRyYW5zZm9ybSIsInRvQ2xhc3MiLCJvZmZzZXRWYWwiLCJwcmVsb2FkZXIiLCJwcmVsb2FkZXJTdmciLCJjaXJjbGVPbmUiLCJjaXJjbGVUd28iLCJjaXJjbGVUaHJlZSIsInByZWxvYWRlclRleHQiLCJjdXJyZW50UGVyY2VudCIsImRlbGF5T2ZDaXJjbGVPbmUiLCJkZWxheU9mQ2lyY2xlVHdvIiwiYW5pbWF0ZUludGVydmFsIiwiYW5pbWF0ZVByZWxvYWRlciIsImlubmVySFRNTCIsImNsZWFySW50ZXJ2YWwiLCJkaXNwbGF5Iiwic2V0SW50ZXJ2YWwiLCJudiIsIlZ1ZSIsImRhdGEiLCJ0aXRsZSIsInNsaWRlckJsb2NrIiwiY3VycmVudFNsaWRlckltZyIsInNsaWRlckluaXQiLCJ3b3JrTnVtIiwic2xpZGVyIiwic2hvd0N1cnJlbnQiLCJzaG93TmV4dCIsInNob3dQcmV2aW91cyIsIndvcmtzIiwidGVjaCIsImhyZWYiLCJsaW5rVGV4dCIsImltZyIsImN1cnJlbnRQcm9qZWN0IiwicHJldmlvdXNQcm9qZWN0IiwicHJldmlvdXNQcm9qZWN0MiIsIm5leHRQcm9qZWN0IiwibmV4dFByb2plY3QyIiwibWV0aG9kcyIsIm5leHRwcm9qZWN0IiwiY2hhbmdlTmV4dCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidGhlbiIsImNoYW5nZU90aGVycyIsInByZXZpb3VzcHJvamVjdCIsImNoYW5nZVByZXZpb3VzIiwiYWZ0ZXJMZWF2ZUN1cnJlbnQiLCJjaGFuZ2VDdXJyZW50IiwiYWZ0ZXJMZWF2ZU5leHQiLCJhZnRlckxlYXZlUHJldmlvdXMiLCIkdGhpcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBQSxPQUFPQyxPQUFQLEdBQWlCLFVBQUNDLE9BQUQsRUFBYTtBQUMxQkEsY0FBVTtBQUNOQyxtQkFBV0QsUUFBUUMsU0FBUixJQUFxQixXQUQxQjtBQUVOQyxZQUFJRixRQUFRRSxFQUFSLElBQWMsWUFBWSxDQUFFLENBRjFCO0FBR05DLGlCQUFTSCxRQUFRRyxPQUFSLElBQW1CLENBSHRCO0FBSU5DLGNBQU1KLFFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxHZ0MsT0FBeEIsQ0FBVjtBQXFHRCxLQXRHRDtBQXdHRDtBQUNGLENBNUhELEM7Ozs7OztBQ0hBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQSxDQUFDOzs7QUFHRDs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWEseUJB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O0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7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LENBQXZCO0FBQ0NBLHNCQUFVNkIsTUFBTXhCLEtBQU4sQ0FBWXpELE1BQVosR0FBcUIsQ0FBaEMsR0FBcUNpRixNQUFNaEIsV0FBTixHQUFvQmdCLE1BQU14QixLQUFOLENBQVlMLFVBQVUsQ0FBdEIsQ0FBekQsR0FBbUY2QixNQUFNaEIsV0FBTixHQUFvQmdCLE1BQU14QixLQUFOLENBQVksQ0FBWixDQUF2RztBQUNDTCxzQkFBVSxDQUFYLEdBQWdCNkIsTUFBTWxCLGVBQU4sR0FBd0JrQixNQUFNeEIsS0FBTixDQUFZTCxVQUFVLENBQXRCLENBQXhDLEdBQWtFNkIsTUFBTWxCLGVBQU4sR0FBd0JrQixNQUFNeEIsS0FBTixDQUFZd0IsTUFBTXhCLEtBQU4sQ0FBWXpELE1BQVosR0FBcUIsQ0FBakMsQ0FBMUY7QUFDSCxTQUpEO0FBS0EsWUFBSTBFLGVBQWUsU0FBZkEsWUFBZSxDQUFDdEIsT0FBRCxFQUFVNkIsS0FBVixFQUFvQjtBQUNsQzdCLHNCQUFVNkIsTUFBTXhCLEtBQU4sQ0FBWXpELE1BQVosR0FBcUIsQ0FBaEMsR0FBcUNpRixNQUFNZixZQUFOLEdBQXFCZSxNQUFNeEIsS0FBTixDQUFZTCxVQUFVLENBQXRCLENBQTFELEdBQW9GNkIsTUFBTWYsWUFBTixHQUFxQmUsTUFBTXhCLEtBQU4sQ0FBWSxDQUFaLENBQXpHO0FBQ0NMLHNCQUFVLENBQVgsR0FBZ0I2QixNQUFNakIsZ0JBQU4sR0FBeUJpQixNQUFNeEIsS0FBTixDQUFZTCxVQUFVLENBQXRCLENBQXpDLEdBQW1FNkIsTUFBTWpCLGdCQUFOLEdBQXlCaUIsTUFBTXhCLEtBQU4sQ0FBWXdCLE1BQU14QixLQUFOLENBQVl6RCxNQUFaLEdBQXFCLENBQWpDLENBQTVGO0FBQ0gsU0FIRDtBQUlILEtBbkdEOztBQXFHQSxRQUFJaUQsV0FBSixFQUFpQjtBQUNiRTtBQUNIO0FBRUosQ0E3R0QsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkYjU1MDZkNTQ3MWM5M2UxNmM0NSIsIm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMpID0+IHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgICBlbGVtQ2xhc3M6IG9wdGlvbnMuZWxlbUNsYXNzIHx8ICd1bmRlZmluZWQnLFxuICAgICAgICBmbjogb3B0aW9ucy5mbiB8fCBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgZGl2aWRlcjogb3B0aW9ucy5kaXZpZGVyIHx8IDIsXG4gICAgICAgIGxvb3A6IG9wdGlvbnMubG9vcCB8fCBmYWxzZVxuICAgIH1cbiAgICAvLy8vLy8vLy8vLy9cbiAgICBsZXQgZWxlbUNsYXNzID0gb3B0aW9ucy5lbGVtQ2xhc3MsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbixcbiAgICAgICAgZGl2aWRlciA9IG9wdGlvbnMuZGl2aWRlcixcbiAgICAgICAgbG9vcCA9IG9wdGlvbnMubG9vcCxcbiAgICAgICAgZm5Eb25lID0gZmFsc2U7XG5cbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgZWxlbUNsYXNzKTtcbiAgICBpZiAoIWVsZW0pIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGVsZW1DbGFzcyk7XG5cbiAgICBsZXQgY2hlY2tEaXN0YW5jZSA9IChzY3JvbGxUb3AsIGVsZW0pID0+IHtcbiAgICAgICAgbGV0IG9mZnNldCA9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICBsZXQgd2luZG93TWFyZ2luID0gTWF0aC5jZWlsKHdpbmRvdy5pbm5lckhlaWdodCAvIGRpdmlkZXIpO1xuICAgICAgICBsZXQgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luO1xuICAgICAgICBsZXQgYm90dG9tRWRnZSA9IGVsZW0uY2xpZW50SGVpZ2h0ICsgb2Zmc2V0O1xuICAgICAgICBsZXQgYm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogdG9wQm9yZGVyLFxuICAgICAgICAgICAgYm90dG9tOiBib3R0b21Cb3JkZXJcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IHNjcm9sbEZuID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGlmIChmbkRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2luIGRvRm5FbGVtVmlzaWJsZScpO1xuICAgICAgICBpZiAoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsIGVsZW0pLnRvcCA8PSAwICYmIGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wLCBlbGVtKS5ib3R0b20gPD0gMCkge1xuXG4gICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgLy8gKGxvb3ApID8gZm5Eb25lID0gZmFsc2UgOiBmbkRvbmUgPSB0cnVlXG4gICAgICAgICAgICAobG9vcCkgPyBmbkRvbmUgPSBmYWxzZTogZm5Eb25lID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoZWxlbSkge1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxGbik7XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy9cblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9kb0ZuRWxlbVZpc2libGUuanMiLCIvL9GE0YPQvdC60YbQuNGPINGA0LDQt9GA0LXRiNC10L3QuNGPL9C30LDQv9GA0LXRgtCwINGB0LrRgNC+0LvQu9CwLy9cbmxldCBwcmV2RGVmID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gKGJvb2wpID0+IHtcbiAgICBjb25zb2xlLmxvZygnaW4gaXNTY3JvbGwuanMnKTtcbiAgICBkb2N1bWVudC5vbm1vdXNld2hlZWw9ZG9jdW1lbnQub253aGVlbD1mdW5jdGlvbigpe1xucmV0dXJuICghYm9vbCkgPyBmYWxzZSA6IHRydWU7ICAgIH07XG4gICAgaWYoYm9vbD09ZmFsc2UpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldkRlZiwgZmFsc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldkRlZiwgZmFsc2UpO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTW96TW91c2VQaXhlbFNjcm9sbFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiAoIWJvb2wpID8gZmFsc2UgOiB0cnVlOyAgICB9LGZhbHNlKTtcbiAgICBkb2N1bWVudC5vbmtleWRvd249ZnVuY3Rpb24oZSkge1xuICAgIFx0aWYgKGUua2V5Q29kZT49MzMmJmUua2V5Q29kZTw9NDApe1xuICAgICAgICAgICAgcmV0dXJuICghYm9vbCkgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2lzU2Nyb2xsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoZWxlbUNsYXNzLCBidXR0b25DbGFzcywgZm5BY3RpdmUsIGZuKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vXG4gICAgZm4gPSBmbiB8fCBmdW5jdGlvbigpe2NvbnNvbGUubG9nKCdlbXB0eSBmbiBpbiBjbGlja1RvZ2dsZUNsYXNzJyl9O1xuICAgIGZuQWN0aXZlID0gZm5BY3RpdmUgfHwgZnVuY3Rpb24oKXtjb25zb2xlLmxvZygnZW1wdHkgZm5BY3RpdmUgaW4gY2xpY2tUb2dnbGVDbGFzcycpfTsgXG4gICAgXG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGVsZW1DbGFzcylcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBidXR0b25DbGFzcylcbiAgICBsZXQgY29udGFpbmVyVG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC50b2dnbGUoZWxlbUNsYXNzICsgJy0tYWN0aXZlJyk7XG4gICAgICAgIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhlbGVtQ2xhc3MgKyAnLS1hY3RpdmUnKSkgPyBmbkFjdGl2ZSgpIDogZm4oKTtcbiAgICB9O1xuICAgIGlmIChlbGVtICYmIGJ1dHRvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gY2xpY2tUb2dnbGVDbGFzcycpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb250YWluZXJUb2dnbGUpO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy9cblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9jbGlja1RvZ2dsZUNsYXNzLmpzIiwiLy8gUm9iZXJ0IFBlbm5lcidzIGVhc2VJbk91dFF1YWRcblxuLy8gZmluZCB0aGUgcmVzdCBvZiBoaXMgZWFzaW5nIGZ1bmN0aW9ucyBoZXJlOiBodHRwOi8vcm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcvXG4vLyBmaW5kIHRoZW0gZXhwb3J0ZWQgZm9yIEVTNiBjb25zdW1wdGlvbiBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vamF4Z2VsbGVyL2V6LmpzXG5cbnZhciBlYXNlSW5PdXRRdWFkID0gZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gIHQgLz0gZCAvIDI7XG4gIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xuICB0LS07XG4gIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGI7XG59O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxudmFyIGp1bXBlciA9IGZ1bmN0aW9uIGp1bXBlcigpIHtcbiAgLy8gcHJpdmF0ZSB2YXJpYWJsZSBjYWNoZVxuICAvLyBubyB2YXJpYWJsZXMgYXJlIGNyZWF0ZWQgZHVyaW5nIGEganVtcCwgcHJldmVudGluZyBtZW1vcnkgbGVha3NcblxuICB2YXIgZWxlbWVudCA9IHZvaWQgMDsgLy8gZWxlbWVudCB0byBzY3JvbGwgdG8gICAgICAgICAgICAgICAgICAgKG5vZGUpXG5cbiAgdmFyIHN0YXJ0ID0gdm9pZCAwOyAvLyB3aGVyZSBzY3JvbGwgc3RhcnRzICAgICAgICAgICAgICAgICAgICAocHgpXG4gIHZhciBzdG9wID0gdm9pZCAwOyAvLyB3aGVyZSBzY3JvbGwgc3RvcHMgICAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgdmFyIG9mZnNldCA9IHZvaWQgMDsgLy8gYWRqdXN0bWVudCBmcm9tIHRoZSBzdG9wIHBvc2l0aW9uICAgICAgKHB4KVxuICB2YXIgZWFzaW5nID0gdm9pZCAwOyAvLyBlYXNpbmcgZnVuY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24pXG4gIHZhciBhMTF5ID0gdm9pZCAwOyAvLyBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQgZmxhZyAgICAgICAgICAgICAoYm9vbGVhbilcblxuICB2YXIgZGlzdGFuY2UgPSB2b2lkIDA7IC8vIGRpc3RhbmNlIG9mIHNjcm9sbCAgICAgICAgICAgICAgICAgICAgIChweClcbiAgdmFyIGR1cmF0aW9uID0gdm9pZCAwOyAvLyBzY3JvbGwgZHVyYXRpb24gICAgICAgICAgICAgICAgICAgICAgICAobXMpXG5cbiAgdmFyIHRpbWVTdGFydCA9IHZvaWQgMDsgLy8gdGltZSBzY3JvbGwgc3RhcnRlZCAgICAgICAgICAgICAgICAgICAgKG1zKVxuICB2YXIgdGltZUVsYXBzZWQgPSB2b2lkIDA7IC8vIHRpbWUgc3BlbnQgc2Nyb2xsaW5nIHRodXMgZmFyICAgICAgICAgIChtcylcblxuICB2YXIgbmV4dCA9IHZvaWQgMDsgLy8gbmV4dCBzY3JvbGwgcG9zaXRpb24gICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIHZhciBjYWxsYmFjayA9IHZvaWQgMDsgLy8gdG8gY2FsbCB3aGVuIGRvbmUgc2Nyb2xsaW5nICAgICAgICAgICAgKGZ1bmN0aW9uKVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBoZWxwZXJcblxuICBmdW5jdGlvbiBsb2NhdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB9XG5cbiAgLy8gZWxlbWVudCBvZmZzZXQgaGVscGVyXG5cbiAgZnVuY3Rpb24gdG9wKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzdGFydDtcbiAgfVxuXG4gIC8vIHJBRiBsb29wIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvb3AodGltZUN1cnJlbnQpIHtcbiAgICAvLyBzdG9yZSB0aW1lIHNjcm9sbCBzdGFydGVkLCBpZiBub3Qgc3RhcnRlZCBhbHJlYWR5XG4gICAgaWYgKCF0aW1lU3RhcnQpIHtcbiAgICAgIHRpbWVTdGFydCA9IHRpbWVDdXJyZW50O1xuICAgIH1cblxuICAgIC8vIGRldGVybWluZSB0aW1lIHNwZW50IHNjcm9sbGluZyBzbyBmYXJcbiAgICB0aW1lRWxhcHNlZCA9IHRpbWVDdXJyZW50IC0gdGltZVN0YXJ0O1xuXG4gICAgLy8gY2FsY3VsYXRlIG5leHQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgbmV4dCA9IGVhc2luZyh0aW1lRWxhcHNlZCwgc3RhcnQsIGRpc3RhbmNlLCBkdXJhdGlvbik7XG5cbiAgICAvLyBzY3JvbGwgdG8gaXRcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV4dCk7XG5cbiAgICAvLyBjaGVjayBwcm9ncmVzc1xuICAgIHRpbWVFbGFwc2VkIDwgZHVyYXRpb24gPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApIC8vIGNvbnRpbnVlIHNjcm9sbCBsb29wXG4gICAgOiBkb25lKCk7IC8vIHNjcm9sbGluZyBpcyBkb25lXG4gIH1cblxuICAvLyBzY3JvbGwgZmluaXNoZWQgaGVscGVyXG5cbiAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAvLyBhY2NvdW50IGZvciByQUYgdGltZSByb3VuZGluZyBpbmFjY3VyYWNpZXNcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc3RhcnQgKyBkaXN0YW5jZSk7XG5cbiAgICAvLyBpZiBzY3JvbGxpbmcgdG8gYW4gZWxlbWVudCwgYW5kIGFjY2Vzc2liaWxpdHkgaXMgZW5hYmxlZFxuICAgIGlmIChlbGVtZW50ICYmIGExMXkpIHtcbiAgICAgIC8vIGFkZCB0YWJpbmRleCBpbmRpY2F0aW5nIHByb2dyYW1tYXRpYyBmb2N1c1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG5cbiAgICAgIC8vIGZvY3VzIHRoZSBlbGVtZW50XG4gICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy8gaWYgaXQgZXhpc3RzLCBmaXJlIHRoZSBjYWxsYmFja1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGltZSBmb3IgbmV4dCBqdW1wXG4gICAgdGltZVN0YXJ0ID0gZmFsc2U7XG4gIH1cblxuICAvLyBBUElcblxuICBmdW5jdGlvbiBqdW1wKHRhcmdldCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIC8vIHJlc29sdmUgb3B0aW9ucywgb3IgdXNlIGRlZmF1bHRzXG4gICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IDEwMDA7XG4gICAgb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQgfHwgMDtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7IC8vIFwidW5kZWZpbmVkXCIgaXMgYSBzdWl0YWJsZSBkZWZhdWx0LCBhbmQgd29uJ3QgYmUgY2FsbGVkXG4gICAgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgfHwgZWFzZUluT3V0UXVhZDtcbiAgICBhMTF5ID0gb3B0aW9ucy5hMTF5IHx8IGZhbHNlO1xuXG4gICAgLy8gY2FjaGUgc3RhcnRpbmcgcG9zaXRpb25cbiAgICBzdGFydCA9IGxvY2F0aW9uKCk7XG5cbiAgICAvLyByZXNvbHZlIHRhcmdldFxuICAgIHN3aXRjaCAodHlwZW9mIHRhcmdldCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodGFyZ2V0KSkge1xuICAgICAgLy8gc2Nyb2xsIGZyb20gY3VycmVudCBwb3NpdGlvblxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZWxlbWVudCA9IHVuZGVmaW5lZDsgLy8gbm8gZWxlbWVudCB0byBzY3JvbGwgdG9cbiAgICAgICAgYTExeSA9IGZhbHNlOyAvLyBtYWtlIHN1cmUgYWNjZXNzaWJpbGl0eSBpcyBvZmZcbiAgICAgICAgc3RvcCA9IHN0YXJ0ICsgdGFyZ2V0O1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQgKG5vZGUpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgZWxlbWVudCA9IHRhcmdldDtcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChzZWxlY3RvcilcbiAgICAgIC8vIGJvdW5kaW5nIHJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICAgICAgICBzdG9wID0gdG9wKGVsZW1lbnQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIHNjcm9sbCBkaXN0YW5jZSwgYWNjb3VudGluZyBmb3Igb2Zmc2V0XG4gICAgZGlzdGFuY2UgPSBzdG9wIC0gc3RhcnQgKyBvZmZzZXQ7XG5cbiAgICAvLyByZXNvbHZlIGR1cmF0aW9uXG4gICAgc3dpdGNoIChfdHlwZW9mKG9wdGlvbnMuZHVyYXRpb24pKSB7XG4gICAgICAvLyBudW1iZXIgaW4gbXNcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIHBhc3NlZCB0aGUgZGlzdGFuY2Ugb2YgdGhlIHNjcm9sbFxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24oZGlzdGFuY2UpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBzdGFydCB0aGUgbG9vcFxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gIH1cblxuICAvLyBleHBvc2Ugb25seSB0aGUganVtcCBtZXRob2RcbiAgcmV0dXJuIGp1bXA7XG59O1xuXG4vLyBleHBvcnQgc2luZ2xldG9uXG5cbnZhciBzaW5nbGV0b24gPSBqdW1wZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2luZ2xldG9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanVtcC5qcy9kaXN0L2p1bXAubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBmdWxsTWVudSBmcm9tICcuL21vZHVsZXMvZnVsbE1lbnUnO1xuaW1wb3J0IG1hcEluaXQgZnJvbSAnLi9tb2R1bGVzL21hcHMuanMnXG5pbXBvcnQgZmxpcExvZ2luRm9ybSBmcm9tICcuL21vZHVsZXMvZmxpcExvZ2luRm9ybSdcbmltcG9ydCBza2lsbFByb2dyZXNzSW5pdCBmcm9tICcuL21vZHVsZXMvc2tpbGxQcm9ncmVzc0luaXQnXG5pbXBvcnQgYmxvZ1NpZGVCYXIgZnJvbSAnLi9tb2R1bGVzL2Jsb2dTaWRlQmFyJ1xuaW1wb3J0IHN2ZzRldmVyeWJvZHkgZnJvbSAnc3ZnNGV2ZXJ5Ym9keSdcbmltcG9ydCBibHVyRm9ybSBmcm9tICcuL21vZHVsZXMvYmx1ckZvcm0nXG5pbXBvcnQgcGFyYWxsYXhCZyBmcm9tICcuL21vZHVsZXMvcGFyYWxsYXhNb3VudGFpbnMnXG5pbXBvcnQgc21vb3RoU2Nyb2xsQ2xpY2sgZnJvbSAnLi9tb2R1bGVzL3Ntb3RoU2Nyb2xsQ2xpY2suanMnXG5pbXBvcnQgYW5pbWF0ZVByZWxvYWRlciBmcm9tICcuL21vZHVsZXMvYW5pbWF0ZVByZWxvYWRlcidcbmltcG9ydCBhZG1pbiBmcm9tICcuL21vZHVsZXMvYWRtaW4nXG5pbXBvcnQgc2xpZGVyIGZyb20gJy4vbW9kdWxlcy9zbGlkZXInXG5cbmxldCBkb21yZWFkeSA9IGZ1bmN0aW9uICgpIHsvL0RPTSDQtNC10YDQtdCy0L4g0LfQsNCz0YDRg9C30LjQu9C+0YHRjFxuICAgIC8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnZW50cnkgc3RhcnQnKTtcblxuICAgIHN2ZzRldmVyeWJvZHkoKTsvL9C30LDQv9GD0YHQuiDRgdC60YDQuNC/0YLQsCDRh9GC0L7QsdGLINCy0YHQtSDQstC90LXRiNC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QuNGPIHN2ZyDQsdGL0LvQuCDQutGA0L7RgdGB0LHRgNCw0YPQt9C10YDQvdGL0LzQuFxuXG4gICAgYW5pbWF0ZVByZWxvYWRlcigpO1xuXG5cbiAgICBwYXJhbGxheEJnKCk7Ly/Qt9Cw0L/Rg9GB0Log0YHQutGA0LjQv9GC0LAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0L/QsNGA0LDQu9Cw0LrRgdCwXG4gICAgXG4gICAgZmxpcExvZ2luRm9ybSgnd2VsY29tZV9fbG9naW4tYnV0dG9uJywgJ2xvZ2luX19idXR0b25zLW1haW4nLCAnZmxpcF9fY29udGFpbmVyJyk7IC8vZmxpcCBjb250YWluZXIgbmVlZCB0byBiZSBhIGNsYXNzXG5cbiAgICBzbW9vdGhTY3JvbGxDbGljaygnaGVhZGVyX19hcnJvdy1pbWcnLCAnY29udGVudCcpO1xuICAgIHNtb290aFNjcm9sbENsaWNrKCdmb290ZXJfX2Fycm93JywgJ3dyYXBwZXInKTtcbiAgICBcbiAgICBmdWxsTWVudSgnaGFtYnVyZ2VyJywgJ21lbnUnKTtcblxuICAgIGJsdXJGb3JtKCk7XG4gICAgXG4gICAgbWFwSW5pdCgnbWFwJyk7XG4gICAgc2tpbGxQcm9ncmVzc0luaXQoJ3NraWxsJywgJ3NraWxsX19iYXInLCAnZGF0YS1wY3QnKTsgLy/QutC70LDRgdGB0Ysg0LHQtdC3IC5cbiAgICBzbGlkZXIoKVxuICAgIGJsb2dTaWRlQmFyKCdhcnRpY2xlX19saXN0JywgJ2FydGljbGVfX2xpc3QtY2lyY2xlJyk7XG5cbiAgICBhZG1pbigpXG4gICAgLy8vLy8vL1xuICAgIGNvbnNvbGUubG9nKCdlbnRyeSBkb25lJyk7XG5cbn1cblxuXG4vLy8vLy8vLy8vZG9tcmVhZHkvLy8vLy8vLy8vLy8vXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8XG4gICAgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiICYmICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwpKSB7XG4gICAgZG9tcmVhZHkoKTtcbn0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZG9tcmVhZHkpO1xufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiaW1wb3J0IGlzU2Nyb2xsIGZyb20gJy4vaXNTY3JvbGwnO1xuaW1wb3J0IGNsaWNrVG9nZ2xlQ2xhc3MgZnJvbSAnLi9jbGlja1RvZ2dsZUNsYXNzJ1xubW9kdWxlLmV4cG9ydHMgPSAoYnV0dG9uQ2xhc3MsIHZpZXdDbGFzcykgPT4ge1xuICAgIC8vLy8vXG4gICAgbGV0IHZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHZpZXdDbGFzcyk7XG4gICAgaWYgKHZpZXcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIGZ1bGxNZW51Jyk7XG4gICAgICAgIGxldCBzY3JvbGxZZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBpc1Njcm9sbCh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNjcm9sbE5vID0gKCkgPT4ge1xuICAgICAgICAgICAgaXNTY3JvbGwoZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBjbGlja1RvZ2dsZUNsYXNzKHZpZXdDbGFzcywgYnV0dG9uQ2xhc3MsIHNjcm9sbE5vLCBzY3JvbGxZZXMpO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvZnVsbE1lbnUuanMiLCIvLyBpbXBvcnQgeW1hcHMgZnJvbSAneW1hcHMnXG52YXIgR29vZ2xlTWFwc0xvYWRlciA9IHJlcXVpcmUoJ2dvb2dsZS1tYXBzJyk7IC8vIG9ubHkgZm9yIGNvbW1vbiBqcyBlbnZpcm9ubWVudHMgXG5cbm1vZHVsZS5leHBvcnRzID0gKG1hcFNlbGVjdG9yKSA9PiB7XG4gIC8vLy8vLy8vLy9cbiAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBtYXBTZWxlY3Rvcik7XG4gIGlmIChlbCkge1xuICAgIGNvbnNvbGUubG9nKCdpbiBtYXBJbml0JylcbiAgICB2YXIgc2Fyb3YgPSB7XG4gICAgICBsYXQ6IDU0LjkzMTkxMSxcbiAgICAgIGxuZzogNDMuMzI3NjgzXG4gICAgfTtcbiAgICB2YXIgem9vbVZhbCA9IDE1O1xuXG4gICAgdmFyIHNjcmVlbldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICBpZiAoc2NyZWVuV2lkdGggPD0gMTAyNCkgem9vbVZhbCA9IDE0O1xuICAgIGlmIChzY3JlZW5XaWR0aCA8PSA0ODApIHpvb21WYWwgPSAxMztcblxuXG5cbiAgICBHb29nbGVNYXBzTG9hZGVyLktFWSA9ICdBSXphU3lCRVN3UGdzN2J6Ym9KMjRXc1VRcEpDM3piYVl4WWJSbjQnO1xuXG4gICAgR29vZ2xlTWFwc0xvYWRlci5sb2FkKGZ1bmN0aW9uIChnb29nbGUpIHtcbiAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsLCB7XG4gICAgICAgIHpvb206IHpvb21WYWwsXG4gICAgICAgIGNlbnRlcjogc2Fyb3YsXG4gICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZUlkOiAnc2F0ZWxsaXRlJ1xuICAgICAgICAvLyAgIHN0eWxlczogW1xuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZjVmNWY1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLmljb24nLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7dmlzaWJpbGl0eTogJ29mZid9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNjE2MTYxJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuc3Ryb2tlJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2Y1ZjVmNSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ2FkbWluaXN0cmF0aXZlLmxhbmRfcGFyY2VsJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjYmRiZGJkJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAnbWFuX21hZGUnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnkuc3Ryb2tlJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2JkYmRiZCd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNlZWVlZWUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdwb2knLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM3NTc1NzUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdwb2kucGFyaycsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNlNWU1ZTUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdwb2kucGFyaycsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzllOWU5ZSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZmZmZmZmJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5hcnRlcmlhbCcsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzc1NzU3NSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQuaGlnaHdheScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNkYWRhZGEnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmhpZ2h3YXknLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM2MTYxNjEnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmxvY2FsJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjOWU5ZTllJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAndHJhbnNpdC5saW5lJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2U1ZTVlNSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3RyYW5zaXQuc3RhdGlvbicsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNlZWVlZWUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICd3YXRlcicsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyMwMGJmYTUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICd3YXRlcicsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzllOWU5ZSd9XVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyBdXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvbWFwcy5qcyIsIihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG5cblx0aWYgKHJvb3QgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0dvb2dsZS1tYXBzIHBhY2thZ2UgY2FuIGJlIHVzZWQgb25seSBpbiBicm93c2VyJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3QuR29vZ2xlTWFwc0xvYWRlciA9IGZhY3RvcnkoKTtcblx0fVxuXG59KSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IG51bGwsIGZ1bmN0aW9uKCkge1xuXG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIGdvb2dsZVZlcnNpb24gPSAnMy4xOCc7XG5cblx0dmFyIHNjcmlwdCA9IG51bGw7XG5cblx0dmFyIGdvb2dsZSA9IG51bGw7XG5cblx0dmFyIGxvYWRpbmcgPSBmYWxzZTtcblxuXHR2YXIgY2FsbGJhY2tzID0gW107XG5cblx0dmFyIG9uTG9hZEV2ZW50cyA9IFtdO1xuXG5cdHZhciBvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IG51bGw7XG5cblxuXHR2YXIgR29vZ2xlTWFwc0xvYWRlciA9IHt9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5VUkwgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzJztcblxuXHRHb29nbGVNYXBzTG9hZGVyLktFWSA9IG51bGw7XG5cblx0R29vZ2xlTWFwc0xvYWRlci5MSUJSQVJJRVMgPSBbXTtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkNMSUVOVCA9IG51bGw7XG5cblx0R29vZ2xlTWFwc0xvYWRlci5DSEFOTkVMID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkxBTkdVQUdFID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLlJFR0lPTiA9IG51bGw7XG5cblx0R29vZ2xlTWFwc0xvYWRlci5WRVJTSU9OID0gZ29vZ2xlVmVyc2lvbjtcblxuXHRHb29nbGVNYXBzTG9hZGVyLldJTkRPV19DQUxMQkFDS19OQU1FID0gJ19fZ29vZ2xlX21hcHNfYXBpX3Byb3ZpZGVyX2luaXRpYWxpemF0b3JfXyc7XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLl9nb29nbGVNb2NrQXBpT2JqZWN0ID0ge307XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLmxvYWQgPSBmdW5jdGlvbihmbikge1xuXHRcdGlmIChnb29nbGUgPT09IG51bGwpIHtcblx0XHRcdGlmIChsb2FkaW5nID09PSB0cnVlKSB7XG5cdFx0XHRcdGlmIChmbikge1xuXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGZuKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9hZGluZyA9IHRydWU7XG5cblx0XHRcdFx0d2luZG93W0dvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUVdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmVhZHkoZm4pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChmbikge1xuXHRcdFx0Zm4oZ29vZ2xlKTtcblx0XHR9XG5cdH07XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLmNyZWF0ZUxvYWRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdFx0c2NyaXB0LnNyYyA9IEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlVXJsKCk7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cdH07XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLmlzTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGdvb2dsZSAhPT0gbnVsbDtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlVXJsID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHVybCA9IEdvb2dsZU1hcHNMb2FkZXIuVVJMO1xuXG5cdFx0dXJsICs9ICc/Y2FsbGJhY2s9JyArIEdvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUU7XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5LRVkpIHtcblx0XHRcdHVybCArPSAnJmtleT0nICsgR29vZ2xlTWFwc0xvYWRlci5LRVk7XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuTElCUkFSSUVTLmxlbmd0aCA+IDApIHtcblx0XHRcdHVybCArPSAnJmxpYnJhcmllcz0nICsgR29vZ2xlTWFwc0xvYWRlci5MSUJSQVJJRVMuam9pbignLCcpO1xuXHRcdH1cblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLkNMSUVOVCkge1xuXHRcdFx0dXJsICs9ICcmY2xpZW50PScgKyBHb29nbGVNYXBzTG9hZGVyLkNMSUVOVCArICcmdj0nICsgR29vZ2xlTWFwc0xvYWRlci5WRVJTSU9OO1xuXHRcdH1cblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwpIHtcblx0XHRcdHVybCArPSAnJmNoYW5uZWw9JyArIEdvb2dsZU1hcHNMb2FkZXIuQ0hBTk5FTDtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRSkge1xuXHRcdFx0dXJsICs9ICcmbGFuZ3VhZ2U9JyArIEdvb2dsZU1hcHNMb2FkZXIuTEFOR1VBR0U7XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuUkVHSU9OKSB7XG5cdFx0XHR1cmwgKz0gJyZyZWdpb249JyArIEdvb2dsZU1hcHNMb2FkZXIuUkVHSU9OO1xuXHRcdH1cblxuXHRcdHJldHVybiB1cmw7XG5cdH07XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLnJlbGVhc2UgPSBmdW5jdGlvbihmbikge1xuXHRcdHZhciByZWxlYXNlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLktFWSA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUyA9IFtdO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5DTElFTlQgPSBudWxsO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5DSEFOTkVMID0gbnVsbDtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuTEFOR1VBR0UgPSBudWxsO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5SRUdJT04gPSBudWxsO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5WRVJTSU9OID0gZ29vZ2xlVmVyc2lvbjtcblxuXHRcdFx0Z29vZ2xlID0gbnVsbDtcblx0XHRcdGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0b25Mb2FkRXZlbnRzID0gW107XG5cblx0XHRcdGlmICh0eXBlb2Ygd2luZG93Lmdvb2dsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0ZGVsZXRlIHdpbmRvdy5nb29nbGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2Ygd2luZG93W0dvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUVdICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRkZWxldGUgd2luZG93W0dvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUVdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3JpZ2luYWxDcmVhdGVMb2FkZXJNZXRob2QgIT09IG51bGwpIHtcblx0XHRcdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIgPSBvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZDtcblx0XHRcdFx0b3JpZ2luYWxDcmVhdGVMb2FkZXJNZXRob2QgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc2NyaXB0ICE9PSBudWxsKSB7XG5cdFx0XHRcdHNjcmlwdC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0XHRcdHNjcmlwdCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmbikge1xuXHRcdFx0XHRmbigpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpZiAobG9hZGluZykge1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5sb2FkKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZWxlYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsZWFzZSgpO1xuXHRcdH1cblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIub25Mb2FkID0gZnVuY3Rpb24oZm4pIHtcblx0XHRvbkxvYWRFdmVudHMucHVzaChmbik7XG5cdH07XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLm1ha2VNb2NrID0gZnVuY3Rpb24oKSB7XG5cdFx0b3JpZ2luYWxDcmVhdGVMb2FkZXJNZXRob2QgPSBHb29nbGVNYXBzTG9hZGVyLmNyZWF0ZUxvYWRlcjtcblxuXHRcdEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR3aW5kb3cuZ29vZ2xlID0gR29vZ2xlTWFwc0xvYWRlci5fZ29vZ2xlTW9ja0FwaU9iamVjdDtcblx0XHRcdHdpbmRvd1tHb29nbGVNYXBzTG9hZGVyLldJTkRPV19DQUxMQkFDS19OQU1FXSgpO1xuXHRcdH07XG5cdH07XG5cblxuXHR2YXIgcmVhZHkgPSBmdW5jdGlvbihmbikge1xuXHRcdHZhciBpO1xuXG5cdFx0bG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0aWYgKGdvb2dsZSA9PT0gbnVsbCkge1xuXHRcdFx0Z29vZ2xlID0gd2luZG93Lmdvb2dsZTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgb25Mb2FkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRvbkxvYWRFdmVudHNbaV0oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRpZiAoZm4pIHtcblx0XHRcdGZuKGdvb2dsZSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2FsbGJhY2tzW2ldKGdvb2dsZSk7XG5cdFx0fVxuXG5cdFx0Y2FsbGJhY2tzID0gW107XG5cdH07XG5cblxuXHRyZXR1cm4gR29vZ2xlTWFwc0xvYWRlcjtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nb29nbGUtbWFwcy9saWIvR29vZ2xlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKGxvZ2luQnV0dG9uLCBtYWluQnV0dG9uLCBmbGlwQ29udGFpbmVyKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgbGV0IGZsaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGZsaXBDb250YWluZXIpO1xuICAgIGxldCBsb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgbG9naW5CdXR0b24pO1xuICAgIGxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBtYWluQnV0dG9uKTtcbiAgICBpZiAoZmxpcCAmJiBsb2dpbiAmJiBtYWluKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBmbGlwTG9naW5Gb3JtJyk7XG4gICAgICAgIGxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZmxpcC5jbGFzc0xpc3QuYWRkKGZsaXBDb250YWluZXIgKyAnLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIGxvZ2luLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICBsb2dpbi5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIH0pO1xuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZmxpcC5jbGFzc0xpc3QucmVtb3ZlKGZsaXBDb250YWluZXIgKyAnLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIGxvZ2luLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBsb2dpbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvZmxpcExvZ2luRm9ybS5qcyIsIi8vLy/QkNC90LjQvNCw0YbQuNGPIHN2ZyDQutC+0LvQtdGGINC00LvRjyDRjdC70LXQvNC10L3RgtC+0LIgJ9GB0LrQuNC70YsnXG5pbXBvcnQgZG9GbkVsZW1WaXNpYmxlIGZyb20gJy4vZG9GbkVsZW1WaXNpYmxlJ1xubW9kdWxlLmV4cG9ydHMgPSAoY29udGFpbmVyLCBiYXIsIGF0dHIpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vL1xuICAgIGxldCBza2lsbCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGNvbnRhaW5lcildOyAvL9C/0L7Qu9GD0YfQtdC90LjQtSDQstGB0LXRhSDQvtCx0LXRgNGC0L7QuiDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBkYXRhLXBjdFxuICAgIGxldCBzdmdDaXJjbGVzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgYmFyKV07IC8v0L/QvtC70YPRh9C10L3QuNC1INCy0YHQtdGFINC60L7Qu9C10YZcbiAgICBsZXQgcGVyY2VudCA9IFtdOyAvLyDQvNCw0YHRgdC40LIg0LfQvdCw0YfQtdC90LjQuSDQstC30Y/RgtGL0YUg0LjQtyBodG1sINC60L7QtNCwIC0g0LrQvtGC0L7RgNGL0LUg0YLRg9C00LAg0LHRi9C70Lgg0LLRgdGC0LDQstC70LXQvdGLINC40Lcg0LDQtNC80LjQvdC60Lgg0YfQtdGA0LXQtyBiYWNrZW5kXG4gICAgbGV0IGN1cnJlbnRDaXJjbGU7IC8v0LrQvtC90YLQtdC50L3QtdGAINC00LvRjyDQvtGC0LXQu9GM0L3QvtCz0L4g0LrQvtC70YzRhtCwXG4gICAgLy/RgdC+0LHRi9GC0LjQtSwg0LrQvtGC0L7RgNC+0LUg0L/RgNC40YHQstCw0LjQstCw0LXRgiDQt9C90LDRh9C10L3QuNC1INC60L7Qu9GM0YbQsNC8XG4gICAgbGV0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBza2lsbC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBwZXJjZW50W2ldID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoYXR0cikpOyAvL9C/0L7Qu9GD0YfQuNC70Lgg0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7RhtC10L3RgtC+0LIg0Lgg0L/QtdGA0LXQstC10LvQuCDQsiBudW1iZXJcbiAgICAgICAgICAgIGN1cnJlbnRDaXJjbGUgPSBpdGVtLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYmFyKTsgLy/QstGL0LHRgNCw0LvQuCDQutC+0LvRjNGG0L4g0LjQtyDRgtC10LrRg9GJ0LXQuSDQvtCx0LXRgNGC0LrQuFxuICAgICAgICAgICAgY3VycmVudENpcmNsZVswXS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gKCgxMDAgLSBwZXJjZW50W2ldKSAvIDEwMCkgKiBNYXRoLlBJICogMTgwOyAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQvdC40LUg0YLQtdC60YPRidC10LzRgyDQutC+0LvRjNGG0YMg0LfQvdCw0YfQtdC90LjRjyDQv9C10YDQtdCy0LXQtNC10L3QvdC+0LzRgyDQtNC70Y8g0YHQv9C10YYg0YHQstC+0LnRgdGC0LLQsCBzdmcg0LjQtyDQv9GA0L7RhtC10L3RgtC+0LJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHNraWxsICYmIHN2Z0NpcmNsZXMpIHtcbiAgICAgICAgLy/QvtCx0L3Rg9C70LXQvdC40LUg0LfQvdCw0YfQtdC90LjQuSDQstC+INCy0YHQtdGFINC60L7Qu9GM0YbQsNGFXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBza2lsbFByb2dncmVzc0luaXQnKVxuICAgICAgICBzdmdDaXJjbGVzLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBpLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBNYXRoLlBJICogMTgwO1xuICAgICAgICB9KVxuICAgICAgICAvLyBkb0ZuRWxlbVZpc2libGUoJ3NraWxscycsIGhhbmRsZUNsaWNrKTtcbiAgICAgICAgZG9GbkVsZW1WaXNpYmxlKHtcbiAgICAgICAgICAgIGVsZW1DbGFzczogJ3NraWxscycsXG4gICAgICAgICAgICBmbjogaGFuZGxlQ2xpY2tcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL3NraWxsUHJvZ3Jlc3NJbml0LmpzIiwiaW1wb3J0IGNsaWNrVG9nZ2xlQ2xhc3MgZnJvbSAnLi9jbGlja1RvZ2dsZUNsYXNzJ1xuaW1wb3J0IGRvRm5FbGVtVmlzaWJsZSBmcm9tICcuL2RvRm5FbGVtVmlzaWJsZSdcbmltcG9ydCBqdW1wIGZyb20gJ2p1bXAuanMnXG5pbXBvcnQgbW92ZVNpZGVCYXIgZnJvbSAnLi9tb3ZlU2lkZUJhcidcbmltcG9ydCBhY3RpdmF0ZVNpZGVCYXJMaW5rIGZyb20gJy4vYWN0aXZhdGVTaWRlQmFyTGluaydcblxubW9kdWxlLmV4cG9ydHMgPSAoc2lkZUJhckNsYXNzLCBidXR0b25DbGFzcykgPT4ge1xuICAgIC8vLy8vLy8vLy8vL1xuICAgIGxldCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBzaWRlQmFyQ2xhc3MpXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYnV0dG9uQ2xhc3MpXG4gICAgbGV0IHRvdWNoRXZlbnQgPSAoKSA9PiB7XG4gICAgICAgIHZhciBpbml0aWFsUG9pbnQ7XG4gICAgICAgIHZhciBmaW5hbFBvaW50O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBpbml0aWFsUG9pbnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZmluYWxQb2ludCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgdmFyIHhBYnMgPSBNYXRoLmFicyhpbml0aWFsUG9pbnQucGFnZVggLSBmaW5hbFBvaW50LnBhZ2VYKTtcbiAgICAgICAgICAgIHZhciB5QWJzID0gTWF0aC5hYnMoaW5pdGlhbFBvaW50LnBhZ2VZIC0gZmluYWxQb2ludC5wYWdlWSk7XG4gICAgICAgICAgICBpZiAoeEFicyA+IDIwIHx8IHlBYnMgPiAyMCkge1xuICAgICAgICAgICAgICAgIGlmICh4QWJzID4geUFicykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb2ludC5wYWdlWCA8IGluaXRpYWxQb2ludC5wYWdlWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyrQodCS0JDQmdCfINCS0JvQldCS0J4qL1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZUJhci5jbGFzc0xpc3QucmVtb3ZlKHNpZGVCYXJDbGFzcyArICctLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKtCh0JLQkNCZ0J8g0JLQn9Cg0JDQktCeKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZChzaWRlQmFyQ2xhc3MgKyAnLS1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9pbnQucGFnZVkgPCBpbml0aWFsUG9pbnQucGFnZVkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0KHQktCQ0JnQnyDQktCS0JXQoNClKi9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0KHQktCQ0JnQnyDQktCd0JjQlyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgbGV0IHNpZGVCYXJKdW1wRm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBzaWRlQmFySnVtcEZuJylcbiAgICAgICAgc2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhcmdldExpbmsgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAvLyB0YXJnZXRMaW5rLmNoaWxkcmVuKCcuYXJ0aWNsZXNfX2l0ZW0nKS5jbGFzc0xpc3QuYWRkKCdhcnRpY2xlc19faXRlbS0tYWN0aXZlJylcbiAgICAgICAgICAgIGxldCBhbmNob3JOdW0gPSB0YXJnZXRMaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgaWYgKGFuY2hvck51bSkge1xuICAgICAgICAgICAgICAgIGFuY2hvck51bSA9IGFuY2hvck51bS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcnRpY2xlJyArIGFuY2hvck51bSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEFydGljbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldEFydGljbGU7XG4gICAgICAgICAgICAgICAgICAgIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoID49IDEwMjUpID8gb2Zmc2V0QXJ0aWNsZSA9IC01MCA6IG9mZnNldEFydGljbGUgPSAtMjBcbiAgICAgICAgICAgICAgICAgICAganVtcCgnI2FydGljbGUnICsgYW5jaG9yTnVtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0QXJ0aWNsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IGVhc2VJbk91dFF1YWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhMTF5OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoc2lkZUJhckNsYXNzICsgJy0tYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIGlmIChzaWRlQmFyICYmIGJ1dHRvbikge1xuICAgICAgICAvLy8vLy8vLy8vLy9cbiAgICAgICAgY29uc29sZS5sb2coJ2luIGJsb2dTaWRlQmFyJylcbiAgICAgICAgYWN0aXZhdGVTaWRlQmFyTGluaygpO1xuICAgICAgICBsZXQgc3RhcnRMZWZ0UG9zID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYnV0dG9uKS5sZWZ0O1xuICAgICAgICBidXR0b24uc3R5bGUubGVmdCA9IC0xMDAgKyAncHgnO1xuXG4gICAgICAgIGxldCBzaWRlQmFyVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5sZWZ0ID0gc3RhcnRMZWZ0UG9zO1xuICAgICAgICAgICAgdG91Y2hFdmVudCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWNrVG9nZ2xlQ2xhc3Moc2lkZUJhckNsYXNzLCBidXR0b25DbGFzcyk7XG4gICAgICAgIHNpZGVCYXJKdW1wRm4oKTtcblxuICAgICAgICBhY3RpdmF0ZVNpZGVCYXJMaW5rKCk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPD0gMTAyNClcbiAgICAgICAgICAgIGRvRm5FbGVtVmlzaWJsZSh7XG4gICAgICAgICAgICAgICAgZWxlbUNsYXNzOiAnYXJ0aWNsZXMnLFxuICAgICAgICAgICAgICAgIGZuOiBzaWRlQmFyVmlzaWJsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1vdmVTaWRlQmFyKHNpZGVCYXIpXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGFjdGl2YXRlU2lkZUJhckxpbmsoKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPD0gMTAyNCkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5sZWZ0ID0gLTMwICsgJ3B4JztcbiAgICAgICAgICAgICAgICBzaWRlQmFyLnN0eWxlLnRvcCA9IC01ICsgJ3ZoJztcblxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQoKVxuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgbW92ZVNpZGVCYXIoc2lkZUJhcilcblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vLy8vLy8vLy8vL1xuXG4gICAgfVxuXG4gICAgY29uc3QgZWFzZUluT3V0UXVhZCA9ICh0LCBiLCBjLCBkKSA9PiB7XG4gICAgICAgIHQgLz0gZCAvIDJcbiAgICAgICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGJcbiAgICAgICAgdC0tXG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGJcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vXG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvYmxvZ1NpZGVCYXIuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gKHNpZGVCYXJFbGVtKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnNvbGUubG9nKCdpbiBtb3ZlU2lkZUJhcicpXG4gICAgICAgICAgICBsZXQgc2lkZUJhck9mZnNldCA9IHNpZGVCYXJFbGVtLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGxldCBzaWRlQmFyUG9zID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2lkZUJhckVsZW0pLnBvc2l0aW9uO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsVG9wRG9jID0gd2luZG93LnNjcm9sbFkgKyAxMDA7XG4gICAgICAgICAgICAgICAgbGV0IG1vdmVTaWRlQmFyVmFsID0gc2Nyb2xsVG9wRG9jIC0gc2lkZUJhck9mZnNldDtcblxuICAgICAgICAgICAgICAgIGlmIChtb3ZlU2lkZUJhclZhbCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZGVCYXJFbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2lkZUJhckVsZW0uc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL21vdmVTaWRlQmFyLmpzIiwiaW1wb3J0IGRvRm5FbGVtVmlzaWJsZSBmcm9tICcuL2RvRm5FbGVtVmlzaWJsZSdcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICAgIC8vLy8vLy8vLy8vXG4gICAgY29uc29sZS5sb2coJ2luIGFjdGl2YXRlU2lkZUJhckxpbmsnKTtcbiAgICBsZXQgc2lkZUJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFydGljbGVfX2l0ZW0nKTtcbiAgICBsZXQgYXJ0aWNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJ0aWNsZScpO1xuICAgIGxldCBzaWRlQmFyTGlua3MgPSBbXTtcbiAgICBsZXQgb2Zmc2V0QXJ0aWNsZXMgPSBbXTtcblxuICAgIHNpZGVCYXJJdGVtcy5mb3JFYWNoKHNpZGVCYXJMaW5rID0+IHtcbiAgICAgICAgc2lkZUJhckxpbmtzLnB1c2goc2lkZUJhckxpbmspO1xuICAgIH0pO1xuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCBzaWRlQmFyTGlua3MubGVuZ3RoOyBpKyspe1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhzaWRlQmFyTGlua3NbaV0pXG4gICAgLy8gfVxuICAgIGFydGljbGVzLmZvckVhY2goYXJ0aWNsZSA9PiB7XG4gICAgICAgIG9mZnNldEFydGljbGVzLnB1c2goYXJ0aWNsZS5vZmZzZXRUb3ApO1xuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWRlQmFyTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ9CyINGG0LjQutC70LUnKVxuICAgICAgICB2YXIgZnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2lkZUJhckxpbmtzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgc2lkZUJhckxpbmtzW2pdLmNsYXNzTGlzdC5yZW1vdmUoJ2FydGljbGVfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaWRlQmFyTGlua3NbaV0uY2xhc3NMaXN0LmFkZCgnYXJ0aWNsZV9faXRlbS0tYWN0aXZlJylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGkrMSlcbiAgICAgICAgfVxuICAgICAgICBkb0ZuRWxlbVZpc2libGUoe1xuICAgICAgICAgICAgZWxlbUNsYXNzOiAnYXJ0aWNsZScgKyAoaSArIDEpLFxuICAgICAgICAgICAgZm46IGZ1bmMsXG4gICAgICAgICAgICBkaXZpZGVyOiAzLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9hY3RpdmF0ZVNpZGVCYXJMaW5rLmpzIiwiIWZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kID8gLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlIHVubGVzcyBhbWRNb2R1bGVJZCBpcyBzZXRcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcm9vdC5zdmc0ZXZlcnlib2R5ID0gZmFjdG9yeSgpO1xuICAgIH0pIDogXCJvYmplY3RcIiA9PSB0eXBlb2YgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzID8gLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDogcm9vdC5zdmc0ZXZlcnlib2R5ID0gZmFjdG9yeSgpO1xufSh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAvKiEgc3ZnNGV2ZXJ5Ym9keSB2Mi4xLjkgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvc3ZnNGV2ZXJ5Ym9keSAqL1xuICAgIGZ1bmN0aW9uIGVtYmVkKHBhcmVudCwgc3ZnLCB0YXJnZXQpIHtcbiAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgdG8gaG9sZCB0aGUgY29udGVudHMgb2YgdGhlIHRhcmdldFxuICAgICAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLCB2aWV3Qm94ID0gIXN2Zy5oYXNBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpO1xuICAgICAgICAgICAgLy8gY29uZGl0aW9uYWxseSBzZXQgdGhlIHZpZXdCb3ggb24gdGhlIHN2Z1xuICAgICAgICAgICAgdmlld0JveCAmJiBzdmcuc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCB2aWV3Qm94KTtcbiAgICAgICAgICAgIC8vIGNvcHkgdGhlIGNvbnRlbnRzIG9mIHRoZSBjbG9uZSBpbnRvIHRoZSBmcmFnbWVudFxuICAgICAgICAgICAgZm9yICgvLyBjbG9uZSB0aGUgdGFyZ2V0XG4gICAgICAgICAgICB2YXIgY2xvbmUgPSB0YXJnZXQuY2xvbmVOb2RlKCEwKTsgY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGg7ICkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNsb25lLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBmcmFnbWVudCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyKSB7XG4gICAgICAgIC8vIGxpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSByZXF1ZXN0XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSByZXF1ZXN0IGlzIHJlYWR5XG4gICAgICAgICAgICBpZiAoNCA9PT0geGhyLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCBodG1sIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgdmFyIGNhY2hlZERvY3VtZW50ID0geGhyLl9jYWNoZWREb2N1bWVudDtcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGNhY2hlZCBodG1sIGRvY3VtZW50IGJhc2VkIG9uIHRoZSB4aHIgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjYWNoZWREb2N1bWVudCB8fCAoY2FjaGVkRG9jdW1lbnQgPSB4aHIuX2NhY2hlZERvY3VtZW50ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwiXCIpLCBcbiAgICAgICAgICAgICAgICBjYWNoZWREb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IHhoci5yZXNwb25zZVRleHQsIHhoci5fY2FjaGVkVGFyZ2V0ID0ge30pLCAvLyBjbGVhciB0aGUgeGhyIGVtYmVkcyBsaXN0IGFuZCBlbWJlZCBlYWNoIGl0ZW1cbiAgICAgICAgICAgICAgICB4aHIuX2VtYmVkcy5zcGxpY2UoMCkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSB4aHIuX2NhY2hlZFRhcmdldFtpdGVtLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCB8fCAodGFyZ2V0ID0geGhyLl9jYWNoZWRUYXJnZXRbaXRlbS5pZF0gPSBjYWNoZWREb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmlkKSksIFxuICAgICAgICAgICAgICAgICAgICAvLyBlbWJlZCB0aGUgdGFyZ2V0IGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICAgICAgICBlbWJlZChpdGVtLnBhcmVudCwgaXRlbS5zdmcsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIC8vIHRlc3QgdGhlIHJlYWR5IHN0YXRlIGNoYW5nZSBpbW1lZGlhdGVseVxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN2ZzRldmVyeWJvZHkocmF3b3B0cykge1xuICAgICAgICBmdW5jdGlvbiBvbmludGVydmFsKCkge1xuICAgICAgICAgICAgLy8gd2hpbGUgdGhlIGluZGV4IGV4aXN0cyBpbiB0aGUgbGl2ZSA8dXNlPiBjb2xsZWN0aW9uXG4gICAgICAgICAgICBmb3IgKC8vIGdldCB0aGUgY2FjaGVkIDx1c2U+IGluZGV4XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwOyBpbmRleCA8IHVzZXMubGVuZ3RoOyApIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgPHVzZT5cbiAgICAgICAgICAgICAgICB2YXIgdXNlID0gdXNlc1tpbmRleF0sIHBhcmVudCA9IHVzZS5wYXJlbnROb2RlLCBzdmcgPSBnZXRTVkdBbmNlc3RvcihwYXJlbnQpLCBzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiKSB8fCB1c2UuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXNyYyAmJiBvcHRzLmF0dHJpYnV0ZU5hbWUgJiYgKHNyYyA9IHVzZS5nZXRBdHRyaWJ1dGUob3B0cy5hdHRyaWJ1dGVOYW1lKSksIFxuICAgICAgICAgICAgICAgIHN2ZyAmJiBzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvbHlmaWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMudmFsaWRhdGUgfHwgb3B0cy52YWxpZGF0ZShzcmMsIHN2ZywgdXNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgPHVzZT4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZCh1c2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIHRoZSBzcmMgYW5kIGdldCB0aGUgdXJsIGFuZCBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcmNTcGxpdCA9IHNyYy5zcGxpdChcIiNcIiksIHVybCA9IHNyY1NwbGl0LnNoaWZ0KCksIGlkID0gc3JjU3BsaXQuam9pbihcIiNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmsgaXMgZXh0ZXJuYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXJsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCB4aHIgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeGhyID0gcmVxdWVzdHNbdXJsXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSB4aHIgcmVxdWVzdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyIHx8ICh4aHIgPSByZXF1ZXN0c1t1cmxdID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHhoci5vcGVuKFwiR0VUXCIsIHVybCksIHhoci5zZW5kKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuX2VtYmVkcyA9IFtdKSwgLy8gYWRkIHRoZSBzdmcgYW5kIGlkIGFzIGFuIGl0ZW0gdG8gdGhlIHhociBlbWJlZHMgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuX2VtYmVkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ZnOiBzdmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIC8vIHByZXBhcmUgdGhlIHhociByZWFkeSBzdGF0ZSBjaGFuZ2UgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbWJlZCB0aGUgbG9jYWwgaWQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkKHBhcmVudCwgc3ZnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGluZGV4IHdoZW4gdGhlIHByZXZpb3VzIHZhbHVlIHdhcyBub3QgXCJ2YWxpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKytpbmRleCwgKytudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgKytpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb250aW51ZSB0aGUgaW50ZXJ2YWxcbiAgICAgICAgICAgICghdXNlcy5sZW5ndGggfHwgdXNlcy5sZW5ndGggLSBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPiAwKSAmJiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUob25pbnRlcnZhbCwgNjcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwb2x5ZmlsbCwgb3B0cyA9IE9iamVjdChyYXdvcHRzKSwgbmV3ZXJJRVVBID0gL1xcYlRyaWRlbnRcXC9bNTY3XVxcYnxcXGJNU0lFICg/Ojl8MTApXFwuMFxcYi8sIHdlYmtpdFVBID0gL1xcYkFwcGxlV2ViS2l0XFwvKFxcZCspXFxiLywgb2xkZXJFZGdlVUEgPSAvXFxiRWRnZVxcLzEyXFwuKFxcZCspXFxiLywgZWRnZVVBID0gL1xcYkVkZ2VcXC8uKFxcZCspXFxiLywgaW5JZnJhbWUgPSB3aW5kb3cudG9wICE9PSB3aW5kb3cuc2VsZjtcbiAgICAgICAgcG9seWZpbGwgPSBcInBvbHlmaWxsXCIgaW4gb3B0cyA/IG9wdHMucG9seWZpbGwgOiBuZXdlcklFVUEudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChvbGRlckVkZ2VVQSkgfHwgW10pWzFdIDwgMTA1NDcgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2god2Via2l0VUEpIHx8IFtdKVsxXSA8IDUzNyB8fCBlZGdlVUEudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiBpbklmcmFtZTtcbiAgICAgICAgLy8gY3JlYXRlIHhociByZXF1ZXN0cyBvYmplY3RcbiAgICAgICAgdmFyIHJlcXVlc3RzID0ge30sIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dCwgdXNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidXNlXCIpLCBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPSAwO1xuICAgICAgICAvLyBjb25kaXRpb25hbGx5IHN0YXJ0IHRoZSBpbnRlcnZhbCBpZiB0aGUgcG9seWZpbGwgaXMgYWN0aXZlXG4gICAgICAgIHBvbHlmaWxsICYmIG9uaW50ZXJ2YWwoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U1ZHQW5jZXN0b3Iobm9kZSkge1xuICAgICAgICBmb3IgKHZhciBzdmcgPSBub2RlOyBcInN2Z1wiICE9PSBzdmcubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAmJiAoc3ZnID0gc3ZnLnBhcmVudE5vZGUpOyApIHt9XG4gICAgICAgIHJldHVybiBzdmc7XG4gICAgfVxuICAgIHJldHVybiBzdmc0ZXZlcnlib2R5O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3ZnNGV2ZXJ5Ym9keS9kaXN0L3N2ZzRldmVyeWJvZHkuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIGxldCBmbiA9IChmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJnV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19iZy1pbWcnKS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgcG9zTGVmdCA9IC1mb3JtQ29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIHBvc1RvcCA9IC1mb3JtQ29udGFpbmVyLm9mZnNldFRvcCxcbiAgICAgICAgICAgICAgICAgICAgYmx1ckNTUyA9IGZvcm1CbHVyLnN0eWxlXG4gICAgICAgICAgICAgICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSAoYmdXaWR0aC0oYmdXaWR0aCowLjA4MzMpKSArICdweCcgKyAnICcgKyAnYXV0bydcbiAgICAgICAgICAgICAgICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSAocG9zTGVmdC1wb3NMZWZ0KjAuMTA5KSArICdweCcgKyAnICcgKyAocG9zVG9wLXBvc1RvcCowLjExNzgpICsgJ3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSgpKTtcblxuICAgIGxldCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcbiAgICBsZXQgZm9ybUJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYmx1cicpO1xuICAgIGlmKGZvcm1Db250YWluZXIgJiYgZm9ybUJsdXIpe1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gYmx1ckZvcm0nKVxuICAgICAgICBmbi5zZXQoKTtcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGZuLnNldCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2JsdXJGb3JtLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKTtcbiAgICBpZihwYXJhbGxheENvbnRhaW5lcil7XG4gICAgICAgIGxldCBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUxheWVycyk7XG4gICAgfSBcbiAgICBjb25zdCBtb3ZlTGF5ZXJzID0gZXZlbnQgPT4ge1xuICAgICAgICBsZXQgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIGV2ZW50LnBhZ2VYO1xuICAgICAgICBsZXQgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBldmVudC5wYWdlWTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGxldCBsYXllciBvZiBsYXllcnMpIHtcbiAgICAgICAgICAgIGxldCBkaXZpZGVyID0gaSAvIDgwLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIGltYWdlID0gbGF5ZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LnBhZ2VZPD13aW5kb3cuaW5uZXJIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBwb3NpdGlvblggKyAncHgsICcgKyBwb3NpdGlvblkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0gIFxuICAgIH07XG4gICAgXG4gICAgLy8vLy8vLy8vLy8vLy8vLy9cblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9wYXJhbGxheE1vdW50YWlucy5qcyIsImltcG9ydCBqdW1wIGZyb20gJ2p1bXAuanMnXG5cbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbkNsYXNzLCB0b0NsYXNzLCBvZmZzZXRWYWwpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vL1xuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJytidXR0b25DbGFzcyk7XG4gICAgb2Zmc2V0VmFsID0gb2Zmc2V0VmFsIHx8IDBcbiAgICBpZihidXR0b24pe1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gc21vdGhTY3JvbGxBcnJvdycpXG5cbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAganVtcCgnLicrdG9DbGFzcywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0VmFsLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgZWFzaW5nOiBlYXNlSW5PdXRRdWFkLFxuICAgICAgICAgICAgICAgIGExMXk6IGZhbHNlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBlYXNlSW5PdXRRdWFkID0gKHQsIGIsIGMsIGQpID0+IHtcbiAgICAgICAgdCAvPSBkIC8gMlxuICAgICAgICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYlxuICAgICAgICB0LS1cbiAgICAgICAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYlxuICAgICAgfVxuXG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvc21vdGhTY3JvbGxDbGljay5qcyIsImltcG9ydCB7IHNldFRpbWVvdXQgfSBmcm9tIFwidGltZXJzXCI7XG5pbXBvcnQgaXNTY3JvbGwgZnJvbSAnLi9pc1Njcm9sbC5qcydcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2luIGFuaW1hdGVQcmVsb2FkZXInKVxuXG4gICAgY29uc3QgcHJlbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpXG4gICAgY29uc3QgcHJlbG9hZGVyU3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fc3ZnJyk7XG5cbiAgICBjb25zdCBjaXJjbGVPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyX19jaXJjbGUtb25lJyk7XG4gICAgY29uc3QgY2lyY2xlVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fY2lyY2xlLXR3bycpO1xuICAgIGNvbnN0IGNpcmNsZVRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fY2lyY2xlLXRocmVlJyk7XG4gICAgY29uc3QgcHJlbG9hZGVyVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXJfX3RleHQnKVxuICAgIGxldCBjdXJyZW50UGVyY2VudCA9IDA7XG5cbiAgICBsZXQgZGVsYXlPZkNpcmNsZU9uZSA9IDMwXG4gICAgbGV0IGRlbGF5T2ZDaXJjbGVUd28gPSAyMFxuICAgIFxuICAgIGxldCBhbmltYXRlSW50ZXJ2YWw7XG5cbiAgICBcblxuICAgIGxldCBhbmltYXRlUHJlbG9hZGVyID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY3VycmVudFBlcmNlbnQgKz0gNSAvLyDQuNC30LzQtdC90Y/QtdGC0YHRjyDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0LfQsNCz0YDRg9C30LrQuCDQutCw0YDRgtC40L3QvtC6XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQZXJjZW50ID49IDEwMCkge1xuICAgICAgICAgICAgcHJlbG9hZGVyVGV4dC5pbm5lckhUTUwgPSAxMDBcbiAgICAgICAgICAgIGN1cnJlbnRQZXJjZW50ID0gMTAwO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhbmltYXRlSW50ZXJ2YWwpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyU3ZnLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyVGV4dC5zdHlsZS5vcGFjaXR5ID0gMFxuICAgICAgICAgICAgfSw1MDApXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICBpc1Njcm9sbCh0cnVlKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXhpdCBwcmVsb2FkZXInKVxuICAgICAgICAgICAgICAgIH0sMTUwMClcbiAgICAgICAgICAgIH0sMTAwMClcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBlcmNlbnQgPiBkZWxheU9mQ2lyY2xlT25lKSB7XG4gICAgICAgICAgICBjaXJjbGVPbmUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IDQ0MCAtICg0NDAgLyAxMDAgKiAoY3VycmVudFBlcmNlbnQgKiAoZGVsYXlPZkNpcmNsZU9uZSAvIDEwMCArIDEpIC0gZGVsYXlPZkNpcmNsZU9uZSkpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRQZXJjZW50ID4gZGVsYXlPZkNpcmNsZVR3bykge1xuICAgICAgICAgICAgY2lyY2xlVHdvLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSAzNTAgLSAoMzUwIC8gMTAwICogKGN1cnJlbnRQZXJjZW50ICogKGRlbGF5T2ZDaXJjbGVUd28gLyAxMDAgKyAxKSAtIGRlbGF5T2ZDaXJjbGVUd28pKVxuICAgICAgICB9XG4gICAgICAgIGNpcmNsZVRocmVlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSAyNjAgLSAoMjYwIC8gMTAwICogY3VycmVudFBlcmNlbnQpXG4gICAgICAgIHByZWxvYWRlclRleHQuaW5uZXJIVE1MID0gY3VycmVudFBlcmNlbnRcbiAgICB9XG5cbiAgICBpZihwcmVsb2FkZXJTdmcpe1xuICAgICAgICBpc1Njcm9sbChmYWxzZSlcbiAgICAgICAgYW5pbWF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoYW5pbWF0ZVByZWxvYWRlciwgMTAwKVxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2FuaW1hdGVQcmVsb2FkZXIuanMiLCJ2YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG5cbiAgICBsZXQgbnYgPSBuZXcgVnVlKHtcbiAgICAgICAgZWw6ICcuYXBwJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGU6ICdIZWxsbyBWdWUnXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9hZG1pbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICAgIGxldCBzbGlkZXJCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzbGlkZXInKVxuICAgIGxldCBjdXJyZW50U2xpZGVySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX2N1cnJlbnQtaW1nJylcblxuICAgIGxldCBzbGlkZXJJbml0ID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICAgICBsZXQgd29ya051bSA9IDA7XG4gICAgICAgIGxldCBzbGlkZXIgPSBuZXcgVnVlKHtcbiAgICAgICAgICAgIGVsOiAnI3NsaWRlcicsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc2hvd0N1cnJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd05leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd1ByZXZpb3VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdvcmtzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQodCw0LnRgiDRiNC60L7Qu9GLINC+0L3Qu9Cw0LnQvSDQvtCx0YDQsNC30L7QstCw0L3QuNGPJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlY2g6ICdIVE1MLCBDU1MsIEphdmFzY3JpcHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJ2h0dHBzOi8vbG9mdHNjaG9vbC5jb20nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua1RleHQ6ICfQn9C+0YHQvNC+0YLRgNC10YLRjCDRgdCw0LnRgicsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWc6ICdpbWcvd29yay0xLnBuZydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQodGC0LDRgtC40YfQvdGL0Lkg0YHQsNC50YInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVjaDogJ0hUTUwsIENTUycsXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rVGV4dDogJ9CX0LDRhtC10L3QuNGC0YwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nOiAnaW1nL3dvcmstMi5wbmcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0JvRjdC90LTQuNC90LMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVjaDogJ0hUTUwsIENTUywgSmF2YXNjcmlwdNCxIGpRdWVyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rVGV4dDogJ9CS0LrRg9GB0LjRgtGMJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogJ2ltZy93b3JrLTMucG5nJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Ch0LDQudGCLdCy0LjQt9C40YLQutCwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlY2g6ICdIVE1MLCBDU1MsIEphdmFzY3JpcHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua1RleHQ6ICfQmNC30YPQvNC40YLRjNGB0Y8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nOiAnbG9yZW1HaWYuZ2lmJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdDoge30sXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQcm9qZWN0OiB7fSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1Byb2plY3QyOiB7fSxcbiAgICAgICAgICAgICAgICBuZXh0UHJvamVjdDoge30sXG4gICAgICAgICAgICAgICAgbmV4dFByb2plY3QyOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgICAgICBuZXh0cHJvamVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAod29ya051bSA8IHRoaXMud29ya3MubGVuZ3RoIC0gMSkgPyB3b3JrTnVtKysgOiB3b3JrTnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5nZU5leHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VPdGhlcnMod29ya051bSwgdGhpcyk7IFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDdXJyZW50ID0gIXRoaXMuc2hvd0N1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0ID0gIXRoaXMuc2hvd05leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQcmV2aW91cyA9ICF0aGlzLnNob3dQcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c3Byb2plY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgKHdvcmtOdW0gPiAwKSA/IHdvcmtOdW0tLSA6IHdvcmtOdW0gPSB0aGlzLndvcmtzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VQcmV2aW91cyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZU90aGVycyh3b3JrTnVtLCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDdXJyZW50ID0gIXRoaXMuc2hvd0N1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0ID0gIXRoaXMuc2hvd05leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQcmV2aW91cyA9ICF0aGlzLnNob3dQcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhZnRlckxlYXZlQ3VycmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDdXJyZW50ID0gIXRoaXMuc2hvd0N1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnQod29ya051bSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhZnRlckxlYXZlTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0ID0gIXRoaXMuc2hvd05leHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhZnRlckxlYXZlUHJldmlvdXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJldmlvdXMgPSAhdGhpcy5zaG93UHJldmlvdXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vLy8vLy8vL9C40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0LvQsNC50LTQvtCyLy8vLy9cbiAgICAgICAgc2xpZGVyLmN1cnJlbnRQcm9qZWN0ID0gc2xpZGVyLndvcmtzW3dvcmtOdW1dO1xuICAgICAgICBzbGlkZXIubmV4dFByb2plY3QgPSBzbGlkZXIud29ya3Nbd29ya051bSArIDFdO1xuICAgICAgICBzbGlkZXIubmV4dFByb2plY3QyID0gc2xpZGVyLndvcmtzW3dvcmtOdW0gKyAyXVxuICAgICAgICBzbGlkZXIucHJldmlvdXNQcm9qZWN0ID0gc2xpZGVyLndvcmtzW3NsaWRlci53b3Jrcy5sZW5ndGggLSAxXTtcbiAgICAgICAgc2xpZGVyLnByZXZpb3VzUHJvamVjdDIgPSBzbGlkZXIud29ya3Nbc2xpZGVyLndvcmtzLmxlbmd0aCAtIDJdO1xuICAgICAgICAvLy8vLy/RhNGD0L3QutGG0LjQuCDQv9C+INC30LDQvNC10L3QtSDRgdC70LDQudC00L7Qsi8vLy8vL1xuICAgICAgICBsZXQgY2hhbmdlQ3VycmVudCA9ICh3b3JrTnVtLCAkdGhpcykgPT4ge1xuICAgICAgICAgICAgJHRoaXMuY3VycmVudFByb2plY3QgPSAkdGhpcy53b3Jrc1t3b3JrTnVtXTtcbiAgICAgICAgICAgICh3b3JrTnVtIDwgJHRoaXMud29ya3MubGVuZ3RoIC0gMSkgPyAkdGhpcy5uZXh0UHJvamVjdCA9ICR0aGlzLndvcmtzW3dvcmtOdW0gKyAxXTogJHRoaXMubmV4dFByb2plY3QgPSAkdGhpcy53b3Jrc1swXTtcbiAgICAgICAgICAgICh3b3JrTnVtID4gMCkgPyAkdGhpcy5wcmV2aW91c1Byb2plY3QgPSAkdGhpcy53b3Jrc1t3b3JrTnVtIC0gMV06ICR0aGlzLnByZXZpb3VzUHJvamVjdCA9ICR0aGlzLndvcmtzWyR0aGlzLndvcmtzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY2hhbmdlT3RoZXJzID0gKHdvcmtOdW0sICR0aGlzKSA9PiB7XG4gICAgICAgICAgICAod29ya051bSA8ICR0aGlzLndvcmtzLmxlbmd0aCAtIDEpID8gJHRoaXMubmV4dFByb2plY3QyID0gJHRoaXMud29ya3Nbd29ya051bSArIDFdOiAkdGhpcy5uZXh0UHJvamVjdDIgPSAkdGhpcy53b3Jrc1swXTtcbiAgICAgICAgICAgICh3b3JrTnVtID4gMCkgPyAkdGhpcy5wcmV2aW91c1Byb2plY3QyID0gJHRoaXMud29ya3Nbd29ya051bSAtIDFdOiAkdGhpcy5wcmV2aW91c1Byb2plY3QyID0gJHRoaXMud29ya3NbJHRoaXMud29ya3MubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHNsaWRlckJsb2NrKSB7XG4gICAgICAgIHNsaWRlckluaXQoKTtcbiAgICB9XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvc2xpZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==