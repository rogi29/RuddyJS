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