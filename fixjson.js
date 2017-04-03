//adds correct url and imgs array to json data

var make = 'honda';


var h = require('./' + make + 'Initial.json');
var fs = require('fs');

var array = [];







 urlGen = (picHref) => {
	
		if (picHref[1] == '/') {
			return 'https:'  + picHref;
		} else {
			return 'https://charlotte.craigslist.org'  + picHref;
		}

}

var newone;

 doit = () => {
	for (var i = 0; i < h.length; i++){
		newone = urlGen(h[i].href);
		h[i].href = newone;
		
	}
}




function createFile(make){
		fs.appendFile(make + 'FixedHref.json', JSON.stringify(h, null, 4), function(err){

		    console.log('File successfully written! - Check your project directory for the output file');

		});
		console.log('createfilerun');
}




doit();

setTimeout(function (){createFile('honda')}, 1000);
