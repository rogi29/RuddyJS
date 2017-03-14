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