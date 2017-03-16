var html = $r('#code').html(),
    map = {},
    key = function(e){
        map[e.keyCode] = e.type == 'keydown';
    };

//$r ('#code').html(html).inner();
$r ('#script-code .inner').html(html);

var editor = ace.edit("script");
editor.setTheme("ace/theme/chrome");
editor.getSession().setMode("ace/mode/javascript");
$r('#script-code').on('keydown', function(e, t) {
    key(e);

    if(map[17] && map[82]) {
        e.preventDefault();
        eval(editor.getValue());
    }
});

$r('#script-code').on('keyup', key);