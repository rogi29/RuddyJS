var runAll = require("npm-run-all");

runAll(["bundle", "minify", "remove", "docs"], {parallel: false})
    .then(function() {
        console.log("done!");
    })
    .catch(function(err) {
        console.log(err);
        console.log("failed!");
    });
