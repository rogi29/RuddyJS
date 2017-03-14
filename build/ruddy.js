/**
 * RuddyJS Export Modules
 *
 * @package     ruddy
 * @module      $Export
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 * @type        {Object}
 *
 * @returns     {Function}
 */
var $$modules = {};

if(typeof module == 'undefined' && typeof window !== 'undefined') {
    window.module = {};
}

(function (__global, __module, factory) {
    var name = '$Export';

    if (typeof exports === "object" && typeof __module !== "undefined") {
        __module.exports = factory();
    } else {
        if (typeof window !== "undefined") {
            __global = window;
        } else if (typeof global !== "undefined") {
            __global = global;
        }
        __global[name] = factory();
    }
}(this, module, function () {
    "use strict";

    /**
     * Define the module object name, module name and path
     *
     * @name module
     * @function
     * @inner
     * @memberof module:$Export
     * @description Define the module module name, include name and path
     *
     * @param {Object} obj Module name
     * @param {String} name Module include name
     * @param {String} path Module path
     *
     * @returns {{include: *, init: *}}
     */
    function exportObj(obj, name, path) {
        $$modules[name] = {obj: obj, path: path};
        return {include: include(obj, name), init: init(obj, name, [])};
    }

    /**
     * @name $Export/module/include
     * @module $Export/module/include
     * @description Include other modules or objects
     *
     * @param {Array} modules Modules to include
     * @returns {{init: *}}
     */
    function include (obj, name) {
        /**
         * Include other modules or objects
         *
         * @name include
         * @function
         * @inner
         * @memberof module:$Export/module
         * @description Include other modules or objects
         *
         * @param {Array} modules Modules to include
         * @returns {{init: *}}
         */
        return function(modules) {
            return {init: init(obj, name, modules)};
        }
    }

    /**
     * Module init and functioanlity
     *
     * @name init
     * @function
     * @inner
     * @memberof module:$Export/module/include
     * @description Module init and functioanlity
     *
     * @param {this} __global Set `this` object
     * @param {module} __module Set `module` object
     * @param {Function} callback Set module
     */
    function init (obj, name, __modules) {
        /**
         * Module init and functioanlity
         *
         * @name init
         * @function
         * @inner
         * @memberof module:$Export/module
         * @description Module init and functioanlity
         *
         * @param {this} __global Set `this` object
         * @param {module} __module Set `module` object
         * @param {Function} callback Set module
         */
        return function (__global, __module, callback) {
            if (typeof window !== "undefined") {
                __global = window;
            } else if (typeof global !== "undefined") {
                __global = global;
            }

            var factory = function (__window, __document) {
                var m,
                    modules     = [],
                    window      = window || __window || {},
                    document    = document || __document || window.document || {};

                if(__modules.length < 1)
                    return callback.apply(__global, modules);

                for (var i = 0; i < __modules.length; i++) {
                    switch (__modules[i]) {
                        case 'window':
                            modules[i] = window;
                            break;

                        case 'document':
                            modules[i] = document;
                            break;

                        default:
                            m = $$modules[__modules[i]];

                            if (typeof m === 'undefined')
                                throw new Error('`' + __modules[i] + '` module doesn\'t exists!');

                            modules[i] = __global[m['obj']] || require(m['path'])(window, document);
                            break;
                    }
                }

                return callback.apply(__global, modules);
            };

            if (typeof exports === "object" && typeof __module !== "undefined") {
                __module.exports = factory;
            } else if (typeof window !== {}) {
                if(name[0] == '@')
                    __global[obj] = factory(window, document);
                else
                    factory(window, document);
            } else {
                __global[obj] = factory;
            }
        }
    }

    return {
        /**
         * @name $Export/module
         * @module $Export/module
         * @description Define the module module name, include name and path
         *
         * @param {Object} obj Module name
         * @param {String} name Module include name
         * @param {String} path Module path
         *
         * @returns {{include: *, init: *}}
         */
        module: exportObj
    };
}));

/**
 * RuddyJS Window Properties - Element
 *
 * @package     ruddy
 * @module      CSSStyleSheet
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'Element',
        'Element',
        './window/element'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.Element || {};
        }
    );

/**
 * RuddyJS Window Properties - CSSStyleSheet
 *
 * @package     ruddy
 * @module      CSSStyleSheet
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'CSSStyleSheet',
        'CSSStyleSheet',
        './window/style'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.CSSStyleSheet || {};
        }
    );

/**
 * RuddyJS Window Properties - HTMLAllCollection
 *
 * @package     ruddy
 * @module      CSSStyleSheet
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'HTMLAllCollection',
        'HTMLAllCollection',
        './window/html'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.HTMLAllCollection || {};
        }
    );

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


/**
 * RuddyJS Globals - Array
 *
 * @package     ruddy
 * @module      $arr
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Array} arr An `Array` type is required
 * @returns     {Array}
 *
 * @example
 * //Correct:
 * $arr([])
 * $arr([1, 'qwe'])
 *
 * //Wrong
 * $arr({}) =>
 * TypeError("Array type - argument provided is not an array type")
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$arr',
        '@array',
        '../globals/array'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            "use strict";

            /**
             * Global array wrapper
             *
             * @name $arr
             * @memberof module:Globals
             * @description Global array wrapper
             * @param arr
             *
             * @returns {Array|*}
             */
            var array = function(arr) {
                if(__core.isArr(arr) === false)
                    throw new TypeError("Array type - argument provided is not an array type");

                /**
                 *
                 * @type {{isEmpty: (exports|module.exports|module:$arr.isEmpty), join: (*|Function), push: (*|Function), pop: (*|Function), reverse: (*|Function), concat: (*|Function), forEach: (*|Function), map: (*|Function), reduce: (*|Function), indexOf: (*|Function), first: (exports|module.exports|module:$arr.first), last: (exports|module.exports|module:$arr.last)}}
                 */
                var prototype = {
                    /**
                     * Checks if array is empty
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Checks if an array is empty
                     *
                     * @returns {boolean}
                     */
                    isEmpty: function() {
                        return (arr.length == 0);
                    },

                    /**
                     * Native join function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native join function polyfill
                     * @param c
                     *
                     * @returns {string}
                     */
                    join: (Array.prototype.join || function (c) {
                        "use strict";
                        var a = arr, l = a.length, i = 0, s = '', c = c || ',';

                        for(i; i !== l-1; i++) {
                            s += (a[i] + c);
                        }

                        s += a[l-1];
                        return s;
                    }),

                    /**
                     * Native push function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native push function polyfill
                     *
                     * @returns {Number}
                     */
                    push: (Array.prototype.push || function () {
                        "use strict";
                        var arg = arguments, l = arg.length, i = 0;

                        for(i; i !== l; i++) {
                            arr[arr.length] = arg[i];
                        }

                        return arr.length;
                    }),

                    /**
                     * Native pop function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native pop function polyfill
                     *
                     * @returns {*}
                     */
                    pop: (Array.prototype.pop || function() {
                        "use strict";
                        var last;

                        if(arr.length <= 0)
                            return undefined;

                        last = arr[arr.length - 1];
                        arr.length = arr.length - 1;
                        return last;
                    }),

                    /**
                     * Native reverse function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native reverse function polyfill
                     *
                     * @returns {Array}
                     */
                    reverse: (Array.prototype.reverse || function() {
                        "use strict";
                        var len = arr.length - 1, id = 0, i = 0, a = [];

                        for(len; len >= i; len--) {
                            a[id] = arr[len];
                            id++;
                        }

                        return a;
                    }),

                    /**
                     * Native concat function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native concat function polyfill
                     *
                     * @returns {string[]}
                     */
                    concat: (Array.prototype.concat || function () {
                        "use strict";
                        var arg = arguments, l = arg.length, i = 0, s = $arr (arr).join();

                        for(i; i !== l; i++) {
                            s += (','+arg[i]);
                        }

                        return s.split(',');
                    }),

                    /**
                     * Native forEach function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native forEach function polyfill
                     *
                     * @param f
                     * @param p
                     */
                    forEach: (Array.prototype.forEach || function (f, p) {
                        "use strict";
                        if (typeof f !== 'function')
                            throw new TypeError(f + ' is not a function');

                        var a = arr.join().split(','), p = p || arr, l = a.length, i = 0;
                        for (i; i !== l; i++) {
                            f.call(p, a[i], i, a);
                        }
                    }),

                    /**
                     * Native map function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native map function polyfill
                     *
                     * @param f
                     * @param p
                     *
                     * @returns {Array}
                     */
                    map: (Array.prototype.map || function (f, p) {
                        "use strict";
                        var t = arr, a = [], i = 0, l = t.length, v;

                        for(i; i != l; i++) {
                            v = t[i];
                            a[i] = p ? f.call(p, v, i, t) : f(v, i, t);
                        }

                        return a;
                    }),

                    /**
                     * Native reduce function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native reduce function polyfill
                     * @param callback
                     *
                     * @returns {*}
                     */
                    reduce: (Array.prototype.reduce || function(callback /*, initialValue*/) {
                        "use strict";
                        if (typeof callback !== 'function')
                            throw new TypeError(callback + ' is not a function');

                        var t = arr, l = t.length >>> 0, k = 0, value;

                        if (arguments.length == 2) {
                            value = arguments[1];
                        } else {
                            while (k < l && ! k in t) {
                                k++;
                            }
                            if (k >= l)
                                throw new TypeError('Reduce of empty array with no initial value');
                            value = t[k++];
                        }

                        for (; k < l; k++) {
                            if (k in t) {
                                value = callback(value, t[k], k, t);
                            }
                        }

                        return value;
                    }),

                    /**
                     * Native indexOf function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Native indexOf function polyfill
                     * @param elt
                     *
                     * @returns {number}
                     */
                    indexOf: Array.prototype.indexOf || function(elt /*, from*/) {
                        var len = this.length >>> 0;

                        var from = Number(arguments[1]) || 0;
                        from = (from < 0)
                            ? Math.ceil(from)
                            : Math.floor(from);
                        if (from < 0)
                            from += len;

                        for (; from < len; from++)
                        {
                            if (from in this &&
                                this[from] === elt)
                                return from;
                        }
                        return -1;
                    },

                    /**
                     * Get first element of array
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Get first element of an array
                     *
                     * @returns {*}
                     */
                    first: function () {
                        if(arr.length <= 0)
                            return undefined;

                        return arr[0];
                    },

                    /**
                     * Get last element of array
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Get last element of an array
                     *
                     * @returns {*}
                     */
                    last: function () {
                        if(arr.length <= 0)
                            return undefined;

                        return arr[arr.length - 1];
                    }
                };

                return __core.assign(arr, prototype);
            };

            /**
             *
             * @type array
             */
            return array;
        }
    );

/**
 * RuddyJS Globals - String
 *
 * @package     ruddy
 * @module      $str
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {String} str A `String` type is required
 * @returns     {String}
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$str',
        '@string',
        '../globals/string'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            "use strict";

            /**
             * Global String Wrapper
             *
             * @name $str
             * @memberof module:Globals
             * @description Global string wrapper
             * @param str
             *
             * @returns {*}
             */
            var string = function(str) {
                if(__core.isStr(str) === false)
                    throw new TypeError("String type - argument provided is not a string type");

                var prototype = {
                    /**
                     * Check if string is empty
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Check if string is empty
                     *
                     * @returns {boolean}
                     */
                    isEmpty: function()
                    {
                        var s = str;
                        return (s == null || s == "" || s.length == 0);
                    },

                    /**
                     * Native toLowerCase function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Native toLowerCase function polyfill
                     *
                     * @returns {string}
                     */
                    toLowerCase: (String.prototype.toLowerCase || function()
                    {
                        return str.replace(/[a-z]/g, function (ch) {
                            return String.fromCharCode(ch.charCodeAt(0) & ~32);
                        });
                    }),

                    /**
                     * Native toUpperCase function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Native toUpperCase function polyfill
                     *
                     * @returns {string}
                     */
                    toUpperCase: (String.prototype.toUpperCase || function()
                    {
                        return str.replace(/[A-Z]/g, function (c) {
                            return String.fromCharCode(c.charCodeAt(0) | 32);
                        });
                    }),

                    /**
                     * Set first character to upper case
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Set first character to upper case
                     *
                     * @returns {string}
                     */
                    ucfirst: function ()
                    {
                        return str.charAt(0).toUpperCase() + this.substr(1);
                    },

                    /**
                     * Apply regex and checks if true or false
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Apply regex and checks if true or false
                     * @param regex
                     *
                     * @returns {boolean}
                     */
                    pregMatch: function(regex)
                    {
                        var reg = new RegExp(regex);
                        return reg.test(str);
                    },

                    /**
                     * Escape html string
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Escape html string
                     *
                     * @returns {string|string|*}
                     */
                    escapeHTML: function() {
                        var div = document.createElement('div');
                        div.appendChild(document.createTextNode(str));
                        return div.innerHTML;
                    },

                    /**
                     * Convert escaped string to html string
                     *
                     * @function
                     * @inner
                     * @memberof module:$str
                     * @description Convert escaped string to html string
                     *
                     * @returns {string|HTML}
                     */
                    toHTML: function() {
                        var div = document.createElement('div');
                        div.innerHTML = str;
                        var child = div.childNodes[0];
                        return child ? child.nodeValue : '';
                    }
                };

                return __core.assign(str, prototype);
            };

            /**
             *
             * @type string
             */
            return string;
        }
    );

/**
 * RuddyJS Globals - Element
 *
 * @package     ruddy
 * @module      $num
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Number} num A `Number` type is required
 * @returns     {Number}
 *
 * @example
 * //Correct:
 * $num(25)
 * $num(25.55)
 *
 * //Wrong
 * $num('25') =>
 * TypeError("Number type - argument provided is not an number type")
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$num',
        '@number',
        '../globals/number'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            "use strict";

            /**
             * Global Number Wrapper
             *
             * @name $num
             * @memberof module:Globals
             * @description Global number wrapper
             * @param num
             *
             * @returns {Number|*}
             */
            var number = function(num) {
                if(__core.isNumber(num) === false)
                    throw new TypeError("Number type - argument provided is not an number type");

                /**
                 *
                 * @type {{isInteger: (exports|module.exports|module:$num.isInteger), isFloat: (exports|module.exports|module:$num.isFloat)}}
                 */
                var prototype = {
                    /**
                     * Check if number is a integer type
                     *
                     * @function
                     * @inner
                     * @memberof module:$num
                     * @description Check if number is a integer type
                     *
                     * @returns {Boolean|*}
                     */
                    isInteger: function() {
                        return __core.isInt(num);
                    },

                    /**
                     * Check if nubmer is a float type
                     *
                     * @function
                     * @inner
                     * @memberof module:$num
                     * @description Check if nubmer is a float type
                     *
                     * @returns {Boolean|*}
                     */
                    isFloat: function() {
                        return __core.isFloat(num);
                    }
                };

                return __core.assign(num, prototype);
            };

            return number;
        }
    );

/**
 * RuddyJS Globals - Element
 *
 * @package     ruddy
 * @module      $int
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Integer} int An `Integer` type is required
 * @returns     {Integer}
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$int',
        '@integer',
        '../globals/integer'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            "use strict";

            /**
             * Global Integer Wrapper
             *
             * @name $int
             * @memberof module:Globals
             * @description Global integer wrapper
             * @param int
             *
             * @returns {Integer|Number|*}
             */
            var integer = function(int) {
                if(__core.isInt(int) === false)
                    throw new TypeError("Integer type - argument provided is not an integer type");

                var prototype = {
                };

                return __core.assign(int, prototype);
            };

            return integer;
        }
    );

/**
 * RuddyJS Globals - Element
 *
 * @package     ruddy
 * @module      $float
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Float} float A `Float` type is required
 * @returns     {Float}
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$float',
        '@float',
        '../globals/float'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function(__core){
            /**
             * Global Float Wrapper
             *
             * @name $float
             * @memberof module:Globals
             * @description Global float wrapper
             * @param {Float} float
             *
             * @returns {Float}
             */
            var float = function(float) {
                if(__core.isFloat(float) === false)
                    throw new TypeError("Float type - argument provided is not an float type");

                var prototype = {
                };

                return __core.assign(float, prototype);
            };

            return float;
        }
    );

/**
 * ruddyJS Globals - Object
 *
 * @package     ruddy
 * @module      $obj
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Object} obj An `Object` type is required
 * @returns     {Object}
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$obj',
        '@object',
        '../globals/object'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            "use strict";

            /**
             * Global Object Wrapper
             *
             * @name $obj
             * @memberof module:Globals
             * @description Global object wrapper
             * @param obj
             *
             * @returns {*}
             */
            var object = function(obj) {
                if(__core.isObj(obj) === false)
                    throw new TypeError("Object type - argument provided is not an object type");

                /**
                 *
                 * @type {{keys: keys, values: values, push: push, map: map, forEach: forEach, assign: assign, extend: extend}}
                 */
                var prototype = {
                    /**
                     * Get all keys of an object
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Get all keys of an object
                     *
                     * @returns {Array}
                     */
                    keys: function() {
                        "use strict";
                        var k, r = [], i = 0;

                        for(k in obj) {
                            if(!prototype[k]){
                                r[i] = k;
                                i++;
                            }
                        }

                        return r;
                    },

                    /**
                     * Get all values of an object
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Get all values of an object
                     *
                     * @returns {Array}
                     */
                    values: function() {
                        "use strict";
                        var k, r = [], i = 0;

                        for(k in obj) {
                            if(!prototype[k]){
                                r[i] = obj[k];
                                i++;
                            }
                        }

                        return r;
                    },

                    /**
                     * Native push function for an object
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Native push function for an object
                     *
                     * @returns {Number}
                     */
                    push: function() {
                        "use strict";
                        var a = arguments, v, k;

                        for(k in a) {
                            v = a[k];
                            obj[v.key] = v.value;
                        }

                        return $obj (obj).keys().length;
                    },

                    /**
                     * Native map function for an object
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Native map function for an object
                     *
                     * @param f
                     * @param p
                     *
                     * @returns {Array}
                     */
                    map: function (f, p) {
                        "use strict";
                        var o = obj, a = [], k, v;

                        for(k in o) {
                            v = o[k];
                            a[k] = p ? f.call(p, v, k, o) : f(v, k, o);
                        }

                        return a;
                    },

                    /**
                     * Native forEach function for an object
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Native forEach function for an object
                     *
                     * @param f
                     * @param p
                     */
                    forEach: function (f, p) {
                        "use strict";
                        if (typeof f !== 'function')
                            throw new TypeError(f + ' is not a function');

                        var p = p || obj, k;
                        for (k in obj) {
                            if(!prototype[k]) {
                                f.call(p, obj[k], k, obj);
                            }
                        }
                    },

                    /**
                     * Assign a function in prototype
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Assign a function in prototype
                     *
                     * @param name
                     * @param func
                     *
                     * @returns {*}
                     */
                    assign: function(name, func) {
                        return obj.prototype[name] = func;
                    },

                    /**
                     * Extend object prototype
                     *
                     * @function
                     * @inner
                     * @memberof module:$obj
                     * @description Extend object prototype
                     * @param source
                     *
                     * @returns {Object|Function|*}
                     */
                    extend: function(source) {
                        source = source.prototype;

                        for (var attrname in source) {
                            if(!obj.prototype[attrname])
                                obj.prototype[attrname] = source[attrname];
                        }

                        return obj;
                    }
                };

                return __core.assign(obj, prototype);
            };

            /**
             *
             * @type {{assign}}
             */
            return object;
        }
    );

/**
 * RuddyJS Globals - Function
 *
 * @package     ruddy
 * @module      $func
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Function} func A `Function` type is required
 * @returns     {Function}
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$func',
        '@function',
        '../globals/function'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            "use strict";

            /**
             * Global Function Wrapper
             *
             * @name $func
             * @memberof module:Globals
             * @description Global function wrapper
             * @param func
             *
             * @returns {Function|*}
             */
            var funct = function(func) {
                if(__core.isFunc(func) === false)
                    throw new TypeError("Function type - argument provided is not a function type");

                /**
                 *
                 * @type {{assign: (exports|module.exports|module:$func.assign), bind: (*|Function)}}
                 */
                var prototype = {
                    /**
                     * Assign a function to a prototype of an object function
                     *
                     * @function
                     * @inner
                     * @memberof module:$func
                     * @description Assign a function to a prototype of an object function
                     *
                     * @param name
                     * @param func
                     *
                     * @returns {*}
                     */
                    assign: function(name, func) {
                        return func.prototype[name] = func;
                    },

                    /**
                     * Native bind function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$func
                     * @description Native bind function polyfill
                     * @param b
                     *
                     * @returns {Function}
                     */
                    bind: (Function.prototype.bind || function (b) {
                        "use strict";
                        var a = [].slice, f = a.call(arguments, 1), e = func, d = function () {
                            return e.apply(func instanceof c ? func : b || window, f.concat(a.call(arguments)));
                        };

                        function c(){}

                        c.prototype = func.prototype;
                        d.prototype = new c();
                        return d;
                    })
                };

                return __core.assign(func, prototype);
            };

            /**
             *
             * @type function
             */
            return funct;
        }
    );


/**
 * RuddyJS Globals - Nodes
 *
 * @package     ruddy
 * @module      $nodes
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {NodeList} nodes A `NodeList` type is required
 * @returns     {NodeList}
 *
 * @description
 * RuddyJS Globals - Nodes
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$nodes',
        '@nodes',
        '../globals/nodes'
    )
    .include([
        '@core'
    ])
    .init(
        this,
        module,
        function (__core) {
            /**
             * Global NodeList Wrapper
             *
             * @name $nodes
             * @memberof module:Globals
             * @description Global node list wrapper
             * @param nodes
             *
             * @returns {*}
             */
            var nodeList = function(nodes) {
                if(__core.isNodes(nodes) === false)
                    throw new TypeError("Nodes type - argument provided is not a nodeList type");

                /**
                 *
                 * @type {{push: (exports|module.exports|module:$nodes.push), concat: (exports|module.exports|module:$nodes.concat), forEach: (*|Function), map: (exports|module.exports|module:$nodes.map), first: (exports|module.exports|module:$nodes.first), last: (exports|module.exports|module:$nodes.last), isOne: (exports|module.exports|module:$nodes.isOne), indexOf: (exports|module.exports|module:$nodes.indexOf)}}
                 */
                var prototype = {
                    /**
                     * Native push function for a nodeList
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Native push function for a nodeList
                     *
                     * @returns {Number}
                     */
                    push: function () {
                        "use strict";
                        var arg = arguments, l = arg.length, i = 0;

                        for(i; i !== l; i++) {
                            nodes[nodes.length] = arg[i];
                        }

                        return nodes.length;
                    },

                    /**
                     * Native concat function for a nodeList
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Native concat function for a nodeList
                     *
                     * @returns {string[]}
                     */
                    concat: function () {
                        "use strict";
                        var arg = arguments, l = arg.length, i = 0, s = $nodes (nodes).join();

                        for(i; i !== l; i++) {
                            s += (','+arg[i]);
                        }

                        return s.split(',');
                    },

                    /**
                     * Native forEach function for a nodeList
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Native forEach function for a nodeList
                     *
                     * @param f
                     * @param p
                     */
                    forEach: (Array.prototype.forEach || function (f, p) {
                        "use strict";
                        if (typeof f !== 'function')
                            throw new TypeError(f + ' is not a function');

                        var a = nodes, p = p || nodes, l = a.length, i = 0;
                        for (i; i !== l; i++) {
                            f.call(p, a[i], i, a);
                        }
                    }),

                    /**
                     * Native map function for a nodeList
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Native map function for a nodeList
                     *
                     * @param f
                     * @param p
                     *
                     * @returns {Array}
                     */
                    map: function (f, p) {
                        "use strict";
                        var t = nodes, a = [], i = 0, l = t.length, v;

                        for(i; i != l; i++) {
                            v = t[i];
                            a[i] = p ? f.call(p, v, i, t) : f(v, i, t);
                        }

                        return a;
                    },

                    /**
                     * Get first element
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Get first element
                     *
                     * @returns {*}
                     */
                    first: function () {
                        "use strict";
                        if(nodes.length == 0)
                            throw new TypeError('Cant retrieve first element of an nodeList array with no initial value');

                        return nodes[0];
                    },

                    /**
                     * Get last element
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Get last element
                     *
                     * @returns {*}
                     */
                    last: function () {
                        "use strict";
                        if(nodes.length == 0)
                            throw new TypeError('Cant retrieve last element of an empty nodeList with no initial value');

                        return nodes[nodes.length - 1];
                    },

                    /**
                     * Check if nodeList length is one
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Check if nodeList length is one
                     *
                     * @returns {boolean}
                     */
                    isOne: function() {
                        "use strict";
                        if(nodes.length == 0)
                            throw new TypeError('Cant retrieve last element of an empty nodeList with no initial value');

                        return (nodes.length == 1);
                    },

                    /**
                     * Native indexOf function for a nodeList
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Native indexOf function for a nodeList
                     * @param value
                     *
                     * @returns {*}
                     */
                    indexOf: function(value) {
                        "use strict";
                        var a = nodes, key;
                        for (key in a) {
                            if(value == a[key]) {
                                return key;
                            }
                        }
                        return -1;
                    }
                };

                return __core.assign(nodes, prototype);
            };

            return nodeList;
        }
    );



/**
 * RuddyJS Globals - Style
 *
 * @package     ruddy
 * @module      $css
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @description
 * RuddyJS Globals - Style
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$css',
        '@style',
        '../globals/style'
    )
    .include([
        '@core',
        'window',
        'document',
        'Element',
        'CSSStyleSheet'
    ])
    .init(
        this,
        module,
        function (__core, window, document, Element, CSSStyleSheet) {
            "use strict";

            /**
             * Global Style Wrapper
             *
             * @name $css
             * @memberof module:Globals
             * @description Global style wrapper
             * @param css
             *
             * @returns {*}
             */
            var style = function(css) {
                var prototype = {
                    /**
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @param index
                     *
                     * @returns {CssRule|CSSRule}
                     */
                    getRule: function(index) {
                        return css.cssRules[index];
                    },

                    /**
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @param index
                     *
                     * @returns {string}
                     */
                    getCSSText: function(index) {
                        return css.cssRules[index].cssText;
                    },

                    /**
                     * Native insertRule function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @description Native insertRule function polyfill
                     *
                     * @param rule
                     * @param index
                     *
                     * @returns {*}
                     */
                    insertRule: ('CSSStyleSheet' in window) ? CSSStyleSheet.prototype.insertRule : function(rule, index) {
                        var arr;
                        rule = rule.replace(/\s+/g, '');
                        arr = rule.split('{');
                        css.addRule(arr[0], arr[1].replace('}', ''), index);
                        return index;
                    },

                    /**
                     * Native deleteRule function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @description Native deleteRule function polyfill
                     * @param index
                     */
                    deleteRule: ('CSSStyleSheet' in window) ? CSSStyleSheet.prototype.deleteRule : function(index) {
                        return css.removeRule(index);
                    },

                    /**
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @param rule
                     *
                     * @returns {string}
                     */
                    ruleToJson: function(rule) {
                        rule = rule.replace(/\s+/g, '');
                        rule = rule.split('{');

                        var
                            selector = rule[0],
                            json = '{"selector":"' + selector + '","' + rule[1].replace(':', '":"').replace(';}', '"}').replace(';', '","');

                        return json;
                    },

                    /**
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @param json
                     *
                     * @returns {*}
                     */
                    jsonToRule: function(json) {
                        var selector = JSON.parse(json)['selector'],
                            rule = selector + json.replace(/"/g, '').replace(/,/g, ';').replace('selector:' + selector + ';', '');

                        return rule;
                    },

                    /**
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @param rule
                     *
                     * @returns {{}}
                     */
                    ruleToObj: function(rule) {
                        rule = rule.replace(/\s+/g, '');
                        rule = rule.split('{');

                        var
                            obj = {}, style = null, i = 0,
                            selector = rule[0],
                            styles = rule[1].replace('}').split(';');

                        obj[selector] = {};
                        for(i; i != styles.length; i++) {
                            if(styles[i] == ''){
                                continue;
                            }

                            style = styles[i].split(':');
                            obj[selector][style[0]] = style[1];
                        }

                        return obj;
                    },

                    /**
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @param obj
                     *
                     * @returns {string}
                     */
                    objToRule: function(obj) {
                        var str = '', selector, style;
                        for (selector in obj) {
                            str += (selector + '{');
                            for(style in obj[selector]) {
                                str += (style + ':' + obj[selector][style]);
                            }
                        }

                        return (str + '}');
                    }
                };

                return __core.assign(css, prototype);
            };

            /**
             *
             * @type style
             */
            return style;
        }
    );

/**
 * RuddyJS Globals - Document
 *
 * @package     ruddy
 * @module      $doc
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Document} doc An HTML `Document` is required
 * @returns     {Document}
 *
 * @description
 * RuddyJS Globals - Document
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 *
 * @example
 * //Right
 * $doc(document).mousePosition();
 *
 * //Wrong
 * $doc(document.body).mousePosition(); =>
 * TypeError("Document type - argument provided is not a document variable");
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$doc',
        '@document',
        '../globals/document'
    )
    .include([
        '@core',
        'window',
        'document',
        'Element'
    ])
    .init(
        this,
        module,
        function (__core, window, document, Element) {
            "use strict";

            /**
             * Global document wrapper
             *
             * @name $doc
             * @memberof module:Globals
             * @description Global document wrapper
             * @param {HTMLDocument} doc
             *
             * @returns {HTMLDocument}
             */
            var docum = function(doc) {
                if(__core.isDoc(doc) === false)
                    throw new TypeError("Document type - argument provided is not a document variable");

                /**
                 *
                 * @type {{querySelectorAll: (*|exports|module.exports|module:$el.querySelectorAll|Function), querySelector: (*|exports|module.exports|module:$el.querySelector|Function), createStyle: (exports|module.exports|module:$doc.createStyle), getStyle: (exports|module.exports|module:$doc.getStyle), addEventListener: (*|exports|module.exports|module:$el.addEventListener|Function), dispatchEvent: Function, customEvent: (exports|module.exports|module:$doc.customEvent), mousePosition: (exports|module.exports|module:$doc.mousePosition), size: (exports|module.exports|module:$doc.size), viewport: (exports|module.exports|module:$doc.viewport), getComputedStyle: (exports|module.exports|module:$doc.getComputedStyle)}}
                 */
                var prototype = {
                    /**
                     * Native QuerySelectorAll function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native querySelectorAll function polyfill
                     * @param selector
                     *
                     * @param r
                     * @param c
                     * @param i
                     * @param j
                     * @param a
                     *
                     * @returns {Array}
                     */
                    querySelectorAll: (document.querySelectorAll || function (r, c, i, j, a) {
                        var d=document,
                            s=d.createStyleSheet();
                        a = d.all;
                        c = [];
                        r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                        for (i = r.length; i--;) {
                            s.addRule(r[i], 'visiblility:visible', 0);
                            for (j = a.length; j--;) {
                                a[j].currentStyle.visiblility && c.push(a[j]);
                            }
                            s.removeRule(0);
                        }
                        return c;
                    }),

                    /**
                     * Native QuerySelector function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native querySelector function polyfill
                     * @param selectors
                     *
                     * @returns {element|null}
                     */
                    querySelector: (document.querySelector || function(selectors) {
                        var elements = prototype.querySelectorAll.call(document, selectors);
                        return (elements.length) ? elements[0] : null;
                    }),

                    /**
                     * Creates style element
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Creates style element
                     * @param title
                     *
                     * @returns {*}
                     */
                    createStyle: function(title) {
                        var style = document.createElement('style'), element;
                        style.title = title;
                        element = document.getElementsByTagName('head')[0].appendChild(style);
                        return element.sheet;
                    },

                    /**
                     * Get style element
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get style element
                     * @param title
                     *
                     * @returns {*}
                     */
                    getStyle: function(title) {
                        var sheets = document.styleSheets, len = sheets.length, i;
                        for(i = len; i--;) {
                            if(sheets[i].title == title){
                                return sheets[i];
                            }
                        }
                        return false;
                    },

                    /**
                     * Native addEventListener function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native addEventListener function polyfill
                     *
                     * @param eventNameWithoutOn
                     * @param callback
                     *
                     * @returns {*}
                     */
                    addEventListener: document.addEventListener || function(eventNameWithoutOn, callback) {
                        return doc.attachEvent('on' + eventNameWithoutOn, callback);
                    },

                    /**
                     * Native dispatchEvent function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native dispatchEvent function polyfill
                     * @param eventObject
                     *
                     * @returns {*}
                     */
                    dispatchEvent: ('Element' in window) ? Element.prototype.dispatchEvent : function (eventObject) {
                        return doc.fireEvent("on" + eventObject.type, eventObject);
                    },

                    /**
                     * Creates custom event
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Creates custom event
                     *
                     * @param event
                     * @param params
                     *
                     * @returns {CustomEvent}
                     */
                    customEvent: function(event, params) {
                        if(typeof window.CustomEvent === 'function')
                            return new CustomEvent(event, params);

                        function CustomEvent ( event, params ) {
                            params = params || { bubbles: false, cancelable: false, detail: undefined };
                            var e = document.createEvent( 'CustomEvent' );
                            e.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                            return e;
                        }

                        window.CustomEvent = CustomEvent;
                        return new CustomEvent(event, params );
                    },

                    /**
                     * Get mouse position
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get mouse position
                     * @param e
                     * @param property
                     *
                     * @returns {{x: Number, y: Number}|Number}
                     */
                    mousePosition: function(e, property) {
                        var x   =  e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) || ((e.changedTouches) ? e.changedTouches[0].pageX : 0),
                            y   =  e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop) || ((e.changedTouches) ? e.changedTouches[0].pageY : 0),
                            obj = {x: Math.round(x), y: Math.round(y)};

                        return (property && obj[property]) ? obj[property] : obj;
                    },

                    /**
                     * Get Document Size
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get Document Size
                     * @param property
                     *
                     * @returns {{width: Number, height: Number}|Number}
                     */
                    size: function(property) {
                        var
                            w = Math.max(
                                document.documentElement["clientWidth"],
                                document.body["scrollWidth"],
                                document.documentElement["scrollWidth"],
                                document.body["offsetWidth"],
                                document.documentElement["offsetWidth"]
                            ) || 0,
                            h = Math.max(
                                document.documentElement["clientHeight"],
                                document.body["scrollHeight"],
                                document.documentElement["scrollHeight"],
                                document.body["offsetHeight"],
                                document.documentElement["offsetHeight"]
                            ) || 0,
                            obj = {width: w, height: h};

                        return (property && obj[property]) ? obj[property] : obj;
                    },

                    /**
                     * Get Viewport Size
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get Viewport Size
                     * @param property
                     *
                     * @returns {{width: Number, height: Number}|Number}
                     */
                    viewport: function(property) {
                        var w   = window.innerWidth || ((document.documentElement) ? document.documentElement.clientWidth : document.body.clientWidth) || 0,
                            h   = window.innerHeight || ((document.documentElement) ? document.documentElement.clientHeight : document.body.clientHeight) || 0,
                            obj = {width: w, height: h};

                        return (property && obj[property]) ? obj[property] : obj;
                    },

                    /**
                     * getComputedStyle Polyfill
                     * https://github.com/jonathantneal/Polyfills-for-IE8/
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     *
                     * @returns {getComputedStyle}
                     */
                    getComputedStyle: function () {
                        if('getComputedStyle' in window)
                            return window.getComputedStyle.apply(window, arguments);

                        function getPixelSize(element, style, property, fontSize) {
                            var
                                sizeWithSuffix = style[property],
                                size = parseFloat(sizeWithSuffix),
                                suffix = sizeWithSuffix.split(/\d/)[0],
                                rootSize;

                            fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
                            rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

                            return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
                        }

                        function setShortStyleProperty(style, property) {
                            var
                                borderSuffix = property == 'border' ? 'Width' : '',
                                t = property + 'Top' + borderSuffix,
                                r = property + 'Right' + borderSuffix,
                                b = property + 'Bottom' + borderSuffix,
                                l = property + 'Left' + borderSuffix;

                            style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
                                : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
                                : style[l] == style[r] ? [style[t], style[r], style[b]]
                                : [style[t], style[r], style[b], style[l]]).join(' ');
                        }

                        function CSSStyleDeclaration(element) {
                            var
                                currentStyle = element.currentStyle,
                                style = this,
                                fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

                            for (var property in currentStyle) {
                                if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
                                    style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
                                } else if (property === 'styleFloat') {
                                    style['float'] = currentStyle[property];
                                } else {
                                    style[property] = currentStyle[property];
                                }
                            }

                            setShortStyleProperty(style, 'margin');
                            setShortStyleProperty(style, 'padding');
                            setShortStyleProperty(style, 'border');

                            style.fontSize = fontSize + 'px';

                            return style;
                        }

                        CSSStyleDeclaration.prototype = {
                            constructor: CSSStyleDeclaration,
                            getPropertyPriority: function () {},
                            getPropertyValue: function (prop) {return this[prop] || '';},
                            item: function () {},
                            removeProperty: function () {},
                            setProperty: function () {},
                            getPropertyCSSValue: function () {}
                        };

                        function getComputedStyle(element) {
                            return new CSSStyleDeclaration(element);
                        }

                        return getComputedStyle;
                    }
                };

                return __core.assign(doc, prototype);
            };

            /**
             *
             * @type {{createStyle, getStyle, customEvent, mousePosition}}
             */
            return docum;
        }
    );

/**
 * RuddyJS Globals - Element
 *
 * @package     ruddy
 * @module      $el
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Element} el An `Element` type is required
 * @returns     {Element}
 *
 * @description
 * RuddyJS Globals - Element
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$el',
        '@element',
        '../globals/element'
    )
    .include([
        'window',
        'document',
        'Element',
        '@core',
        '@document',
        '@nodes'
    ])
    .init(
        this,
        module,
        function (window, document, Element, __core, $doc, $nodes) {
            "use strict";

            /**
             * Global Element Wrapper
             *
             * @name $el
             * @memberof module:Globals
             * @description Global element wrapper
             * @param el
             *
             * @returns {Element|*}
             */
            var element = function(el) {
                if(__core.isEl(el) === false)
                    throw new TypeError("Element type - argument provided is not an element type");

                var prototype = {
                    /**
                     * Native querySelectorAll function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$el
                     * @description Native querySelectorAll function polyfill
                     * @param selector
                     *
                     * @returns {Array}
                     */
                    querySelectorAll: ('Element' in window) ? Element.prototype.querySelectorAll :
                        (function(selector) {
                            var nodes = el.childNodes, list = [], i, l = 0;
                            for(i = 0; i < nodes.length; i++) {
                                if ($nodes ($doc (document).querySelectorAll(selector)).indexOf(nodes[i]) !== -1) {
                                    list[l] = nodes[i];
                                    l++;
                                }
                            }

                            return list;
                        }),
                    /**
                     * Native querySelector function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$el
                     * @description Native querySelector function polyfill
                     * @param selectors
                     *
                     * @returns {null}
                     */
                    querySelector: ('Element' in window) ? Element.prototype.querySelector : function(selectors)
                    {
                        var elements = $el (el).querySelectorAll(selectors);
                        return (elements.length) ? elements[0] : null;
                    },

                    /**
                     * Native addEventListener function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$el
                     * @description Native addEventListener function polyfill
                     * @param eventNameWithoutOn
                     *
                     * @param callback
                     */
                    addEventListener: ('Element' in window) ? Element.prototype.addEventListener : function(eventNameWithoutOn, callback)
                    {
                        return el.attachEvent('on' + eventNameWithoutOn, callback);
                    },

                    /**
                     * Native dispatchEvent function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$el
                     * @description Native dispatchEvent function polyfill
                     * @param eventObject
                     */
                    dispatchEvent: ('Element' in window) ? Element.prototype.dispatchEvent : function (eventObject) {
                        return el.fireEvent("on" + eventObject.type, eventObject);
                    },

                    /**
                     * Native getAttribute function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$el
                     * @description Native getAttribute function polyfill
                     * @param attributeName
                     *
                     * @returns {*}
                     */
                    getAttribute: ('Element' in window) ? Element.prototype.getAttribute : function(attributeName) {
                        var attrs = el.attributes, i;

                        for(i = attrs.length; i--;){
                            if(attrs[i].name == attributeName){
                                return attrs[i].value;
                            }
                        }

                        return null;
                    },

                    /**
                     * Native setAttribute function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$el
                     * @description Native setAttribute function polyfill
                     *
                     * @param name
                     * @param value
                     */
                    setAttribute: ('Element' in window) ? Element.prototype.setAttribute : function(name, value) {
                        var attrs = el.attributes, i;

                        for(i = attrs.length; i--;){
                            if(attrs[i].name == name){
                                attrs[i].value = value;
                                return;
                            }
                        }

                        attrs[attrs.length] = {};
                        attrs[attrs.length][name] = {}
                    }
                };

                return __core.assign(el, prototype);
            };

            return element;
        }
    );

/**
 * RuddyJS JavaScript Library
 *
 * @package     ruddy
 * @module      $r
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {String|Element|NodeList|Array} param With Ruddy DOM global wrapper you can manipulate Elements and Arrays with the `param` parameter
 * @returns     {Object}
 *
 * @description
 * RuddyJS Globals - Ruddy DOM
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 *
 * @example
 * //Assigning a string as `param`
 * $r('#id').html('hello').append();
 *
 * $r('.class').each(function(value, index){
 *     console.log(index, value);
 * });
 * @example
 * //Assigning an element as `param`
 * var el = document.getElementByID('#id');
 * console.log($r(el).html());
 *
 * //Output => {String|HTML}
 * @example
 * //Assigning a node list as `param`
 * var nodeList = document.getElementByTagName('div');
 * $r(nodeList).each(function(value, index){
 *      console.log(index);
 * });
 *
 * //Output => [{Integer}, ...]
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$r',
        '@ruddy',
        '../globals/ruddy'
    )
    .include([
        'window',
        'document',
        '@core',
        '@object',
        '@function',
        '@element',
        '@document',
        '@nodes',
        '@style'
    ])
    .init(
        this,
        module,
        function (window, document, __core, $obj, $func, $el, $doc, $nodes, $css) {
            "use strict";

            var
                /**
                 * Contains each call of the global object '$r' and
                 * each child contains a `@type {Element|NodeList|Array}` object.
                 *
                 * @name $r
                 * @memberof module:Ruddy/cache
                 * @type {{el: *, param: *, index: *}}
                 *
                 * @example
                 * {
                 *     {Integer|String}: {
                 *         el:     {Element|NodeList|Array},
                 *         param:  {String|Element},
                 *         ndex:   {Integer|String}
                 *     }
                 * }
                 */
                $$rCache = __core.cache['$r'] = {},

                /**
                 * Document
                 *
                 * @type {(HTMLDocument|$doc)}
                 */
                doc = $doc (document),

                /**
                 * All Elements
                 *
                 * @type {NodeList}
                 */
                all = $nodes ((typeof doc.all === "undefined") ? doc.getElementsByTagName('*') : doc.all),

                /**
                 * StyleSheet
                 *
                 * @type {Stylesheet}
                 */
                css = $css (doc.createStyle('ruddyjs'));

            /**
             * $r Library Object
             *
             * @name $r
             * @memberof module:Globals
             * @description Global Ruddy DOM wrapper
             * @type {{assign, find, each, html, attribute, createRule, css, style, when, then, or, on, position, size, getTranslate, setTranslate}}
             * @param param
             *
             * @returns {$r}
             */
            var $r = $obj (function(param) {
                if (!(this instanceof $r)) {
                    return new $r (param);
                }

                var el,
                    index = param;

                if (__core.isEl(index))
                    index = all.indexOf(param);

                if($$rCache[index]) {
                    var cache = $$rCache[index];

                    this.el = cache.el;
                    this.param = cache.param;
                    this.index = cache.index;
                } else {
                    if (__core.isEl(param)) {
                        el = $el (param);
                        param = index;
                    } else if (__core.isStr(param)) {
                        el      = $nodes(doc.querySelectorAll(param));
                        index   = (el.length == 1) ? all.indexOf(el.first()) : param;
                        el      = (el.length == 1) ? el[0] : el;
                    } else if (__core.isInt(param)) {
                        el      = (all[param]) ? all[param] : null;
                        index   = param;
                    } else {
                        el      = param;
                        index   = JSON.stringify(param) || param;
                    }

                    /**
                     * @inner
                     * @name el
                     * @memberof module:$r
                     * @type {Element|NodeList|Array}
                     */
                    this.el = el;

                    /**
                     * @inner
                     * @name param
                     * @memberof module:$r
                     * @type {String|Element}
                     */
                    this.param = param;

                    /**
                     * @inner
                     * @name index
                     * @memberof module:$r
                     * @type {Integer|String}
                     */
                    this.index = index;

                    $$rCache[index] = {el: this.el, param: this.param, index: this.index}
                }
            });

            /**
             * Find element
             *
             * @method find
             * @memberof module:$r
             * @param selectors
             *
             * @returns {$r}
             */
            $r.assign('find', $func (function(selectors) {
                var key = this.param + ':' + selectors, el = this.el;

                if($$rCache[key]) {
                    return $r (key);
                }

                el = $nodes ($el(el).querySelectorAll(selectors));
                el = (el.length == 1) ? $el (el.first()) : el;

                $$rCache[key] = {el: el, param: key, index: $nodes (doc.all).indexOf(el), rule: null};

                return $r (key);
            }));

            /**
             * Loop through elements
             *
             * @method each
             * @memberof module:$r
             *
             * @param callback
             * @param afterCallback
             *
             * @returns {*}
             */
            $r.assign('each', $func (function(callback) {
                var obj = this.el;

                if(__core.isArr(obj) || __core.isNodes(obj)) {
                    obj.forEach.call(obj, callback, this);
                    return this;
                }

                callback.call(this, obj, 0, obj);
                return this;
            }));

            /**
             * Change/get css value
             *
             * @method html
             * @memberof module:$r
             *
             * @param style
             * @param value
             *
             * @returns {*}
             */
            $r.assign('html', $func (function(content) {
                var el = this.el;
                if(typeof content === 'undefined')
                    return el.innerHTML;

                return {
                    inner: function () {
                        if (__core.isFunc(content))
                            return el.innerHTML = content.call(el);

                        return el.innerHTML = content;
                    },

                    append: function () {
                        if (__core.isFunc(content))
                            return el.innerHTML += content.call(el);

                        return (el.innerHTML += content);
                    }
                }
            }));

            /**
             * Get/Set Attribute
             *
             * @method attribute
             * @memberof module:$r
             *
             * @param name
             *
             * @returns {*|string}
             */
            $r.assign('attribute', $func (function(name, value) {
                if(__core.isEl(this.el) === false)
                    throw new TypeError("$r argument provided is not an element");

                if(!value)
                    return this.el.getAttribute(name);

                return this.el.setAttribute(name, value);
            }));

            /**
             * Get/Set Value
             *
             * @method value
             * @memberof module:$r
             *
             * @param value
             *
             * @returns {*|string}
             */
            $r.assign('value', $func (function(value) {
                if(__core.isEl(this.el) === false)
                    throw new TypeError("$r argument provided is not an element");

                if(value)
                    return this.el.value = value;

                return this.el.value;
            }));

            /**
             * Create CSS Rule
             *
             * @method createRule
             * @memberof module:$r
             *
             * @returns {Function|null|*}
             */
            $r.assign('createRule', $func (function(css) {
                var index = css.insertRule(this.param + '{}', css.cssRules.length);
                $$rCache[this.param].rule = this.rule = css.getRule(index);
                return index;
            }));

            /**
             * Get/replace CSS Rule
             *
             * @method css
             * @memberof module:$r
             *
             * @param rule
             * @param value
             *
             * @returns {*}
             */
            $r.assign('css', $func (function(rule, value) {
                var css = this.rule;
                rule += '';

                if(!value)
                    return css.style[rule];

                return css.style[rule] = value;
            }));

            /**
             * Get/repalce element style
             *
             * @method style
             * @memberof module:$r
             *
             * @param rule
             * @param value
             *
             * @returns {*}
             */
            $r.assign('style', $func (function(rule, value) {
                var el = this.el;

                if(value)
                    return el.style[rule] = value;

                return (!$str(el.style[rule]).isEmpty()) ?  el.style[rule] : doc.getComputedStyle(el).getPropertyValue(rule);
            }));

            /**
             * If statment
             *
             * @method when
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('if', $func (function(expression, callback) {
                this.total = 1;
                this.count = 0;

                if(expression) {
                    this.count++;
                }

                if(this.count == this.total && callback) {
                    callback.call(this, this.el);
                }

                return this;
            }));


            /**
             * If statment
             *
             * @method when
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('elseif', $func (function(expression, callback) {
                if(this.count != 1) {
                    if(expression) {
                        this.count++;
                        this.total = 0;
                    }
                }

                this.total++;

                if(this.count == this.total && callback) {
                    callback.call(this, this.el);
                }

                return this;
            }));


            /**
             * Execute else statment
             *
             * @method catch
             * @memberof module:$r
             * @param callback
             *
             * @returns {$r}
             */
            $r.assign('else', $func (function(callback) {
                if(this.count != 1) {
                    this.count++;
                    this.total = 1;
                    callback.call(this, this.el);
                }

                this.total++;
                return this;
            }));

            /**
             * If statment
             *
             * @method when
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('when', $func (function(expression, callback) {
                this.total = 1;
                this.count = 0;

                expression =
                    (typeof expression == 'function') ? expression.call(this) : expression;

                if(expression) {
                    this.count++;
                }

                return this;
            }));

            /**
             * Execute if statment
             *
             * @method do
             * @memberof module:$r
             * @param callback
             *
             * @returns {$r}
             */
            $r.assign('do', $func (function(callback) {
                if(this.count == this.total) {
                    callback.call(this, this.el);
                }

                return this;
            }));

            /**
             * ELse if statment
             *
             * @method or
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('or', $func (function(expression, callback) {
                expression =
                    (typeof expression == 'function') ? expression.call(this) : expression;

                if(this.count != 1) {
                    if(expression) {
                        this.count++;
                        this.total = 0;
                    }
                }

                this.total++;
                return this;
            }));

            /**
             * Event listener
             *
             * @method on
             * @memberof module:$r
             * @param listener
             *
             * @returns {boolean}
             */
            $r.assign('on', $func (function(listener, callback, settings) {
                var obj = this.el, target, calls = 0;

                if(listener in __core.events){
                    obj.calls = __core.events[listener].call(this, obj, callback, settings);
                    return;
                }

                obj.addEventListener(listener, function(e){
                    e = e || window.event;
                    target = e.target || e.srcElement;

                    calls++;
                    callback.call(this, e, target, obj, calls);
                }, false);
            }));

            /**
             * Get element offset
             *
             * @method position
             * @memberof module:$r
             *
             * @returns {{x: number, y: number}}
             */
            $r.assign('position', $func (function(property) {
                var obj,
                    box     = ('getBoundingClientRect' in this.el) ? this.el.getBoundingClientRect() : {top: 0, left: 0},
                    body    = document.body,
                    docElem = document.documentElement,
                    scrollTop, scrollLeft, clientTop, clientLeft, x, y;

                scrollTop   = window.pageYOffset || docElem.scrollTop  || body.scrollTop;
                scrollLeft  = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

                clientTop   = docElem.clientTop  || body.clientTop  || 0;
                clientLeft  = docElem.clientLeft || body.clientLeft || 0;

                x = box.left + scrollLeft - clientLeft;
                y = box.top + scrollTop - clientTop;

                obj = {x: Math.round(x) || 0,  y: Math.round(y) || 0};

                return (property && property in obj) ? obj[property] : obj;
            }));

            /**
             * Get element size
             *
             * @method size
             * @memberof module:$r
             *
             * @returns {{width: (Number|number), height: (Number|number)}}
             */
            $r.assign('size', $func (function(property) {
                var w   = parseInt(this.style('width')) || this.el.offsetWidth || 0,
                    h   = parseInt(this.style('height')) || this.el.offsetHeight || 0,
                    obj = {width: w, height: h};

                return (property && obj[property]) ? obj[property] : obj;
            }));

            /**
             * Get Translate Values
             *
             * @method getTranslate
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('getTranslate', $func (function() {
                var style = this.style('transform'),
                    values;

                if (style) {
                    values =
                        (style.match(/translate\((.*)px, (.*)px\)/)) ?
                        style.match(/(translate)\((.*)px, (.*)px\)/) :
                        style.match(/translate(X|Y)\((.*)px\)/);
                }

                if(values != null) {
                    switch(values[1]) {
                        case 'X':
                            return {x: parseInt(values[2]) || 0, y: 0};
                            break;

                        case 'Y':
                            return {x: 0, y: parseInt(values[2]) || 0};
                            break;

                        default:
                            return {x: parseInt(values[2]) || 0, y: parseInt(values[3]) || 0};
                            break;
                    }
                }

                return {x: parseInt(this.style('left')) || 0, y: parseInt(this.style('top')) || 0};
            }));

            /**
             * Set Translate Values
             *
             * @method setTranslate
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('setTranslate', $func (function(x, y) {
                if('transform' in document.body.style) {
                    this.style('transform', 'translate(' + x + 'px, ' + y + 'px)');
                    return this;
                }

                this.style('top', y + 'px');
                this.style('left', x + 'px');
                return this;
            }));

            /**
             * Set Translate Values
             *
             * @method setTranslateX
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('setTranslateX', $func (function(x) {
                if('transform' in document.body.style) {
                    this.style('transform', 'translateX(' + x + 'px)');
                    return this;
                }

                this.style('left', x + 'px');
                return this;
            }));

            /**
             * Set Translate Values
             *
             * @method setTranslateY
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('setTranslateY', $func (function(y) {
                if('transform' in document.body.style) {
                    this.style('transform', 'translateY(' + y + 'px)');
                    return this;
                }

                this.style('left', y + 'px');
                return this;
            }));

            /**
             * $r
             *
             * @type function
             */
            return $r;
        });