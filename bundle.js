var fs = require('fs'),
    config,
    result;

try {
    config = JSON.parse(fs.readFileSync('bundle.json', 'utf8'));
} catch (e) {
    console.log('Error:', e.stack);
}

try {
    result = '';
    config.files.forEach(function(v, k){
        result += fs.readFileSync(v, 'utf8');
        if(k != config.files.length-1) {
            result += '\n\n';
        }
    });
} catch (e) {
    console.log('Error:', e.stack);
}

fs.writeFile(config.dest, result, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The files were bundled!");
});