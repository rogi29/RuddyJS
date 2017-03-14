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
