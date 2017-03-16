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