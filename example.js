var casper=require('casper').create({
    verbose:true,
    logLevel:'error',
    pageSettings:{
        loadImages:false,
        loadPlugins:false
    },
    clientScripts:["plugins/jquery.js","plugins/lodash.js"]
});

var fs=require('fs');
var url='http://www.realtor.com/realestateandhomes-search/Mountain-View_CA';

var photolinks=[];
var pricelist=[];
var getstreetAddresss=[];
var getmetasqfts=[];
var addressLocality=[];
var addressRegion=[];
var postalCode=[];
var noofbeds=[];
var noofbaths=[];

var output=[];

function outputJSON(){
    output.push({
        photolinks: photolinks,
        pricelist: pricelist,
        getstreetAddresss: getstreetAddresss,
        getmetasqfts: getmetasqfts,
        addressLocality: addressLocality,
        addressRegion: addressRegion,
        postalCode: postalCode,
        noofbeds: noofbeds,
        noofbaths: noofbaths,
    });
    return JSON.stringify(output);
};

function getphoto(){
  var names=$('[data-label=property-photo] a');
  return _.map(names, function(e){
    return e.getAttribute('href');
  });
};

function getprice(){
  var names=$('[data-label=property-price] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getstreetAddress(){
  // var names=$('[itemprop=streetAddress]');
  var names=$('span.listing-street-address');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getmetasqft(){
  var names=$('[data-label=property-meta-sqft] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getaddresslocality(){
  // var names=$('[itemprop=addressLocality]');
  var names=$('span.listing-city');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getaddressreason(){
  // var names=$('[itemprop=addressRegion]');
var names=$('span.listing-region');  
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getpostalcode(){
  // var names=$('[itemprop=postalCode]');
  var names=$('span.listing-postal');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getnoofbeds(){
  var names=$('[data-label=property-meta-beds] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getnoofbaths(){
  var names=$('[data-label=property-meta-baths] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

// function alltest(){
//     var rows = document.querySelectorAll('.aspect-content');
//     console.log(rows.length);
//     var arra2y=[];
//     for (var i = 0;i<rows.length; i++) {
//         console.log("executing");
//     //     var row=rows[i];
//     //     var a = rows.querySelector('[data-label=property-meta-beds] span');
//     //     var l = rows.querySelector('[data-label=property-meta-baths] span');
//     //     var job = {};

//     //     job['beds'] = a.innerHTML;
//     //     job['baths'] = l.innerHTML;
//     //     console.log(job);
//     //     arra2y.push(job);
//       }
//     // return arra2y;
// };


casper.start(url, function(){
    this.echo(this.getTitle());
});

casper.waitForSelector('[data-label=property-price]',function(){
    console.log('selector is loaded');
});

casper.then(function(){
// this.evaluate(alltest);
    photolinks=this.evaluate(getphoto);
    pricelist=this.evaluate(getprice);
    getstreetAddresss=this.evaluate(getstreetAddress);
    addressLocality=this.evaluate(getaddresslocality);
    addressRegion=this.evaluate(getaddressreason);
    postalCode=this.evaluate(getpostalcode);
    noofbeds=this.evaluate(getnoofbeds);
    noofbaths=this.evaluate(getnoofbaths);
    getmetasqfts=this.evaluate(getmetasqft);

});

casper.then(function(){
    this.echo(photolinks.length +'links found');
    // this.echo('photolink: '+photolinks.join('\n-'));
    // this.echo('pricelist: '+pricelist.join('\n-'));
    // this.echo('streetaddress: '+getstreetAddresss.join('\n-'));
    // this.echo('locality: '+addressLocality.join('\n-'));
    // this.echo('address region: '+addressRegion.join('\n-'));
    // this.echo('postalcode: '+postalCode.join('\n-'));
    // this.echo('no_of_beds: '+noofbeds.join('\n-'));
    // this.echo('no of baths: '+noofbaths.join('\n-'));
    // this.echo('area: '+getmetasqfts.join('\n-'));
});

casper.run(function(){
    var data=outputJSON();
    fs.write('data.json',data,'w');
    this.echo("\n Done").exit();
});


















