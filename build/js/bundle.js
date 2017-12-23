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


module.exports = function (elemClass, fn) {
    var divider = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


    ////////////
    // console.log(elemClass)
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
        (0, _doFnElemVisible2.default)('skills', handleClick);
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

    (0, _activateSideBarLink2.default)();

    if (sideBar && button) {
        ////////////
        console.log('in blogSideBar');
        var startLeftPos = window.getComputedStyle(button).left;
        button.style.left = -100 + 'px';

        var sideBarVisible = function sideBarVisible() {
            button.style.left = startLeftPos;
            touchEvent();
        };

        (0, _clickToggleClass2.default)(sideBarClass, buttonClass);
        sideBarJumpFn();

        (0, _activateSideBarLink2.default)();

        if (document.body.clientWidth <= 1024) (0, _doFnElemVisible2.default)('articles', sideBarVisible);else (0, _moveSideBar2.default)(sideBar);
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
    // let sideBarItems = document.querySelectorAll('.article__item');
    // let articles = document.querySelectorAll('.article');
    // let sideBarLinks = [];
    // let offsetArticles = [];

    // sideBarItems.forEach(sideBarLink => {
    //     sideBarLinks.push(sideBarLink);
    // });
    // // for(let i = 0; i < sideBarLinks.length; i++){
    // //     console.log(sideBarLinks[i])
    // // }
    // articles.forEach(article => {
    //     offsetArticles.push(article.offsetTop);
    // });
    // activateSideBarLink(sideBarLinks, offsetArticles);
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
        fn = function fn() {
            for (var j = 0; j < sideBarLinks.length; j++) {
                sideBarLinks[j].classList.remove('article__item--active');
            }
            sideBarLinks[i].classList.add('article__item--active');
            // console.log(i+1)
        };

        (0, _doFnElemVisible2.default)('article' + (i + 1), fn, 3, true);
    };

    for (var i = 0; i < sideBarLinks.length; i++) {
        var fn;

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


    // window.addEventListener('resize', () => {
    //     let windowWidth = document.body.clientWidth;
    //     console.log(windowWidth);
    // });


    // if(windowWidth>=1025){
    //     console.log('in parallaxMountains');
    // }

    var parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.children;

    var moveLayers = function moveLayers(event) {
        var initialX = window.innerWidth / 2 - event.pageX;
        var initialY = window.innerHeight / 2 - event.pageY;

        //     [].slice.call(layers).forEach(function(layer, index) {
        //     var 
        //       divider = index / 100,
        //       positionX = initialX * divider,
        //       positionY = initialY * divider,
        //       bottomPosition = (window.innerHeight / 2) * divider,
        //       transformString = 'translate(' + positionX + 'px,' + positionY + 'px)',
        //       image = layer.firstElementChild;

        //     layer.style.transform = transformString;
        //     image.style.bottom = '-' + bottomPosition + 'px';
        //   });
        console.log(event);
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
                } else {}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTdiMzMzZDliMWY2M2ViY2YzYjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvZG9GbkVsZW1WaXNpYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2NsaWNrVG9nZ2xlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2p1bXAuanMvZGlzdC9qdW1wLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2Z1bGxNZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL2lzU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGVzL21hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dvb2dsZS1tYXBzL2xpYi9Hb29nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvZmxpcExvZ2luRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9za2lsbFByb2dyZXNzSW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ibG9nU2lkZUJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9tb3ZlU2lkZUJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9hY3RpdmF0ZVNpZGVCYXJMaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmc0ZXZlcnlib2R5L2Rpc3Qvc3ZnNGV2ZXJ5Ym9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ibHVyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9wYXJhbGxheE1vdW50YWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9zbW90aFNjcm9sbENsaWNrLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJlbGVtQ2xhc3MiLCJmbiIsImRpdmlkZXIiLCJsb29wIiwiZWxlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNoZWNrRGlzdGFuY2UiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJvZmZzZXRUb3AiLCJ3aW5kb3dNYXJnaW4iLCJNYXRoIiwiY2VpbCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwidG9wQm9yZGVyIiwiYm90dG9tRWRnZSIsImNsaWVudEhlaWdodCIsImJvdHRvbUJvcmRlciIsInRvcCIsImJvdHRvbSIsImZuRG9uZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzY3JvbGxZIiwiYnV0dG9uQ2xhc3MiLCJmbkFjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJidXR0b24iLCJjb250YWluZXJUb2dnbGUiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJjb250YWlucyIsImRvbXJlYWR5IiwicmVhZHlTdGF0ZSIsImRvY3VtZW50RWxlbWVudCIsImRvU2Nyb2xsIiwidmlld0NsYXNzIiwidmlldyIsInNjcm9sbFllcyIsInNjcm9sbE5vIiwicHJldkRlZiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJib29sIiwib25tb3VzZXdoZWVsIiwib253aGVlbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbmtleWRvd24iLCJlIiwia2V5Q29kZSIsIkdvb2dsZU1hcHNMb2FkZXIiLCJyZXF1aXJlIiwibWFwU2VsZWN0b3IiLCJlbCIsInNhcm92IiwibGF0IiwibG5nIiwiem9vbVZhbCIsInNjcmVlbldpZHRoIiwiYm9keSIsImNsaWVudFdpZHRoIiwiS0VZIiwibG9hZCIsImdvb2dsZSIsIm1hcCIsIm1hcHMiLCJNYXAiLCJ6b29tIiwiY2VudGVyIiwibWFwVHlwZUNvbnRyb2wiLCJkaXNhYmxlRGVmYXVsdFVJIiwibWFwVHlwZUlkIiwibG9naW5CdXR0b24iLCJtYWluQnV0dG9uIiwiZmxpcENvbnRhaW5lciIsImZsaXAiLCJsb2dpbiIsIm1haW4iLCJhZGQiLCJzdHlsZSIsIm9wYWNpdHkiLCJjdXJzb3IiLCJyZW1vdmUiLCJjb250YWluZXIiLCJiYXIiLCJhdHRyIiwic2tpbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3ZnQ2lyY2xlcyIsInBlcmNlbnQiLCJjdXJyZW50Q2lyY2xlIiwiaGFuZGxlQ2xpY2siLCJmb3JFYWNoIiwiaXRlbSIsImkiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzdHJva2VEYXNob2Zmc2V0IiwiUEkiLCJzaWRlQmFyQ2xhc3MiLCJzaWRlQmFyIiwidG91Y2hFdmVudCIsImluaXRpYWxQb2ludCIsImZpbmFsUG9pbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJjaGFuZ2VkVG91Y2hlcyIsInhBYnMiLCJhYnMiLCJwYWdlWCIsInlBYnMiLCJwYWdlWSIsInNpZGVCYXJKdW1wRm4iLCJ0YXJnZXRMaW5rIiwidGFyZ2V0IiwiYW5jaG9yTnVtIiwic2xpY2UiLCJ0YXJnZXRBcnRpY2xlIiwib2Zmc2V0QXJ0aWNsZSIsImR1cmF0aW9uIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJlYXNpbmciLCJlYXNlSW5PdXRRdWFkIiwiYTExeSIsInN0YXJ0TGVmdFBvcyIsImdldENvbXB1dGVkU3R5bGUiLCJsZWZ0Iiwic2lkZUJhclZpc2libGUiLCJ0IiwiYiIsImMiLCJkIiwic2lkZUJhckVsZW0iLCJzaWRlQmFyT2Zmc2V0Iiwic2lkZUJhclBvcyIsInBvc2l0aW9uIiwic2Nyb2xsVG9wRG9jIiwibW92ZVNpZGVCYXJWYWwiLCJzaWRlQmFySXRlbXMiLCJhcnRpY2xlcyIsInNpZGVCYXJMaW5rcyIsIm9mZnNldEFydGljbGVzIiwicHVzaCIsInNpZGVCYXJMaW5rIiwiYXJ0aWNsZSIsImoiLCJsZW5ndGgiLCJzZXQiLCJiZ1dpZHRoIiwib2Zmc2V0V2lkdGgiLCJwb3NMZWZ0IiwiZm9ybUNvbnRhaW5lciIsIm9mZnNldExlZnQiLCJwb3NUb3AiLCJibHVyQ1NTIiwiZm9ybUJsdXIiLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRQb3NpdGlvbiIsIm9ucmVzaXplIiwicGFyYWxsYXhDb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImxheWVycyIsImNoaWxkcmVuIiwibW92ZUxheWVycyIsImluaXRpYWxYIiwiaW5uZXJXaWR0aCIsImluaXRpYWxZIiwibGF5ZXIiLCJwb3NpdGlvblgiLCJwb3NpdGlvblkiLCJib3R0b21Qb3NpdGlvbiIsImltYWdlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJ0cmFuc2Zvcm0iLCJ0b0NsYXNzIiwib2Zmc2V0VmFsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REFBLE9BQU9DLE9BQVAsR0FBaUIsVUFBQ0MsU0FBRCxFQUFZQyxFQUFaLEVBQThDO0FBQUEsUUFBOUJDLE9BQThCLHVFQUFwQixDQUFvQjtBQUFBLFFBQWpCQyxJQUFpQix1RUFBVixLQUFVOzs7QUFFM0Q7QUFDQTtBQUNBLFFBQUlDLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUIsTUFBTU4sU0FBN0IsQ0FBWDtBQUNBLFFBQUcsQ0FBQ0ksSUFBSixFQUFVQSxPQUFPQyxTQUFTQyxhQUFULENBQXVCLE1BQU1OLFNBQTdCLENBQVA7QUFDVixRQUFJTyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLFNBQUQsRUFBWUosSUFBWixFQUFxQjtBQUNyQyxZQUFJSyxTQUFTTCxL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsR2dDLE9BQXhCLENBQVY7QUFxR0QsS0F0R0Q7QUF3R0Q7QUFDRixDQTVIRCxDOzs7Ozs7QUNIQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUEsQ0FBQzs7O0FBR0Q7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FB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UixDQUFZLHFCQUFaOztBQUVBQyxlQUFPTixnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFNO0FBQ25DLGdDQUFLLE1BQUkwSixPQUFULEVBQWtCO0FBQ2R4RCwwQkFBVSxJQURJO0FBRWRoSCx3QkFBUXlLLFNBRk07QUFHZHhELDBCQUFVQyxTQUhJO0FBSWRDLHdCQUFRQyxhQUpNO0FBS2RDLHNCQUFNO0FBTFEsYUFBbEI7QUFPSCxTQVJEO0FBU0g7QUFDRCxRQUFNRCxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNNLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQLEVBQVVDLENBQVYsRUFBZ0I7QUFDbENILGFBQUtHLElBQUksQ0FBVDtBQUNBLFlBQUlILElBQUksQ0FBUixFQUFXLE9BQU9FLElBQUksQ0FBSixHQUFRRixDQUFSLEdBQVlBLENBQVosR0FBZ0JDLENBQXZCO0FBQ1hEO0FBQ0EsZUFBTyxDQUFDRSxDQUFELEdBQUssQ0FBTCxJQUFVRixLQUFLQSxJQUFJLENBQVQsSUFBYyxDQUF4QixJQUE2QkMsQ0FBcEM7QUFDRCxLQUxIO0FBUUgsQ0F6QkQsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1N2IzMzNkOWIxZjYzZWJjZjNiOSIsIm1vZHVsZS5leHBvcnRzID0gKGVsZW1DbGFzcywgZm4sIGRpdmlkZXIgPSAyLCBsb29wID0gZmFsc2UpID0+IHtcblxuICAgIC8vLy8vLy8vLy8vL1xuICAgIC8vIGNvbnNvbGUubG9nKGVsZW1DbGFzcylcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgZWxlbUNsYXNzKTtcbiAgICBpZighZWxlbSkgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgZWxlbUNsYXNzKTtcbiAgICBsZXQgY2hlY2tEaXN0YW5jZSA9IChzY3JvbGxUb3AsIGVsZW0pID0+IHtcbiAgICAgICAgbGV0IG9mZnNldCA9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICBsZXQgd2luZG93TWFyZ2luID0gTWF0aC5jZWlsKHdpbmRvdy5pbm5lckhlaWdodCAvIGRpdmlkZXIpO1xuICAgICAgICBsZXQgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luO1xuICAgICAgICBsZXQgYm90dG9tRWRnZSA9IGVsZW0uY2xpZW50SGVpZ2h0ICsgb2Zmc2V0O1xuICAgICAgICBsZXQgYm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogdG9wQm9yZGVyLFxuICAgICAgICAgICAgYm90dG9tOiBib3R0b21Cb3JkZXJcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IGZuRG9uZSA9IGZhbHNlO1xuICAgIGlmIChlbGVtKSB7XG4gICAgICAgIFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICAgIGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgZWxlbSkudG9wIDw9IDAgJiYgIWZuRG9uZSAmJiBjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgZWxlbSkuYm90dG9tIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW4gZG9GbkVsZW1WaXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAobG9vcCkgPyBmbkRvbmUgPSBmYWxzZSA6IGZuRG9uZSA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vL1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2RvRm5FbGVtVmlzaWJsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGVsZW1DbGFzcywgYnV0dG9uQ2xhc3MsIGZuQWN0aXZlLCBmbikgPT4ge1xuICAgIC8vLy8vLy8vLy8vL1xuICAgIGZuID0gZm4gfHwgZnVuY3Rpb24oKXtjb25zb2xlLmxvZygnZW1wdHkgZm4gaW4gY2xpY2tUb2dnbGVDbGFzcycpfTtcbiAgICBmbkFjdGl2ZSA9IGZuQWN0aXZlIHx8IGZ1bmN0aW9uKCl7Y29uc29sZS5sb2coJ2VtcHR5IGZuQWN0aXZlIGluIGNsaWNrVG9nZ2xlQ2xhc3MnKX07IFxuICAgIFxuICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBlbGVtQ2xhc3MpXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYnV0dG9uQ2xhc3MpXG4gICAgbGV0IGNvbnRhaW5lclRvZ2dsZSA9ICgpID0+IHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QudG9nZ2xlKGVsZW1DbGFzcyArICctLWFjdGl2ZScpO1xuICAgICAgICAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoZWxlbUNsYXNzICsgJy0tYWN0aXZlJykpID8gZm5BY3RpdmUoKSA6IGZuKCk7XG4gICAgfTtcbiAgICBpZiAoZWxlbSAmJiBidXR0b24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIGNsaWNrVG9nZ2xlQ2xhc3MnKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udGFpbmVyVG9nZ2xlKTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vXG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvY2xpY2tUb2dnbGVDbGFzcy5qcyIsIi8vIFJvYmVydCBQZW5uZXIncyBlYXNlSW5PdXRRdWFkXG5cbi8vIGZpbmQgdGhlIHJlc3Qgb2YgaGlzIGVhc2luZyBmdW5jdGlvbnMgaGVyZTogaHR0cDovL3JvYmVydHBlbm5lci5jb20vZWFzaW5nL1xuLy8gZmluZCB0aGVtIGV4cG9ydGVkIGZvciBFUzYgY29uc3VtcHRpb24gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2pheGdlbGxlci9lei5qc1xuXG52YXIgZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICB0IC89IGQgLyAyO1xuICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcbiAgdC0tO1xuICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xufTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbnZhciBqdW1wZXIgPSBmdW5jdGlvbiBqdW1wZXIoKSB7XG4gIC8vIHByaXZhdGUgdmFyaWFibGUgY2FjaGVcbiAgLy8gbm8gdmFyaWFibGVzIGFyZSBjcmVhdGVkIGR1cmluZyBhIGp1bXAsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzXG5cbiAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7IC8vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvICAgICAgICAgICAgICAgICAgIChub2RlKVxuXG4gIHZhciBzdGFydCA9IHZvaWQgMDsgLy8gd2hlcmUgc2Nyb2xsIHN0YXJ0cyAgICAgICAgICAgICAgICAgICAgKHB4KVxuICB2YXIgc3RvcCA9IHZvaWQgMDsgLy8gd2hlcmUgc2Nyb2xsIHN0b3BzICAgICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIHZhciBvZmZzZXQgPSB2b2lkIDA7IC8vIGFkanVzdG1lbnQgZnJvbSB0aGUgc3RvcCBwb3NpdGlvbiAgICAgIChweClcbiAgdmFyIGVhc2luZyA9IHZvaWQgMDsgLy8gZWFzaW5nIGZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKVxuICB2YXIgYTExeSA9IHZvaWQgMDsgLy8gYWNjZXNzaWJpbGl0eSBzdXBwb3J0IGZsYWcgICAgICAgICAgICAgKGJvb2xlYW4pXG5cbiAgdmFyIGRpc3RhbmNlID0gdm9pZCAwOyAvLyBkaXN0YW5jZSBvZiBzY3JvbGwgICAgICAgICAgICAgICAgICAgICAocHgpXG4gIHZhciBkdXJhdGlvbiA9IHZvaWQgMDsgLy8gc2Nyb2xsIGR1cmF0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKG1zKVxuXG4gIHZhciB0aW1lU3RhcnQgPSB2b2lkIDA7IC8vIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQgICAgICAgICAgICAgICAgICAgIChtcylcbiAgdmFyIHRpbWVFbGFwc2VkID0gdm9pZCAwOyAvLyB0aW1lIHNwZW50IHNjcm9sbGluZyB0aHVzIGZhciAgICAgICAgICAobXMpXG5cbiAgdmFyIG5leHQgPSB2b2lkIDA7IC8vIG5leHQgc2Nyb2xsIHBvc2l0aW9uICAgICAgICAgICAgICAgICAgIChweClcblxuICB2YXIgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIHRvIGNhbGwgd2hlbiBkb25lIHNjcm9sbGluZyAgICAgICAgICAgIChmdW5jdGlvbilcblxuICAvLyBzY3JvbGwgcG9zaXRpb24gaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgfVxuXG4gIC8vIGVsZW1lbnQgb2Zmc2V0IGhlbHBlclxuXG4gIGZ1bmN0aW9uIHRvcChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc3RhcnQ7XG4gIH1cblxuICAvLyByQUYgbG9vcCBoZWxwZXJcblxuICBmdW5jdGlvbiBsb29wKHRpbWVDdXJyZW50KSB7XG4gICAgLy8gc3RvcmUgdGltZSBzY3JvbGwgc3RhcnRlZCwgaWYgbm90IHN0YXJ0ZWQgYWxyZWFkeVxuICAgIGlmICghdGltZVN0YXJ0KSB7XG4gICAgICB0aW1lU3RhcnQgPSB0aW1lQ3VycmVudDtcbiAgICB9XG5cbiAgICAvLyBkZXRlcm1pbmUgdGltZSBzcGVudCBzY3JvbGxpbmcgc28gZmFyXG4gICAgdGltZUVsYXBzZWQgPSB0aW1lQ3VycmVudCAtIHRpbWVTdGFydDtcblxuICAgIC8vIGNhbGN1bGF0ZSBuZXh0IHNjcm9sbCBwb3NpdGlvblxuICAgIG5leHQgPSBlYXNpbmcodGltZUVsYXBzZWQsIHN0YXJ0LCBkaXN0YW5jZSwgZHVyYXRpb24pO1xuXG4gICAgLy8gc2Nyb2xsIHRvIGl0XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIG5leHQpO1xuXG4gICAgLy8gY2hlY2sgcHJvZ3Jlc3NcbiAgICB0aW1lRWxhcHNlZCA8IGR1cmF0aW9uID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSAvLyBjb250aW51ZSBzY3JvbGwgbG9vcFxuICAgIDogZG9uZSgpOyAvLyBzY3JvbGxpbmcgaXMgZG9uZVxuICB9XG5cbiAgLy8gc2Nyb2xsIGZpbmlzaGVkIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgLy8gYWNjb3VudCBmb3IgckFGIHRpbWUgcm91bmRpbmcgaW5hY2N1cmFjaWVzXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHN0YXJ0ICsgZGlzdGFuY2UpO1xuXG4gICAgLy8gaWYgc2Nyb2xsaW5nIHRvIGFuIGVsZW1lbnQsIGFuZCBhY2Nlc3NpYmlsaXR5IGlzIGVuYWJsZWRcbiAgICBpZiAoZWxlbWVudCAmJiBhMTF5KSB7XG4gICAgICAvLyBhZGQgdGFiaW5kZXggaW5kaWNhdGluZyBwcm9ncmFtbWF0aWMgZm9jdXNcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuXG4gICAgICAvLyBmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGV4aXN0cywgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHRpbWUgZm9yIG5leHQganVtcFxuICAgIHRpbWVTdGFydCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQVBJXG5cbiAgZnVuY3Rpb24ganVtcCh0YXJnZXQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAvLyByZXNvbHZlIG9wdGlvbnMsIG9yIHVzZSBkZWZhdWx0c1xuICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwO1xuICAgIG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0IHx8IDA7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrOyAvLyBcInVuZGVmaW5lZFwiIGlzIGEgc3VpdGFibGUgZGVmYXVsdCwgYW5kIHdvbid0IGJlIGNhbGxlZFxuICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nIHx8IGVhc2VJbk91dFF1YWQ7XG4gICAgYTExeSA9IG9wdGlvbnMuYTExeSB8fCBmYWxzZTtcblxuICAgIC8vIGNhY2hlIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgc3RhcnQgPSBsb2NhdGlvbigpO1xuXG4gICAgLy8gcmVzb2x2ZSB0YXJnZXRcbiAgICBzd2l0Y2ggKHR5cGVvZiB0YXJnZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRhcmdldCkpIHtcbiAgICAgIC8vIHNjcm9sbCBmcm9tIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGVsZW1lbnQgPSB1bmRlZmluZWQ7IC8vIG5vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgICAgIGExMXkgPSBmYWxzZTsgLy8gbWFrZSBzdXJlIGFjY2Vzc2liaWxpdHkgaXMgb2ZmXG4gICAgICAgIHN0b3AgPSBzdGFydCArIHRhcmdldDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChub2RlKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGVsZW1lbnQgPSB0YXJnZXQ7XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAoc2VsZWN0b3IpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBzY3JvbGwgZGlzdGFuY2UsIGFjY291bnRpbmcgZm9yIG9mZnNldFxuICAgIGRpc3RhbmNlID0gc3RvcCAtIHN0YXJ0ICsgb2Zmc2V0O1xuXG4gICAgLy8gcmVzb2x2ZSBkdXJhdGlvblxuICAgIHN3aXRjaCAoX3R5cGVvZihvcHRpb25zLmR1cmF0aW9uKSkge1xuICAgICAgLy8gbnVtYmVyIGluIG1zXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBmdW5jdGlvbiBwYXNzZWQgdGhlIGRpc3RhbmNlIG9mIHRoZSBzY3JvbGxcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uKGRpc3RhbmNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgdGhlIGxvb3BcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICB9XG5cbiAgLy8gZXhwb3NlIG9ubHkgdGhlIGp1bXAgbWV0aG9kXG4gIHJldHVybiBqdW1wO1xufTtcblxuLy8gZXhwb3J0IHNpbmdsZXRvblxuXG52YXIgc2luZ2xldG9uID0ganVtcGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2p1bXAuanMvZGlzdC9qdW1wLm1vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZnVsbE1lbnUgZnJvbSAnLi9tb2R1bGVzL2Z1bGxNZW51JztcbmltcG9ydCBtYXBJbml0IGZyb20gJy4vbW9kdWxlcy9tYXBzLmpzJ1xuaW1wb3J0IGZsaXBMb2dpbkZvcm0gZnJvbSAnLi9tb2R1bGVzL2ZsaXBMb2dpbkZvcm0nXG5pbXBvcnQgc2tpbGxQcm9ncmVzc0luaXQgZnJvbSAnLi9tb2R1bGVzL3NraWxsUHJvZ3Jlc3NJbml0J1xuaW1wb3J0IGJsb2dTaWRlQmFyIGZyb20gJy4vbW9kdWxlcy9ibG9nU2lkZUJhcidcbmltcG9ydCBzdmc0ZXZlcnlib2R5IGZyb20gJ3N2ZzRldmVyeWJvZHknXG5pbXBvcnQgYmx1ckZvcm0gZnJvbSAnLi9tb2R1bGVzL2JsdXJGb3JtJ1xuaW1wb3J0IHBhcmFsbGF4QmcgZnJvbSAnLi9tb2R1bGVzL3BhcmFsbGF4TW91bnRhaW5zJ1xuaW1wb3J0IHNtb290aFNjcm9sbENsaWNrIGZyb20gJy4vbW9kdWxlcy9zbW90aFNjcm9sbENsaWNrLmpzJ1xuXG5sZXQgZG9tcmVhZHkgPSBmdW5jdGlvbiAoKSB7Ly9ET00g0LTQtdGA0LXQstC+INC30LDQs9GA0YPQt9C40LvQvtGB0YxcbiAgICAvLy8vLy8vXG4gICAgY29uc29sZS5sb2coJ2VudHJ5IHN0YXJ0Jyk7XG5cbiAgICBzdmc0ZXZlcnlib2R5KCk7Ly/Qt9Cw0L/Rg9GB0Log0YHQutGA0LjQv9GC0LAg0YfRgtC+0LHRiyDQstGB0LUg0LLQvdC10YjQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90LjRjyBzdmcg0LHRi9C70Lgg0LrRgNC+0YHRgdCx0YDQsNGD0LfQtdGA0L3Ri9C80LhcblxuICAgIHBhcmFsbGF4QmcoKTsvL9C30LDQv9GD0YHQuiDRgdC60YDQuNC/0YLQsCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQv9Cw0YDQsNC70LDQutGB0LBcbiAgICBmbGlwTG9naW5Gb3JtKCd3ZWxjb21lX19sb2dpbi1idXR0b24nLCAnbG9naW5fX2J1dHRvbnMtbWFpbicsICdmbGlwX19jb250YWluZXInKTsgLy9mbGlwIGNvbnRhaW5lciBuZWVkIHRvIGJlIGEgY2xhc3NcblxuICAgIHNtb290aFNjcm9sbENsaWNrKCdoZWFkZXJfX2Fycm93LWltZycsICdjb250ZW50Jyk7XG4gICAgc21vb3RoU2Nyb2xsQ2xpY2soJ2Zvb3Rlcl9fYXJyb3cnLCAnd3JhcHBlcicpO1xuICAgIFxuICAgIGZ1bGxNZW51KCdoYW1idXJnZXInLCAnbWVudScpO1xuXG4gICAgYmx1ckZvcm0oKTtcbiAgICBcbiAgICBtYXBJbml0KCdtYXAnKTtcbiAgICBza2lsbFByb2dyZXNzSW5pdCgnc2tpbGwnLCAnc2tpbGxfX2JhcicsICdkYXRhLXBjdCcpOyAvL9C60LvQsNGB0YHRiyDQsdC10LcgLlxuXG4gICAgYmxvZ1NpZGVCYXIoJ2FydGljbGVfX2xpc3QnLCAnYXJ0aWNsZV9fbGlzdC1jaXJjbGUnKTtcblxuICAgIC8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnZW50cnkgZG9uZScpO1xuXG59XG5cblxuLy8vLy8vLy8vL2RvbXJlYWR5Ly8vLy8vLy8vLy8vL1xuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fFxuICAgIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKSkge1xuICAgIGRvbXJlYWR5KCk7XG59IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGRvbXJlYWR5KTtcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsImltcG9ydCBpc1Njcm9sbCBmcm9tICcuL2lzU2Nyb2xsJztcbmltcG9ydCBjbGlja1RvZ2dsZUNsYXNzIGZyb20gJy4vY2xpY2tUb2dnbGVDbGFzcydcbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbkNsYXNzLCB2aWV3Q2xhc3MpID0+IHtcbiAgICAvLy8vL1xuICAgIGxldCB2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyB2aWV3Q2xhc3MpO1xuICAgIGlmICh2aWV3KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBmdWxsTWVudScpO1xuICAgICAgICBsZXQgc2Nyb2xsWWVzID0gKCkgPT4ge1xuICAgICAgICAgICAgaXNTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBzY3JvbGxObyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlzU2Nyb2xsKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xpY2tUb2dnbGVDbGFzcyh2aWV3Q2xhc3MsIGJ1dHRvbkNsYXNzLCBzY3JvbGxObywgc2Nyb2xsWWVzKTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2Z1bGxNZW51LmpzIiwiLy/RhNGD0L3QutGG0LjRjyDRgNCw0LfRgNC10YjQtdC90LjRjy/Qt9Cw0L/RgNC10YLQsCDRgdC60YDQvtC70LvQsC8vXG5sZXQgcHJldkRlZiA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IChib29sKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2luIGlzU2Nyb2xsLmpzJyk7XG4gICAgZG9jdW1lbnQub25tb3VzZXdoZWVsPWRvY3VtZW50Lm9ud2hlZWw9ZnVuY3Rpb24oKXtcbnJldHVybiAoIWJvb2wpID8gZmFsc2UgOiB0cnVlOyAgICB9O1xuICAgIGlmKGJvb2w9PWZhbHNlKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZEZWYsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZEZWYsIGZhbHNlKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1vek1vdXNlUGl4ZWxTY3JvbGxcIixmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gKCFib29sKSA/IGZhbHNlIDogdHJ1ZTsgICAgfSxmYWxzZSk7XG4gICAgZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKGUpIHtcbiAgICBcdGlmIChlLmtleUNvZGU+PTMzJiZlLmtleUNvZGU8PTQwKXtcbiAgICAgICAgICAgIHJldHVybiAoIWJvb2wpID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9pc1Njcm9sbC5qcyIsIi8vIGltcG9ydCB5bWFwcyBmcm9tICd5bWFwcydcbnZhciBHb29nbGVNYXBzTG9hZGVyID0gcmVxdWlyZSgnZ29vZ2xlLW1hcHMnKTsgLy8gb25seSBmb3IgY29tbW9uIGpzIGVudmlyb25tZW50cyBcblxubW9kdWxlLmV4cG9ydHMgPSAobWFwU2VsZWN0b3IpID0+IHtcbiAgLy8vLy8vLy8vL1xuICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG1hcFNlbGVjdG9yKTtcbiAgaWYgKGVsKSB7XG4gICAgY29uc29sZS5sb2coJ2luIG1hcEluaXQnKVxuICAgIHZhciBzYXJvdiA9IHtcbiAgICAgIGxhdDogNTQuOTMxOTExLFxuICAgICAgbG5nOiA0My4zMjc2ODNcbiAgICB9O1xuICAgIHZhciB6b29tVmFsID0gMTU7XG5cbiAgICB2YXIgc2NyZWVuV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIGlmIChzY3JlZW5XaWR0aCA8PSAxMDI0KSB6b29tVmFsID0gMTQ7XG4gICAgaWYgKHNjcmVlbldpZHRoIDw9IDQ4MCkgem9vbVZhbCA9IDEzO1xuXG5cblxuICAgIEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gJ0FJemFTeUJFU3dQZ3M3Ynpib0oyNFdzVVFwSkMzemJhWXhZYlJuNCc7XG5cbiAgICBHb29nbGVNYXBzTG9hZGVyLmxvYWQoZnVuY3Rpb24gKGdvb2dsZSkge1xuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWwsIHtcbiAgICAgICAgem9vbTogem9vbVZhbCxcbiAgICAgICAgY2VudGVyOiBzYXJvdixcbiAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxuICAgICAgICBtYXBUeXBlSWQ6ICdzYXRlbGxpdGUnXG4gICAgICAgIC8vICAgc3R5bGVzOiBbXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmNWY1ZjUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMuaWNvbicsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3t2aXNpYmlsaXR5OiAnb2ZmJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM2MTYxNjEnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5zdHJva2UnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZjVmNWY1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAnYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWwnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNiZGJkYmQnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdtYW5fbWFkZScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeS5zdHJva2UnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjYmRiZGJkJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2VlZWVlZSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzc1NzU3NSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaS5wYXJrJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2U1ZTVlNSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaS5wYXJrJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjOWU5ZTllJ31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZCcsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmZmZmZmYnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmFydGVyaWFsJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNzU3NTc1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2RhZGFkYSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQuaGlnaHdheScsXG4gICAgICAgIC8vICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzYxNjE2MSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQubG9jYWwnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgIC8vICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM5ZTllOWUnfV1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgZmVhdHVyZVR5cGU6ICd0cmFuc2l0LmxpbmUnLFxuICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZTVlNWU1J31dXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGZlYXR1cmVUeXBlOiAndHJhbnNpdC5zdGF0aW9uJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2VlZWVlZSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3dhdGVyJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgLy8gICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzAwYmZhNSd9XVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgICBmZWF0dXJlVHlwZTogJ3dhdGVyJyxcbiAgICAgICAgLy8gICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAvLyAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjOWU5ZTllJ31dXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIF1cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9tYXBzLmpzIiwiKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblxuXHRpZiAocm9vdCA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignR29vZ2xlLW1hcHMgcGFja2FnZSBjYW4gYmUgdXNlZCBvbmx5IGluIGJyb3dzZXInKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5Hb29nbGVNYXBzTG9hZGVyID0gZmFjdG9yeSgpO1xuXHR9XG5cbn0pKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbCwgZnVuY3Rpb24oKSB7XG5cblxuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgZ29vZ2xlVmVyc2lvbiA9ICczLjE4JztcblxuXHR2YXIgc2NyaXB0ID0gbnVsbDtcblxuXHR2YXIgZ29vZ2xlID0gbnVsbDtcblxuXHR2YXIgbG9hZGluZyA9IGZhbHNlO1xuXG5cdHZhciBjYWxsYmFja3MgPSBbXTtcblxuXHR2YXIgb25Mb2FkRXZlbnRzID0gW107XG5cblx0dmFyIG9yaWdpbmFsQ3JlYXRlTG9hZGVyTWV0aG9kID0gbnVsbDtcblxuXG5cdHZhciBHb29nbGVNYXBzTG9hZGVyID0ge307XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLlVSTCA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUyA9IFtdO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwgPSBudWxsO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuTEFOR1VBR0UgPSBudWxsO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuUkVHSU9OID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLlZFUlNJT04gPSBnb29nbGVWZXJzaW9uO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUUgPSAnX19nb29nbGVfbWFwc19hcGlfcHJvdmlkZXJfaW5pdGlhbGl6YXRvcl9fJztcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuX2dvb2dsZU1vY2tBcGlPYmplY3QgPSB7fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIubG9hZCA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0aWYgKGdvb2dsZSA9PT0gbnVsbCkge1xuXHRcdFx0aWYgKGxvYWRpbmcgPT09IHRydWUpIHtcblx0XHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goZm4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2FkaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHR3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZWFkeShmbik7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIoKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGZuKSB7XG5cdFx0XHRmbihnb29nbGUpO1xuXHRcdH1cblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0XHRzY3JpcHQuc3JjID0gR29vZ2xlTWFwc0xvYWRlci5jcmVhdGVVcmwoKTtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuaXNMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZ29vZ2xlICE9PSBudWxsO1xuXHR9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVVcmwgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgdXJsID0gR29vZ2xlTWFwc0xvYWRlci5VUkw7XG5cblx0XHR1cmwgKz0gJz9jYWxsYmFjaz0nICsgR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRTtcblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLktFWSkge1xuXHRcdFx0dXJsICs9ICcma2V5PScgKyBHb29nbGVNYXBzTG9hZGVyLktFWTtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5MSUJSQVJJRVMubGVuZ3RoID4gMCkge1xuXHRcdFx0dXJsICs9ICcmbGlicmFyaWVzPScgKyBHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUy5qb2luKCcsJyk7XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UKSB7XG5cdFx0XHR1cmwgKz0gJyZjbGllbnQ9JyArIEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UICsgJyZ2PScgKyBHb29nbGVNYXBzTG9hZGVyLlZFUlNJT047XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuQ0hBTk5FTCkge1xuXHRcdFx0dXJsICs9ICcmY2hhbm5lbD0nICsgR29vZ2xlTWFwc0xvYWRlci5DSEFOTkVMO1xuXHRcdH1cblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLkxBTkdVQUdFKSB7XG5cdFx0XHR1cmwgKz0gJyZsYW5ndWFnZT0nICsgR29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRTtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5SRUdJT04pIHtcblx0XHRcdHVybCArPSAnJnJlZ2lvbj0nICsgR29vZ2xlTWFwc0xvYWRlci5SRUdJT047XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVybDtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIucmVsZWFzZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIHJlbGVhc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gbnVsbDtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuTElCUkFSSUVTID0gW107XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkNMSUVOVCA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwgPSBudWxsO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRSA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLlJFR0lPTiA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLlZFUlNJT04gPSBnb29nbGVWZXJzaW9uO1xuXG5cdFx0XHRnb29nbGUgPSBudWxsO1xuXHRcdFx0bG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0XHRvbkxvYWRFdmVudHMgPSBbXTtcblxuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cuZ29vZ2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRkZWxldGUgd2luZG93Lmdvb2dsZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdGRlbGV0ZSB3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCAhPT0gbnVsbCkge1xuXHRcdFx0XHRHb29nbGVNYXBzTG9hZGVyLmNyZWF0ZUxvYWRlciA9IG9yaWdpbmFsQ3JlYXRlTG9hZGVyTWV0aG9kO1xuXHRcdFx0XHRvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzY3JpcHQgIT09IG51bGwpIHtcblx0XHRcdFx0c2NyaXB0LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRcdFx0c2NyaXB0ID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdGZuKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlmIChsb2FkaW5nKSB7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJlbGVhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxlYXNlKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5vbkxvYWQgPSBmdW5jdGlvbihmbikge1xuXHRcdG9uTG9hZEV2ZW50cy5wdXNoKGZuKTtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIubWFrZU1vY2sgPSBmdW5jdGlvbigpIHtcblx0XHRvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyO1xuXG5cdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5nb29nbGUgPSBHb29nbGVNYXBzTG9hZGVyLl9nb29nbGVNb2NrQXBpT2JqZWN0O1xuXHRcdFx0d2luZG93W0dvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUVdKCk7XG5cdFx0fTtcblx0fTtcblxuXG5cdHZhciByZWFkeSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIGk7XG5cblx0XHRsb2FkaW5nID0gZmFsc2U7XG5cblx0XHRpZiAoZ29vZ2xlID09PSBudWxsKSB7XG5cdFx0XHRnb29nbGUgPSB3aW5kb3cuZ29vZ2xlO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCBvbkxvYWRFdmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG9uTG9hZEV2ZW50c1tpXShnb29nbGUpO1xuXHRcdH1cblxuXHRcdGlmIChmbikge1xuXHRcdFx0Zm4oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjYWxsYmFja3NbaV0oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRjYWxsYmFja3MgPSBbXTtcblx0fTtcblxuXG5cdHJldHVybiBHb29nbGVNYXBzTG9hZGVyO1xuXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dvb2dsZS1tYXBzL2xpYi9Hb29nbGUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAobG9naW5CdXR0b24sIG1haW5CdXR0b24sIGZsaXBDb250YWluZXIpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICBsZXQgZmxpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgZmxpcENvbnRhaW5lcik7XG4gICAgbGV0IGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBsb2dpbkJ1dHRvbik7XG4gICAgbGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIG1haW5CdXR0b24pO1xuICAgIGlmIChmbGlwICYmIGxvZ2luICYmIG1haW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIGZsaXBMb2dpbkZvcm0nKTtcbiAgICAgICAgbG9naW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBmbGlwLmNsYXNzTGlzdC5hZGQoZmxpcENvbnRhaW5lciArICctLWFjdGl2ZScpO1xuICAgICAgICAgICAgbG9naW4uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIGxvZ2luLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgfSk7XG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBmbGlwLmNsYXNzTGlzdC5yZW1vdmUoZmxpcENvbnRhaW5lciArICctLWFjdGl2ZScpO1xuICAgICAgICAgICAgbG9naW4uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGxvZ2luLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9mbGlwTG9naW5Gb3JtLmpzIiwiLy8vL9CQ0L3QuNC80LDRhtC40Y8gc3ZnINC60L7Qu9C10YYg0LTQu9GPINGN0LvQtdC80LXQvdGC0L7QsiAn0YHQutC40LvRiydcbmltcG9ydCBkb0ZuRWxlbVZpc2libGUgZnJvbSAnLi9kb0ZuRWxlbVZpc2libGUnXG5tb2R1bGUuZXhwb3J0cyA9IChjb250YWluZXIsIGJhciwgYXR0cikgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vXG4gICAgbGV0IHNraWxsID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgY29udGFpbmVyKV07IC8v0L/QvtC70YPRh9C10L3QuNC1INCy0YHQtdGFINC+0LHQtdGA0YLQvtC6INCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGRhdGEtcGN0XG4gICAgbGV0IHN2Z0NpcmNsZXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBiYXIpXTsgLy/Qv9C+0LvRg9GH0LXQvdC40LUg0LLRgdC10YUg0LrQvtC70LXRhlxuICAgIGxldCBwZXJjZW50ID0gW107IC8vINC80LDRgdGB0LjQsiDQt9C90LDRh9C10L3QuNC5INCy0LfRj9GC0YvRhSDQuNC3IGh0bWwg0LrQvtC00LAgLSDQutC+0YLQvtGA0YvQtSDRgtGD0LTQsCDQsdGL0LvQuCDQstGB0YLQsNCy0LvQtdC90Ysg0LjQtyDQsNC00LzQuNC90LrQuCDRh9C10YDQtdC3IGJhY2tlbmRcbiAgICBsZXQgY3VycmVudENpcmNsZTsgLy/QutC+0L3RgtC10LnQvdC10YAg0LTQu9GPINC+0YLQtdC70YzQvdC+0LPQviDQutC+0LvRjNGG0LBcbiAgICAvL9GB0L7QsdGL0YLQuNC1LCDQutC+0YLQvtGA0L7QtSDQv9GA0LjRgdCy0LDQuNCy0LDQtdGCINC30L3QsNGH0LXQvdC40LUg0LrQvtC70YzRhtCw0LxcbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNraWxsLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIHBlcmNlbnRbaV0gPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShhdHRyKSk7IC8v0L/QvtC70YPRh9C40LvQuCDQt9C90LDRh9C10L3QuNC1INC/0YDQvtGG0LXQvdGC0L7QsiDQuCDQv9C10YDQtdCy0LXQu9C4INCyIG51bWJlclxuICAgICAgICAgICAgY3VycmVudENpcmNsZSA9IGl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShiYXIpOyAvL9Cy0YvQsdGA0LDQu9C4INC60L7Qu9GM0YbQviDQuNC3INGC0LXQutGD0YnQtdC5INC+0LHQtdGA0YLQutC4XG4gICAgICAgICAgICBjdXJyZW50Q2lyY2xlWzBdLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSAoKDEwMCAtIHBlcmNlbnRbaV0pIC8gMTAwKSAqIE1hdGguUEkgKiAxODA7IC8vINC/0YDQuNGB0LLQsNC40LLQsNC90LjQtSDRgtC10LrRg9GJ0LXQvNGDINC60L7Qu9GM0YbRgyDQt9C90LDRh9C10L3QuNGPINC/0LXRgNC10LLQtdC00LXQvdC90L7QvNGDINC00LvRjyDRgdC/0LXRhiDRgdCy0L7QudGB0YLQstCwIHN2ZyDQuNC3INC/0YDQvtGG0LXQvdGC0L7QslxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZiAoc2tpbGwgJiYgc3ZnQ2lyY2xlcykge1xuICAgICAgICAvL9C+0LHQvdGD0LvQtdC90LjQtSDQt9C90LDRh9C10L3QuNC5INCy0L4g0LLRgdC10YUg0LrQvtC70YzRhtCw0YVcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHNraWxsUHJvZ2dyZXNzSW5pdCcpXG4gICAgICAgIHN2Z0NpcmNsZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGkuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IE1hdGguUEkgKiAxODA7XG4gICAgICAgIH0pXG4gICAgICAgIGRvRm5FbGVtVmlzaWJsZSgnc2tpbGxzJywgaGFuZGxlQ2xpY2spO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9za2lsbFByb2dyZXNzSW5pdC5qcyIsImltcG9ydCBjbGlja1RvZ2dsZUNsYXNzIGZyb20gJy4vY2xpY2tUb2dnbGVDbGFzcydcbmltcG9ydCBkb0ZuRWxlbVZpc2libGUgZnJvbSAnLi9kb0ZuRWxlbVZpc2libGUnXG5pbXBvcnQganVtcCBmcm9tICdqdW1wLmpzJ1xuaW1wb3J0IG1vdmVTaWRlQmFyIGZyb20gJy4vbW92ZVNpZGVCYXInXG5pbXBvcnQgYWN0aXZhdGVTaWRlQmFyTGluayBmcm9tICcuL2FjdGl2YXRlU2lkZUJhckxpbmsnXG5cbm1vZHVsZS5leHBvcnRzID0gKHNpZGVCYXJDbGFzcywgYnV0dG9uQ2xhc3MpID0+IHtcbiAgICAvLy8vLy8vLy8vLy9cbiAgICBsZXQgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2lkZUJhckNsYXNzKVxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGJ1dHRvbkNsYXNzKVxuICAgIGxldCB0b3VjaEV2ZW50ID0gKCkgPT4ge1xuICAgICAgICB2YXIgaW5pdGlhbFBvaW50O1xuICAgICAgICB2YXIgZmluYWxQb2ludDtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgaW5pdGlhbFBvaW50ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGZpbmFsUG9pbnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgIHZhciB4QWJzID0gTWF0aC5hYnMoaW5pdGlhbFBvaW50LnBhZ2VYIC0gZmluYWxQb2ludC5wYWdlWCk7XG4gICAgICAgICAgICB2YXIgeUFicyA9IE1hdGguYWJzKGluaXRpYWxQb2ludC5wYWdlWSAtIGZpbmFsUG9pbnQucGFnZVkpO1xuICAgICAgICAgICAgaWYgKHhBYnMgPiAyMCB8fCB5QWJzID4gMjApIHtcbiAgICAgICAgICAgICAgICBpZiAoeEFicyA+IHlBYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9pbnQucGFnZVggPCBpbml0aWFsUG9pbnQucGFnZVgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0KHQktCQ0JnQnyDQktCb0JXQktCeKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LnJlbW92ZShzaWRlQmFyQ2xhc3MgKyAnLS1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyrQodCS0JDQmdCfINCS0J/QoNCQ0JLQniovXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoc2lkZUJhckNsYXNzICsgJy0tYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvaW50LnBhZ2VZIDwgaW5pdGlhbFBvaW50LnBhZ2VZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKtCh0JLQkNCZ0J8g0JLQktCV0KDQpSovXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKtCh0JLQkNCZ0J8g0JLQndCY0JcqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfTtcblxuICAgIGxldCBzaWRlQmFySnVtcEZuID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gc2lkZUJhckp1bXBGbicpXG4gICAgICAgIHNpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRMaW5rID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgLy8gdGFyZ2V0TGluay5jaGlsZHJlbignLmFydGljbGVzX19pdGVtJykuY2xhc3NMaXN0LmFkZCgnYXJ0aWNsZXNfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgICAgICBsZXQgYW5jaG9yTnVtID0gdGFyZ2V0TGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgIGlmIChhbmNob3JOdW0pIHtcbiAgICAgICAgICAgICAgICBhbmNob3JOdW0gPSBhbmNob3JOdW0uc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldEFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXJ0aWNsZScgKyBhbmNob3JOdW0pO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRBcnRpY2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRBcnRpY2xlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA+PSAxMDI1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRBcnRpY2xlID0gLTUwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0QXJ0aWNsZSA9IC0yMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBqdW1wKCcjYXJ0aWNsZScgKyBhbmNob3JOdW0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXRBcnRpY2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogZWFzZUluT3V0UXVhZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGExMXk6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LnJlbW92ZShzaWRlQmFyQ2xhc3MgKyAnLS1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgYWN0aXZhdGVTaWRlQmFyTGluaygpO1xuXG5cbiAgICBpZiAoc2lkZUJhciAmJiBidXR0b24pIHtcbiAgICAgICAgLy8vLy8vLy8vLy8vXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBibG9nU2lkZUJhcicpXG4gICAgICAgIGxldCBzdGFydExlZnRQb3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShidXR0b24pLmxlZnQ7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5sZWZ0ID0gLTEwMCArICdweCc7XG5cbiAgICAgICAgbGV0IHNpZGVCYXJWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmxlZnQgPSBzdGFydExlZnRQb3M7XG4gICAgICAgICAgICB0b3VjaEV2ZW50KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xpY2tUb2dnbGVDbGFzcyhzaWRlQmFyQ2xhc3MsIGJ1dHRvbkNsYXNzKTtcbiAgICAgICAgc2lkZUJhckp1bXBGbigpO1xuXG4gICAgICAgIGFjdGl2YXRlU2lkZUJhckxpbmsoKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8PSAxMDI0KVxuICAgICAgICAgICAgZG9GbkVsZW1WaXNpYmxlKCdhcnRpY2xlcycsIHNpZGVCYXJWaXNpYmxlKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBtb3ZlU2lkZUJhcihzaWRlQmFyKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBhY3RpdmF0ZVNpZGVCYXJMaW5rKCk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDw9IDEwMjQpIHtcbiAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUubGVmdCA9IC0zMCArICdweCc7XG4gICAgICAgICAgICAgICAgc2lkZUJhci5zdHlsZS50b3AgPSAtNSArICd2aCc7XG5cbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50KClcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIG1vdmVTaWRlQmFyKHNpZGVCYXIpXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLy8vLy8vLy8vLy9cblxuICAgIH1cblxuICAgIGNvbnN0IGVhc2VJbk91dFF1YWQgPSAodCwgYiwgYywgZCkgPT4ge1xuICAgICAgICB0IC89IGQgLyAyXG4gICAgICAgIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiXG4gICAgICAgIHQtLVxuICAgICAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiXG4gICAgfVxuICAgIC8vLy8vLy8vLy8vL1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2Jsb2dTaWRlQmFyLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IChzaWRlQmFyRWxlbSkgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnaW4gbW92ZVNpZGVCYXInKVxuXG5cbiAgICAgICAgICAgIGxldCBzaWRlQmFyT2Zmc2V0ID0gc2lkZUJhckVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICAgICAgbGV0IHNpZGVCYXJQb3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzaWRlQmFyRWxlbSkucG9zaXRpb247XG4gICAgICAgICAgICAvLyBsZXQgc2lkZUJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFydGljbGVfX2l0ZW0nKTtcbiAgICAgICAgICAgIC8vIGxldCBhcnRpY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlJyk7XG4gICAgICAgICAgICAvLyBsZXQgc2lkZUJhckxpbmtzID0gW107XG4gICAgICAgICAgICAvLyBsZXQgb2Zmc2V0QXJ0aWNsZXMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc2lkZUJhckl0ZW1zLmZvckVhY2goc2lkZUJhckxpbmsgPT4ge1xuICAgICAgICAgICAgLy8gICAgIHNpZGVCYXJMaW5rcy5wdXNoKHNpZGVCYXJMaW5rKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgLy8gLy8gZm9yKGxldCBpID0gMDsgaSA8IHNpZGVCYXJMaW5rcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAvLyAvLyAgICAgY29uc29sZS5sb2coc2lkZUJhckxpbmtzW2ldKVxuICAgICAgICAgICAgLy8gLy8gfVxuICAgICAgICAgICAgLy8gYXJ0aWNsZXMuZm9yRWFjaChhcnRpY2xlID0+IHtcbiAgICAgICAgICAgIC8vICAgICBvZmZzZXRBcnRpY2xlcy5wdXNoKGFydGljbGUub2Zmc2V0VG9wKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgLy8gYWN0aXZhdGVTaWRlQmFyTGluayhzaWRlQmFyTGlua3MsIG9mZnNldEFydGljbGVzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcERvYyA9IHdpbmRvdy5zY3JvbGxZICsgMTAwO1xuICAgICAgICAgICAgICAgIGxldCBtb3ZlU2lkZUJhclZhbCA9IHNjcm9sbFRvcERvYyAtIHNpZGVCYXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKG1vdmVTaWRlQmFyVmFsID49IDAgJiYgc2lkZUJhclBvcyA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICBzaWRlQmFyRWxlbS5zdHlsZS50b3AgPSBtb3ZlU2lkZUJhclZhbCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kdWxlcy9tb3ZlU2lkZUJhci5qcyIsIlxuaW1wb3J0IGRvRm5FbGVtVmlzaWJsZSBmcm9tICcuL2RvRm5FbGVtVmlzaWJsZSdcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICAgIC8vLy8vLy8vLy8vXG4gICAgY29uc29sZS5sb2coJ2luIGFjdGl2YXRlU2lkZUJhckxpbmsnKTtcbiAgICBsZXQgc2lkZUJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFydGljbGVfX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBhcnRpY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlJyk7XG4gICAgICAgICAgICBsZXQgc2lkZUJhckxpbmtzID0gW107XG4gICAgICAgICAgICBsZXQgb2Zmc2V0QXJ0aWNsZXMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2lkZUJhckl0ZW1zLmZvckVhY2goc2lkZUJhckxpbmsgPT4ge1xuICAgICAgICAgICAgICAgIHNpZGVCYXJMaW5rcy5wdXNoKHNpZGVCYXJMaW5rKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IHNpZGVCYXJMaW5rcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2lkZUJhckxpbmtzW2ldKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgYXJ0aWNsZXMuZm9yRWFjaChhcnRpY2xlID0+IHtcbiAgICAgICAgICAgICAgICBvZmZzZXRBcnRpY2xlcy5wdXNoKGFydGljbGUub2Zmc2V0VG9wKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNpZGVCYXJMaW5rcy5sZW5ndGggOyBpKyspe1xuICAgICAgICAvLyBjb25zb2xlLmxvZygn0LIg0YbQuNC60LvQtScpXG4gICAgICAgIHZhciBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgc2lkZUJhckxpbmtzLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgIHNpZGVCYXJMaW5rc1tqXS5jbGFzc0xpc3QucmVtb3ZlKCdhcnRpY2xlX19pdGVtLS1hY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2lkZUJhckxpbmtzW2ldLmNsYXNzTGlzdC5hZGQoJ2FydGljbGVfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpKzEpXG4gICAgICAgIH1cbiAgICAgICAgZG9GbkVsZW1WaXNpYmxlKCdhcnRpY2xlJysoaSsxKSwgZm4sIDMsIHRydWUpXG4gICAgfVxuICAgIFxuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL2FjdGl2YXRlU2lkZUJhckxpbmsuanMiLCIhZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZGVmaW5lICYmIGRlZmluZS5hbWQgPyAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUgdW5sZXNzIGFtZE1vZHVsZUlkIGlzIHNldFxuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByb290LnN2ZzRldmVyeWJvZHkgPSBmYWN0b3J5KCk7XG4gICAgfSkgOiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPyAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOiByb290LnN2ZzRldmVyeWJvZHkgPSBmYWN0b3J5KCk7XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgIC8qISBzdmc0ZXZlcnlib2R5IHYyLjEuOSB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9zdmc0ZXZlcnlib2R5ICovXG4gICAgZnVuY3Rpb24gZW1iZWQocGFyZW50LCBzdmcsIHRhcmdldCkge1xuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGV4aXN0c1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIHRoZSBjb250ZW50cyBvZiB0aGUgdGFyZ2V0XG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIHZpZXdCb3ggPSAhc3ZnLmhhc0F0dHJpYnV0ZShcInZpZXdCb3hcIikgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShcInZpZXdCb3hcIik7XG4gICAgICAgICAgICAvLyBjb25kaXRpb25hbGx5IHNldCB0aGUgdmlld0JveCBvbiB0aGUgc3ZnXG4gICAgICAgICAgICB2aWV3Qm94ICYmIHN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuICAgICAgICAgICAgLy8gY29weSB0aGUgY29udGVudHMgb2YgdGhlIGNsb25lIGludG8gdGhlIGZyYWdtZW50XG4gICAgICAgICAgICBmb3IgKC8vIGNsb25lIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHZhciBjbG9uZSA9IHRhcmdldC5jbG9uZU5vZGUoITApOyBjbG9uZS5jaGlsZE5vZGVzLmxlbmd0aDsgKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2xvbmUuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIGZyYWdtZW50IGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBsb2FkcmVhZHlzdGF0ZWNoYW5nZSh4aHIpIHtcbiAgICAgICAgLy8gbGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIHJlcXVlc3RcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHJlcXVlc3QgaXMgcmVhZHlcbiAgICAgICAgICAgIGlmICg0ID09PSB4aHIucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgY2FjaGVkRG9jdW1lbnQgPSB4aHIuX2NhY2hlZERvY3VtZW50O1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnQgYmFzZWQgb24gdGhlIHhociByZXNwb25zZVxuICAgICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50IHx8IChjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJcIiksIFxuICAgICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dCwgeGhyLl9jYWNoZWRUYXJnZXQgPSB7fSksIC8vIGNsZWFyIHRoZSB4aHIgZW1iZWRzIGxpc3QgYW5kIGVtYmVkIGVhY2ggaXRlbVxuICAgICAgICAgICAgICAgIHhoci5fZW1iZWRzLnNwbGljZSgwKS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGNhY2hlZCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0IHx8ICh0YXJnZXQgPSB4aHIuX2NhY2hlZFRhcmdldFtpdGVtLmlkXSA9IGNhY2hlZERvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpKSwgXG4gICAgICAgICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSB0YXJnZXQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICAgICAgICAgIGVtYmVkKGl0ZW0ucGFyZW50LCBpdGVtLnN2ZywgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgLy8gdGVzdCB0aGUgcmVhZHkgc3RhdGUgY2hhbmdlIGltbWVkaWF0ZWx5XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3ZnNGV2ZXJ5Ym9keShyYXdvcHRzKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uaW50ZXJ2YWwoKSB7XG4gICAgICAgICAgICAvLyB3aGlsZSB0aGUgaW5kZXggZXhpc3RzIGluIHRoZSBsaXZlIDx1c2U+IGNvbGxlY3Rpb25cbiAgICAgICAgICAgIGZvciAoLy8gZ2V0IHRoZSBjYWNoZWQgPHVzZT4gaW5kZXhcbiAgICAgICAgICAgIHZhciBpbmRleCA9IDA7IGluZGV4IDwgdXNlcy5sZW5ndGg7ICkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3VycmVudCA8dXNlPlxuICAgICAgICAgICAgICAgIHZhciB1c2UgPSB1c2VzW2luZGV4XSwgcGFyZW50ID0gdXNlLnBhcmVudE5vZGUsIHN2ZyA9IGdldFNWR0FuY2VzdG9yKHBhcmVudCksIHNyYyA9IHVzZS5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpIHx8IHVzZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgICAgICAgIGlmICghc3JjICYmIG9wdHMuYXR0cmlidXRlTmFtZSAmJiAoc3JjID0gdXNlLmdldEF0dHJpYnV0ZShvcHRzLmF0dHJpYnV0ZU5hbWUpKSwgXG4gICAgICAgICAgICAgICAgc3ZnICYmIHNyYykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9seWZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy52YWxpZGF0ZSB8fCBvcHRzLnZhbGlkYXRlKHNyYywgc3ZnLCB1c2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSA8dXNlPiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHVzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNyYyBhbmQgZ2V0IHRoZSB1cmwgYW5kIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNyY1NwbGl0ID0gc3JjLnNwbGl0KFwiI1wiKSwgdXJsID0gc3JjU3BsaXQuc2hpZnQoKSwgaWQgPSBzcmNTcGxpdC5qb2luKFwiI1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbGluayBpcyBleHRlcm5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHhociByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4aHIgPSByZXF1ZXN0c1t1cmxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIHhociByZXF1ZXN0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIgfHwgKHhociA9IHJlcXVlc3RzW3VybF0gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgeGhyLm9wZW4oXCJHRVRcIiwgdXJsKSwgeGhyLnNlbmQoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5fZW1iZWRzID0gW10pLCAvLyBhZGQgdGhlIHN2ZyBhbmQgaWQgYXMgYW4gaXRlbSB0byB0aGUgeGhyIGVtYmVkcyBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5fZW1iZWRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdmc6IHN2ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgLy8gcHJlcGFyZSB0aGUgeGhyIHJlYWR5IHN0YXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkcmVhZHlzdGF0ZWNoYW5nZSh4aHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSBsb2NhbCBpZCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWQocGFyZW50LCBzdmcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2luZGV4LCArK251bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICArK2luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIHRoZSBpbnRlcnZhbFxuICAgICAgICAgICAgKCF1c2VzLmxlbmd0aCB8fCB1c2VzLmxlbmd0aCAtIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA+IDApICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZShvbmludGVydmFsLCA2Nyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBvbHlmaWxsLCBvcHRzID0gT2JqZWN0KHJhd29wdHMpLCBuZXdlcklFVUEgPSAvXFxiVHJpZGVudFxcL1s1NjddXFxifFxcYk1TSUUgKD86OXwxMClcXC4wXFxiLywgd2Via2l0VUEgPSAvXFxiQXBwbGVXZWJLaXRcXC8oXFxkKylcXGIvLCBvbGRlckVkZ2VVQSA9IC9cXGJFZGdlXFwvMTJcXC4oXFxkKylcXGIvLCBlZGdlVUEgPSAvXFxiRWRnZVxcLy4oXFxkKylcXGIvLCBpbklmcmFtZSA9IHdpbmRvdy50b3AgIT09IHdpbmRvdy5zZWxmO1xuICAgICAgICBwb2x5ZmlsbCA9IFwicG9seWZpbGxcIiBpbiBvcHRzID8gb3B0cy5wb2x5ZmlsbCA6IG5ld2VySUVVQS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG9sZGVyRWRnZVVBKSB8fCBbXSlbMV0gPCAxMDU0NyB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCh3ZWJraXRVQSkgfHwgW10pWzFdIDwgNTM3IHx8IGVkZ2VVQS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmIGluSWZyYW1lO1xuICAgICAgICAvLyBjcmVhdGUgeGhyIHJlcXVlc3RzIG9iamVjdFxuICAgICAgICB2YXIgcmVxdWVzdHMgPSB7fSwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0LCB1c2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ1c2VcIiksIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA9IDA7XG4gICAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc3RhcnQgdGhlIGludGVydmFsIGlmIHRoZSBwb2x5ZmlsbCBpcyBhY3RpdmVcbiAgICAgICAgcG9seWZpbGwgJiYgb25pbnRlcnZhbCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTVkdBbmNlc3Rvcihub2RlKSB7XG4gICAgICAgIGZvciAodmFyIHN2ZyA9IG5vZGU7IFwic3ZnXCIgIT09IHN2Zy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICYmIChzdmcgPSBzdmcucGFyZW50Tm9kZSk7ICkge31cbiAgICAgICAgcmV0dXJuIHN2ZztcbiAgICB9XG4gICAgcmV0dXJuIHN2ZzRldmVyeWJvZHk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdmc0ZXZlcnlib2R5L2Rpc3Qvc3ZnNGV2ZXJ5Ym9keS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgbGV0IGZuID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgYmdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2JnLWltZycpLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBwb3NMZWZ0ID0gLWZvcm1Db250YWluZXIub2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgcG9zVG9wID0gLWZvcm1Db250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgICAgICAgICAgICBibHVyQ1NTID0gZm9ybUJsdXIuc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kU2l6ZSA9IChiZ1dpZHRoLShiZ1dpZHRoKjAuMDgzMykpICsgJ3B4JyArICcgJyArICdhdXRvJ1xuICAgICAgICAgICAgICAgICAgICBibHVyQ1NTLmJhY2tncm91bmRQb3NpdGlvbiA9IChwb3NMZWZ0LXBvc0xlZnQqMC4xMDkpICsgJ3B4JyArICcgJyArIChwb3NUb3AtcG9zVG9wKjAuMTE3OCkgKyAncHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KCkpO1xuXG4gICAgbGV0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuICAgIGxldCBmb3JtQmx1ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19ibHVyJyk7XG4gICAgaWYoZm9ybUNvbnRhaW5lciAmJiBmb3JtQmx1cil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBibHVyRm9ybScpXG4gICAgICAgIGZuLnNldCgpO1xuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZm4uc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvYmx1ckZvcm0uanMiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4gICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAvLyAgICAgbGV0IHdpbmRvd1dpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICAvLyAgICAgY29uc29sZS5sb2cod2luZG93V2lkdGgpO1xuICAgIC8vIH0pO1xuXG5cbiAgICAvLyBpZih3aW5kb3dXaWR0aD49MTAyNSl7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdpbiBwYXJhbGxheE1vdW50YWlucycpO1xuICAgIC8vIH1cblxuICAgIGNvbnN0IHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXG4gICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xuXG4gICAgY29uc3QgbW92ZUxheWVycyA9IGV2ZW50ID0+IHtcbiAgICAgICAgbGV0IGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBldmVudC5wYWdlWDtcbiAgICAgICAgbGV0IGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gZXZlbnQucGFnZVk7XG5cbiAgICAgICAgLy8gICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyLCBpbmRleCkge1xuICAgICAgICAvLyAgICAgdmFyIFxuICAgICAgICAvLyAgICAgICBkaXZpZGVyID0gaW5kZXggLyAxMDAsXG4gICAgICAgIC8vICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcbiAgICAgICAgLy8gICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAvLyAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXG4gICAgICAgIC8vICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4KScsXG4gICAgICAgIC8vICAgICAgIGltYWdlID0gbGF5ZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICAgICAgLy8gICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgLy8gICAgIGltYWdlLnN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcbiAgICAgICAgLy8gICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChsZXQgbGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgICAgICAgICBsZXQgZGl2aWRlciA9IGkgLyA4MCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBpbWFnZSA9IGxheWVyLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgICAgIGltYWdlLnN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcbiAgICAgICAgICAgICAgICBpZihldmVudC5wYWdlWTw9d2luZG93LmlubmVySGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgcG9zaXRpb25YICsgJ3B4LCAnICsgcG9zaXRpb25ZICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmVMYXllcnMpO1xuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZHVsZXMvcGFyYWxsYXhNb3VudGFpbnMuanMiLCJpbXBvcnQganVtcCBmcm9tICdqdW1wLmpzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b25DbGFzcywgdG9DbGFzcywgb2Zmc2V0VmFsKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicrYnV0dG9uQ2xhc3MpO1xuICAgIG9mZnNldFZhbCA9IG9mZnNldFZhbCB8fCAwXG4gICAgaWYoYnV0dG9uKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHNtb3RoU2Nyb2xsQXJyb3cnKVxuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGp1bXAoJy4nK3RvQ2xhc3MsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldFZhbCxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGVhc2luZzogZWFzZUluT3V0UXVhZCxcbiAgICAgICAgICAgICAgICBhMTF5OiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgZWFzZUluT3V0UXVhZCA9ICh0LCBiLCBjLCBkKSA9PiB7XG4gICAgICAgIHQgLz0gZCAvIDJcbiAgICAgICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGJcbiAgICAgICAgdC0tXG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGJcbiAgICAgIH1cblxuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2R1bGVzL3Ntb3RoU2Nyb2xsQ2xpY2suanMiXSwic291cmNlUm9vdCI6IiJ9