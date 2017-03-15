var casper = require('casper').create(),
	images = [];

// console arguments
var sourcePage = casper.cli.get(0),
	filterExpression = casper.cli.get(1);

function getPhotoUrls() {

	var els = document.querySelectorAll('img');

	var results = [];

	Array.prototype.forEach.call(els, function(el){

		if (el.hasAttribute('src')) {
			var title = el.hasAttribute('title') ? el.getAttribute('title') : null;
			results.push({url: el.getAttribute('src'), title: title});
		}

	});

	return results;
}

casper.start(sourcePage, function(){

	images = this.evaluate(getPhotoUrls);
});

casper.run(function(){

	if ('undefined' !== typeof filterExpression) {

		var rx = new RegExp(filterExpression);

		images = images.filter(function(img){
			return rx.test(img.url);
		});

	}

	this.echo(JSON.stringify(images));

	this.exit();
});

// usage:
// $ casperjs getphotos.casper.js http://www.nytimes.com
// $ casperjs getphotos.casper.js http://www.nytimes.com .png$ > photos.json
//   https://gist.github.com/colinhicks/4539204