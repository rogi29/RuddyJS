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