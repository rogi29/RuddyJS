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