/**
 * RuddyJS Window Properties - NodeList
 *
 * @package     ruddy
 * @module      NodeList
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('../export');

$Export
    .module(
        'NodeList',
        'NodeList',
        './window/nodes'
    )
    .include([
        'window'
    ])
    .init(
        this,
        module,
        function(window){
            return window.NodeList || {prototype: {}};
        }
    );