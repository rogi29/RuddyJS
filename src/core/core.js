/**
 * RuddyJS Globals Wrappers
 *
 * @package     ruddy
 * @module      Globals
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @example
 * Ruddy
 * $obj ({});
 * $func (function(){});
 * $arr ([]);
 * $str ('string');
 * $num (11);
 * $int (11);
 * $float (11.35);
 * $date (35, 21);
 * $bool (false);
 * $el (document.getElementById('#hello'));
 * $nodes (document.querySelectorAll('.class'));
 * $style (document.styleSheets[0]);
 * $doc ();
 * $r ('.class');
 */

var $Export = $Export || require('./export');

/**
 * @object
 * @name Ruddy
 * @memberof module:Globals
 * @description Ruddy Core Object
 */
$Export
    .module(
        'Ruddy',
        '@core',
        './core'
    )
    .include([
        'window',
        'document',
        'HTMLAllCollection'
    ])
    .init(
        this,
        module,
        /** @module Ruddy */
        function (window, document, HTMLAllCollection) {
            var
                /**
                 * @inner
                 * @memberof module:Ruddy
                 * @description Cache
                 * @type {{}}
                 */
                cache = {},

                /**
                 * @inner
                 * @memberof module:Ruddy
                 * @description Event List
                 * @type {{}}
                 */
                events = {},

                /**
                 * Export module
                 *
                 * @function
                 * @inner
                 * @name export
                 * @memberof module:Ruddy
                 * @description Export modules both for NodeJS and Browser environments
                 *
                 * @param {String} name
                 * @param {Function} factory
                 * @param {Object} __global
                 * @param {Object} __core
                 * @param {Object} __module
                 *
                 * @returns {Object}
                 */
                exportObj = $Export.module,


                /*
                 * Tag names for eventlistener check
                 *
                 * @type {{select: string, change: string, submit: string, reset: string, error: string, load: string, abort: string, input: string}}
                 */
                TAGNAMES = {
                    select:'input',change:'input',
                    submit:'form',reset:'form',
                    error:'img',load:'img',
                    abort:'img',input:'input'
                },

                /**
                 * Mozzila Polyfill
                 *
                 * @function
                 * @inner
                 * @name assign
                 * @memberof module:Ruddy
                 * @description Assign methods into an object
                 * @param target
                 *
                 * @returns {*}
                 */
                assignObj = Object.prototype.assign || function(target) {
                    'use strict';

                    if (target === null)
                        throw new TypeError('Cannot convert null or undefined to an object');

                    target = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var source = arguments[index];
                        if (source != null) {
                            for (var key in source) {
                                if (Object.prototype.hasOwnProperty.call(source, key)) {
                                    target[key] = source[key];
                                }
                            }
                        }
                    }

                    return target;
                },

                /**
                 * Is object type
                 *
                 * @function
                 * @inner
                 * @name isObj
                 * @memberof module:Ruddy
                 * @description Check if a value is an object type
                 * @param {Object|*} value
                 *
                 * @returns {Boolean}
                 */
                isObject = function(value) {
                    return (typeof value == 'object' || typeof value == 'function');
                },

                /**
                 * Is function type
                 *
                 * @function
                 * @inner
                 * @name isFunc
                 * @memberof module:Ruddy
                 * @description Check if a value is a function type
                 * @param {Function|*} value
                 *
                 * @returns {Boolean}
                 */
                isFunction = function(value) {
                    return (typeof value == 'function');
                },

                /**
                 * Is array type
                 *
                 * @function
                 * @inner
                 * @name isArr
                 * @memberof module:Ruddy
                 * @description Check if a value is an array type
                 * @param {Array|*} value
                 *
                 * @returns {Boolean}
                 */
                isArray = (Array.isArray || function(value) {
                        return (value && value.constructor === Array) || '' + value !== value && {}.toString.call(value) == '[object Array]';
                }),

                /**
                 * Is string type
                 *
                 * @function
                 * @inner
                 * @name isStr
                 * @memberof module:Ruddy
                 * @description Check if a value is a string type
                 * @param {String|*} value
                 *
                 * @returns {Boolean}
                 */
                isString = function(value) {
                    return typeof value === 'string';
                },

                /**
                 * Is number type
                 *
                 * @function
                 * @inner
                 * @name isNum
                 * @memberof module:Ruddy
                 * @description Check if a value is a number type
                 * @param {Number|*} value
                 *
                 * @returns {Boolean}
                 */
                isNumber = function(value) {
                    return (typeof value == 'number');
                },

                /**
                 * Is integer type
                 *
                 * @function
                 * @inner
                 * @name isInt
                 * @memberof module:Ruddy
                 * @description Check if a value is an integer type
                 * @param {Integer|*} value
                 *
                 * @returns {Boolean}
                 */
                isInt = (Number.isInteger || function(value) {
                    return (isNumber(value) && isFinite(value) && Math.round(value) === value);
                }),

                /**
                 * Is float type
                 *
                 * @function
                 * @inner
                 * @name isFloat
                 * @memberof module:Ruddy
                 * @description Check if a value is a float type
                 * @param {Float|*} value
                 *
                 * @returns {Boolean}
                 */
                isFloat = function(value) {
                    return (isNumber(value) && Math.round(value) !== value);
                },

                /**
                 * Is date type
                 *
                 * @function
                 * @inner
                 * @name isDate
                 * @memberof module:Ruddy
                 * @description Check if a value is a date type
                 * @param {Date|*} value
                 *
                 * @returns {Boolean}
                 */
                isDate = function(value) {
                    return Object.prototype.toString.call(value) === '[object Date]';
                },

                /**
                 * Is boolean type
                 *
                 * @function
                 * @inner
                 * @name isBool
                 * @memberof module:Ruddy
                 * @description Check if a value is a bool type
                 * @param {Boolean|*} value
                 *
                 * @returns {Boolean}
                 */
                isBool = function(value) {
                    return (typeof value === "boolean");
                },

                /**
                 * Is nodes type
                 *
                 * @function
                 * @inner
                 * @name isNodes
                 * @memberof module:Ruddy
                 * @description Check if a value is a nodes list type
                 * @param {NodeList|*} value
                 *
                 * @returns {Boolean}
                 */
                isNodes = function(value) {
                    var stringRepr = Object.prototype.toString.call(value);

                    return typeof value === 'object' &&
                        (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
                        (typeof value.length === 'number') || (value[0] && isElement(value[0]))) || (window.HTMLAllCollection && value instanceof HTMLAllCollection);
                },

                /**
                 * Is element type
                 *
                 * @function
                 * @inner
                 * @name isEl
                 * @memberof module:Ruddy
                 * @description Check if a value is an element type
                 * @param {Element|*} value
                 *
                 * @returns {Boolean}
                 */
                isElement = function(value) {
                    return (value && (value.nodeName || value.tagName || value.className || value.id) && value != document) ? true : false;
                },

                /**
                 * Is document type
                 *
                 * @function
                 * @inner
                 * @name isDoc
                 * @memberof module:Ruddy
                 * @description Check if a value is a document type
                 * @param {Document|*} value
                 *
                 * @returns {Boolean}
                 */
                isDoc = function(value) {
                    return (value == document);
                },

                /**
                 * Is event type
                 *
                 * @function
                 * @inner
                 * @name isEvent
                 * @memberof module:Ruddy
                 * @description Check if an event exists
                 * @param {String} value
                 *
                 * @returns {Boolean}
                 */
                isEvent = function(value) {
                    if (typeof document === {})
                        return false;

                    var el = document.createElement(TAGNAMES[value] || 'div'), isSupported

                    value = 'on' + value;
                    if (!(isSupported = (value in el))) {
                        el.setAttribute(value, 'return;');
                        isSupported = typeof el[value] == 'function';
                    }
                    el = null;
                    return isSupported;
                };

            /**
             *
             * @type {{assign: (assign|*|Function), cache: {}, events: {}, isObj: isObject, isFunc: isFunction, isArr: Function, isEl: isElement, isStr: isString, isNum: isNumber, isInt: (*|Function), isFloat: isFloat, isDate: isDate, isBool: isBool, isNodes: isNodes, isDoc: isDoc, isEvent: isEvent}}
             */
            return {
                /**
                 * @name Ruddy/cache
                 * @module Ruddy/cache
                 * @type {Object}
                 */
                cache: cache,
                events: events,
                assign: assignObj,
                export: exportObj,
                isObj: isObject,
                isFunc: isFunction,
                isArr: isArray,
                isEl: isElement,
                isStr: isString,
                isNum: isNumber,
                isInt: isInt,
                isFloat: isFloat,
                isDate: isDate,
                isBool: isBool,
                isNodes: isNodes,
                isDoc: isDoc,
                isEvent: isEvent
            };
        }
    );
