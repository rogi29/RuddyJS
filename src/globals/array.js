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

                var prototype = {
                    /**
                     * Checks if an array is empty
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
                     * Get all keys of an array
                     *
                     * @function
                     * @inner
                     * @memberof module:$arr
                     * @description Get all keys of an array
                     *
                     * @returns {Array}
                     */
                    keys: function() {
                        "use strict";
                        var r = [], i = 0;

                        if(arr.isEmpty())
                            return [];


                        for(i; i < arr.length; i++) {
                            r[i] = i;
                        }

                        return r;
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