/**
 * RuddyJS JavaScript Library
 *
 * @package     ruddy
 * @module      $r
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 *
 * @param       {String|Element|NodeList|Array} param With Ruddy DOM global wrapper you can manipulate Elements and Arrays with the `param` parameter
 * @returns     {Object}
 *
 * @description
 * RuddyJS Globals - Ruddy DOM
 * <div style="margin-top:-10px;color:#ff833a;">*`window` and `document` variables are required!</div>
 *
 * @example
 * //Assigning a string as `param`
 * $r('#id').html('hello').append();
 *
 * $r('.class').each(function(value, index){
 *     console.log(index, value);
 * });
 * @example
 * //Assigning an element as `param`
 * var el = document.getElementByID('#id');
 * console.log($r(el).html());
 *
 * //Output => {String|HTML}
 * @example
 * //Assigning a node list as `param`
 * var nodeList = document.getElementByTagName('div');
 * $r(nodeList).each(function(value, index){
 *      console.log(index);
 * });
 *
 * //Output => [{Integer}, ...]
 */

var $Export = $Export || require('../core/export');

$Export
    .module(
        '$r',
        '@ruddy',
        '../globals/ruddy'
    )
    .include([
        'window',
        'document',
        '@core',
        '@object',
        '@function',
        '@element',
        '@document',
        '@nodes',
        '@style'
    ])
    .init(
        this,
        module,
        function (window, document, __core, $obj, $func, $el, $doc, $nodes, $css) {
            "use strict";

            var
                /**
                 * Contains each call of the global object '$r' and
                 * each child contains a `@type {Element|NodeList|Array}` object.
                 *
                 * @name $r
                 * @memberof module:Ruddy/cache
                 * @type {{el: *, param: *, index: *}}
                 *
                 * @example
                 * {
                 *     {Integer|String}: {
                 *         el:     {Element|NodeList|Array},
                 *         param:  {String|Element},
                 *         ndex:   {Integer|String}
                 *     }
                 * }
                 */
                $$rCache = __core.cache['$r'] = {},

                /**
                 * Document
                 *
                 * @type {(HTMLDocument|$doc)}
                 */
                doc = $doc (document),

                /**
                 * All Elements
                 *
                 * @type {NodeList}
                 */
                all = $nodes ((typeof doc.all === "undefined") ? doc.getElementsByTagName('*') : doc.all),

                /**
                 * StyleSheet
                 *
                 * @type {Stylesheet}
                 */
                css = $css (doc.createStyle('ruddyjs'));

            /**
             * $r Library Object
             *
             * @name $r
             * @memberof module:Globals
             * @description Global Ruddy DOM wrapper
             * @type {{assign, find, each, html, attribute, createRule, css, style, when, then, or, on, position, size, getTranslate, setTranslate}}
             * @param param
             *
             * @returns {$r}
             */
            var $r = $obj (function(param) {
                if (!(this instanceof $r)) {
                    return new $r (param);
                }

                var el,
                    index = param;

                if (__core.isEl(index))
                    index = all.indexOf(param);

                if($$rCache[index]) {
                    var cache = $$rCache[index];

                    this.el = cache.el;
                    this.param = cache.param;
                    this.index = cache.index;
                } else {
                    if (__core.isEl(param)) {
                        el = $el (param);
                        param = index;
                    } else if (__core.isStr(param)) {
                        el      = $nodes(doc.querySelectorAll(param));
                        index   = (el.length == 1) ? all.indexOf(el.first()) : param;
                        el      = (el.length == 1) ? el[0] : el;
                    } else if (__core.isInt(param)) {
                        el      = (all[param]) ? all[param] : null;
                        index   = param;
                    } else {
                        el      = param;
                        index   = JSON.stringify(param) || param;
                    }

                    /**
                     * @inner
                     * @name el
                     * @memberof module:$r
                     * @type {Element|NodeList|Array}
                     */
                    this.el = el;

                    /**
                     * @inner
                     * @name param
                     * @memberof module:$r
                     * @type {String|Element}
                     */
                    this.param = param;

                    /**
                     * @inner
                     * @name index
                     * @memberof module:$r
                     * @type {Integer|String}
                     */
                    this.index = index;

                    $$rCache[index] = {el: this.el, param: this.param, index: this.index}
                }
            });

            /**
             * Find element
             *
             * @method find
             * @memberof module:$r
             * @param selectors
             *
             * @returns {$r}
             */
            $r.assign('find', $func (function(selectors) {
                var key = this.param + ':' + selectors, el = this.el;

                if($$rCache[key]) {
                    return $r (key);
                }

                el = $nodes ($el(el).querySelectorAll(selectors));
                el = (el.length == 1) ? $el (el.first()) : el;

                $$rCache[key] = {el: el, param: key, index: $nodes (doc.all).indexOf(el), rule: null};

                return $r (key);
            }));

            /**
             * Loop through elements
             *
             * @method each
             * @memberof module:$r
             *
             * @param callback
             * @param afterCallback
             *
             * @returns {*}
             */
            $r.assign('each', $func (function(callback) {
                var obj = this.el;

                if(__core.isArr(obj) || __core.isNodes(obj)) {
                    obj.forEach.call(obj, callback, this);
                    return this;
                }

                callback.call(this, obj, 0, obj);
                return this;
            }));

            /**
             * Change/get css value
             *
             * @method html
             * @memberof module:$r
             *
             * @param style
             * @param value
             *
             * @returns {*}
             */
            $r.assign('html', $func (function(content) {
                var el = this.el;
                if(typeof content === 'undefined')
                    return el.innerHTML;

                return {
                    inner: function () {
                        if (__core.isFunc(content))
                            return el.innerHTML = content.call(el);

                        return el.innerHTML = content;
                    },

                    append: function () {
                        if (__core.isFunc(content))
                            return el.innerHTML += content.call(el);

                        return (el.innerHTML += content);
                    }
                }
            }));

            /**
             * Get/Set Attribute
             *
             * @method attribute
             * @memberof module:$r
             *
             * @param name
             *
             * @returns {*|string}
             */
            $r.assign('attribute', $func (function(name, value) {
                if(__core.isEl(this.el) === false)
                    throw new TypeError("$r argument provided is not an element");

                if(!value)
                    return this.el.getAttribute(name);

                return this.el.setAttribute(name, value);
            }));

            /**
             * Get/Set Value
             *
             * @method value
             * @memberof module:$r
             *
             * @param value
             *
             * @returns {*|string}
             */
            $r.assign('value', $func (function(value) {
                if(__core.isEl(this.el) === false)
                    throw new TypeError("$r argument provided is not an element");

                if(value)
                    return this.el.value = value;

                return this.el.value;
            }));

            /**
             * Create CSS Rule
             *
             * @method createRule
             * @memberof module:$r
             *
             * @returns {Function|null|*}
             */
            $r.assign('createRule', $func (function(css) {
                var index = css.insertRule(this.param + '{}', css.cssRules.length);
                $$rCache[this.param].rule = this.rule = css.getRule(index);
                return index;
            }));

            /**
             * Get/replace CSS Rule
             *
             * @method css
             * @memberof module:$r
             *
             * @param rule
             * @param value
             *
             * @returns {*}
             */
            $r.assign('css', $func (function(rule, value) {
                var css = this.rule;
                rule += '';

                if(!value)
                    return css.style[rule];

                return css.style[rule] = value;
            }));

            /**
             * Get/repalce element style
             *
             * @method style
             * @memberof module:$r
             *
             * @param rule
             * @param value
             *
             * @returns {*}
             */
            $r.assign('style', $func (function(rule, value) {
                var el = this.el;

                if(value)
                    return el.style[rule] = value;

                return (!$str(el.style[rule]).isEmpty()) ?  el.style[rule] : doc.getComputedStyle(el).getPropertyValue(rule);
            }));

            /**
             * If statment
             *
             * @method when
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('if', $func (function(expression, callback) {
                this.total = 1;
                this.count = 0;

                if(expression) {
                    this.count++;
                }

                if(this.count == this.total && callback) {
                    callback.call(this, this.el);
                }

                return this;
            }));


            /**
             * If statment
             *
             * @method when
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('elseif', $func (function(expression, callback) {
                if(this.count != 1) {
                    if(expression) {
                        this.count++;
                        this.total = 0;
                    }
                }

                this.total++;

                if(this.count == this.total && callback) {
                    callback.call(this, this.el);
                }

                return this;
            }));


            /**
             * Execute else statment
             *
             * @method catch
             * @memberof module:$r
             * @param callback
             *
             * @returns {$r}
             */
            $r.assign('else', $func (function(callback) {
                if(this.count != 1) {
                    this.count++;
                    this.total = 1;
                    callback.call(this, this.el);
                }

                this.total++;
                return this;
            }));

            /**
             * If statment
             *
             * @method when
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('when', $func (function(expression, callback) {
                this.total = 1;
                this.count = 0;

                expression =
                    (typeof expression == 'function') ? expression.call(this) : expression;

                if(expression) {
                    this.count++;
                }

                return this;
            }));

            /**
             * Execute if statment
             *
             * @method do
             * @memberof module:$r
             * @param callback
             *
             * @returns {$r}
             */
            $r.assign('do', $func (function(callback) {
                if(this.count == this.total) {
                    callback.call(this, this.el);
                }

                return this;
            }));

            /**
             * ELse if statment
             *
             * @method or
             * @memberof module:$r
             * @param expression
             *
             * @returns {$r}
             */
            $r.assign('or', $func (function(expression, callback) {
                expression =
                    (typeof expression == 'function') ? expression.call(this) : expression;

                if(this.count != 1) {
                    if(expression) {
                        this.count++;
                        this.total = 0;
                    }
                }

                this.total++;
                return this;
            }));

            /**
             * Event listener
             *
             * @method on
             * @memberof module:$r
             * @param listener
             *
             * @returns {boolean}
             */
            $r.assign('on', $func (function(listener, callback, settings) {
                var obj = this.el, target, calls = 0;

                if(listener in __core.events){
                    obj.calls = __core.events[listener].call(this, obj, callback, settings);
                    return;
                }

                obj.addEventListener(listener, function(e){
                    e = e || window.event;
                    target = e.target || e.srcElement;

                    calls++;
                    callback.call(this, e, target, obj, calls);
                }, false);
            }));

            /**
             * Get element offset
             *
             * @method position
             * @memberof module:$r
             *
             * @returns {{x: number, y: number}}
             */
            $r.assign('position', $func (function(property) {
                var obj,
                    box     = ('getBoundingClientRect' in this.el) ? this.el.getBoundingClientRect() : {top: 0, left: 0},
                    body    = document.body,
                    docElem = document.documentElement,
                    scrollTop, scrollLeft, clientTop, clientLeft, x, y;

                scrollTop   = window.pageYOffset || docElem.scrollTop  || body.scrollTop;
                scrollLeft  = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

                clientTop   = docElem.clientTop  || body.clientTop  || 0;
                clientLeft  = docElem.clientLeft || body.clientLeft || 0;

                x = box.left + scrollLeft - clientLeft;
                y = box.top + scrollTop - clientTop;

                obj = {x: Math.round(x) || 0,  y: Math.round(y) || 0};

                return (property && property in obj) ? obj[property] : obj;
            }));

            /**
             * Get element size
             *
             * @method size
             * @memberof module:$r
             *
             * @returns {{width: (Number|number), height: (Number|number)}}
             */
            $r.assign('size', $func (function(property) {
                var w   = parseInt(this.style('width')) || this.el.offsetWidth || 0,
                    h   = parseInt(this.style('height')) || this.el.offsetHeight || 0,
                    obj = {width: w, height: h};

                return (property && obj[property]) ? obj[property] : obj;
            }));

            /**
             * Get Translate Values
             *
             * @method getTranslate
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('getTranslate', $func (function() {
                var style = this.style('transform'),
                    values;

                if (style) {
                    values =
                        (style.match(/translate\((.*)px, (.*)px\)/)) ?
                        style.match(/(translate)\((.*)px, (.*)px\)/) :
                        style.match(/translate(X|Y)\((.*)px\)/);
                }

                if(values != null) {
                    switch(values[1]) {
                        case 'X':
                            return {x: parseInt(values[2]) || 0, y: 0};
                            break;

                        case 'Y':
                            return {x: 0, y: parseInt(values[2]) || 0};
                            break;

                        default:
                            return {x: parseInt(values[2]) || 0, y: parseInt(values[3]) || 0};
                            break;
                    }
                }

                return {x: parseInt(this.style('left')) || 0, y: parseInt(this.style('top')) || 0};
            }));

            /**
             * Set Translate Values
             *
             * @method setTranslate
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('setTranslate', $func (function(x, y) {
                if('transform' in document.body.style) {
                    this.style('transform', 'translate(' + x + 'px, ' + y + 'px)');
                    return this;
                }

                this.style('top', y + 'px');
                this.style('left', x + 'px');
                return this;
            }));

            /**
             * Set Translate Values
             *
             * @method setTranslateX
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('setTranslateX', $func (function(x) {
                if('transform' in document.body.style) {
                    this.style('transform', 'translateX(' + x + 'px)');
                    return this;
                }

                this.style('left', x + 'px');
                return this;
            }));

            /**
             * Set Translate Values
             *
             * @method setTranslateY
             * @memberof module:$r
             *
             * @returns {*}
             */
            $r.assign('setTranslateY', $func (function(y) {
                if('transform' in document.body.style) {
                    this.style('transform', 'translateY(' + y + 'px)');
                    return this;
                }

                this.style('left', y + 'px');
                return this;
            }));

            /**
             * $r
             *
             * @type function
             */
            return $r;
        });