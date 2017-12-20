module.exports =
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _phoneInput = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneInput = function (_React$Component) {
  _inherits(PhoneInput, _React$Component);

  function PhoneInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhoneInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhoneInput.__proto__ || Object.getPrototypeOf(PhoneInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      phoneNumber: "",
      cursorPosition: 0,
      key: ""
    }, _this.handleKeyDown = function (event) {
      var key = event.key,
          _event$currentTarget = event.currentTarget,
          start = _event$currentTarget.selectionStart,
          end = _event$currentTarget.selectionEnd;


      if ((0, _phoneInput.isInvalidKey)(key)) {
        return;
      }
      var cursor = { start: start, end: end };

      var _update = (0, _phoneInput.update)(_this.state.phoneNumber, cursor, key),
          _update$phoneNumber = _update.phoneNumber,
          phoneNumber = _update$phoneNumber === undefined ? "" : _update$phoneNumber,
          _update$cursorPositio = _update.cursorPosition,
          cursorPosition = _update$cursorPositio === undefined ? 0 : _update$cursorPositio;

      _this.setState({
        phoneNumber: phoneNumber,
        cursorPosition: cursorPosition,
        key: key
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PhoneInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        var cursorPosition = _this2.state.cursorPosition;


        if (_this2.textInput) {
          _this2.textInput.setSelectionRange(cursorPosition, cursorPosition);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this,
          _extends2;

      var phoneNumber = this.state.phoneNumber;
      var Input = this.props.componentWrapper;


      var refProp = Input ? "innerRef" : "ref";

      var props = _extends({}, this.props, (_extends2 = {}, _defineProperty(_extends2, refProp, function (input) {
        return _this3.textInput = input;
      }), _defineProperty(_extends2, "type", "tel"), _defineProperty(_extends2, "value", phoneNumber), _defineProperty(_extends2, "onKeyDown", this.handleKeyDown), _extends2));

      return Input ? React.createElement(Input, props) : React.createElement("input", props);
    }
  }]);

  return PhoneInput;
}(React.Component);

exports.default = PhoneInput;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var INSERT = "insert";
var BACKSPACE = "backspace";

var isInvalidKey = exports.isInvalidKey = function isInvalidKey(key) {
  if (key === "Backspace") {
    return false;
  }
  if (/[0-9]/.test(key)) {
    return false;
  }
  return true;
};
var isInsertable = function isInsertable(phoneNumber, key, isSelection) {
  if (normalize(phoneNumber).length === 10 && !isSelection) {
    return false;
  }
  if (isInvalidKey(key)) {
    return false;
  }
  return true;
};

var isSelection = function isSelection(_ref) {
  var start = _ref.start,
      end = _ref.end;
  return start !== end;
};

var getPhoneInput = function getPhoneInput(_ref2) {
  var phoneNumber = _ref2.phoneNumber,
      cursorPosition = _ref2.cursorPosition;

  return {
    phoneNumber: format(phoneNumber),
    cursorPosition: cursorPosition
  };
};

var update = exports.update = function update(phoneNumber, cursor, key) {
  var _isSelection = isSelection(cursor);

  if (key === "Backspace") {
    var _phoneInput = backspace(phoneNumber, cursor);
    // return phoneInput;
    return getPhoneInput(_phoneInput);
  }
  if (isInsertable(phoneNumber, key, _isSelection)) {
    var _phoneInput2 = insert(phoneNumber, cursor, key);
    return getPhoneInput(_phoneInput2);
  }
  var phoneInput = { phoneNumber: phoneNumber, cursorPosition: cursor.start };
  return getPhoneInput(phoneInput);
};

var backspace = exports.backspace = function backspace(currentPhoneNumber, cursor) {
  var start = cursor.start,
      end = cursor.end;

  var phoneNumber = currentPhoneNumber;

  // if not selection
  if (!isSelection(cursor) && start > 0) {
    // if previous element is number
    if (currentPhoneNumber[start - 1].match(/[0-9]/)) {
      // remove it
      // concat string and return
      phoneNumber = currentPhoneNumber.substring(0, start - 1) + phoneNumber.substring(start);
    }
  }

  // if selection
  if (isSelection(cursor)) {
    // get selection string
    var selection = currentPhoneNumber.substring(start, end)
    // remove all numbers
    .replace(/\d/g, "");
    // concat beginning / cursorEnd string
    phoneNumber = currentPhoneNumber.substring(0, start) + selection + phoneNumber.substring(end);
  }
  var cursorPosition = getCursorPosition(currentPhoneNumber, phoneNumber, cursor, BACKSPACE);
  return {
    phoneNumber: phoneNumber,
    cursorPosition: cursorPosition
  };
};

var insert = exports.insert = function insert(currentPhoneNumber, cursor, key) {
  var start = cursor.start,
      end = cursor.end;


  var phoneNumber = currentPhoneNumber;

  // if selection
  if (isSelection(cursor)) {
    phoneNumber = insertChars(currentPhoneNumber, key, cursor);
  }
  // if not selection
  if (!isSelection(cursor)) {
    // concat string before start, key, string after start
    phoneNumber = insertChars(currentPhoneNumber, key, cursor);
  }

  var cursorPosition = getCursorPosition(currentPhoneNumber, phoneNumber, cursor, INSERT);

  return {
    phoneNumber: phoneNumber,
    cursorPosition: cursorPosition
  };
};

var normalize = exports.normalize = function normalize(phoneNumber) {
  return phoneNumber.replace(/\D/g, "");
};

var insertChars = exports.insertChars = function insertChars(string, char, cursor) {
  return string.substring(0, cursor.start) + char + string.substring(cursor.end);
};

var format = exports.format = function format(rawPhoneNumber) {
  var phoneNumber = normalize(rawPhoneNumber);

  var partA = phoneNumber.substring(0, 3);
  var partB = phoneNumber.substring(3, 6);
  var partC = phoneNumber.substring(6, 11);

  // 2345678  =>  234-567-8
  if (partC) {
    return "(" + partA + ") " + partB + "-" + partC;
  }
  // 2345 => 234-5
  if (partB) {
    return partA + "-" + partB;
  }
  // if partA
  return phoneNumber;
};

var getCursorPosition = exports.getCursorPosition = function getCursorPosition(prevNumber, newNumber, cursor, action) {
  // if cursor was at the end, keep it at the end
  if (cursor.start === prevNumber.length) {
    return format(newNumber).length;
  }
  // if cursor was at the beginning, keep it at the beginning
  if (cursor.start === 0) {
    return action === BACKSPACE ? 0 : 1;
  }
  /*
  Here is where we get really tricky. In general, we always want to end up with the same count of numbers to the right of the cursor before/after. So how we do this is like this:
  1. Figure out how many numbers are to the right of the cursor
  2. Figure out how far we have to move the cursor to get the same amount of numbers to the right in the NEW phone number
  3. Return that new cursor position offset from the end of the new phone number
  */
  // Step 1
  var numbersToRightOfCursor = prevNumber.substring(cursor.end).match(/[0-9]/g);
  var numberCount = numbersToRightOfCursor ? numbersToRightOfCursor.length : 0;

  // Step 2
  var trueDiff = getCharacterCountContainingNumberCount(format(newNumber), numberCount);

  // Step 3
  return format(newNumber).length - trueDiff;
};

var getCharacterCountContainingNumberCount = function getCharacterCountContainingNumberCount(string, numberCount) {
  // reverse the string so we can work from the end
  var arr = string.split("");
  arr.reverse();

  var numberCounter = 0;

  var position = arr.reduce(function (acc, char) {
    if (numberCounter === numberCount) {
      return acc;
    }
    if (/[0-9]/.test(char)) {
      numberCounter++;
    }
    return acc + 1;
  }, 0);

  return position;
};

/***/ })
/******/ ]);