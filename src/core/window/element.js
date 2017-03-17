/**
 * RuddyJS Window Properties - Element
 *
 * @package     ruddy
 * @module      Element
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'Element',
        'Element',
        './window/element'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.Element || {prototype: {}};
        }
    );