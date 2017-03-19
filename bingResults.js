var casper=require('casper').create({
    verbose:true,
    logLevel:'error',
    // logLevel: "debug",
    pageSettings:{
        loadImages:false,
        loadPlugins:false
    },
    clientScripts:["plugins/jquery.js","plugins/lodash.js"]
});
var fs=require('fs');



var links = []; 

function getLinks() {
    var links = document.querySelectorAll('.b_algo a');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
    });
};


casper.start('http://bing.com', function () {
   // search for 'casperjs' from google form
   this.fill('form[action="/search"]', { q: 'casperjs' }, true);
});


casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);   
});


casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});


casper.then(function() {
    // aggregate results for the 'phantomjs' search
    this.echo(links.length + ' links found:');
});


casper.then(function() {
    // aggregate results for the 'phantomjs' search
    this.echo(' - ' + links.join('\n - '))
});



casper.run(function(){
    this.echo("\n Done").exit();
});

