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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fullMenu = __webpack_require__(1);

var _fullMenu2 = _interopRequireDefault(_fullMenu);

var _maps = __webpack_require__(3);

var _maps2 = _interopRequireDefault(_maps);

var _flipLoginForm = __webpack_require__(6);

var _flipLoginForm2 = _interopRequireDefault(_flipLoginForm);

var _skillProgressInit = __webpack_require__(7);

var _skillProgressInit2 = _interopRequireDefault(_skillProgressInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domready = function domready() {
    ///////
    console.log('entry start');

    (0, _fullMenu2.default)('hamburger__list', 'menu-close__list', 'menu');
    (0, _maps2.default)();
    (0, _flipLoginForm2.default)('welcome__login-button', 'login__buttons-main', 'flip__container'); //flip container need to be a class
    (0, _skillProgressInit2.default)('skill', 'skill__bar', 'data-pct'); //классы без .
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _isScroll = __webpack_require__(2);

var _isScroll2 = _interopRequireDefault(_isScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (openClass, closeClass, viewClass) {
    /////
    console.log('fullMenu start');
    //////


    var open = document.querySelector('.' + openClass);
    var close = document.querySelector('.' + closeClass);
    var view = document.querySelector('.' + viewClass);

    if (open && close && view) {
        open.addEventListener('click', function () {
            view.classList.add(viewClass + '--active');
            open.style.display = 'none';
            close.style.display = 'block';
            (0, _isScroll2.default)(false);
        });
        close.addEventListener('click', function () {
            view.classList.remove(viewClass + '--active');
            open.style.display = 'block';
            close.style.display = 'none';
            (0, _isScroll2.default)(true);
        });
    }

    ///////
    console.log('fullMenu done');
};

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ymaps = __webpack_require__(4);

var _ymaps2 = _interopRequireDefault(_ymaps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  ////////////
  console.log('mapsInit start');
  ///////////

  // if(document.getElementById('map')) return 0;

  //////////
  _ymaps2.default.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(function (maps) {
    ////////основные настройки
    var map = new maps.Map('map', {
      center: [54.922788, 43.294844],
      controls: [''],
      zoom: 13
    });
    ////////////дополнительные настройки 
    map.behaviors.disable('scrollZoom');
    ///////////////////////////////////
  }).catch(function (error) {
    return console.log('Failed to load Yandex Maps', error);
  });
  ////////////
  console.log('mapsInit done');
  ///////////
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getNsParamValue(url) {
  var results = RegExp('[\\?&]ns=([^&#]*)').exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

exports.default = {
  load: function load(src) {
    src = src || 'https://api-maps.yandex.ru/2.1/?lang=en_RU';
    this.promise = this.promise || new Promise(function (resolve, reject) {
      var elem = document.createElement('script');
      elem.type = 'text/javascript';
      elem.src = src;
      elem.onload = resolve;
      elem.onerror = function (e) {
        return reject(e);
      };
      document.body.appendChild(elem);
    }).then(function () {
      var ns = getNsParamValue(src);
      if (ns && ns !== 'ymaps') {
        (1, eval)('var ymaps = ' + ns + ';');
      }
      return new Promise(function (resolve) {
        if (!global.ymaps) {
          throw new Error('Failed to find ymaps in the global scope');
        }
        if (!global.ymaps.ready) {
          throw new Error('ymaps.ready is missing');
        }
        return ymaps.ready(resolve);
      });
    });
    return this.promise;
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (loginButton, mainButton, flipContainer) {

    console.log('flipLoginForm start');

    var flip = document.querySelector('.' + flipContainer);
    var login = document.querySelector('.' + loginButton);
    var main = document.querySelector('.' + mainButton);

    if (flip && login && main) {
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
    console.log('flipLoginForm done');
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

////Анимация svg колец для элементов 'скилы'

module.exports = function (container, bar, attr) {

    console.log('skillProgressInit start');

    var skill = [].concat(_toConsumableArray(document.querySelectorAll('.' + container))); //получение всех оберток где хранится data-pct
    var svgCircles = [].concat(_toConsumableArray(document.querySelectorAll('.' + bar))); //получение всех колец
    var percent = []; // массив значений взятых из html кода - которые туда были вставлены из админки через backend
    var currentCircle = void 0; //контейнер для отельного кольца
    var circleButton = document.querySelector('#circleButton'); //выбрали кнопку
    //событие, которое присваивает значение кольцам
    var handleClick = function handleClick() {
        skill.forEach(function (item, i) {
            percent[i] = parseInt(item.getAttribute(attr)); //получили значение процентов и перевели в number
            currentCircle = item.getElementsByClassName(bar); //выбрали кольцо из текущей обертки
            currentCircle[0].style.strokeDashoffset = (100 - percent[i]) / 100 * Math.PI * 180; // присваивание текущему кольцу значения переведенному для спец свойства svg из процентов
        });
    };
    //обнуление значений во всех кольцах
    svgCircles.forEach(function (i) {
        i.style.strokeDashoffset = Math.PI * 180;
    });
    if (skill && svgCircles && circleButton) {
        circleButton.addEventListener('click', handleClick);
    }
    console.log('skillProgressInit done');
};

/***/ })
/******/ ]);