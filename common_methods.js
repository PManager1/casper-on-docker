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



casper.start('http://en.wikipedia.org/', function() {
    this.echo(this.getTitle());
});

casper.then(function() {
    this.echo(' 1 inside the wikipedia ');
});

casper.then(function() {
    this.echo('the current url is ');
	this.echo(this.getCurrentUrl());    
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});


casper.run(function(){
    this.echo("\n Done").exit();
});

