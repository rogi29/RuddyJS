/**
 * RuddyJS Window Properties - CSSStyleSheet
 *
 * @package     ruddy
 * @module      CSSStyleSheet
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'CSSStyleSheet',
        'CSSStyleSheet',
        './window/style'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.CSSStyleSheet || {prototype: {}};
        }
    );