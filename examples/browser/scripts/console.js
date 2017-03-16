var log = console.log;

console.log = function() {
    var i       = 0,
        str     = '',
        args    = arguments,
        len     = args.length,
        color   = 'rgb(41, 124, 178)';

    for(i; i < len; i++) {
        str += (' ' + args[i]);
    }

    $r ('#console-code').html().append('<li style="color:'+color+';">' + str + '</li>');
    log.apply(console, args);
};

window.onerror = function(msg, source, line, col) {
    console.log('ERROR: ' + msg + '\n URL: ' + source + ',\n Line: ' + line + ':' + col);
}