var require = patchRequire(require);
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    waitTimeout: 25000
});

var fs = require('fs');


var url = "http://jobsearch.naukri.com/python-jobs";
var urls = [];

function getLinks() {
    var links = document.querySelectorAll('a.content');
 
    return Array.prototype.map.call(links, function(e) {
        var children = e.children;
        var job = {};
        job.title = children[0].getAttribute('title');
        job.org = children[1].textContent;
        job.exp = children[2].textContent;
        job.loc = children[3].textContent;
        var x = children[4].textContent.split("Job Description:");
        job.skills = x[0].split("Keyskills:")[1];
        job.desc = x[1];
        return JSON.stringify(job);
    });
}

var times = 37;
var i = 0;

casper.start();

casper.then(function () {
    urls.push(url);
    for (var i=2; i<=times; i++) {
        urls.push(url + "-" + i);
    }
});

casper.repeat(times, function () {
    this.thenOpen(urls[i], function () {
        var doc = this.evaluate(getLinks);

        this.echo(doc.length+"<<<<< "+ urls[i]);
        fs.write("./data.txt", doc, 'a'); 
        i++;        
    });
});

casper.run();