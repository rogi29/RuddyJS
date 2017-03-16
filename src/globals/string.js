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