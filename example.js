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
  var names=$('[itemprop=streetAddress]');
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
  var names=$('[itemprop=addressLocality]');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getaddressreason(){
  var names=$('[itemprop=addressRegion]');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getpostalcode(){
  var names=$('[itemprop=postalCode]');
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
    this.echo("\n Execution terminated").exit();
});


// **************** OUTPUT FROM THIS PROGRAM ************************
// [{
//     "photolinks": ["/realestateandhomes-detail/1020-Church-St_Mountain-View_CA_94041_M13264-08147",
//                    "/realestateandhomes-detail/1910-Mount-Vernon-Ct-Apt-17_Mountain-View_CA_94040_M12443-11276", 
//                    "/realestateandhomes-detail/1773-Doane-Ave_Mountain-View_CA_94043_M10961-41888", 
//                    "/realestateandhomes-detail/103-Evandale-Ave_Mountain-View_CA_94043_M26162-10723", 
//                    "/realestateandhomes-detail/59-Devonshire-Ave_Mountain-View_CA_94043_M13661-33642?ex=CA603166312",
//                    "/realestateandhomes-detail/59-Devonshire-Ave_Mountain-View_CA_94043_M13661-33642?ex=CA603144148",
//                    "/realestateandhomes-detail/433-Sylvan-Ave-Spc-51_Mountain-View_CA_94041_M24008-93520", 
//                    "/realestateandhomes-detail/162-Oberg-Ct_Mountain-View_CA_94043_M15713-97632", 
//                    "/realestateandhomes-detail/113-Pacchetti-Way_Mountain-View_CA_94040_M11616-55415", 
//                    "/realestateandhomes-detail/400-Ortega-Ave-Apt-208_Mountain-View_CA_94040_M11021-04439", 
//                    "/realestateandhomes-detail/255-S-Rengstorff-Ave-Apt-26_Mountain-View_CA_94040_M12881-36024", 
//                    "/realestateandhomes-detail/1050-Wright-Ave_Mountain-View_CA_94043_M11549-84811",
//                    "/realestateandhomes-detail/925-Valencia-Ave_Mountain-View_CA_94040_M28699-10474?ex=CA603031768",
//                    "/realestateandhomes-detail/925-Valencia-Ave_Mountain-View_CA_94040_M28699-10474?ex=CA603108368",
//                    "/realestateandhomes-detail/197-Ortega-Ave_Mountain-View_CA_94040_M10415-47282", 
//                    "/realestateandhomes-detail/205-Hockney-Ave_Mountain-View_CA_94041_M19838-33054",
//                    "/realestateandhomes-detail/1874-San-Luis-Ave_Mountain-View_CA_94043_M11405-25626"],
//     "pricelist": ["$2,298,000", 
//                   "$549,000", 
//                   "$2,633,000",
//                   "$1,149,000", 
//                   "$1,699,999", 
//                   "$1,699,999", 
//                   "$324,450",
//                   "$1,175,000", 
//                   "$1,280,000", 
//                   "$775,000", 
//                   "$737,000", 
//                   "$2,500,000", 
//                   "$2,695,000", 
//                   "$2,695,000", 
//                   "$1,348,000",
//                   "$1,289,000", 
//                   "$1,388,000"],
//     "getstreetAddresss": ["1020 Church St", "1910 Mount Vernon Ct Apt 17", "", "1773 Doane Ave", "", "103 Evandale Ave", "59 Devonshire Ave", "59 Devonshire Ave", "433 Sylvan Ave Spc 51", "", "162 Oberg Ct", "113 Pacchetti Way", "400 Ortega Ave Apt 208", "255 S Rengstorff Ave Apt 26", "1050 Wright Ave", "925 Valencia Ave", "", "925 Valencia Ave", "197 Ortega Ave", "205 Hockney Ave", "1874 San Luis Ave"],
//     "getmetasqfts": ["2,380", "910", "2,224", "1,611", "1,168", "1,710", "1,369", "1,477", "939", "935", "2,438", "2,438", "1,725", "1,637", "1,311"],
//     "addressLocality": ["Mountain View", "Mountain View", "", "Mountain View", "", "Mountain View", "Mountain View", "Mountain View", "Mountain View", "", "Mountain View", "Mountain View", "Mountain View", "Mountain View", "Mountain View", "Mountain View", "", "Mountain View", "Mountain View", "Mountain View", "Mountain View"],
//     "addressRegion": ["CA", "CA", "", "CA", "", "CA", "CA", "CA", "CA", "", "CA", "CA", "CA", "CA", "CA", "CA", "", "CA", "CA", "CA", "CA"],
//     "postalCode": ["94041", "94040", "", "94043", "", "94043", "94043", "94043", "94041", "", "94043", "94040", "94040", "94040", "94043", "94040", "", "94040", "94040", "94041", "94043"],
//     "noofbeds": ["4", "1", "4", "3", "4", "3", "3", "3", "2", "2", "4", "4", "3", "3", "3"],
//     "noofbaths": ["3", "1", "3+", "2+", "2", "2", "2+", "3", "1", "1", "2+", "3", "2+", "3+", "2"]
// }]