/**
 * RuddyJS NodeJS Bridge
 *
 * @package     ruddy
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

 module.exports = function (setGlobal, window, document) {
     var
         hooks = {
             export: require('./core/export'),
             Ruddy:  require('./core/core')(window, document),
             $arr:   require('./globals/array')(window, document),
             $str:   require('./globals/string')(window, document),
             $num:   require('./globals/number')(window, document),
             $int:   require('./globals/integer')(window, document),
             $float: require('./globals/float')(window, document),
             $obj:   require('./globals/object')(window, document),
             $func:  require('./globals/function')(window, document)
         };

     if (typeof window !== 'undefined' && typeof document !== 'undefined') {
         hooks.$nodes    = require('./globals/nodes')(window, document);
         hooks.$css      = require('./globals/style')(window, document);
         hooks.$doc      = require('./globals/document')(window, document);
         hooks.$el       = require('./globals/element')(window, document);
         hooks.$r        = require('./globals/ruddy')(window, document);
     }

     if(typeof global !== "undefined" && setGlobal === true) {
         for (var key in hooks) {
             global[key] = hooks[key];
         }
     }

     /**
      * hooks
      *
      * @type function
      */
     hooks;
 };