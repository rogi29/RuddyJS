/**
 * RuddyJS Globals - Document
 *
 * @package     ruddy
 * @module      $doc
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {Document} doc An HTML `Document` is required
 * @returns     {Document}
 *
 * @description
 * RuddyJS Globals - Document
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 *
 * @example
 * //Right
 * $doc(document).mousePosition();
 *
 * //Wrong
 * $doc(document.body).mousePosition(); =>
 * TypeError("Document type - argument provided is not a document variable");
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$doc',
        '@document',
        '../globals/document'
    )
    .include([
        '@core',
        'window',
        'document',
        'Element'
    ])
    .init(
        this,
        module,
        function (__core, window, document, Element) {
            "use strict";

            /**
             * Global document wrapper
             *
             * @name $doc
             * @memberof module:Globals
             * @description Global document wrapper
             * @param {HTMLDocument} doc
             *
             * @returns {HTMLDocument}
             */
            var docum = function(doc) {
                if(__core.isDoc(doc) === false)
                    throw new TypeError("Document type - argument provided is not a document variable");

                /**
                 *
                 * @type {{querySelectorAll: (*|exports|module.exports|module:$el.querySelectorAll|Function), querySelector: (*|exports|module.exports|module:$el.querySelector|Function), createStyle: (exports|module.exports|module:$doc.createStyle), getStyle: (exports|module.exports|module:$doc.getStyle), addEventListener: (*|exports|module.exports|module:$el.addEventListener|Function), dispatchEvent: Function, customEvent: (exports|module.exports|module:$doc.customEvent), mousePosition: (exports|module.exports|module:$doc.mousePosition), size: (exports|module.exports|module:$doc.size), viewport: (exports|module.exports|module:$doc.viewport), getComputedStyle: (exports|module.exports|module:$doc.getComputedStyle)}}
                 */
                var prototype = {
                    /**
                     * Native QuerySelectorAll function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native querySelectorAll function polyfill
                     * @param selector
                     *
                     * @param r
                     * @param c
                     * @param i
                     * @param j
                     * @param a
                     *
                     * @returns {Array}
                     */
                    querySelectorAll: (document.querySelectorAll || function (r, c, i, j, a) {
                        var d=document,
                            s=d.createStyleSheet();
                        a = d.all;
                        c = [];
                        r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                        for (i = r.length; i--;) {
                            s.addRule(r[i], 'visiblility:visible', 0);
                            for (j = a.length; j--;) {
                                a[j].currentStyle.visiblility && c.push(a[j]);
                            }
                            s.removeRule(0);
                        }
                        return c;
                    }),

                    /**
                     * Native QuerySelector function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native querySelector function polyfill
                     * @param selectors
                     *
                     * @returns {element|null}
                     */
                    querySelector: (document.querySelector || function(selectors) {
                        var elements = prototype.querySelectorAll.call(document, selectors);
                        return (elements.length) ? elements[0] : null;
                    }),

                    /**
                     * Creates style element
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Creates style element
                     * @param title
                     *
                     * @returns {*}
                     */
                    createStyle: function(title) {
                        var style = document.createElement('style'), element;
                        style.title = title;
                        element = document.getElementsByTagName('head')[0].appendChild(style);
                        return element.sheet;
                    },

                    /**
                     * Get style element
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get style element
                     * @param title
                     *
                     * @returns {*}
                     */
                    getStyle: function(title) {
                        var sheets = document.styleSheets, len = sheets.length, i;
                        for(i = len; i--;) {
                            if(sheets[i].title == title){
                                return sheets[i];
                            }
                        }
                        return false;
                    },

                    /**
                     * Native addEventListener function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native addEventListener function polyfill
                     *
                     * @param eventNameWithoutOn
                     * @param callback
                     *
                     * @returns {*}
                     */
                    addEventListener: (document.addEventListener || function(eventNameWithoutOn, callback) {
                        return doc.attachEvent('on' + eventNameWithoutOn, callback);
                    }),

                    /**
                     * Native dispatchEvent function polyfill
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Native dispatchEvent function polyfill
                     * @param eventObject
                     *
                     * @returns {*}
                     */
                    dispatchEvent: (Element.prototype.dispatchEvent || function (eventObject) {
                        return doc.fireEvent("on" + eventObject.type, eventObject);
                    }),

                    /**
                     * Creates custom event
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Creates custom event
                     *
                     * @param event
                     * @param params
                     *
                     * @returns {CustomEvent}
                     */
                    customEvent: function(event, params) {
                        if(typeof window.CustomEvent === 'function')
                            return new CustomEvent(event, params);

                        function CustomEvent ( event, params ) {
                            params = params || { bubbles: false, cancelable: false, detail: undefined };
                            var e = document.createEvent( 'CustomEvent' );
                            e.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                            return e;
                        }

                        window.CustomEvent = CustomEvent;
                        return new CustomEvent(event, params );
                    },

                    /**
                     * Get mouse position
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get mouse position
                     * @param e
                     * @param property
                     *
                     * @returns {{x: Number, y: Number}|Number}
                     */
                    mousePosition: function(e, property) {
                        var x   =  e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) || ((e.changedTouches) ? e.changedTouches[0].pageX : 0),
                            y   =  e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop) || ((e.changedTouches) ? e.changedTouches[0].pageY : 0),
                            obj = {x: Math.round(x), y: Math.round(y)};

                        return (property && obj[property]) ? obj[property] : obj;
                    },

                    /**
                     * Get Document Size
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get Document Size
                     * @param property
                     *
                     * @returns {{width: Number, height: Number}|Number}
                     */
                    size: function(property) {
                        var
                            w = Math.max(
                                document.documentElement["clientWidth"],
                                document.body["scrollWidth"],
                                document.documentElement["scrollWidth"],
                                document.body["offsetWidth"],
                                document.documentElement["offsetWidth"]
                            ) || 0,
                            h = Math.max(
                                document.documentElement["clientHeight"],
                                document.body["scrollHeight"],
                                document.documentElement["scrollHeight"],
                                document.body["offsetHeight"],
                                document.documentElement["offsetHeight"]
                            ) || 0,
                            obj = {width: w, height: h};

                        return (property && obj[property]) ? obj[property] : obj;
                    },

                    /**
                     * Get Viewport Size
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     * @description Get Viewport Size
                     * @param property
                     *
                     * @returns {{width: Number, height: Number}|Number}
                     */
                    viewport: function(property) {
                        var w   = window.innerWidth || ((document.documentElement) ? document.documentElement.clientWidth : document.body.clientWidth) || 0,
                            h   = window.innerHeight || ((document.documentElement) ? document.documentElement.clientHeight : document.body.clientHeight) || 0,
                            obj = {width: w, height: h};

                        return (property && obj[property]) ? obj[property] : obj;
                    },

                    /**
                     * getComputedStyle Polyfill
                     * https://github.com/jonathantneal/Polyfills-for-IE8/
                     *
                     * @function
                     * @inner
                     * @memberof module:$doc
                     *
                     * @returns {getComputedStyle}
                     */
                    getComputedStyle: function () {
                        if('getComputedStyle' in window)
                            return window.getComputedStyle.apply(window, arguments);

                        function getPixelSize(element, style, property, fontSize) {
                            var
                                sizeWithSuffix = style[property],
                                size = parseFloat(sizeWithSuffix),
                                suffix = sizeWithSuffix.split(/\d/)[0],
                                rootSize;

                            fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
                            rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

                            return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
                        }

                        function setShortStyleProperty(style, property) {
                            var
                                borderSuffix = property == 'border' ? 'Width' : '',
                                t = property + 'Top' + borderSuffix,
                                r = property + 'Right' + borderSuffix,
                                b = property + 'Bottom' + borderSuffix,
                                l = property + 'Left' + borderSuffix;

                            style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
                                : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
                                : style[l] == style[r] ? [style[t], style[r], style[b]]
                                : [style[t], style[r], style[b], style[l]]).join(' ');
                        }

                        function CSSStyleDeclaration(element) {
                            var
                                currentStyle = element.currentStyle,
                                style = this,
                                fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

                            for (var property in currentStyle) {
                                if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
                                    style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
                                } else if (property === 'styleFloat') {
                                    style['float'] = currentStyle[property];
                                } else {
                                    style[property] = currentStyle[property];
                                }
                            }

                            setShortStyleProperty(style, 'margin');
                            setShortStyleProperty(style, 'padding');
                            setShortStyleProperty(style, 'border');

                            style.fontSize = fontSize + 'px';

                            return style;
                        }

                        CSSStyleDeclaration.prototype = {
                            constructor: CSSStyleDeclaration,
                            getPropertyPriority: function () {},
                            getPropertyValue: function (prop) {return this[prop] || '';},
                            item: function () {},
                            removeProperty: function () {},
                            setProperty: function () {},
                            getPropertyCSSValue: function () {}
                        };

                        function getComputedStyle(element) {
                            return new CSSStyleDeclaration(element);
                        }

                        return getComputedStyle;
                    }
                };

                return __core.assign(doc, prototype);
            };

            /**
             *
             * @type {{createStyle, getStyle, customEvent, mousePosition}}
             */
            return docum;
        }
    );