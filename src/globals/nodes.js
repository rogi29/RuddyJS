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
        'NodeList',
        '@core'
    ])
    .init(
        this,
        module,
        function (NodeList, __core) {
            "use strict";

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


                var prototype = {
                    /**
                     * Checks if a node list is empty
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Checks if a node list is empty
                     *
                     * @returns {boolean}
                     */
                    isEmpty: function() {
                        return (nodes.length == 0);
                    },

                    /**
                     * Get all keys of a node list
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Get all keys of a node list
                     *
                     * @returns {Array}
                     */
                    keys: function() {
                        "use strict";
                        var r = [], i = 0;

                        if(nodes.isEmpty())
                            return [];

                        for(i; i < nodes.length; i++) {
                            r[i] = i;
                        }

                        return r;
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
                    forEach: (NodeList.prototype.forEach || function (f, p) {
                        "use strict";
                        if (typeof f !== 'function')
                            throw new TypeError(f + ' is not a function');

                        var a = nodes, p = p || nodes, l = a.length, i = 0;
                        for (i; i !== l; i++) {
                            f.call(p, a[i], i, a);
                        }
                    }),

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
                     * Convert to an array
                     *
                     * @function
                     * @inner
                     * @memberof module:$nodes
                     * @description Convert to an array
                     *
                     * @returns {Array}
                     */
                    toArray: function(){
                        var a = [], i = 0;

                        for(i; i < nodes.length; i++) {
                            a[i] = nodes[i];
                        }

                        nodes = a;
                        return nodes;
                    }
                };

                return __core.assign(nodes, prototype);
            };

            return nodeList;
        }
    );

