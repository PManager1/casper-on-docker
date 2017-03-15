var links = [];
var casper = require('casper').create();



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/night');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( 'DB were open');
});

var propertySchema = mongoose.Schema({
    address: String
});

var Property = mongoose.model('Property', propertySchema);

var p1 = new Property({ address: '22 NW Awesome St' });

p1.save(function (err, p1) {
  if (err) return console.error(err);
  else { console.error('    39- Saved');  }
});





var propertyList = []; 

'http://www.realtor.com/realestateandhomes-search/Mountain-View_CA/pg-2')
