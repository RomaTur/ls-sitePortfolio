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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
        loop = options.loop;
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
    var fnDone = false;
    if (elem) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            if (checkDistance(scrollTop, elem).top <= 0 && !fnDone && checkDistance(scrollTop, elem).bottom <= 0) {
                // console.log('in doFnElemVisible');
                fn();
                loop ? fnDone = false : fnDone = true;
            }
        });
    }
    /////////////
};

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fullMenu = __webpack_require__(4);

var _fullMenu2 = _interopRequireDefault(_fullMenu);

var _maps = __webpack_require__(6);

var _maps2 = _interopRequireDefault(_maps);

var _flipLoginForm = __webpack_require__(8);

var _flipLoginForm2 = _interopRequireDefault(_flipLoginForm);

var _skillProgressInit = __webpack_require__(9);

var _skillProgressInit2 = _interopRequireDefault(_skillProgressInit);

var _blogSideBar = __webpack_require__(10);

var _blogSideBar2 = _interopRequireDefault(_blogSideBar);

var _svg4everybody = __webpack_require__(13);

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

var _blurForm = __webpack_require__(14);

var _blurForm2 = _interopRequireDefault(_blurForm);

var _parallaxMountains = __webpack_require__(15);

var _parallaxMountains2 = _interopRequireDefault(_parallaxMountains);

var _smothScrollClick = __webpack_require__(16);

var _smothScrollClick2 = _interopRequireDefault(_smothScrollClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domready = function domready() {
    //DOM дерево загрузилось
    ///////
    console.log('entry start');

    (0, _svg4everybody2.default)(); //запуск скрипта чтобы все внешние подключения svg были кроссбраузерными

    (0, _parallaxMountains2.default)(); //запуск скрипта инициализации паралакса
    (0, _flipLoginForm2.default)('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class

    (0, _smothScrollClick2.default)('header__arrow-img', 'content');
    (0, _smothScrollClick2.default)('footer__arrow', 'wrapper');

    (0, _fullMenu2.default)('hamburger', 'menu');

    (0, _blurForm2.default)();

    (0, _maps2.default)('map');
    (0, _skillProgressInit2.default)('skill', 'skill__bar', 'data-pct'); //классы без .

    (0, _blogSideBar2.default)('article__list', 'article__list-circle');

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _isScroll = __webpack_require__(5);

var _isScroll2 = _interopRequireDefault(_isScroll);

var _clickToggleClass = __webpack_require__(1);

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import ymaps from 'ymaps'
var GoogleMapsLoader = __webpack_require__(7); // only for common js environments 

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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _clickToggleClass = __webpack_require__(1);

var _clickToggleClass2 = _interopRequireDefault(_clickToggleClass);

var _doFnElemVisible = __webpack_require__(0);

var _doFnElemVisible2 = _interopRequireDefault(_doFnElemVisible);

var _jump = __webpack_require__(2);

var _jump2 = _interopRequireDefault(_jump);

var _moveSideBar = __webpack_require__(11);

var _moveSideBar2 = _interopRequireDefault(_moveSideBar);

var _activateSideBarLink = __webpack_require__(12);

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
                    if (document.body.clientWidth >= 1025) {
                        offsetArticle = -50;
                    } else {
                        offsetArticle = -20;
                    }
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
/* 11 */
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
        if (moveSideBarVal >= 0 && sideBarPos === 'relative') {
            sideBarElem.style.top = moveSideBarVal + 'px';
        }
    });
};

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    //////////////////
    var parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.children;
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
    window.addEventListener('mousemove', moveLayers);
    /////////////////
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jump = __webpack_require__(2);

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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDJlNTNjMzhjM2FmNTViM2JhYjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvZG9GbkVsZW1WaXNpYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2NsaWNrVG9nZ2xlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2p1bXAuanMvZGlzdC9qdW1wLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2Z1bGxNZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2lzU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL21hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dvb2dsZS1tYXBzL2xpYi9Hb29nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvZmxpcExvZ2luRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9za2lsbFByb2dyZXNzSW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ibG9nU2lkZUJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9tb3ZlU2lkZUJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9hY3RpdmF0ZVNpZGVCYXJMaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmc0ZXZlcnlib2R5L2Rpc3Qvc3ZnNGV2ZXJ5Ym9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ibHVyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9wYXJhbGxheE1vdW50YWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9zbW90aFNjcm9sbENsaWNrLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvcHRpb25zIiwiZWxlbUNsYXNzIiwiZm4iLCJkaXZpZGVyIiwibG9vcCIsImVsZW0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjaGVja0Rpc3RhbmNlIiwic2Nyb2xsVG9wIiwib2Zmc2V0Iiwib2Zmc2V0VG9wIiwid2luZG93TWFyZ2luIiwiTWF0aCIsImNlaWwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInRvcEJvcmRlciIsImJvdHRvbUVkZ2UiLCJjbGllbnRIZWlnaHQiLCJib3R0b21Cb3JkZXIiLCJ0b3AiLCJib3R0b20iLCJmbkRvbmUiLCJhZGRFdmVudExpc3RlbmVyIiwic2Nyb2xsWSIsImJ1dHRvbkNsYXNzIiwiZm5BY3RpdmUiLCJjb25zb2xlIiwibG9nIiwiYnV0dG9uIiwiY29udGFpbmVyVG9nZ2xlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiY29udGFpbnMiLCJkb21yZWFkeSIsInJlYWR5U3RhdGUiLCJkb2N1bWVudEVsZW1lbnQiLCJkb1Njcm9sbCIsInZpZXdDbGFzcyIsInZpZXciLCJzY3JvbGxZZXMiLCJzY3JvbGxObyIsInByZXZEZWYiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYm9vbCIsIm9ubW91c2V3aGVlbCIsIm9ud2hlZWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25rZXlkb3duIiwiZSIsImtleUNvZGUiLCJHb29nbGVNYXBzTG9hZGVyIiwicmVxdWlyZSIsIm1hcFNlbGVjdG9yIiwiZWwiLCJzYXJvdiIsImxhdCIsImxuZyIsInpvb21WYWwiLCJzY3JlZW5XaWR0aCIsImJvZHkiLCJjbGllbnRXaWR0aCIsIktFWSIsImxvYWQiLCJnb29nbGUiLCJtYXAiLCJtYXBzIiwiTWFwIiwiem9vbSIsImNlbnRlciIsIm1hcFR5cGVDb250cm9sIiwiZGlzYWJsZURlZmF1bHRVSSIsIm1hcFR5cGVJZCIsImxvZ2luQnV0dG9uIiwibWFpbkJ1dHRvbiIsImZsaXBDb250YWluZXIiLCJmbGlwIiwibG9naW4iLCJtYWluIiwiYWRkIiwic3R5bGUiLCJvcGFjaXR5IiwiY3Vyc29yIiwicmVtb3ZlIiwiY29udGFpbmVyIiwiYmFyIiwiYXR0ciIsInNraWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInN2Z0NpcmNsZXMiLCJwZXJjZW50IiwiY3VycmVudENpcmNsZSIsImhhbmRsZUNsaWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwic3Ryb2tlRGFzaG9mZnNldCIsIlBJIiwic2lkZUJhckNsYXNzIiwic2lkZUJhciIsInRvdWNoRXZlbnQiLCJpbml0aWFsUG9pbnQiLCJmaW5hbFBvaW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2hhbmdlZFRvdWNoZXMiLCJ4QWJzIiwiYWJzIiwicGFnZVgiLCJ5QWJzIiwicGFnZVkiLCJzaWRlQmFySnVtcEZuIiwidGFyZ2V0TGluayIsInRhcmdldCIsImFuY2hvck51bSIsInNsaWNlIiwidGFyZ2V0QXJ0aWNsZSIsIm9mZnNldEFydGljbGUiLCJkdXJhdGlvbiIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiZWFzaW5nIiwiZWFzZUluT3V0UXVhZCIsImExMXkiLCJzdGFydExlZnRQb3MiLCJnZXRDb21wdXRlZFN0eWxlIiwibGVmdCIsInNpZGVCYXJWaXNpYmxlIiwidCIsImIiLCJjIiwiZCIsInNpZGVCYXJFbGVtIiwic2lkZUJhck9mZnNldCIsInNpZGVCYXJQb3MiLCJwb3NpdGlvbiIsInNjcm9sbFRvcERvYyIsIm1vdmVTaWRlQmFyVmFsIiwic2lkZUJhckl0ZW1zIiwiYXJ0aWNsZXMiLCJzaWRlQmFyTGlua3MiLCJvZmZzZXRBcnRpY2xlcyIsInB1c2giLCJzaWRlQmFyTGluayIsImFydGljbGUiLCJmdW5jIiwiaiIsImxlbmd0aCIsInNldCIsImJnV2lkdGgiLCJvZmZzZXRXaWR0aCIsInBvc0xlZnQiLCJmb3JtQ29udGFpbmVyIiwib2Zmc2V0TGVmdCIsInBvc1RvcCIsImJsdXJDU1MiLCJmb3JtQmx1ciIsImJhY2tncm91bmRTaXplIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwib25yZXNpemUiLCJwYXJhbGxheENvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwibGF5ZXJzIiwiY2hpbGRyZW4iLCJtb3ZlTGF5ZXJzIiwiaW5pdGlhbFgiLCJpbm5lcldpZHRoIiwiaW5pdGlhbFkiLCJsYXllciIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsImJvdHRvbVBvc2l0aW9uIiwiaW1hZ2UiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInRyYW5zZm9ybSIsInRvQ2xhc3MiLCJvZmZzZXRWYWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQUEsT0FBT0MsT0FBUCxHQUFpQixVQUFDQyxPQUFELEVBQWE7QUFDMUJBLGNBQVU7QUFDTkMsbUJBQVdELFFBQVFDLFNBQVIsSUFBcUIsV0FEMUI7QUFFTkMsWUFBSUYsUUFBUUUsRUFBUixJQUFjLFlBQVcsQ0FBRSxDQUZ6QjtBQUdOQyxpQkFBU0gsUUFBUUcsT0FBUixJQUFtQixDQUh0QjtBQUlOQyxjQUFNSixRQUFRSSxJQUFSLElBQWdCO0FBRTFCO0FBTlUsS0FBVixDQU9BLElBQUlILFlBQVlELFFBQVFDLFNBQXhCO0FBQUEsUUFDSUMsS0FBS0YsUUFBUUUsRUFEakI7QUFBQSxRQUVJQyxVQUFVSCxRQUFRRyxPQUZ0QjtBQUFB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QUF1QixNQUFJbUIsV0FBM0IsQ0FBYjtBQUNBMEosZ0JBQVlBLGFBQWEsQ0FBekI7QUFDQSxRQUFHdEosTUFBSCxFQUFVO0FBQ05GLGdCQUFRQyxHQUFSLENBQVkscUJBQVo7O0FBRUFDLGVBQU9OLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQU07QUFDbkMsZ0NBQUssTUFBSTJKLE9BQVQsRUFBa0I7QUFDZHpELDBCQUFVLElBREk7QUFFZGhILHdCQUFRMEssU0FGTTtBQUdkekQsMEJBQVVDLFNBSEk7QUFJZEMsd0JBQVFDLGFBSk07QUFLZEMsc0JBQU07QUFMUSxhQUFsQjtBQU9ILFNBUkQ7QUFTSDtBQUNELFFBQU1ELGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ00sQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVUMsQ0FBVixFQUFnQjtBQUNsQ0gsYUFBS0csSUFBSSxDQUFUO0FBQ0EsWUFBSUgsSUFBSSxDQUFSLEVBQVcsT0FBT0UsSUFBSSxDQUFKLEdBQVFGLENBQVIsR0FBWUEsQ0FBWixHQUFnQkMsQ0FBdkI7QUFDWEQ7QUFDQSxlQUFPLENBQUNFLENBQUQsR0FBSyxDQUFMLElBQVVGLEtBQUtBLElBQUksQ0FBVCxJQUFjLENBQXhCLElBQTZCQyxDQUFwQztBQUNELEtBTEg7QUFRSCxDQXpCRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAyZTUzYzM4YzNhZjU1YjNiYWIzIiwibW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucykgPT4ge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGVsZW1DbGFzczogb3B0aW9ucy5lbGVtQ2xhc3MgfHwgJ3VuZGVmaW5lZCcsXG4gICAgICAgIGZuOiBvcHRpb25zLmZuIHx8IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRpdmlkZXI6IG9wdGlvbnMuZGl2aWRlciB8fCAyLFxuICAgICAgICBsb29wOiBvcHRpb25zLmxvb3AgfHwgZmFsc2VcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vXG4gICAgbGV0IGVsZW1DbGFzcyA9IG9wdGlvbnMuZWxlbUNsYXNzLFxuICAgICAgICBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGRpdmlkZXIgPSBvcHRpb25zLmRpdmlkZXIsXG4gICAgICAgIGxvb3AgPSBvcHRpb25zLmxvb3A7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGVsZW1DbGFzcyk7XG4gICAgaWYoIWVsZW0pIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGVsZW1DbGFzcyk7XG4gICAgbGV0IGNoZWNrRGlzdGFuY2UgPSAoc2Nyb2xsVG9wLCBlbGVtKSA9PiB7XG4gICAgICAgIGxldCBvZmZzZXQgPSBlbGVtLm9mZnNldFRvcDtcbiAgICAgICAgbGV0IHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCh3aW5kb3cuaW5uZXJIZWlnaHQgLyBkaXZpZGVyKTtcbiAgICAgICAgbGV0IHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdpbmRvd01hcmdpbjtcbiAgICAgICAgbGV0IGJvdHRvbUVkZ2UgPSBlbGVtLmNsaWVudEhlaWdodCArIG9mZnNldDtcbiAgICAgICAgbGV0IGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHRvcEJvcmRlcixcbiAgICAgICAgICAgIGJvdHRvbTogYm90dG9tQm9yZGVyXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBmbkRvbmUgPSBmYWxzZTtcbiAgICBpZiAoZWxlbSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICAgIGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgZWxlbSkudG9wIDw9IDAgJiYgIWZuRG9uZSAmJiBjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgZWxlbSkuYm90dG9tIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW4gZG9GbkVsZW1WaXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAobG9vcCkgPyBmbkRvbmUgPSBmYWxzZSA6IGZuRG9uZSA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vL1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2RvRm5FbGVtVmlzaWJsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGVsZW1DbGFzcywgYnV0dG9uQ2xhc3MsIGZuQWN0aXZlLCBmbikgPT4ge1xuICAgIC8vLy8vLy8vLy8vL1xuICAgIGZuID0gZm4gfHwgZnVuY3Rpb24oKXtjb25zb2xlLmxvZygnZW1wdHkgZm4gaW4gY2xpY2tUb2dnbGVDbGFzcycpfTtcbiAgICBmbkFjdGl2ZSA9IGZuQWN0aXZlIHx8IGZ1bmN0aW9uKCl7Y29uc29sZS5sb2coJ2VtcHR5IGZuQWN0aXZlIGluIGNsaWNrVG9nZ2xlQ2xhc3MnKX07IFxuICAgIFxuICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBlbGVtQ2xhc3MpXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYnV0dG9uQ2xhc3MpXG4gICAgbGV0IGNvbnRhaW5lclRvZ2dsZSA9ICgpID0+IHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QudG9nZ2xlKGVsZW1DbGFzcyArICctLWFjdGl2ZScpO1xuICAgICAgICAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoZWxlbUNsYXNzICsgJy0tYWN0aXZlJykpID8gZm5BY3RpdmUoKSA6IGZuKCk7XG4gICAgfTtcbiAgICBpZiAoZWxlbSAmJiBidXR0b24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIGNsaWNrVG9nZ2xlQ2xhc3MnKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udGFpbmVyVG9nZ2xlKTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vXG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvY2xpY2tUb2dnbGVDbGFzcy5qcyIsIi8vIFJvYmVydCBQZW5uZXIncyBlYXNlSW5PdXRRdWFkXG5cbi8vIGZpbmQgdGhlIHJlc3Qgb2YgaGlzIGVhc2luZyBmdW5jdGlvbnMgaGVyZTogaHR0cDovL3JvYmVydHBlbm5lci5jb20vZWFzaW5nL1xuLy8gZmluZCB0aGVtIGV4cG9ydGVkIGZvciBFUzYgY29uc3VtcHRpb24gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2pheGdlbGxlci9lei5qc1xuXG52YXIgZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICB0IC89IGQgLyAyO1xuICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcbiAgdC0tO1xuICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xufTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbnZhciBqdW1wZXIgPSBmdW5jdGlvbiBqdW1wZXIoKSB7XG4gIC8vIHByaXZhdGUgdmFyaWFibGUgY2FjaGVcbiAgLy8gbm8gdmFyaWFibGVzIGFyZSBjcmVhdGVkIGR1cmluZyBhIGp1bXAsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzXG5cbiAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7IC8vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvICAgICAgICAgICAgICAgICAgIChub2RlKVxuXG4gIHZhciBzdGFydCA9IHZvaWQgMDsgLy8gd2hlcmUgc2Nyb2xsIHN0YXJ0cyAgICAgICAgICAgICAgICAgICAgKHB4KVxuICB2YXIgc3RvcCA9IHZvaWQgMDsgLy8gd2hlcmUgc2Nyb2xsIHN0b3BzICAgICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIHZhciBvZmZzZXQgPSB2b2lkIDA7IC8vIGFkanVzdG1lbnQgZnJvbSB0aGUgc3RvcCBwb3NpdGlvbiAgICAgIChweClcbiAgdmFyIGVhc2luZyA9IHZvaWQgMDsgLy8gZWFzaW5nIGZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKVxuICB2YXIgYTExeSA9IHZvaWQgMDsgLy8gYWNjZXNzaWJpbGl0eSBzdXBwb3J0IGZsYWcgICAgICAgICAgICAgKGJvb2xlYW4pXG5cbiAgdmFyIGRpc3RhbmNlID0gdm9pZCAwOyAvLyBkaXN0YW5jZSBvZiBzY3JvbGwgICAgICAgICAgICAgICAgICAgICAocHgpXG4gIHZhciBkdXJhdGlvbiA9IHZvaWQgMDsgLy8gc2Nyb2xsIGR1cmF0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKG1zKVxuXG4gIHZhciB0aW1lU3RhcnQgPSB2b2lkIDA7IC8vIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQgICAgICAgICAgICAgICAgICAgIChtcylcbiAgdmFyIHRpbWVFbGFwc2VkID0gdm9pZCAwOyAvLyB0aW1lIHNwZW50IHNjcm9sbGluZyB0aHVzIGZhciAgICAgICAgICAobXMpXG5cbiAgdmFyIG5leHQgPSB2b2lkIDA7IC8vIG5leHQgc2Nyb2xsIHBvc2l0aW9uICAgICAgICAgICAgICAgICAgIChweClcblxuICB2YXIgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIHRvIGNhbGwgd2hlbiBkb25lIHNjcm9sbGluZyAgICAgICAgICAgIChmdW5jdGlvbilcblxuICAvLyBzY3JvbGwgcG9zaXRpb24gaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgfVxuXG4gIC8vIGVsZW1lbnQgb2Zmc2V0IGhlbHBlclxuXG4gIGZ1bmN0aW9uIHRvcChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc3RhcnQ7XG4gIH1cblxuICAvLyByQUYgbG9vcCBoZWxwZXJcblxuICBmdW5jdGlvbiBsb29wKHRpbWVDdXJyZW50KSB7XG4gICAgLy8gc3RvcmUgdGltZSBzY3JvbGwgc3RhcnRlZCwgaWYgbm90IHN0YXJ0ZWQgYWxyZWFkeVxuICAgIGlmICghdGltZVN0YXJ0KSB7XG4gICAgICB0aW1lU3RhcnQgPSB0aW1lQ3VycmVudDtcbiAgICB9XG5cbiAgICAvLyBkZXRlcm1pbmUgdGltZSBzcGVudCBzY3JvbGxpbmcgc28gZmFyXG4gICAgdGltZUVsYXBzZWQgPSB0aW1lQ3VycmVudCAtIHRpbWVTdGFydDtcblxuICAgIC8vIGNhbGN1bGF0ZSBuZXh0IHNjcm9sbCBwb3NpdGlvblxuICAgIG5leHQgPSBlYXNpbmcodGltZUVsYXBzZWQsIHN0YXJ0LCBkaXN0YW5jZSwgZHVyYXRpb24pO1xuXG4gICAgLy8gc2Nyb2xsIHRvIGl0XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIG5leHQpO1xuXG4gICAgLy8gY2hlY2sgcHJvZ3Jlc3NcbiAgICB0aW1lRWxhcHNlZCA8IGR1cmF0aW9uID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSAvLyBjb250aW51ZSBzY3JvbGwgbG9vcFxuICAgIDogZG9uZSgpOyAvLyBzY3JvbGxpbmcgaXMgZG9uZVxuICB9XG5cbiAgLy8gc2Nyb2xsIGZpbmlzaGVkIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgLy8gYWNjb3VudCBmb3IgckFGIHRpbWUgcm91bmRpbmcgaW5hY2N1cmFjaWVzXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHN0YXJ0ICsgZGlzdGFuY2UpO1xuXG4gICAgLy8gaWYgc2Nyb2xsaW5nIHRvIGFuIGVsZW1lbnQsIGFuZCBhY2Nlc3NpYmlsaXR5IGlzIGVuYWJsZWRcbiAgICBpZiAoZWxlbWVudCAmJiBhMTF5KSB7XG4gICAgICAvLyBhZGQgdGFiaW5kZXggaW5kaWNhdGluZyBwcm9ncmFtbWF0aWMgZm9jdXNcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuXG4gICAgICAvLyBmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGV4aXN0cywgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHRpbWUgZm9yIG5leHQganVtcFxuICAgIHRpbWVTdGFydCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQVBJXG5cbiAgZnVuY3Rpb24ganVtcCh0YXJnZXQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAvLyByZXNvbHZlIG9wdGlvbnMsIG9yIHVzZSBkZWZhdWx0c1xuICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwO1xuICAgIG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0IHx8IDA7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrOyAvLyBcInVuZGVmaW5lZFwiIGlzIGEgc3VpdGFibGUgZGVmYXVsdCwgYW5kIHdvbid0IGJlIGNhbGxlZFxuICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nIHx8IGVhc2VJbk91dFF1YWQ7XG4gICAgYTExeSA9IG9wdGlvbnMuYTExeSB8fCBmYWxzZTtcblxuICAgIC8vIGNhY2hlIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgc3RhcnQgPSBsb2NhdGlvbigpO1xuXG4gICAgLy8gcmVzb2x2ZSB0YXJnZXRcbiAgICBzd2l0Y2ggKHR5cGVvZiB0YXJnZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRhcmdldCkpIHtcbiAgICAgIC8vIHNjcm9sbCBmcm9tIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGVsZW1lbnQgPSB1bmRlZmluZWQ7IC8vIG5vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgICAgIGExMXkgPSBmYWxzZTsgLy8gbWFrZSBzdXJlIGFjY2Vzc2liaWxpdHkgaXMgb2ZmXG4gICAgICAgIHN0b3AgPSBzdGFydCArIHRhcmdldDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChub2RlKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGVsZW1lbnQgPSB0YXJnZXQ7XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAoc2VsZWN0b3IpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBzY3JvbGwgZGlzdGFuY2UsIGFjY291bnRpbmcgZm9yIG9mZnNldFxuICAgIGRpc3RhbmNlID0gc3RvcCAtIHN0YXJ0ICsgb2Zmc2V0O1xuXG4gICAgLy8gcmVzb2x2ZSBkdXJhdGlvblxuICAgIHN3aXRjaCAoX3R5cGVvZihvcHRpb25zLmR1cmF0aW9uKSkge1xuICAgICAgLy8gbnVtYmVyIGluIG1zXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBmdW5jdGlvbiBwYXNzZWQgdGhlIGRpc3RhbmNlIG9mIHRoZSBzY3JvbGxcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uKGRpc3RhbmNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgdGhlIGxvb3BcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICB9XG5cbiAgLy8gZXhwb3NlIG9ubHkgdGhlIGp1bXAgbWV0aG9kXG4gIHJldHVybiBqdW1wO1xufTtcblxuLy8gZXhwb3J0IHNpbmdsZXRvblxuXG52YXIgc2luZ2xldG9uID0ganVtcGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2p1bXAuanMvZGlzdC9qdW1wLm1vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZnVsbE1lbnUgZnJvbSAnLi9tb2R1bGVzL2Z1bGxNZW51JztcbmltcG9ydCBtYXBJbml0IGZyb20gJy4vbW9kdWxlcy9tYXBzLmpzJ1xuaW1wb3J0IGZsaXBMb2dpbkZvcm0gZnJvbSAnLi9tb2R1bGVzL2ZsaXBMb2dpbkZvcm0nXG5pbXBvcnQgc2tpbGxQcm9ncmVzc0luaXQgZnJvbSAnLi9tb2R1bGVzL3NraWxsUHJvZ3Jlc3NJbml0J1xuaW1wb3J0IGJsb2dTaWRlQmFyIGZyb20gJy4vbW9kdWxlcy9ibG9nU2lkZUJhcidcbmltcG9ydCBzdmc0ZXZlcnlib2R5IGZyb20gJ3N2ZzRldmVyeWJvZHknXG5pbXBvcnQgYmx1ckZvcm0gZnJvbSAnLi9tb2R1bGVzL2JsdXJGb3JtJ1xuaW1wb3J0IHBhcmFsbGF4QmcgZnJvbSAnLi9tb2R1bGVzL3BhcmFsbGF4TW91bnRhaW5zJ1xuaW1wb3J0IHNtb290aFNjcm9sbENsaWNrIGZyb20gJy4vbW9kdWxlcy9zbW90aFNjcm9sbENsaWNrLmpzJ1xuXG5sZXQgZG9tcmVhZHkgPSBmdW5jdGlvbiAoKSB7Ly9ET00g0LTQtdGA0LXQstC+INC30LDQs9GA0YPQt9C40LvQvtGB0YxcbiAgICAvLy8vLy8vXG4gICAgY29uc29sZS5sb2coJ2VudHJ5IHN0YXJ0Jyk7XG5cbiAgICBzdmc0ZXZlcnlib2R5KCk7Ly/Qt9Cw0L/Rg9GB0Log0YHQutGA0LjQv9GC0LAg0YfRgtC+0LHRiyDQstGB0LUg0LLQvdC10YjQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90LjRjyBzdmcg0LHRi9C70Lgg0LrRgNC+0YHRgdCx0YDQsNGD0LfQtdGA0L3Ri9C80LhcblxuICAgIHBhcmFsbGF4QmcoKTsvL9C30LDQv9GD0YHQuiDRgdC60YDQuNC/0YLQsCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQv9Cw0YDQsNC70LDQutGB0LBcbiAgICBmbGlwTG9naW5Gb3JtKCd3ZWxjb21lX19sb2dpbi1idXR0b24nLCAnbG9naW5fX2J1dHRvbnMtbWFpbicsICdmbGlwX19jb250YWluZXInKTsgLy9mbGlwIGNvbnRhaW5lciBuZWVkIHRvIGJlIGEgY2xhc3NcblxuICAgIHNtb290aFNjcm9sbENsaWNrKCdoZWFkZXJfX2Fycm93LWltZycsICdjb250ZW50Jyk7XG4gICAgc21vb3RoU2Nyb2xsQ2xpY2soJ2Zvb3Rlcl9fYXJyb3cnLCAnd3JhcHBlcicpO1xuICAgIFxuICAgIGZ1bGxNZW51KCdoYW1idXJnZXInLCAnbWVudScpO1xuXG4gICAgYmx1ckZvcm0oKTtcbiAgICBcbiAgICBtYXBJbml0KCdtYXAnKTtcbiAgICBza2lsbFByb2dyZXNzSW5pdCgnc2tpbGwnLCAnc2tpbGxfX2JhcicsICdkYXRhLXBjdCcpOyAvL9C60LvQsNGB0YHRiyDQsdC10LcgLlxuXG4gICAgYmxvZ1NpZGVCYXIoJ2FydGljbGVfX2xpc3QnLCAnYXJ0aWNsZV9fbGlzdC1jaXJjbGUnKTtcblxuICAgIC8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnZW50cnkgZG9uZScpO1xuXG59XG5cblxuLy8vLy8vLy8vL2RvbXJlYWR5Ly8vLy8vLy8vLy8vL1xuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fFxuICAgIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKSkge1xuICAgIGRvbXJlYWR5KCk7XG59IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGRvbXJlYWR5KTtcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsImltcG9ydCBpc1Njcm9sbCBmcm9tICcuL2lzU2Nyb2xsJztcbmltcG9ydCBjbGlja1RvZ2dsZUNsYXNzIGZyb20gJy4vY2xpY2tUb2dnbGVDbGFzcydcbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbkNsYXNzLCB2aWV3Q2xhc3MpID0+IHtcbiAgICAvLy8vL1xuICAgIGxldCB2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyB2aWV3Q2xhc3MpO1xuICAgIGlmICh2aWV3KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBmdWxsTWVudScpO1xuICAgICAgICBsZXQgc2Nyb2xsWWVzID0gKCkgPT4ge1xuICAgICAgICAgICAgaXNTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBzY3JvbGxObyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlzU2Nyb2xsKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xpY2tUb2dnbGVDbGFzcyh2aWV3Q2xhc3MsIGJ1dHRvbkNsYXNzLCBzY3JvbGxObywgc2Nyb2xsWWVzKTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2Z1bGxNZW51LmpzIiwiLy/RhNGD0L3QutGG0LjRjyDRgNCw0LfRgNC10YjQtdC90LjRjy/Qt9Cw0L/RgNC10YLQsCDRgdC60YDQvtC70LvQsC8vXG5sZXQgcHJldkRlZiA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IChib29sKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2luIGlzU2Nyb2xsLmpzJyk7XG4gICAgZG9jdW1lbnQub25tb3VzZXdoZWVsPWRvY3VtZW50Lm9ud2hlZWw9ZnVuY3Rpb24oKXtcbnJldHVybiAoIWJvb2wpID8gZmFsc2UgOiB0cnVlOyAgICB9O1xuICAgIGlmKGJvb2w9PWZhbHNlKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZEZWYsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZEZWYsIGZhbHNlKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1vek1vdXNlUGl4ZWxTY3JvbGxcIixmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gKCFib29sKSA/IGZhbHNlIDogdHJ1ZTsgICAgfSxmYWxzZSk7XG4gICAgZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKGUpIHtcbiAgICBcdGlmIChlLmtleUNvZGU+PTMzJiZlLmtleUNvZGU8PTQwKXtcbiAgICAgICAgICAgIHJldHVybiAoIWJvb2wpID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9pc1Njcm9sbC5qcyIsIi8vIGltcG9ydCB5bWFwcyBmcm9tICd5bWFwcydcbnZhciBHb29nbGVNYXBzTG9hZGVyID0gcmVxdWlyZSgnZ29vZ2xlLW1hcHMnKTsgLy8gb25seSBmb3IgY29tbW9uIGpzIGVudmlyb25tZW50cyBcblxubW9kdWxlLmV4cG9ydHMgPSAobWFwU2VsZWN0b3IpID0+IHtcbiAgLy8vLy8vLy8vL1xuICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG1hcFNlbGVjdG9yKTtcbiAgaWYgKGVsKSB7XG4gICAgY29uc29sZS5sb2coJ2luIG1hcEluaXQnKVxuICAgIHZhciBzYXJvdiA9IHtcbiAgICAgIGxhdDogNTQuOTMxOTExLFxuICAgICAgbG5nOiA0My4zMjc2ODNcbiAgICB9O1xuICAgIHZhciB6b29tVmFsID0gMTU7XG5cbiAgICB2YXIgc2NyZWVuV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIGlmIChzY3JlZW5XaWR0aCA8PSAxMDI0KSB6b29tVmFsID0gMTQ7XG4gICAgaWYgKHNjcmVlbldpZHRoIDw9IDQ4MCkgem9vbVZhbCA9IDEzO1xuXG5cblxuICAgIEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gJ0FJemFTeUJFU3dQZ3M3Ynpib0oyNFdzVVFwSkMzemJhWXhZYlJuNCc7XG5cbiAgICBHb29nbGVNYXBzTG9hZGVyLmxvYWQoZnVuY3Rpb24gKGdvb2dsZSkge1xuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWwsIHtcbiAgICAgICAgem9vbTogem9vbVZhbCxcbiAgICAgICAgY2VudGVyOiBzYXJvdixcbiAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxuICAgICAgICBtYXBUeXBlSWQ6ICdzYXRlbGxpdGUnXG4gICAgICAgIC8vICAgc3R5bGVzOiBbXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmNWY1ZjUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMuaWNvbicsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3t2aXNpYmlsaXR5OiAnb2ZmJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM2MTYxNjEnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5zdHJva2UnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZjVmNWY1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAnYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWwnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNiZGJkYmQnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdtYW5fbWFkZScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeS5zdHJva2UnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjYmRiZGJkJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2VlZWVlZSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzc1NzU3NSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaS5wYXJrJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2U1ZTVlNSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaS5wYXJrJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjOWU5ZTllJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZCcsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmZmZmZmYnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmFydGVyaWFsJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNzU3NTc1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2RhZGFkYSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQuaGlnaHdheScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzYxNjE2MSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQubG9jYWwnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM5ZTllOWUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICd0cmFuc2l0LmxpbmUnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZTVlNWU1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAndHJhbnNpdC5zdGF0aW9uJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2VlZWVlZSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3dhdGVyJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzAwYmZhNSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3dhdGVyJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjOWU5ZTllJ31dXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIF1cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9tYXBzLmpzIiwiKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblxuXHRpZiAocm9vdCA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignR29vZ2xlLW1hcHMgcGFja2FnZSBjYW4gYmUgdXNlZCBvbmx5IGluIGJyb3dzZXInKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5Hb29nbGVNYXBzTG9hZGVyID0gZmFjdG9yeSgpO1xuXHR9XG5cbn0pKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbCwgZnVuY3Rpb24oKSB7XG5cblxuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgZ29vZ2xlVmVyc2lvbiA9ICczLjE4JztcblxuXHR2YXIgc2NyaXB0ID0gbnVsbDtcblxuXHR2YXIgZ29vZ2xlID0gbnVsbDtcblxuXHR2YXIgbG9hZGluZyA9IGZhbHNlO1xuXG5cdHZhciBjYWxsYmFja3MgPSBbXTtcblxuXHR2YXIgb25Mb2FkRXZlbnRzID0gW107XG5cblx0dmFyIG9yaWdpbmFsQ3JlYXRlTG9hZGVyTWV0aG9kID0gbnVsbDtcblxuXG5cdHZhciBHb29nbGVNYXBzTG9hZGVyID0ge307XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLlVSTCA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUyA9IFtdO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwgPSBudWxsO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuTEFOR1VBR0UgPSBudWxsO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuUkVHSU9OID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLlZFUlNJT04gPSBnb29nbGVWZXJzaW9uO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUUgPSAnX19nb29nbGVfbWFwc19hcGlfcHJvdmlkZXJfaW5pdGlhbGl6YXRvcl9fJztcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuX2dvb2dsZU1vY2tBcGlPYmplY3QgPSB7fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIubG9hZCA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0aWYgKGdvb2dsZSA9PT0gbnVsbCkge1xuXHRcdFx0aWYgKGxvYWRpbmcgPT09IHRydWUpIHtcblx0XHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goZm4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2FkaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHR3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZWFkeShmbik7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIoKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGZuKSB7XG5cdFx0XHRmbihnb29nbGUpO1xuXHRcdH1cblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0XHRzY3JpcHQuc3JjID0gR29vZ2xlTWFwc0xvYWRlci5jcmVhdGVVcmwoKTtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuaXNMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZ29vZ2xlICE9PSBudWxsO1xuXHR9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVVcmwgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgdXJsID0gR29vZ2xlTWFwc0xvYWRlci5VUkw7XG5cblx0XHR1cmwgKz0gJz9jYWxsYmFjaz0nICsgR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRTtcblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLktFWSkge1xuXHRcdFx0dXJsICs9ICcma2V5PScgKyBHb29nbGVNYXBzTG9hZGVyLktFWTtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5MSUJSQVJJRVMubGVuZ3RoID4gMCkge1xuXHRcdFx0dXJsICs9ICcmbGlicmFyaWVzPScgKyBHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUy5qb2luKCcsJyk7XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UKSB7XG5cdFx0XHR1cmwgKz0gJyZjbGllbnQ9JyArIEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UICsgJyZ2PScgKyBHb29nbGVNYXBzTG9hZGVyLlZFUlNJT047XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuQ0hBTk5FTCkge1xuXHRcdFx0dXJsICs9ICcmY2hhbm5lbD0nICsgR29vZ2xlTWFwc0xvYWRlci5DSEFOTkVMO1xuXHRcdH1cblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLkxBTkdVQUdFKSB7XG5cdFx0XHR1cmwgKz0gJyZsYW5ndWFnZT0nICsgR29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRTtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5SRUdJT04pIHtcblx0XHRcdHVybCArPSAnJnJlZ2lvbj0nICsgR29vZ2xlTWFwc0xvYWRlci5SRUdJT047XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVybDtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIucmVsZWFzZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIHJlbGVhc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gbnVsbDtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuTElCUkFSSUVTID0gW107XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkNMSUVOVCA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwgPSBudWxsO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRSA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLlJFR0lPTiA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLlZFUlNJT04gPSBnb29nbGVWZXJzaW9uO1xuXG5cdFx0XHRnb29nbGUgPSBudWxsO1xuXHRcdFx0bG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0XHRvbkxvYWRFdmVudHMgPSBbXTtcblxuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cuZ29vZ2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRkZWxldGUgd2luZG93Lmdvb2dsZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdGRlbGV0ZSB3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCAhPT0gbnVsbCkge1xuXHRcdFx0XHRHb29nbGVNYXBzTG9hZGVyLmNyZWF0ZUxvYWRlciA9IG9yaWdpbmFsQ3JlYXRlTG9hZGVyTWV0aG9kO1xuXHRcdFx0XHRvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzY3JpcHQgIT09IG51bGwpIHtcblx0XHRcdFx0c2NyaXB0LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRcdFx0c2NyaXB0ID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdGZuKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlmIChsb2FkaW5nKSB7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJlbGVhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxlYXNlKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5vbkxvYWQgPSBmdW5jdGlvbihmbikge1xuXHRcdG9uTG9hZEV2ZW50cy5wdXNoKGZuKTtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIubWFrZU1vY2sgPSBmdW5jdGlvbigpIHtcblx0XHRvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyO1xuXG5cdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5nb29nbGUgPSBHb29nbGVNYXBzTG9hZGVyLl9nb29nbGVNb2NrQXBpT2JqZWN0O1xuXHRcdFx0d2luZG93W0dvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUVdKCk7XG5cdFx0fTtcblx0fTtcblxuXG5cdHZhciByZWFkeSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIGk7XG5cblx0XHRsb2FkaW5nID0gZmFsc2U7XG5cblx0XHRpZiAoZ29vZ2xlID09PSBudWxsKSB7XG5cdFx0XHRnb29nbGUgPSB3aW5kb3cuZ29vZ2xlO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCBvbkxvYWRFdmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG9uTG9hZEV2ZW50c1tpXShnb29nbGUpO1xuXHRcdH1cblxuXHRcdGlmIChmbikge1xuXHRcdFx0Zm4oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjYWxsYmFja3NbaV0oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRjYWxsYmFja3MgPSBbXTtcblx0fTtcblxuXG5cdHJldHVybiBHb29nbGVNYXBzTG9hZGVyO1xuXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dvb2dsZS1tYXBzL2xpYi9Hb29nbGUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAobG9naW5CdXR0b24sIG1haW5CdXR0b24sIGZsaXBDb250YWluZXIpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICBsZXQgZmxpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgZmxpcENvbnRhaW5lcik7XG4gICAgbGV0IGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBsb2dpbkJ1dHRvbik7XG4gICAgbGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIG1haW5CdXR0b24pO1xuICAgIGlmIChmbGlwICYmIGxvZ2luICYmIG1haW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIGZsaXBMb2dpbkZvcm0nKTtcbiAgICAgICAgbG9naW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBmbGlwLmNsYXNzTGlzdC5hZGQoZmxpcENvbnRhaW5lciArICctLWFjdGl2ZScpO1xuICAgICAgICAgICAgbG9naW4uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIGxvZ2luLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgfSk7XG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBmbGlwLmNsYXNzTGlzdC5yZW1vdmUoZmxpcENvbnRhaW5lciArICctLWFjdGl2ZScpO1xuICAgICAgICAgICAgbG9naW4uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGxvZ2luLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9mbGlwTG9naW5Gb3JtLmpzIiwiLy8vL9CQ0L3QuNC80LDRhtC40Y8gc3ZnINC60L7Qu9C10YYg0LTQu9GPINGN0LvQtdC80LXQvdGC0L7QsiAn0YHQutC40LvRiydcbmltcG9ydCBkb0ZuRWxlbVZpc2libGUgZnJvbSAnLi9kb0ZuRWxlbVZpc2libGUnXG5tb2R1bGUuZXhwb3J0cyA9IChjb250YWluZXIsIGJhciwgYXR0cikgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vXG4gICAgbGV0IHNraWxsID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgY29udGFpbmVyKV07IC8v0L/QvtC70YPRh9C10L3QuNC1INCy0YHQtdGFINC+0LHQtdGA0YLQvtC6INCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGRhdGEtcGN0XG4gICAgbGV0IHN2Z0NpcmNsZXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBiYXIpXTsgLy/Qv9C+0LvRg9GH0LXQvdC40LUg0LLRgdC10YUg0LrQvtC70LXRhlxuICAgIGxldCBwZXJjZW50ID0gW107IC8vINC80LDRgdGB0LjQsiDQt9C90LDRh9C10L3QuNC5INCy0LfRj9GC0YvRhSDQuNC3IGh0bWwg0LrQvtC00LAgLSDQutC+0YLQvtGA0YvQtSDRgtGD0LTQsCDQsdGL0LvQuCDQstGB0YLQsNCy0LvQtdC90Ysg0LjQtyDQsNC00LzQuNC90LrQuCDRh9C10YDQtdC3IGJhY2tlbmRcbiAgICBsZXQgY3VycmVudENpcmNsZTsgLy/QutC+0L3RgtC10LnQvdC10YAg0LTQu9GPINC+0YLQtdC70YzQvdC+0LPQviDQutC+0LvRjNGG0LBcbiAgICAvL9GB0L7QsdGL0YLQuNC1LCDQutC+0YLQvtGA0L7QtSDQv9GA0LjRgdCy0LDQuNCy0LDQtdGCINC30L3QsNGH0LXQvdC40LUg0LrQvtC70YzRhtCw0LxcbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNraWxsLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIHBlcmNlbnRbaV0gPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShhdHRyKSk7IC8v0L/QvtC70YPRh9C40LvQuCDQt9C90LDRh9C10L3QuNC1INC/0YDQvtGG0LXQvdGC0L7QsiDQuCDQv9C10YDQtdCy0LXQu9C4INCyIG51bWJlclxuICAgICAgICAgICAgY3VycmVudENpcmNsZSA9IGl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShiYXIpOyAvL9Cy0YvQsdGA0LDQu9C4INC60L7Qu9GM0YbQviDQuNC3INGC0LXQutGD0YnQtdC5INC+0LHQtdGA0YLQutC4XG4gICAgICAgICAgICBjdXJyZW50Q2lyY2xlWzBdLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSAoKDEwMCAtIHBlcmNlbnRbaV0pIC8gMTAwKSAqIE1hdGguUEkgKiAxODA7IC8vINC/0YDQuNGB0LLQsNC40LLQsNC90LjQtSDRgtC10LrRg9GJ0LXQvNGDINC60L7Qu9GM0YbRgyDQt9C90LDRh9C10L3QuNGPINC/0LXRgNC10LLQtdC00LXQvdC90L7QvNGDINC00LvRjyDRgdC/0LXRhiDRgdCy0L7QudGB0YLQstCwIHN2ZyDQuNC3INC/0YDQvtGG0LXQvdGC0L7QslxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZiAoc2tpbGwgJiYgc3ZnQ2lyY2xlcykge1xuICAgICAgICAvL9C+0LHQvdGD0LvQtdC90LjQtSDQt9C90LDRh9C10L3QuNC5INCy0L4g0LLRgdC10YUg0LrQvtC70YzRhtCw0YVcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHNraWxsUHJvZ2dyZXNzSW5pdCcpXG4gICAgICAgIHN2Z0NpcmNsZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGkuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IE1hdGguUEkgKiAxODA7XG4gICAgICAgIH0pXG4gICAgICAgIC8vIGRvRm5FbGVtVmlzaWJsZSgnc2tpbGxzJywgaGFuZGxlQ2xpY2spO1xuICAgICAgICBkb0ZuRWxlbVZpc2libGUoe1xuICAgICAgICAgICAgZWxlbUNsYXNzOiAnc2tpbGxzJyxcbiAgICAgICAgICAgIGZuOiBoYW5kbGVDbGlja1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvc2tpbGxQcm9ncmVzc0luaXQuanMiLCJpbXBvcnQgY2xpY2tUb2dnbGVDbGFzcyBmcm9tICcuL2NsaWNrVG9nZ2xlQ2xhc3MnXG5pbXBvcnQgZG9GbkVsZW1WaXNpYmxlIGZyb20gJy4vZG9GbkVsZW1WaXNpYmxlJ1xuaW1wb3J0IGp1bXAgZnJvbSAnanVtcC5qcydcbmltcG9ydCBtb3ZlU2lkZUJhciBmcm9tICcuL21vdmVTaWRlQmFyJ1xuaW1wb3J0IGFjdGl2YXRlU2lkZUJhckxpbmsgZnJvbSAnLi9hY3RpdmF0ZVNpZGVCYXJMaW5rJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzaWRlQmFyQ2xhc3MsIGJ1dHRvbkNsYXNzKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vXG4gICAgbGV0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHNpZGVCYXJDbGFzcylcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBidXR0b25DbGFzcylcbiAgICBsZXQgdG91Y2hFdmVudCA9ICgpID0+IHtcbiAgICAgICAgdmFyIGluaXRpYWxQb2ludDtcbiAgICAgICAgdmFyIGZpbmFsUG9pbnQ7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGluaXRpYWxQb2ludCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBmaW5hbFBvaW50ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICB2YXIgeEFicyA9IE1hdGguYWJzKGluaXRpYWxQb2ludC5wYWdlWCAtIGZpbmFsUG9pbnQucGFnZVgpO1xuICAgICAgICAgICAgdmFyIHlBYnMgPSBNYXRoLmFicyhpbml0aWFsUG9pbnQucGFnZVkgLSBmaW5hbFBvaW50LnBhZ2VZKTtcbiAgICAgICAgICAgIGlmICh4QWJzID4gMjAgfHwgeUFicyA+IDIwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhBYnMgPiB5QWJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvaW50LnBhZ2VYIDwgaW5pdGlhbFBvaW50LnBhZ2VYKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKtCh0JLQkNCZ0J8g0JLQm9CV0JLQniovXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoc2lkZUJhckNsYXNzICsgJy0tYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0KHQktCQ0JnQnyDQktCf0KDQkNCS0J4qL1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKHNpZGVCYXJDbGFzcyArICctLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb2ludC5wYWdlWSA8IGluaXRpYWxQb2ludC5wYWdlWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyrQodCS0JDQmdCfINCS0JLQldCg0KUqL1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyrQodCS0JDQmdCfINCS0J3QmNCXKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH07XG5cbiAgICBsZXQgc2lkZUJhckp1bXBGbiA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHNpZGVCYXJKdW1wRm4nKVxuICAgICAgICBzaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0TGluayA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIC8vIHRhcmdldExpbmsuY2hpbGRyZW4oJy5hcnRpY2xlc19faXRlbScpLmNsYXNzTGlzdC5hZGQoJ2FydGljbGVzX19pdGVtLS1hY3RpdmUnKVxuICAgICAgICAgICAgbGV0IGFuY2hvck51bSA9IHRhcmdldExpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBpZiAoYW5jaG9yTnVtKSB7XG4gICAgICAgICAgICAgICAgYW5jaG9yTnVtID0gYW5jaG9yTnVtLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRBcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FydGljbGUnICsgYW5jaG9yTnVtKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0QXJ0aWNsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0QXJ0aWNsZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPj0gMTAyNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0QXJ0aWNsZSA9IC01MDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldEFydGljbGUgPSAtMjA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAganVtcCgnI2FydGljbGUnICsgYW5jaG9yTnVtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0QXJ0aWNsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IGVhc2VJbk91dFF1YWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhMTF5OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoc2lkZUJhckNsYXNzICsgJy0tYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIFxuXG5cbiAgICBpZiAoc2lkZUJhciAmJiBidXR0b24pIHtcbiAgICAgICAgLy8vLy8vLy8vLy8vXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBibG9nU2lkZUJhcicpXG4gICAgICAgIGFjdGl2YXRlU2lkZUJhckxpbmsoKTtcbiAgICAgICAgbGV0IHN0YXJ0TGVmdFBvcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJ1dHRvbikubGVmdDtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmxlZnQgPSAtMTAwICsgJ3B4JztcblxuICAgICAgICBsZXQgc2lkZUJhclZpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidXR0b24uc3R5bGUubGVmdCA9IHN0YXJ0TGVmdFBvcztcbiAgICAgICAgICAgIHRvdWNoRXZlbnQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbGlja1RvZ2dsZUNsYXNzKHNpZGVCYXJDbGFzcywgYnV0dG9uQ2xhc3MpO1xuICAgICAgICBzaWRlQmFySnVtcEZuKCk7XG5cbiAgICAgICAgYWN0aXZhdGVTaWRlQmFyTGluaygpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDw9IDEwMjQpXG4gICAgICAgICAgICBkb0ZuRWxlbVZpc2libGUoe1xuICAgICAgICAgICAgICAgIGVsZW1DbGFzczogJ2FydGljbGVzJyxcbiAgICAgICAgICAgICAgICBmbjogc2lkZUJhclZpc2libGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBtb3ZlU2lkZUJhcihzaWRlQmFyKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBhY3RpdmF0ZVNpZGVCYXJMaW5rKCk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDw9IDEwMjQpIHtcbiAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUubGVmdCA9IC0zMCArICdweCc7XG4gICAgICAgICAgICAgICAgc2lkZUJhci5zdHlsZS50b3AgPSAtNSArICd2aCc7XG5cbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50KClcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIG1vdmVTaWRlQmFyKHNpZGVCYXIpXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLy8vLy8vLy8vLy9cblxuICAgIH1cblxuICAgIGNvbnN0IGVhc2VJbk91dFF1YWQgPSAodCwgYiwgYywgZCkgPT4ge1xuICAgICAgICB0IC89IGQgLyAyXG4gICAgICAgIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiXG4gICAgICAgIHQtLVxuICAgICAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiXG4gICAgfVxuICAgIC8vLy8vLy8vLy8vL1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2Jsb2dTaWRlQmFyLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IChzaWRlQmFyRWxlbSkgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnaW4gbW92ZVNpZGVCYXInKVxuICAgICAgICAgICAgbGV0IHNpZGVCYXJPZmZzZXQgPSBzaWRlQmFyRWxlbS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZXQgc2lkZUJhclBvcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNpZGVCYXJFbGVtKS5wb3NpdGlvbjtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcERvYyA9IHdpbmRvdy5zY3JvbGxZICsgMTAwO1xuICAgICAgICAgICAgICAgIGxldCBtb3ZlU2lkZUJhclZhbCA9IHNjcm9sbFRvcERvYyAtIHNpZGVCYXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKG1vdmVTaWRlQmFyVmFsID49IDAgJiYgc2lkZUJhclBvcyA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICBzaWRlQmFyRWxlbS5zdHlsZS50b3AgPSBtb3ZlU2lkZUJhclZhbCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9tb3ZlU2lkZUJhci5qcyIsImltcG9ydCBkb0ZuRWxlbVZpc2libGUgZnJvbSAnLi9kb0ZuRWxlbVZpc2libGUnXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgICAvLy8vLy8vLy8vL1xuICAgIGNvbnNvbGUubG9nKCdpbiBhY3RpdmF0ZVNpZGVCYXJMaW5rJyk7XG4gICAgbGV0IHNpZGVCYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlX19pdGVtJyk7XG4gICAgbGV0IGFydGljbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFydGljbGUnKTtcbiAgICBsZXQgc2lkZUJhckxpbmtzID0gW107XG4gICAgbGV0IG9mZnNldEFydGljbGVzID0gW107XG5cbiAgICBzaWRlQmFySXRlbXMuZm9yRWFjaChzaWRlQmFyTGluayA9PiB7XG4gICAgICAgIHNpZGVCYXJMaW5rcy5wdXNoKHNpZGVCYXJMaW5rKTtcbiAgICB9KTtcbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgc2lkZUJhckxpbmtzLmxlbmd0aDsgaSsrKXtcbiAgICAvLyAgICAgY29uc29sZS5sb2coc2lkZUJhckxpbmtzW2ldKVxuICAgIC8vIH1cbiAgICBhcnRpY2xlcy5mb3JFYWNoKGFydGljbGUgPT4ge1xuICAgICAgICBvZmZzZXRBcnRpY2xlcy5wdXNoKGFydGljbGUub2Zmc2V0VG9wKTtcbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lkZUJhckxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfQsiDRhtC40LrQu9C1JylcbiAgICAgICAgdmFyIGZ1bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpZGVCYXJMaW5rcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHNpZGVCYXJMaW5rc1tqXS5jbGFzc0xpc3QucmVtb3ZlKCdhcnRpY2xlX19pdGVtLS1hY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2lkZUJhckxpbmtzW2ldLmNsYXNzTGlzdC5hZGQoJ2FydGljbGVfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpKzEpXG4gICAgICAgIH1cbiAgICAgICAgZG9GbkVsZW1WaXNpYmxlKHtcbiAgICAgICAgICAgIGVsZW1DbGFzczogJ2FydGljbGUnICsgKGkgKyAxKSxcbiAgICAgICAgICAgIGZuOiBmdW5jLFxuICAgICAgICAgICAgZGl2aWRlcjogMyxcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvYWN0aXZhdGVTaWRlQmFyTGluay5qcyIsIiFmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCA/IC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSB1bmxlc3MgYW1kTW9kdWxlSWQgaXMgc2V0XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Quc3ZnNGV2ZXJ5Ym9keSA9IGZhY3RvcnkoKTtcbiAgICB9KSA6IFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA/IC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6IHJvb3Quc3ZnNGV2ZXJ5Ym9keSA9IGZhY3RvcnkoKTtcbn0odGhpcywgZnVuY3Rpb24oKSB7XG4gICAgLyohIHN2ZzRldmVyeWJvZHkgdjIuMS45IHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgKi9cbiAgICBmdW5jdGlvbiBlbWJlZChwYXJlbnQsIHN2ZywgdGFyZ2V0KSB7XG4gICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgZXhpc3RzXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHRvIGhvbGQgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSwgdmlld0JveCA9ICFzdmcuaGFzQXR0cmlidXRlKFwidmlld0JveFwiKSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKTtcbiAgICAgICAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc2V0IHRoZSB2aWV3Qm94IG9uIHRoZSBzdmdcbiAgICAgICAgICAgIHZpZXdCb3ggJiYgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG4gICAgICAgICAgICAvLyBjb3B5IHRoZSBjb250ZW50cyBvZiB0aGUgY2xvbmUgaW50byB0aGUgZnJhZ21lbnRcbiAgICAgICAgICAgIGZvciAoLy8gY2xvbmUgdGhlIHRhcmdldFxuICAgICAgICAgICAgdmFyIGNsb25lID0gdGFyZ2V0LmNsb25lTm9kZSghMCk7IGNsb25lLmNoaWxkTm9kZXMubGVuZ3RoOyApIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjbG9uZS5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgZnJhZ21lbnQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhocikge1xuICAgICAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgcmVxdWVzdFxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVxdWVzdCBpcyByZWFkeVxuICAgICAgICAgICAgaWYgKDQgPT09IHhoci5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudFxuICAgICAgICAgICAgICAgIHZhciBjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudCBiYXNlZCBvbiB0aGUgeGhyIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQgfHwgKGNhY2hlZERvY3VtZW50ID0geGhyLl9jYWNoZWREb2N1bWVudCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKSwgXG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB4aHIucmVzcG9uc2VUZXh0LCB4aHIuX2NhY2hlZFRhcmdldCA9IHt9KSwgLy8gY2xlYXIgdGhlIHhociBlbWJlZHMgbGlzdCBhbmQgZW1iZWQgZWFjaCBpdGVtXG4gICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMuc3BsaWNlKDApLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0geGhyLl9jYWNoZWRUYXJnZXRbaXRlbS5pZF07XG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgfHwgKHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdID0gY2FjaGVkRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pZCkpLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIHRhcmdldCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICAgICAgZW1iZWQoaXRlbS5wYXJlbnQsIGl0ZW0uc3ZnLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAvLyB0ZXN0IHRoZSByZWFkeSBzdGF0ZSBjaGFuZ2UgaW1tZWRpYXRlbHlcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdmc0ZXZlcnlib2R5KHJhd29wdHMpIHtcbiAgICAgICAgZnVuY3Rpb24gb25pbnRlcnZhbCgpIHtcbiAgICAgICAgICAgIC8vIHdoaWxlIHRoZSBpbmRleCBleGlzdHMgaW4gdGhlIGxpdmUgPHVzZT4gY29sbGVjdGlvblxuICAgICAgICAgICAgZm9yICgvLyBnZXQgdGhlIGNhY2hlZCA8dXNlPiBpbmRleFxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDsgaW5kZXggPCB1c2VzLmxlbmd0aDsgKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IDx1c2U+XG4gICAgICAgICAgICAgICAgdmFyIHVzZSA9IHVzZXNbaW5kZXhdLCBwYXJlbnQgPSB1c2UucGFyZW50Tm9kZSwgc3ZnID0gZ2V0U1ZHQW5jZXN0b3IocGFyZW50KSwgc3JjID0gdXNlLmdldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIikgfHwgdXNlLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFzcmMgJiYgb3B0cy5hdHRyaWJ1dGVOYW1lICYmIChzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKG9wdHMuYXR0cmlidXRlTmFtZSkpLCBcbiAgICAgICAgICAgICAgICBzdmcgJiYgc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2x5ZmlsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnZhbGlkYXRlIHx8IG9wdHMudmFsaWRhdGUoc3JjLCBzdmcsIHVzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIDx1c2U+IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc3JjIGFuZCBnZXQgdGhlIHVybCBhbmQgaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3JjU3BsaXQgPSBzcmMuc3BsaXQoXCIjXCIpLCB1cmwgPSBzcmNTcGxpdC5zaGlmdCgpLCBpZCA9IHNyY1NwbGl0LmpvaW4oXCIjXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIGlzIGV4dGVybmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgeGhyIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IHJlcXVlc3RzW3VybF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgeGhyIHJlcXVlc3QgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhociB8fCAoeGhyID0gcmVxdWVzdHNbdXJsXSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCB4aHIub3BlbihcIkdFVFwiLCB1cmwpLCB4aHIuc2VuZCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMgPSBbXSksIC8vIGFkZCB0aGUgc3ZnIGFuZCBpZCBhcyBhbiBpdGVtIHRvIHRoZSB4aHIgZW1iZWRzIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN2Zzogc3ZnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAvLyBwcmVwYXJlIHRoZSB4aHIgcmVhZHkgc3RhdGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIGxvY2FsIGlkIGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZChwYXJlbnQsIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsraW5kZXgsICsrbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGluZGV4IHdoZW4gdGhlIHByZXZpb3VzIHZhbHVlIHdhcyBub3QgXCJ2YWxpZFwiXG4gICAgICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29udGludWUgdGhlIGludGVydmFsXG4gICAgICAgICAgICAoIXVzZXMubGVuZ3RoIHx8IHVzZXMubGVuZ3RoIC0gbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID4gMCkgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uaW50ZXJ2YWwsIDY3KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9seWZpbGwsIG9wdHMgPSBPYmplY3QocmF3b3B0cyksIG5ld2VySUVVQSA9IC9cXGJUcmlkZW50XFwvWzU2N11cXGJ8XFxiTVNJRSAoPzo5fDEwKVxcLjBcXGIvLCB3ZWJraXRVQSA9IC9cXGJBcHBsZVdlYktpdFxcLyhcXGQrKVxcYi8sIG9sZGVyRWRnZVVBID0gL1xcYkVkZ2VcXC8xMlxcLihcXGQrKVxcYi8sIGVkZ2VVQSA9IC9cXGJFZGdlXFwvLihcXGQrKVxcYi8sIGluSWZyYW1lID0gd2luZG93LnRvcCAhPT0gd2luZG93LnNlbGY7XG4gICAgICAgIHBvbHlmaWxsID0gXCJwb2x5ZmlsbFwiIGluIG9wdHMgPyBvcHRzLnBvbHlmaWxsIDogbmV3ZXJJRVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gob2xkZXJFZGdlVUEpIHx8IFtdKVsxXSA8IDEwNTQ3IHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHdlYmtpdFVBKSB8fCBbXSlbMV0gPCA1MzcgfHwgZWRnZVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgaW5JZnJhbWU7XG4gICAgICAgIC8vIGNyZWF0ZSB4aHIgcmVxdWVzdHMgb2JqZWN0XG4gICAgICAgIHZhciByZXF1ZXN0cyA9IHt9LCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQsIHVzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKSwgbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID0gMDtcbiAgICAgICAgLy8gY29uZGl0aW9uYWxseSBzdGFydCB0aGUgaW50ZXJ2YWwgaWYgdGhlIHBvbHlmaWxsIGlzIGFjdGl2ZVxuICAgICAgICBwb2x5ZmlsbCAmJiBvbmludGVydmFsKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNWR0FuY2VzdG9yKG5vZGUpIHtcbiAgICAgICAgZm9yICh2YXIgc3ZnID0gbm9kZTsgXCJzdmdcIiAhPT0gc3ZnLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgJiYgKHN2ZyA9IHN2Zy5wYXJlbnROb2RlKTsgKSB7fVxuICAgICAgICByZXR1cm4gc3ZnO1xuICAgIH1cbiAgICByZXR1cm4gc3ZnNGV2ZXJ5Ym9keTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N2ZzRldmVyeWJvZHkvZGlzdC9zdmc0ZXZlcnlib2R5LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICBsZXQgZm4gPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBiZ1dpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYmctaW1nJykub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtZm9ybUNvbnRhaW5lci5vZmZzZXRMZWZ0LFxuICAgICAgICAgICAgICAgICAgICBwb3NUb3AgPSAtZm9ybUNvbnRhaW5lci5vZmZzZXRUb3AsXG4gICAgICAgICAgICAgICAgICAgIGJsdXJDU1MgPSBmb3JtQmx1ci5zdHlsZVxuICAgICAgICAgICAgICAgICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gKGJnV2lkdGgtKGJnV2lkdGgqMC4wODMzKSkgKyAncHgnICsgJyAnICsgJ2F1dG8nXG4gICAgICAgICAgICAgICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gKHBvc0xlZnQtcG9zTGVmdCowLjEwOSkgKyAncHgnICsgJyAnICsgKHBvc1RvcC1wb3NUb3AqMC4xMTc4KSArICdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0oKSk7XG5cbiAgICBsZXQgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtJyk7XG4gICAgbGV0IGZvcm1CbHVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2JsdXInKTtcbiAgICBpZihmb3JtQ29udGFpbmVyICYmIGZvcm1CbHVyKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIGJsdXJGb3JtJylcbiAgICAgICAgZm4uc2V0KCk7XG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmbi5zZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vL1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9ibHVyRm9ybS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXG4gICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xuICAgIGNvbnN0IG1vdmVMYXllcnMgPSBldmVudCA9PiB7XG4gICAgICAgIGxldCBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gZXZlbnQucGFnZVg7XG4gICAgICAgIGxldCBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIGV2ZW50LnBhZ2VZO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IGxheWVyIG9mIGxheWVycykge1xuICAgICAgICAgICAgbGV0IGRpdmlkZXIgPSBpIC8gODAsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgaW1hZ2UgPSBsYXllci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgICAgICBpbWFnZS5zdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQucGFnZVk8PXdpbmRvdy5pbm5lckhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSAgXG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUxheWVycyk7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvcGFyYWxsYXhNb3VudGFpbnMuanMiLCJpbXBvcnQganVtcCBmcm9tICdqdW1wLmpzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b25DbGFzcywgdG9DbGFzcywgb2Zmc2V0VmFsKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicrYnV0dG9uQ2xhc3MpO1xuICAgIG9mZnNldFZhbCA9IG9mZnNldFZhbCB8fCAwXG4gICAgaWYoYnV0dG9uKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHNtb3RoU2Nyb2xsQXJyb3cnKVxuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGp1bXAoJy4nK3RvQ2xhc3MsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldFZhbCxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGVhc2luZzogZWFzZUluT3V0UXVhZCxcbiAgICAgICAgICAgICAgICBhMTF5OiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgZWFzZUluT3V0UXVhZCA9ICh0LCBiLCBjLCBkKSA9PiB7XG4gICAgICAgIHQgLz0gZCAvIDJcbiAgICAgICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGJcbiAgICAgICAgdC0tXG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGJcbiAgICAgIH1cblxuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL3Ntb3RoU2Nyb2xsQ2xpY2suanMiXSwic291cmNlUm9vdCI6IiJ9