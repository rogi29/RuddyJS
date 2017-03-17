/**
 * RuddyJS Window Properties - HTMLAllCollection
 *
 * @package     ruddy
 * @module      HTMLAllCollection
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'HTMLAllCollection',
        'HTMLAllCollection',
        './window/html'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.HTMLAllCollection || {prototype: {}};
        }
    );