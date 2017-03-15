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
                    insertRule: (CSSStyleSheet.prototype.insertRule || function(rule, index) {
                        var arr;
                        rule = rule.replace(/\s+/g, '');
                        arr = rule.split('{');
                        css.addRule(arr[0], arr[1].replace('}', ''), index);
                        return index;
                    }),

                    /**
                     * Native deleteRule function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$css
                     * @description Native deleteRule function polyfill
                     * @param index
                     */
                    deleteRule: (CSSStyleSheet.prototype.deleteRule || function(index) {
                        return css.removeRule(index);
                    }),

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